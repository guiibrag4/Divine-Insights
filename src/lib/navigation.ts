import { getAllPosts } from "./api";

type NavigationInfo = {
  seriesIndexSlug: string;
  previousChapter: { slug: string; title: string } | null;
  nextChapter: { slug: string; title: string } | null;
};

/**
 * Calcula a navegação de capítulos para uma série de estudos.
 * Identifica o índice da série e os capítulos anterior/próximo baseado no slug atual.
 */
export function getChapterNavigation(currentSlug: string): NavigationInfo | null {
  const allPosts = getAllPosts();
  
  // Extrai o padrão da série do slug (ex: "1joao-01-capitulo-1" -> "1joao")
  const seriesMatch = currentSlug.match(/^([a-z0-9]+)-/);
  if (!seriesMatch) return null;
  
  const seriesPrefix = seriesMatch[1];
  
  // Encontra todos os posts da mesma série
  const seriesPosts = allPosts
    .filter(post => post.slug.startsWith(seriesPrefix + "-"))
    .sort((a, b) => a.slug.localeCompare(b.slug));
  
  // Encontra o índice da série (slug que termina com "-00-indice")
  const indexPost = seriesPosts.find(post => post.slug.includes("-00-indice"));
  const seriesIndexSlug = indexPost ? indexPost.slug : `${seriesPrefix}-00-indice`;
  
  // Filtra apenas os capítulos (exclui o índice)
  const chapters = seriesPosts.filter(post => !post.slug.includes("-00-indice"));
  
  // Encontra o índice do capítulo atual
  const currentIndex = chapters.findIndex(post => post.slug === currentSlug);
  
  if (currentIndex === -1) {
    // Se for o índice, não mostra navegação de capítulos
    return null;
  }
  
  // Define capítulos anterior e próximo
  const previousChapter = currentIndex > 0 
    ? { slug: chapters[currentIndex - 1].slug, title: chapters[currentIndex - 1].title }
    : null;
    
  const nextChapter = currentIndex < chapters.length - 1
    ? { slug: chapters[currentIndex + 1].slug, title: chapters[currentIndex + 1].title }
    : null;
  
  return {
    seriesIndexSlug,
    previousChapter,
    nextChapter,
  };
}
