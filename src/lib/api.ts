import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { buildPostHref, parsePostSlug, normalizeSlug } from "./slug";
import { FrontmatterSchema } from "./validation";

const postsDirectory = path.join(process.cwd(), "_posts");
const publicDirectory = path.join(process.cwd(), "public");

function ensureAssetExists(assetPath: string, label: string) {
  if (assetPath.startsWith("http")) return assetPath; // permite URLs absolutas externas
  const normalized = assetPath.startsWith("/") ? assetPath : `/${assetPath}`;
  const full = path.join(publicDirectory, normalized);
  if (!fs.existsSync(full)) {
    throw new Error(`Asset ausente (${label}): ${normalized}`);
  }
  return normalized;
}

/**
 * Função recursiva para pegar todos os arquivos .md dentro de pastas e subpastas
 */
function getAllFiles(dirPath: string, arrayOfFiles: string[] = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith(".md")) {
        // Guarda o caminho relativo (ex: '1joao/1joao-01.md')
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
}

export function getPostSlugs() {
  const filePaths = getAllFiles(postsDirectory);
  // Retorna apenas a parte relativa do caminho, removendo o diretório base _posts
  return filePaths.map((filePath) => path.relative(postsDirectory, filePath));
}

export function getPostBySlug(slug: string) {
  const realSlug = normalizeSlug(slug.replace(/\.md$/, ""));
  // Aqui está o segredo: ele junta o diretório base com o slug completo (que agora inclui a pasta)
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
      coverImage,
      author: {
        ...frontmatter.author,
        picture: authorPicture,
      },
      ogImage: ogImageUrl ? { url: ogImageUrl } : frontmatter.ogImage,
    } as any;
  } catch (err) {
    return null; // Retorna null se não achar (evita quebrar o site inteiro)
  }
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post) => post !== null) // Remove posts que deram erro
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}