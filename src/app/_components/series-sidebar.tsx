import Link from "next/link";
import { getSeriesChapters } from "@/lib/chapters";
import { getAllSeries } from "@/lib/series";
import { buildPostHref } from "@/lib/slug";
import { SidebarDynamicTitle } from "./sidebar-dynamic-title";

interface SeriesSidebarProps {
  currentSlug: string;
  seriesSlug: string;
  postTitle: string;
}

export async function SeriesSidebar({ currentSlug, seriesSlug, postTitle }: SeriesSidebarProps) {
  const chapters = await getSeriesChapters(seriesSlug);
  
  if (!chapters.length) {
    return null;
  }

  // Extrair o número do capítulo atual para destacar
  const currentChapterMatch = currentSlug.match(/-(\d+)-/);
  const currentChapterNumber = currentChapterMatch ? parseInt(currentChapterMatch[1], 10) : -1;

  return (
    <aside className="hidden lg:block lg:col-span-4 xl:col-span-3 shrink-0">
      <div className="sticky top-6 space-y-6">
        
        {/* Título Dinâmico que aparece no scroll */}
        <SidebarDynamicTitle title={postTitle} />

        {/* --- REMOVIDO: Cabeçalho da Série redundante --- */}

        {/* Lista de Capítulos */}
        <nav className="rounded-2xl border border-stone-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/60 backdrop-blur-sm shadow-lg overflow-hidden">
          <div className="p-4 border-b border-stone-200 dark:border-slate-700">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-stone-700 dark:text-stone-300 flex items-center gap-2">
              <span>📖</span>
              <span>Capítulos ({chapters.length})</span>
            </h3>
          </div>
          
          <div className="max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-stone-300 dark:scrollbar-thumb-slate-600 scrollbar-track-transparent">
            <ul className="divide-y divide-stone-200 dark:divide-slate-700">
              {chapters.map((chapter, index) => {
                const chapterMatch = chapter.slug.match(/-(\d+)-/);
                const chapterNumber = chapterMatch ? parseInt(chapterMatch[1], 10) : index + 1;
                const isCurrentChapter = chapter.slug === currentSlug;
                const isIndex = chapter.slug.includes("-00-") || chapter.slug.includes("indice");

                return (
                  <li key={chapter.slug}>
                    <Link
                      href={buildPostHref(chapter.slug)}
                      className={`
                        group block px-4 py-3 transition-all duration-200
                        ${
                          isCurrentChapter
                            ? "bg-blue-50 dark:bg-blue-900/30 border-l-4 border-l-blue-600 dark:border-l-blue-400"
                            : "hover:bg-stone-50 dark:hover:bg-slate-800/60 border-l-4 border-l-transparent"
                        }
                      `}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`
                            flex-shrink-0 h-8 w-8 rounded-lg flex items-center justify-center font-bold text-sm
                            ${
                              isCurrentChapter
                                ? "bg-blue-600 dark:bg-blue-500 text-white shadow-md"
                                : isIndex
                                ? "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300"
                                : "bg-stone-100 dark:bg-slate-700 text-stone-600 dark:text-stone-300 group-hover:bg-stone-200 dark:group-hover:bg-slate-600"
                            }
                          `}
                        >
                          {isIndex ? "📑" : chapterNumber}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4
                            className={`
                              text-sm font-semibold leading-tight mb-1 line-clamp-2
                              ${
                                isCurrentChapter
                                  ? "text-blue-900 dark:text-blue-100"
                                  : "text-stone-800 dark:text-stone-200 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                              }
                            `}
                          >
                            {chapter.title.split("|")[1]?.trim() || chapter.title}
                          </h4>
                          {isCurrentChapter && (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400">
                              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
                              Lendo agora
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Progresso */}
        <div className="rounded-2xl border border-stone-200 dark:border-slate-700 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900 p-5 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">
              Progresso
            </span>
            <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
              {currentChapterNumber >= 0 ? currentChapterNumber : 0}/{chapters.length - 1}
            </span>
          </div>
          <div className="h-2 bg-stone-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-500"
              style={{
                width: `${currentChapterNumber >= 0 ? (currentChapterNumber / (chapters.length - 1)) * 100 : 0}%`,
              }}
            />
          </div>
        </div>
      </div>
    </aside>
  );
}