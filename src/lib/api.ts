import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { buildPostHref, parsePostSlug, normalizeSlug } from "./slug";
import { FrontmatterSchema } from "./validation";
import { type Post } from "@/interfaces/post";
import { type DbPost } from "@/interfaces/db";
import { getSupabaseAnonClient } from "./supabase";

const postsDirectory = path.join(process.cwd(), "_posts");
const publicDirectory = path.join(process.cwd(), "public");
const isSupabaseConfigured = Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY);

function ensureAssetExists(assetPath: string, label: string) {
  if (assetPath.startsWith("http")) return assetPath; 
  const normalized = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;
  const full = path.join(publicDirectory, normalized);
  if (!fs.existsSync(full)) {
    // throw new Error(`Asset ausente (${label}): ${normalized}`);
    console.warn(`Asset ausente (${label}): ${normalized}`); // Alterado para warn para evitar crash em dev
  }
  return normalized;
}

// Função auxiliar para calcular tempo de leitura
function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min`;
}

function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith(".md")) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
}

function mapDbPostToPost(dbPost: DbPost): Post {
  const slug = `${dbPost.series_slug}/${dbPost.slug}`;
  const { series } = parsePostSlug(slug);

  return {
    slug,
    href: buildPostHref(slug),
    fileName: dbPost.slug,
    series,
    title: dbPost.title,
    date: dbPost.date,
    coverImage: dbPost.cover_image,
    author: {
      name: dbPost.author_name,
      picture: dbPost.author_picture,
    },
    excerpt: dbPost.excerpt,
    ogImage: {
      url: dbPost.og_image,
    },
    content: dbPost.content,
    minRead: calculateReadingTime(dbPost.content), // Calculado aqui
  };
}

// ------------------------------
// Supabase (fonte principal)
// ------------------------------

async function getAllPostsFromSupabase(): Promise<Post[]> {
  const supabase = getSupabaseAnonClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("date", { ascending: false });

  if (error) {
    console.error("Erro ao buscar posts no Supabase", error);
    throw error;
  }

  return (data || []).map(mapDbPostToPost);
}

async function getPostBySlugFromSupabase(slug: string): Promise<Post | null> {
  const normalized = normalizeSlug(slug.replace(/\.md$/, ""));
  const [seriesSlug, postSlug] = normalized.split("/");
  if (!seriesSlug || !postSlug) return null;

  const supabase = getSupabaseAnonClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .eq("series_slug", seriesSlug)
    .eq("slug", postSlug)
    .maybeSingle();

  if (error) {
    console.error("Erro ao buscar post no Supabase", error);
    return null;
  }

  return data ? mapDbPostToPost(data) : null;
}

async function getPostSlugsFromSupabase(): Promise<string[]> {
  const supabase = getSupabaseAnonClient();
  const { data, error } = await supabase.from("posts").select("series_slug, slug");

  if (error) {
    console.error("Erro ao listar slugs no Supabase", error);
    throw error;
  }

  return (data || []).map((row) => `${row.series_slug}/${row.slug}`);
}

// ------------------------------
// Filesystem (fallback local)
// ------------------------------

function getPostSlugsFromFs() {
  const filePaths = getAllFiles(postsDirectory);
  return filePaths.map((filePath) => path.relative(postsDirectory, filePath));
}

function getPostBySlugFromFs(slug: string): Post | null {
  const realSlug = normalizeSlug(slug.replace(/\.md$/, ""));
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  
  try {
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const frontmatter = FrontmatterSchema.parse(data);
    const { fileName, series } = parsePostSlug(realSlug);
    const coverImage = ensureAssetExists(frontmatter.coverImage, "coverImage");
    const authorPicture = ensureAssetExists(frontmatter.author.picture, "author.picture");
    const ogImageUrl = frontmatter.ogImage?.url
      ? ensureAssetExists(frontmatter.ogImage.url, "ogImage.url")
      : undefined;
    
    return {
      ...frontmatter,
      slug: realSlug,
      href: buildPostHref(realSlug),
      fileName,
      series,
      content,
      minRead: calculateReadingTime(content), // Calculado aqui também
      coverImage,
      author: {
        ...frontmatter.author,
        picture: authorPicture,
      },
      ogImage: ogImageUrl ? { url: ogImageUrl } : (frontmatter.ogImage as any),
    } as Post;
  } catch (err) {
    return null; 
  }
}

function getAllPostsFromFs(): Post[] {
  const slugs = getPostSlugsFromFs();
  const posts = slugs
    .map((slug) => getPostBySlugFromFs(slug))
    .filter((post): post is Post => post !== null)
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

// ------------------------------
// APIs públicas
// ------------------------------

export async function getPostSlugs(): Promise<string[]> {
  if (isSupabaseConfigured) {
    return getPostSlugsFromSupabase();
  }
  return getPostSlugsFromFs();
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (isSupabaseConfigured) {
    return getPostBySlugFromSupabase(slug);
  }
  return getPostBySlugFromFs(slug);
}

export async function getAllPosts(): Promise<Post[]> {
  if (isSupabaseConfigured) {
    return getAllPostsFromSupabase();
  }
  return getAllPostsFromFs();
}