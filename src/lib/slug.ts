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
  const parts = normalizedSlug.split("/");
  const fileName = parts.pop() || normalizedSlug;
  const seriesFromPath = parts.length > 0 ? parts[0] : null; // primeiro segmento do caminho
  const seriesFromPrefix = fileName.match(/^([a-z0-9]+)-/)?.[1] || null; // prefixo no nome do arquivo
  const series = seriesFromPath || seriesFromPrefix;
  return { normalizedSlug, fileName, series };
}
