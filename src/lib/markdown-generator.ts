/**
 * Gerador de arquivos Markdown a partir de dados do Supabase
 * Usado pelo GitHub Actions para criar arquivos .md automaticamente
 */

import { type DbPost } from "@/interfaces/db";
import { type DbSeries } from "@/interfaces/db";

/**
 * Gera o conteúdo de um arquivo markdown com frontmatter
 */
export function generatePostMarkdown(post: DbPost): string {
  const frontmatter = `---
title: '${post.title}'
excerpt: '${post.excerpt}'
coverImage: '${post.cover_image}'
date: '${post.date}'
author:
  name: ${post.author_name}
  picture: '${post.author_picture}'
ogImage:
  url: '${post.og_image}'
---

${post.content}
`;

  return frontmatter;
}

/**
 * Gera o nome do arquivo markdown baseado no slug
 * Exemplo: "tiago-01-fe-pratica" -> "tiago-01-fe-pratica.md"
 */
export function generatePostFileName(slug: string): string {
  return `${slug}.md`;
}

/**
 * Gera o caminho completo do arquivo markdown
 * Exemplo: series="tiago", slug="tiago-01-fe-pratica" -> "_posts/tiago/tiago-01-fe-pratica.md"
 */
export function generatePostFilePath(seriesSlug: string, postSlug: string): string {
  return `_posts/${seriesSlug}/${postSlug}.md`;
}

/**
 * Gera arquivo markdown de índice da série
 */
export function generateSeriesIndexMarkdown(series: DbSeries): string {
  const frontmatter = `---
title: '${series.title}'
excerpt: '${series.description}'
coverImage: '${series.cover_image}'
date: '${new Date().toISOString()}'
author:
  name: Guilherme Braga
  picture: '/assets/blog/authors/jj.jpeg'
ogImage:
  url: '${series.cover_image}'
---

# ${series.title}

${series.description}

> Esta é a página índice da série. Os capítulos estão listados abaixo.
`;

  return frontmatter;
}

/**
 * Gera o caminho do arquivo índice da série
 * Exemplo: "tiago" -> "_posts/tiago/tiago-00-indice.md"
 */
export function generateSeriesIndexPath(slugPrefix: string): string {
  return `_posts/${slugPrefix}/${slugPrefix}-00-indice.md`;
}
