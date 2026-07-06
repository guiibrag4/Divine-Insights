import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// 1. Interface Canônica baseada no 05-CONTENT_MODEL.md
export interface Study {
  title: string;
  description: string;
  slug: string;
  series: string;
  category: string;
  content: string;
  cover: string;
  order: number;
  tags: string[];
  author: string;
  status: 'draft' | 'review' | 'published' | 'archived';
  references?: string[];
  date: string;
  updated?: string;
  readingTime?: string;
  draft: boolean;
}

// 2. Diretório raiz do conhecimento (agora é 'content' e não '_posts')
const contentDirectory = path.join(process.cwd(), 'content');

// 3. Função recursiva para encontrar todos os .md dentro das subpastas
function getMarkdownFiles(dir: string, fileList: string[] = []): string[] {
  if (!fs.existsSync(dir)) return fileList;
  
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getMarkdownFiles(filePath, fileList);
    } else if (filePath.endsWith('.md')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

// 4. O Motor de Busca
export function getAllStudies(): Study[] {
  const mdFiles = getMarkdownFiles(contentDirectory);
  
  const studies = mdFiles.map((filePath) => {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Mapeia o frontmatter do Markdown para a tipagem rigorosa do TypeScript
    return {
      title: data.title || 'Sem Título',
      description: data.description || '',
      slug: data.slug || path.basename(filePath, '.md'),
      series: data.series || '',
      category: data.category || '',
      cover: data.cover || '',
      order: data.order || 0,
      tags: data.tags || [],
      author: data.author || 'Guilherme Braga',
      status: data.status || 'draft',
      date: data.date || new Date().toISOString(),
      updated: data.updated,
      draft: typeof data.draft !== 'undefined' ? data.draft : true,
      content: content,
    } as Study; 
  });

  return studies;
}

// 5. Filtros e Ordenações Seguras
export function getPublishedStudies(): Study[] {
  return getAllStudies()
    .filter((study) => study.status === 'published' && study.draft === false)
    .sort((a, b) => (new Date(b.date).getTime() > new Date(a.date).getTime() ? -1 : 1));
}

export function getStudyBySlug(slug: string): Study | null {
  const studies = getAllStudies();
  const study = studies.find((s) => s.slug === slug);
  return study || null;
}

export function getStudiesBySeries(seriesId: string): Study[] {
  return getPublishedStudies()
    .filter((study) => study.series === seriesId)
    .sort((a, b) => a.order - b.order); // Respeita a ordem dos capítulos!
}