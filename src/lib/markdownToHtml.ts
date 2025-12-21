import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm"; // Importação obrigatória

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(remarkGfm) // Uso obrigatório
    .use(html)
    .process(markdown);
  return result.toString();
}