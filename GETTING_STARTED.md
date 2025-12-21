# 👋 Bem-vindo ao Divine Insights - Quick Start Guide

Você foi designado para trabalhar com **Divine Insights**. Este guia rápido coloca você a velocidade em 5 minutos.

## ⚡ TL;DR (Resumo Executivo)

```bash
# 1. Clonar e instalar
git clone <repo>
cd divine-insights
npm install

# 2. Rodar em desenvolvimento
npm run dev:clean  # Se estiver "travado"
npm run dev        # Iniciar

# 3. Abrir browser
http://localhost:3000
```

**Stack**: Next.js 16 + TypeScript + Tailwind CSS + Markdown CMS

---

## 📁 Estrutura em 60 Segundos

```
divine-insights/
├── _posts/              ← Conteúdo (Markdown + YAML frontmatter)
│   └── 1joao/           ← Série "1 João"
│       ├── 1joao-00-indice.md
│       ├── 1joao-01-capitulo-1.md
│       └── 1joao-02-capitulo-2.md
├── public/              ← Imagens estáticas
│   └── assets/blog/
│       ├── authors/     ← Fotos de autores
│       ├── estudos/     ← Capas de série
│       └── capas/       ← Preview images
├── src/
│   ├── app/             ← Next.js App Router
│   │   ├── page.tsx     ← Homepage
│   │   ├── layout.tsx   ← Root layout
│   │   ├── posts/[...slug]/page.tsx  ← Dynamic post pages
│   │   └── _components/ ← Componentes reutilizáveis
│   ├── lib/             ← Utilitários & lógica
│   │   ├── api.ts       ← Carregamento de posts
│   │   ├── slug.ts      ← URL normalizadas ⭐
│   │   ├── validation.ts← Validação Zod
│   │   ├── navigation.ts← Prev/next chapters
│   │   └── theme-constants.ts ← Design tokens ⭐
│   └── interfaces/      ← TypeScript types
├── docs/                ← Documentação
│   ├── copilot-instructions.md  ← Leia isto primeiro!
│   ├── IMPLEMENTATION_SUMMARY.md
│   ├── VISUAL_IMPROVEMENTS.md
│   └── COMPLETION_CHECKLIST.md
├── tailwind.config.ts   ← Design tokens (colors, shadows, fonts)
├── next.config.js       ← Next.js config
├── tsconfig.json        ← TypeScript config
└── package.json         ← Dependências & scripts
```

---

## 🎯 Tarefa Comum: Adicionar Novo Capítulo

### Passo 1: Criar Arquivo Markdown
```bash
# Exemplo: Criar capítulo 3 de 1 João
# Arquivo: _posts/1joao/1joao-03-capitulo-3.md

---
title: "Capítulo 3 - A Vitória Sobre o Mundo"
excerpt: "Explorar como vencer o mundo através da fé em Jesus"
date: "2025-01-20"
author:
  name: "Guilherme Braga"
  picture: "/assets/blog/authors/jj.jpeg"
coverImage: "/assets/blog/estudos/1joao-03-cover.png"
ogImage:
  url: "/assets/blog/estudos/1joao-03-cover.png"
---

## Introdução

Seu conteúdo em Markdown aqui...

### Subseção

Mais conteúdo...
```

**Campos Obrigatórios**:
- `title` - Título do capítulo
- `excerpt` - Descrição curta (para cards)
- `date` - Data (ISO format: YYYY-MM-DD)
- `author` - Nome + foto
- `coverImage` - Caminho da imagem em `/public/`
- `ogImage` - Para redes sociais

### Passo 2: Adicionar Imagens
```bash
# Copiar imagem para:
cp minha-cover.png public/assets/blog/estudos/1joao-03-cover.png
```

### Passo 3: Testar
```bash
npm run build    # Valida frontmatter + imagens
npm run dev      # Vê no browser
```

**O que acontece automaticamente**:
1. ✅ Frontmatter validado (Zod)
2. ✅ Imagens verificadas (existem em `/public/`?)
3. ✅ Rota `/posts/1joao/1joao-03-capitulo-3` criada
4. ✅ Prev/next links atualizados
5. ✅ Series grid na homepage atualizado

---

## 🎨 Design Tokens - Usar Cores

**Não faça isso**:
```html
<!-- ❌ Hard-coded colors -->
<div className="bg-blue-500 text-gray-800">
```

**Faça isso**:
```html
<!-- ✅ Design tokens -->
<div className="bg-accent-blue-600 dark:bg-accent-blue-700 
                text-neutral-900 dark:text-neutral-50">
```

**Tokens Disponíveis**:
```typescript
// Importar se necessário
import { THEME_DEFAULT, COLORS } from "@/lib/theme-constants";

// Colors
neutral-50 → neutral-900    (fundo light → fundo dark)
accent-blue-50 → accent-blue-900
accent-purple-50 → accent-purple-900

// Shadows
shadow-sm, shadow-md, shadow-lg, shadow-xl, shadow-2xl

// Gradients
from-accent-blue-600 to-accent-purple-600  (divine)
from-gradient-cream  (subtle)
```

---

## 🔗 URLs - Usar buildPostHref

**Não faça isso**:
```tsx
<!-- ❌ URL hard-coded -->
<Link href={`/posts/${post.slug}`}>
```

**Faça isso**:
```tsx
<!-- ✅ URL normalizada -->
import { buildPostHref } from "@/lib/slug";

<Link href={buildPostHref(post.slug)}>
```

**Por quê?** `buildPostHref()` é o "single source of truth" para URLs. Se a estrutura mudar, você muda em um lugar.

---

## 🌓 Dark Mode - Sempre Testar

Toda cor deve ter variant `dark:`:

```html
<!-- ✅ Light mode + Dark mode -->
<button className="bg-neutral-100 dark:bg-neutral-800 
                   text-neutral-900 dark:text-neutral-50">
  Click me
</button>
```

**Testar**:
1. Abrir DevTools (F12)
2. Command palette (Ctrl+Shift+P)
3. "Toggle dark mode"
4. Verificar se cores fazem sentido em ambos modos

---

## 🐛 Troubleshooting

### Dev server não inicia / "preso" em loading infinito
```bash
npm run dev:clean
```
Isso mata processos node antigos e limpa cache.

### Build falha com erro de frontmatter
```
Error: Missing required field "title"
```
**Solução**: Verificar arquivo markdown, garantir que tem todos os campos obrigatórios.

### Build falha: "Asset not found"
```
Error: Image not found at /assets/blog/estudos/...
```
**Solução**: Copiar imagem para `/public/` com o caminho correto.

### PowerShell: "execution policy error"
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
npm run dev
```

### Componente não usando tokens
```bash
# Search por cores hard-coded
grep -r "bg-blue-500\|text-gray" src/
```

---

## 📚 Documentação Completa

Leia estes em ordem:

1. **`.github/copilot-instructions.md`** ← Comece aqui!
   - Visão geral da arquitetura
   - Padrões de código
   - Como estender

2. **`docs/design-tokens-implementation.md`**
   - Sistema de cores
   - Como customizar

3. **`docs/IMPLEMENTATION_SUMMARY.md`**
   - Timeline do projeto
   - Decisões arquiteturais

4. **`docs/VISUAL_IMPROVEMENTS.md`**
   - Antes/depois visual
   - Justificativas de design

5. **`docs/COMPLETION_CHECKLIST.md`**
   - Full checklist
   - Sign-off

---

## ✨ Comandos Úteis

```bash
# Desenvolvimento
npm run dev         # Inicia dev server
npm run dev:clean   # Inicia com limpeza de cache

# Build
npm run build       # Build production
npm run start       # Roda build anterior

# Útil
npm run lint        # Se existir linter
```

---

## 🎯 Sua Primeira Tarefa

1. [ ] Clonar repo
2. [ ] Rodar `npm install`
3. [ ] Rodar `npm run dev`
4. [ ] Abrir http://localhost:3000
5. [ ] Clicar em "Começar a Ler" (CTA)
6. [ ] Navegar para próximo capítulo (seta >)
7. [ ] Testar dark mode (toggle 🌙)
8. [ ] Ler `.github/copilot-instructions.md`

---

## ❓ FAQ Rápido

**P: Onde adiciono um novo autor?**
A: Foto em `/public/assets/blog/authors/`, referência no frontmatter.

**P: Posso mudar a cor do botão?**
A: Sim! Atualize `accent-blue-600` em `src/lib/theme-constants.ts` ou altere o className.

**P: Como adicionar nova série (ex: Mateus)?**
A: 
1. Criar pasta `_posts/mateus/`
2. Criar `mateus-00-indice.md` e capítulos
3. Adicionar série em `src/app/page.tsx` array `studySeries`

**P: Preciso customizar layout?**
A: Componentes em `src/app/_components/`. Server Components por padrão, apenas `theme-switcher.tsx` é `use client`.

**P: Build está lento?**
A: Normal (~4-5s com Turbopack). Se > 10s, rodar `npm run build` novamente.

---

## 🚀 Próximos Passos After You're Comfortable

1. **Adicionar próxima série** (Mateus, Tiago, etc)
2. **Customizar cores** (ajustar `theme-constants.ts`)
3. **Deploy para produção** (Vercel automático via GitHub)
4. **Monitorar analytics** (Vercel Web Analytics)

---

## 📞 Contato / Dúvidas

Documentação completa: `.github/copilot-instructions.md`  
Exemplos visuais: `docs/VISUAL_IMPROVEMENTS.md`  
Checklist detalhado: `docs/COMPLETION_CHECKLIST.md`

---

**Bem-vindo ao Divine Insights! 🙏**

Qualquer dúvida, consulte a documentação ou a estrutura do código. Tudo está bem documentado e o design é escalável.

**Build status**: ✅ PASSING  
**Test status**: ✅ MANUAL VERIFIED  
**Deployment ready**: ✅ YES

**Última atualização**: 15 de Janeiro de 2025
