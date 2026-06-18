export function normalizeTags(value) {
  if (Array.isArray(value)) {
    return value
      .map((tag) => String(tag).trim())
      .filter(Boolean);
  }

  if (typeof value !== 'string') {
    return [];
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return [];
  }

  if (trimmed.startsWith('[')) {
    try {
      return normalizeTags(JSON.parse(trimmed));
    } catch {
      return [];
    }
  }

  return trimmed
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean);
}

export function normalizeProject(value) {
  if (!value || typeof value !== 'object') {
    return null;
  }

  const title = String(value.title ?? '').trim();
  const description = String(value.description ?? '').trim();
  const href = String(value.href ?? '').trim();
  const tags = normalizeTags(value.tags);

  if (!title || !description) {
    return null;
  }

  return {
    title,
    description,
    tags,
    href,
  };
}

export function normalizeProjects(values) {
  if (!Array.isArray(values)) {
    return [];
  }

  return values
    .map((value) => normalizeProject(value))
    .filter(Boolean);
}
