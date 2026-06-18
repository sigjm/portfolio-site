import test from 'node:test';
import assert from 'node:assert/strict';

import { normalizeProject, normalizeProjects } from '../server/projects.mjs';

test('normalizeProject keeps public project fields and serializes tags', () => {
  const project = normalizeProject({
    title: 'portfolio-site',
    description: 'React portfolio',
    tags: 'React, TypeScript, Docker',
    href: 'https://github.com/sigjm/portfolio-site',
    internalNote: 'not public',
  });

  assert.deepEqual(project, {
    title: 'portfolio-site',
    description: 'React portfolio',
    tags: ['React', 'TypeScript', 'Docker'],
    href: 'https://github.com/sigjm/portfolio-site',
  });
});

test('normalizeProjects drops incomplete rows', () => {
  const projects = normalizeProjects([
    {
      title: 'cozyIoT',
      description: 'Android IoT project',
      tags: ['Android', 'MQTT'],
      href: 'https://github.com/sigjm/cozyIoT',
    },
    { title: '', description: 'missing title', tags: [], href: '' },
    null,
  ]);

  assert.deepEqual(projects, [
    {
      title: 'cozyIoT',
      description: 'Android IoT project',
      tags: ['Android', 'MQTT'],
      href: 'https://github.com/sigjm/cozyIoT',
    },
  ]);
});
