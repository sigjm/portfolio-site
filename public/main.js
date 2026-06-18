const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.16 });

document.querySelectorAll('[data-reveal]').forEach((node) => revealObserver.observe(node));

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
const navById = new Map(navLinks.map((link) => [link.getAttribute('href').slice(1), link]));

function setActiveNav(sectionId) {
  navLinks.forEach((link) => {
    link.classList.remove('active');
    link.removeAttribute('aria-current');
  });

  const activeLink = navById.get(sectionId);
  if (!activeLink) return;
  activeLink.classList.add('active');
  activeLink.setAttribute('aria-current', 'page');
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => setActiveNav(link.getAttribute('href').slice(1)));
});

setActiveNav('intro');

const sectionObserver = new IntersectionObserver((entries) => {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (!visible) return;
  setActiveNav(visible.target.id);
}, { threshold: [0.28, 0.48, 0.68] });

sections.forEach((section) => sectionObserver.observe(section));

const params = new URLSearchParams(window.location.search);
const requestedSection = params.get('section');
if (requestedSection && document.getElementById(requestedSection)) {
  setActiveNav(requestedSection);
  window.requestAnimationFrame(() => {
    document.getElementById(requestedSection).scrollIntoView({ block: 'start' });
  });
}

async function loadProjects() {
  const target = document.getElementById('project-list');
  if (!target) return;

  let projects = [];
  try {
    const response = await fetch('/projects.json', { cache: 'no-store' });
    if (response.ok) projects = await response.json();
  } catch (_) {
    projects = [];
  }

  if (!Array.isArray(projects) || projects.length === 0) {
    target.innerHTML = [1, 2, 3].map((index) => `
      <article class="project-card empty" data-reveal>
        <span class="skill-index">0${index}</span>
        <h3>Coming Soon</h3>
        <p>다음 프로젝트를 준비 중입니다.</p>
      </article>
    `).join('');
  } else {
    const projectCards = projects.map((project, index) => `
      <article class="project-card" data-reveal>
        <span class="skill-index">${String(index + 1).padStart(2, '0')}</span>
        <h3>${escapeHtml(project.title || 'Untitled')}</h3>
        <p>${escapeHtml(project.description || '')}</p>
        ${Array.isArray(project.tags) ? `<ul>${project.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join('')}</ul>` : ''}
        ${project.href ? `<a href="${escapeAttribute(project.href)}" target="_blank" rel="noreferrer">프로젝트 보기</a>` : ''}
      </article>
    `);
    while (projectCards.length < 3) {
      projectCards.push(`
        <article class="project-card empty" data-reveal>
          <span class="skill-index">${String(projectCards.length + 1).padStart(2, '0')}</span>
          <h3>Coming Soon</h3>
          <p>다음 프로젝트를 준비 중입니다.</p>
        </article>
      `);
    }

    target.innerHTML = projectCards.join('');
  }

  target.querySelectorAll('[data-reveal]').forEach((node) => revealObserver.observe(node));
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll('`', '&#096;');
}

loadProjects();

const canvas = document.getElementById('signal-canvas');
const context = canvas.getContext('2d');
let width = 0;
let height = 0;
let points = [];

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = Math.floor(width * ratio);
  canvas.height = Math.floor(height * ratio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  points = Array.from({ length: Math.max(26, Math.floor(width / 42)) }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.36,
    vy: (Math.random() - 0.5) * 0.36,
  }));
}

function drawCanvas() {
  context.clearRect(0, 0, width, height);
  context.lineWidth = 1;

  for (const point of points) {
    point.x += point.vx;
    point.y += point.vy;
    if (point.x < 0 || point.x > width) point.vx *= -1;
    if (point.y < 0 || point.y > height) point.vy *= -1;
  }

  for (let i = 0; i < points.length; i += 1) {
    for (let j = i + 1; j < points.length; j += 1) {
      const a = points[i];
      const b = points[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance < 150) {
        context.strokeStyle = `rgba(217, 249, 157, ${0.12 * (1 - distance / 150)})`;
        context.beginPath();
        context.moveTo(a.x, a.y);
        context.lineTo(b.x, b.y);
        context.stroke();
      }
    }
  }

  context.fillStyle = 'rgba(94, 234, 212, 0.55)';
  for (const point of points) {
    context.fillRect(point.x - 1.5, point.y - 1.5, 3, 3);
  }

  window.requestAnimationFrame(drawCanvas);
}

resizeCanvas();
drawCanvas();
window.addEventListener('resize', resizeCanvas);
