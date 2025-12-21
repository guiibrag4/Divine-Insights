import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import { getChapterNavigation } from "@/lib/navigation";
import { getAllSeries } from "@/lib/series";
import markdownToHtml from "@/lib/markdownToHtml";
import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import DateFormatter from "@/app/_components/date-formatter";
import CoverImage from "@/app/_components/cover-image";
import { ChapterNavigation } from "@/app/_components/chapter-navigation";
import { DynamicSeriesIndex } from "@/app/_components/dynamic-series-index";

// Disable static generation, use dynamic rendering instead
export const dynamicParams = true;
export const revalidate = 60; // Revalidar a cada 60 segundos

export default async function Post(props: Params) {
  const params = await props.params;
  // Convert array to string slug (e.g., ['1joao', '1joao-02-capitulo-2'] => '1joao/1joao-02-capitulo-2')
  const slug = Array.isArray(params.slug) ? params.slug.join('/') : params.slug;
  const post = await getPostBySlug(slug);

  if (!post) {
    return notFound();
  }

  // Detectar se é uma página índice
  const isIndexPage = post.slug.includes("-00-indice") || post.slug.includes("indice");
  
  if (isIndexPage) {
    // Buscar dados da série para o índice dinâmico
    const series = await getAllSeries();
    const seriesSlug = post.series || post.slug.split("/")[0];
    const seriesData = series.find((s) => s.slugPrefix === seriesSlug);

    return (
      <main>
        <Container>
          <Header />
          <article className="mb-32 mt-10">
            <div className="mb-12 md:mb-16 max-w-6xl mx-auto px-5 md:px-8">
              <div className="rounded-xl overflow-hidden shadow-lg">
                <CoverImage title={post.title} src={post.coverImage} slug={post.slug} />
              </div>
            </div>
            
            <div className="max-w-4xl mx-auto px-5 md:px-8">
              <DynamicSeriesIndex
                seriesSlug={seriesSlug}
                seriesTitle={seriesData?.title || post.title.split("|")[0]?.trim() || "Série"}
                seriesDescription={seriesData?.description || post.excerpt}
              />
            </div>
          </article>
        </Container>
      </main>
    );
  }

  const content = await markdownToHtml(post.content || "");
  const navigation = await getChapterNavigation(slug);

  return (
    <main>
      <Container>
        <Header />
        <article className="mb-32">
          
          {/* 1. Cabeçalho do Post */}
          <div className="max-w-5xl mx-auto px-5 mb-10 text-center mt-10">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight md:leading-none mb-4 text-stone-900 dark:text-stone-100">
              {post.title}
            </h1>
            <div className="text-stone-500 dark:text-stone-500 italic">
              <DateFormatter dateString={post.date} />
            </div>
          </div>

          {/* 2. Imagem de Capa - Centralizada e com padding consistente */}
          <div className="mb-12 md:mb-16 max-w-6xl mx-auto px-5 md:px-8">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <CoverImage title={post.title} src={post.coverImage} slug={post.slug} />
            </div>
          </div>

          {/* 3. Conteúdo do Texto - Tipografia Otimizada */}
          <div className="max-w-4xl mx-auto px-5 md:px-8">
            <div 
              className="
                prose prose-xl prose-stone dark:prose-invert max-w-none
                
                /* Parágrafos - Alinhamento à esquerda com espaçamento generoso */
                prose-p:text-left prose-p:leading-relaxed prose-p:mb-6 prose-p:text-stone-700 dark:prose-p:text-stone-300
                
                /* Headings - Hierarquia visual clara */
                prose-headings:text-left prose-headings:font-bold prose-headings:tracking-tight
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-stone-900 dark:prose-h2:text-stone-100
                prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-stone-800 dark:prose-h3:text-stone-100
                prose-h4:text-xl prose-h4:mt-8 prose-h4:mb-3 prose-h4:text-stone-700 dark:prose-h4:text-stone-200
                
                /* Links - Destaque com hover suave */
                prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
                
                /* Strong/Bold - Contraste forte */
                prose-strong:text-stone-900 dark:prose-strong:text-stone-100 prose-strong:font-bold
                
                /* Listas - Espaçamento e marcadores */
                prose-ul:my-6 prose-li:my-2 prose-li:text-stone-700 dark:prose-li:text-stone-300
                
                /* Imagens - Arredondadas com sombra */
                prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
                
                /* Tabelas - Bem definidas e legíveis */
                prose-table:border-2 prose-table:border-stone-300 dark:prose-table:border-slate-600 prose-table:my-8
                prose-thead:bg-stone-100 dark:prose-thead:bg-slate-700
                prose-th:p-4 prose-th:text-left prose-th:font-bold prose-th:text-stone-900 dark:prose-th:text-stone-100
                prose-td:p-4 prose-td:border-t prose-td:border-stone-200 dark:prose-td:border-slate-600
                prose-td:text-stone-700 dark:prose-td:text-stone-300
                
                /* Blockquotes - Destaque visual para citações bíblicas */
                prose-blockquote:border-l-4 prose-blockquote:border-l-blue-600 dark:prose-blockquote:border-l-blue-400
                prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-slate-800
                prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:my-8
                prose-blockquote:not-italic prose-blockquote:text-stone-800 dark:prose-blockquote:text-stone-200
                prose-blockquote:shadow-sm
                
                /* Code - Inline e blocos */
                prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-code:bg-stone-100 dark:prose-code:bg-slate-800
                prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                prose-pre:bg-stone-900 dark:prose-pre:bg-slate-900 prose-pre:text-stone-100 prose-pre:rounded-lg
              "
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* 4. Navegação do Rodapé */}
            {navigation && (
              <ChapterNavigation
                seriesIndexSlug={navigation.seriesIndexSlug}
                previousChapter={navigation.previousChapter}
                nextChapter={navigation.nextChapter}
              />
            )}
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

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Divine Insights`;

  return {
    title,
    description: post.excerpt,
    openGraph: {
      title,
      description: post.excerpt,
      images: [post.ogImage.url],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug.split('/'),
  }));
}
