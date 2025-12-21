# TEMPLATE - Copie este formato para seus arquivos de Tiago

## Nome do arquivo:
`tiago-00-indice.md` (para índice)
`tiago-01-capitulo-1.md` (para capítulos)
`tiago-02-capitulo-2.md`
etc...

## Frontmatter (OBRIGATÓRIO - copie exatamente assim):

```
---
title: "Tiago | Capítulo 1: A Fé Prática"
excerpt: "Explorar como a fé se manifesta nas ações práticas"
date: "2025-12-21"
author:
  name: "Guilherme Braga"
  picture: "/assets/blog/authors/jj.jpeg"
coverImage: "/assets/blog/estudos/tiago-01-cover.png"
ogImage:
  url: "/assets/blog/estudos/tiago-01-cover.png"
---
```

## Campos OBRIGATÓRIOS:
- **title**: Título do capítulo/índice
- **excerpt**: Descrição curta (aparece em cards)
- **date**: Data em YYYY-MM-DD
- **author.name**: Seu nome
- **author.picture**: Caminho da foto em /public/assets/blog/authors/
- **coverImage**: Caminho da capa em /public/assets/blog/estudos/
- **ogImage.url**: URL para redes sociais

## Estrutura completa de arquivo:

```markdown
---
title: "Tiago | Capítulo 1: Fé e Obras"
excerpt: "Como a fé verdadeira se manifesta através das obras"
date: "2025-12-21"
author:
  name: "Guilherme Braga"
  picture: "/assets/blog/authors/jj.jpeg"
coverImage: "/assets/blog/estudos/tiago-01-cover.png"
ogImage:
  url: "/assets/blog/estudos/tiago-01-cover.png"
---

# Tiago 1: Fé e Obras

## Introdução

Seu conteúdo aqui em Markdown...

## Seção 1

Mais conteúdo...

### Subsseção

Mais detalhes...

## Conclusão

Resumo final...
```

## Imagens necessárias:
- Copie suas capas para: `/public/assets/blog/estudos/tiago-01-cover.png`
- Copie para: `/public/assets/blog/estudos/tiago-02-cover.png`
- etc...

## Após colocar os arquivos:
1. Rodar: `npm run build`
2. Se passar ✅: `npm run dev`
3. Acessar: http://localhost:3000

---

**Padrão de nome de arquivo**: `{serie}-{numero:00-99}-{descricao}.md`

Exemplo válido:
- `tiago-00-indice.md` ✅
- `tiago-01-capitulo-1.md` ✅
- `tiago-02-fe-e-obras.md` ✅

Exemplo INVÁLIDO:
- `tiago-capitulo-1.md` ❌ (sem número)
- `tiago-1-capitulo.md` ❌ (número não é zero-padded)
