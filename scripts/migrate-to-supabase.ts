/**
 * Script de Migração: _posts → Supabase
 * 
 * Este script lê todos os arquivos markdown de _posts/
 * e os insere no Supabase (tabelas series e posts)
 * 
 * Como usar:
 * 1. Certifique-se que SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY estão em .env.local
 * 2. Execute: npx tsx scripts/migrate-to-supabase.ts
 */

import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

// Carregar variáveis de ambiente
config({ path: ".env.local" });

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("❌ Erro: SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não encontrado em .env.local");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
const postsDirectory = path.join(process.cwd(), "_posts");

interface PostData {
  seriesSlug: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  ogImage: string;
  date: string;
  authorName: string;
  authorPicture: string;
}

interface SeriesData {
  slugPrefix: string;
  title: string;
  description: string;
  coverImage: string;
  status: "em-andamento" | "completo" | "rascunho";
  chaptersCount: number;
}

function getAllMarkdownFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllMarkdownFiles(fullPath, arrayOfFiles);
    } else if (file.endsWith(".md") && !file.includes("TEMPLATE")) {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

function parseMarkdownFile(filePath: string): PostData | null {
  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    // Extrair series slug e post slug do caminho
    const relativePath = path.relative(postsDirectory, filePath);
    const parts = relativePath.split(path.sep);
    const seriesSlug = parts[0]; // ex: "1joao" ou "tiago"
    const fileName = parts[parts.length - 1].replace(".md", ""); // ex: "1joao-01-capitulo-1"

    return {
      seriesSlug,
      slug: fileName,
      title: data.title || "",
      excerpt: data.excerpt || "",
      content: content || "",
      coverImage: data.coverImage || "",
      ogImage: data.ogImage?.url || data.coverImage || "",
      date: data.date || new Date().toISOString().split("T")[0],
      authorName: data.author?.name || "Autor Desconhecido",
      authorPicture: data.author?.picture || "/assets/blog/authors/default.jpeg",
    };
  } catch (err) {
    console.error(`⚠️ Erro ao processar ${filePath}:`, err);
    return null;
  }
}

function inferSeriesFromPosts(posts: PostData[]): Map<string, SeriesData> {
  const seriesMap = new Map<string, SeriesData>();

  posts.forEach((post) => {
    if (post.slug.includes("-00-indice") || post.slug.includes("indice")) {
      // Este é um arquivo índice - usar para dados da série
      const existing = seriesMap.get(post.seriesSlug);
      seriesMap.set(post.seriesSlug, {
        slugPrefix: post.seriesSlug,
        title: existing?.title || post.title.split("|")[0]?.trim() || post.seriesSlug,
        description: post.excerpt || "Estudo bíblico completo",
        coverImage: post.coverImage,
        status: "completo",
        chaptersCount: existing?.chaptersCount || 0,
      });
    } else {
      // Capítulo regular - incrementar contador
      const existing = seriesMap.get(post.seriesSlug);
      if (existing) {
        existing.chaptersCount += 1;
      } else {
        seriesMap.set(post.seriesSlug, {
          slugPrefix: post.seriesSlug,
          title: post.seriesSlug.charAt(0).toUpperCase() + post.seriesSlug.slice(1),
          description: `Estudos de ${post.seriesSlug}`,
          coverImage: post.coverImage,
          status: "em-andamento",
          chaptersCount: 1,
        });
      }
    }
  });

  return seriesMap;
}

async function migrateSeries(seriesData: SeriesData): Promise<void> {
  const indexSlug = `${seriesData.slugPrefix}/${seriesData.slugPrefix}-00-indice`;
  
  console.log(`📦 Migrando série: ${seriesData.title}`);

  const { error } = await supabase.from("series").upsert({
    slug: indexSlug,
    slug_prefix: seriesData.slugPrefix,
    index_slug: indexSlug,
    title: seriesData.title,
    description: seriesData.description,
    cover_image: seriesData.coverImage,
    status: seriesData.status,
    chapters_count: seriesData.chaptersCount,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    console.error(`❌ Erro ao migrar série ${seriesData.title}:`, error);
    throw error;
  }

  console.log(`✅ Série migrada: ${seriesData.title}`);
}

async function migratePost(post: PostData): Promise<void> {
  console.log(`   📄 Migrando post: ${post.slug}`);

  const { error } = await supabase.from("posts").upsert({
    series_slug: post.seriesSlug,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    cover_image: post.coverImage,
    og_image: post.ogImage,
    date: post.date,
    author_name: post.authorName,
    author_picture: post.authorPicture,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    console.error(`❌ Erro ao migrar post ${post.slug}:`, error);
    throw error;
  }

  console.log(`   ✅ Post migrado: ${post.slug}`);
}

async function main() {
  console.log("🚀 Iniciando migração de _posts para Supabase...\n");

  // 1. Buscar todos os arquivos markdown
  console.log("📂 Lendo arquivos de _posts/...");
  const markdownFiles = getAllMarkdownFiles(postsDirectory);
  console.log(`   Encontrados ${markdownFiles.length} arquivos markdown\n`);

  // 2. Parsear todos os posts
  console.log("📖 Parseando posts...");
  const posts = markdownFiles
    .map(parseMarkdownFile)
    .filter((post): post is PostData => post !== null);
  console.log(`   ${posts.length} posts válidos parseados\n`);

  // 3. Inferir dados das séries
  console.log("🔍 Identificando séries...");
  const seriesMap = inferSeriesFromPosts(posts);
  console.log(`   ${seriesMap.size} séries identificadas\n`);

  // 4. Migrar séries primeiro
  console.log("📦 Migrando séries para Supabase...");
  for (const [, seriesData] of seriesMap) {
    await migrateSeries(seriesData);
  }
  console.log();

  // 5. Migrar posts
  console.log("📄 Migrando posts para Supabase...");
  for (const post of posts) {
    await migratePost(post);
  }
  console.log();

  // 6. Resumo final
  console.log("✅ Migração concluída com sucesso!");
  console.log(`   ${seriesMap.size} séries migradas`);
  console.log(`   ${posts.length} posts migrados`);
  console.log("\n🎉 Tudo pronto! Verifique no dashboard do Supabase.");
}

main().catch((err) => {
  console.error("❌ Erro fatal durante migração:", err);
  process.exit(1);
});
