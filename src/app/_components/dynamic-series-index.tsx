import Link from "next/link";
import { getSeriesChapters } from "@/lib/chapters";
import { buildPostHref } from "@/lib/slug";

interface Props {
  seriesSlug: string;
  seriesTitle: string;
  seriesDescription: string;
}

export async function DynamicSeriesIndex({ seriesSlug, seriesTitle, seriesDescription }: Props) {
  const chapters = await getSeriesChapters(seriesSlug);
  
  // Filtrar apenas capítulos (excluir o próprio índice)
  const realChapters = chapters.filter(
    (ch) => !ch.slug.includes("-00-indice") && !ch.slug.includes("indice")
  );

  return (
    <div className="prose prose-xl prose-stone dark:prose-invert max-w-4xl mx-auto">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">📖 {seriesTitle} - Índice Completo</h1>
      
      <div className="mb-8 p-6 bg-blue-50 dark:bg-neutral-800 rounded-xl border border-blue-300 dark:border-[#262626] shadow-[0_4px_20px_rgba(59,130,246,0.1)] ring-1 ring-blue-500/10 dark:ring-white/5">
        <p className="text-lg mb-0">{seriesDescription}</p>
      </div>

      <h2 className="text-3xl font-bold mb-6">📚 Capítulos Disponíveis</h2>

      {realChapters.length === 0 ? (
        <p className="text-[#666666] dark:text-[#A0A0A0] italic">
          Nenhum capítulo publicado ainda. Volte em breve!
        </p>
      ) : (
        <div className="space-y-4 not-prose">
          {realChapters.map((chapter, idx) => (
            <Link
              key={chapter.slug}
              href={chapter.href}
              className="block p-5 rounded-xl border border-[#D4D4D4] dark:border-[#262626] bg-white dark:bg-[#1A1A1A] shadow-[0_4px_20px_rgb(0,0,0,0.08)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.15)] hover:border-blue-500 dark:hover:border-blue-400 ring-1 ring-black/5 dark:ring-white/5 hover:-translate-y-1 transition-[transform,box-shadow,border-color] duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-[#1A1A1A] dark:text-[#F2F2F2] group-hover:text-blue-600 dark:group-hover:text-blue-400 mb-2">
                    {chapter.title}
                  </h3>
                  <p className="text-[#666666] dark:text-[#A0A0A0] text-sm line-clamp-2 mb-0">
                    {chapter.excerpt}
                  </p>
                </div>
                <svg
                  className="w-6 h-6 text-neutral-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-12 p-6 bg-neutral-100 dark:bg-neutral-800 rounded-xl">
        <h3 className="text-xl font-semibold mb-3">💡 Como usar este índice</h3>
        <ul className="space-y-2 mb-0">
          <li>✅ Clique em qualquer capítulo para começar a leitura</li>
          <li>✅ Use a navegação de rodapé para avançar/voltar capítulos</li>
          <li>✅ Novos capítulos aparecem automaticamente aqui</li>
          <li>✅ Marque seus favoritos e volte sempre que quiser</li>
        </ul>
      </div>
    </div>
  );
}
