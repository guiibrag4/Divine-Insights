import Link from "next/link";
import { buildPostHref } from "@/lib/slug";

type NavigationLink = {
  slug: string;
  title: string;
} | null;

type Props = {
  seriesIndexSlug: string;
  previousChapter: NavigationLink;
  nextChapter: NavigationLink;
};

export function ChapterNavigation({ seriesIndexSlug, previousChapter, nextChapter }: Props) {
  return (
    <div className="max-w-5xl mx-auto mt-16 pt-10 border-t border-[#D4D4D4] dark:border-[#262626]">
      <h3 className="text-xl font-bold mb-6 text-[#1A1A1A] dark:text-[#F2F2F2] text-center">
        Navegação do Estudo
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Botão Anterior */}
        {previousChapter ? (
          <Link
            href={buildPostHref(previousChapter.slug)}
            className="p-4 rounded-lg border border-[#D4D4D4] dark:border-[#262626] bg-white dark:bg-[#1A1A1A] hover:bg-neutral-100 dark:hover:bg-neutral-700 shadow-[0_4px_15px_rgb(0,0,0,0.1)] hover:shadow-[0_8px_25px_rgb(0,0,0,0.15)] hover:-translate-y-0.5 ring-1 ring-black/5 dark:ring-white/5 transition-[transform,box-shadow,background-color] duration-200 text-[#1A1A1A] dark:text-[#F2F2F2] text-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <div className="text-left flex-1">
                <div className="text-xs text-[#666666] dark:text-[#A0A0A0] mb-1">Anterior</div>
                <div className="font-semibold line-clamp-1">{previousChapter.title}</div>
              </div>
            </div>
          </Link>
        ) : (
          <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-neutral-400 dark:text-neutral-600 cursor-not-allowed text-sm flex items-center justify-center">
            Primeiro Capítulo
          </div>
        )}

        {/* Botão Índice (sempre no centro) */}
        <Link
          href={buildPostHref(seriesIndexSlug)}
          className="p-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          Índice da Série
        </Link>

        {/* Botão Próximo */}
        {nextChapter ? (
          <Link
            href={buildPostHref(nextChapter.slug)}
            className="p-4 rounded-lg border border-[#D4D4D4] dark:border-[#262626] bg-white dark:bg-[#1A1A1A] hover:bg-neutral-100 dark:hover:bg-neutral-700 shadow-[0_4px_15px_rgb(0,0,0,0.1)] hover:shadow-[0_8px_25px_rgb(0,0,0,0.15)] hover:-translate-y-0.5 ring-1 ring-black/5 dark:ring-white/5 transition-[transform,box-shadow,background-color] duration-200 text-[#1A1A1A] dark:text-[#F2F2F2] text-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            <div className="flex items-center gap-2">
              <div className="text-right flex-1">
                <div className="text-xs text-[#666666] dark:text-[#A0A0A0] mb-1">Próximo</div>
                <div className="font-semibold line-clamp-1">{nextChapter.title}</div>
              </div>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        ) : (
          <div className="p-4 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 text-neutral-400 dark:text-neutral-600 cursor-not-allowed text-sm flex items-center justify-center">
            Último Capítulo
          </div>
        )}
      </div>

      {/* Botão Voltar ao Início */}
      <div className="mt-6 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-[#666666] dark:text-[#A0A0A0] hover:text-blue-600 dark:hover:text-blue-400 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Voltar para a Página Inicial
        </Link>
      </div>
    </div>
  );
}
