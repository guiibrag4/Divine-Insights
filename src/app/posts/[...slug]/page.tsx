import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug, getAllPosts } from "@/lib/api";
import { getChapterNavigation } from "@/lib/navigation";
import { getAllSeries } from "@/lib/series";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import DateFormatter from "@/app/_components/date-formatter";
import CoverImage from "@/app/_components/cover-image";
import { ChapterNavigation } from "@/app/_components/chapter-navigation";
import { DynamicSeriesIndex } from "@/app/_components/dynamic-series-index";
import { SeriesSidebar } from "@/app/_components/series-sidebar";
import Avatar from "@/app/_components/avatar"; // Se tiver avatar, fica ótimo adicionar

export const dynamicParams = true;
export const revalidate = 60;

export default async function Post(props: Params) {
  const params = await props.params;
  const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug;
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  // --- Lógica de Série (Mantida) ---
  const series = await getAllSeries();
  const seriesSlug = post.series || post.slug.split("/")[0];
  const seriesData = series.find((s) => s.slugPrefix === seriesSlug);

  // --- Lógica de Índice (Mantida) ---
  const isIndexPage = post.slug.includes("-00-indice") || post.slug.includes("indice");
  if (isIndexPage) {
     return (
        <main>
          <Container>
             <Header />
             <article className="mb-32 mt-10 max-w-4xl mx-auto">
               <DynamicSeriesIndex
                  seriesSlug={seriesSlug}
                  seriesTitle={seriesData?.title || "Série"}
                  seriesDescription={seriesData?.description || ""}
               />
             </article>
          </Container>
        </main>
     )
  }

  const content = await markdownToHtml(post.content || "");
  const navigation = await getChapterNavigation(slug);

  return (
    <main>
      <Container>
        <Header />
        
        <article className="mb-32">
          {/* --- NOVO HERO SECTION: Estilo Magazine Split --- */}
          {/* Fundo sutil para destacar o header do resto do conteúdo */}
          <div className="border-b border-stone-100 dark:border-stone-800 bg-gradient-to-b from-transparent to-stone-50/50 dark:to-stone-900/50 pb-12 mb-12">
            <div className="max-w-screen-xl mx-auto px-5 pt-8 md:pt-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                
                {/* Lado Esquerdo: Título e Meta-dados (Colunas 1-7) */}
                <div className="lg:col-span-7 order-2 lg:order-1">
                  <div className="flex items-center gap-4 text-sm font-bold text-blue-600 dark:text-blue-400 mb-6 uppercase tracking-wider">
                    <span className="bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                       {seriesData?.title || "Artigo"}
                    </span>
                    <span className="text-stone-400">•</span>
                    <DateFormatter dateString={post.date} />
                    <span className="text-stone-400">•</span>
                    <span>{post.minRead || "5 min"} de leitura</span>
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight mb-6 text-stone-900 dark:text-stone-100">
                    {post.title}
                  </h1>

                  <div className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed mb-6 max-w-2xl">
                    {post.excerpt}
                  </div>

                  {/* Opcional: Autor */}
                  <div className="flex items-center gap-4">
                     <Avatar name={post.author.name} picture={post.author.picture} />
                  </div>
                </div>

                {/* Lado Direito: Imagem Compacta (Colunas 8-12) */}
                <div className="lg:col-span-5 order-1 lg:order-2">
                  <div className="relative shadow-2xl rounded-2xl overflow-hidden transform rotate-2 hover:rotate-0 transition-all duration-500 border border-stone-200 dark:border-stone-700">
                     {/* Forçamos um Aspect Ratio mais quadrado para caber melhor ao lado do texto */}
                     <div className="aspect-[4/3] relative">
                        <CoverImage title={post.title} src={post.coverImage} slug={post.slug} />
                     </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* --- GRID PRINCIPAL (Igual ao anterior) --- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-screen-xl mx-auto px-5">
            
            {/* SIDEBAR (Sticky) */}
            <SeriesSidebar 
              currentSlug={slug} 
              seriesSlug={seriesSlug} 
              postTitle={post.title} 
            />

            {/* CONTEÚDO */}
            <div className="lg:col-span-8 lg:col-start-5">
              <div 
                className="
                  prose prose-lg md:prose-xl prose-stone dark:prose-invert max-w-none
                  prose-h1:hidden 
                  prose-img:rounded-xl prose-img:shadow-lg
                  prose-a:text-blue-600 dark:prose-a:text-blue-400
                "
                dangerouslySetInnerHTML={{ __html: content }}
              />

              <div className="mt-16 pt-8 border-t border-stone-200 dark:border-stone-800">
                {navigation && (
                  <ChapterNavigation
                    seriesIndexSlug={navigation.seriesIndexSlug}
                    previousChapter={navigation.previousChapter}
                    nextChapter={navigation.nextChapter}
                  />
                )}
              </div>
            </div>

          </div>
        </article>
      </Container>
    </main>
  );
}

type Params = {
  params: Promise<{
    slug: string[];
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const slug = params.slug.join('/');
  const post = await getPostBySlug(slug);
  if (!post) return notFound();
  return { title: post.title, description: post.excerpt };
}