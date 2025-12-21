// Helpers para lidar com slugs de posts (normalização e hrefs consistentes)
export function normalizeSlug(slug: string): string {
  // Usa separador POSIX e remove barras iniciais
  return slug.replace(/\\/g, "/").replace(/^\//, "");
}

export function buildPostHref(slug: string): string {
  return `/posts/${normalizeSlug(slug)}`;
}

export function parsePostSlug(slug: string): {
  normalizedSlug: string;
  fileName: string;
  series: string | null;
} {
  const normalizedSlug = normalizeSlug(slug);
  const fileName = normalizedSlug.split("/").pop() || normalizedSlug;
  const seriesMatch = fileName.match(/^([a-z0-9]+)-/);
  const series = seriesMatch ? seriesMatch[1] : null;
  return { normalizedSlug, fileName, series };
}
