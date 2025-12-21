import { getAllPosts } from "./api";
import { buildPostHref, parsePostSlug } from "./slug";

type NavigationInfo = {
  seriesIndexSlug: string;
  previousChapter: { slug: string; title: string } | null;
  nextChapter: { slug: string; title: string } | null;
};

/**
 * Calcula a navegação de capítulos para uma série de estudos.
 * Identifica o índice da série e os capítulos anterior/próximo baseado no slug atual.
 */
export async function getChapterNavigation(currentSlug: string): Promise<NavigationInfo | null> {
  const allPosts = await getAllPosts();
  const { normalizedSlug, series } = parsePostSlug(currentSlug);
  if (!series) return null;

  const seriesPosts = allPosts
    .filter((post) => post.series === series)
    .sort((a, b) => a.slug.localeCompare(b.slug));

  const indexPost = seriesPosts.find((post) => post.fileName.includes("-00-indice"));
  const seriesIndexSlug = indexPost ? indexPost.slug : `${series}/${series}-00-indice`;

  const chapters = seriesPosts.filter((post) => !post.fileName.includes("-00-indice"));

  const currentIndex = chapters.findIndex((post) => post.slug === normalizedSlug);
  
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
