import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import mysql from 'mysql2/promise';

import { normalizeProjects } from './projects.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, '../dist');
const seedPath = path.resolve(__dirname, './seed-projects.json');

const app = express();
const port = Number(process.env.PORT || 3000);

let pool = null;
let databaseReady = false;

app.disable('x-powered-by');

app.use((_, response, next) => {
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('X-Frame-Options', 'DENY');
  response.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  response.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  response.setHeader(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "script-src 'self'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self' data:",
      "connect-src 'self'",
      "object-src 'none'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      'upgrade-insecure-requests',
    ].join('; '),
  );
  next();
});

async function readSeedProjects() {
  const source = await fs.readFile(seedPath, 'utf8');
  return normalizeProjects(JSON.parse(source));
}

function createPool() {
  return mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER || 'portfolio',
    password: process.env.DB_PASSWORD || 'portfolio_pass',
    database: process.env.DB_NAME || 'portfolio',
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
  });
}

async function retry(operation, attempts = 12) {
  let lastError = null;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await operation();
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, Math.min(attempt * 500, 3000)));
    }
  }

  throw lastError;
}

async function initializeDatabase() {
  pool = createPool();

  await retry(() => pool.query('SELECT 1'));
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS projects (
      id INT UNSIGNED NOT NULL AUTO_INCREMENT,
      title VARCHAR(120) NOT NULL,
      description TEXT NOT NULL,
      tags JSON NOT NULL,
      href VARCHAR(255) NOT NULL,
      sort_order INT UNSIGNED NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      PRIMARY KEY (id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);

  const [rows] = await pool.query('SELECT COUNT(*) AS count FROM projects');
  const count = Number(rows?.[0]?.count || 0);

  if (count === 0) {
    const seedProjects = await readSeedProjects();
    for (const [index, project] of seedProjects.entries()) {
      await pool.execute(
        'INSERT INTO projects (title, description, tags, href, sort_order) VALUES (?, ?, ?, ?, ?)',
        [project.title, project.description, JSON.stringify(project.tags), project.href, index + 1],
      );
    }
  }

  databaseReady = true;
}

async function loadProjects() {
  if (!pool || !databaseReady) {
    return readSeedProjects();
  }

  try {
    const [rows] = await pool.query(
      'SELECT title, description, tags, href FROM projects ORDER BY sort_order ASC, id ASC',
    );
    const projects = normalizeProjects(rows);
    return projects.length > 0 ? projects : readSeedProjects();
  } catch (error) {
    console.error('Failed to load projects from MariaDB:', error.message);
    return readSeedProjects();
  }
}

app.get('/api/health', (_, response) => {
  response.json({
    ok: true,
    database: databaseReady ? 'connected' : 'fallback',
  });
});

app.get(['/api/projects', '/projects.json'], async (_, response, next) => {
  try {
    response.setHeader('Cache-Control', 'no-store');
    response.json(await loadProjects());
  } catch (error) {
    next(error);
  }
});

app.use(
  express.static(distPath, {
    setHeaders(response, filePath) {
      if (filePath.endsWith('.html')) {
        response.setHeader('Cache-Control', 'no-store');
      } else {
        response.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      }
    },
  }),
);

app.get('*', (request, response, next) => {
  if (request.path.startsWith('/api/')) {
    response.status(404).json({ error: 'Not found' });
    return;
  }

  response.sendFile(path.join(distPath, 'index.html'), (error) => {
    if (error) next(error);
  });
});

app.use((error, _, response, __) => {
  console.error(error);
  response.status(500).json({ error: 'Internal server error' });
});

initializeDatabase()
  .catch((error) => {
    console.error('MariaDB initialization failed. Using seed project fallback:', error.message);
  })
  .finally(() => {
    app.listen(port, '0.0.0.0', () => {
      console.log(`Portfolio server listening on ${port}`);
    });
  });
