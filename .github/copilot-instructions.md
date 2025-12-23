# Divine Insights - Copilot Instructions

**Last Updated**: January 15, 2025 | **Version**: 2.0 (Post Design-Tokens Implementation)

## Project Overview
Static-first blog for biblical studies built with **Next.js 16 (Turbopack)** + TypeScript + Tailwind CSS v3.4.4. Content source is **Supabase (if configured)** with filesystem `_posts/` fallback. Intelligent multi-series navigation, professional design tokens, and full light/dark mode. Deploy target is Vercel using **ISR**.

## Architecture

## Architecture

### Content Flow (File-based CMS)
1. **Source**: Markdown in `/_posts/{series}/` with required frontmatter: `title`, `excerpt`, `date`, `author`, `coverImage`
2. **Reading**: `src/lib/api.ts` recursively scans `_posts/`, parses YAML frontmatter via `gray-matter`, returns fully-typed `Post` objects
3. **Processing**: `markdownToHtml()` converts markdown → HTML using `remark` + `remark-gfm` (enables GFM: tables, strikethrough, tasklists)
4. **Rendering**: All `src/app/_components/` are Server Components by default; posts hydrate via `getAllPosts()` and `getPostBySlug(slug)`

**Why this matters**: The `gray-matter` parsing extracts frontmatter from markdown file **content** field - don't modify post object shape without updating all usages.

### Routing & Rendering
- `/` → `src/app/page.tsx` - Homepage lists series via `getAllSeries()` (Supabase if `SUPABASE_*` present, else fallback static list)
- `/posts/[...slug]` → `src/app/posts/[...slug]/page.tsx` - Handles nested paths like `posts/1joao/1joao-01-capitulo-1`
- ISR: `revalidate = 60` and `dynamicParams = true` for posts; on-demand regeneration after admin updates
- Slugs are **relative paths** from Supabase or `_posts/` including directory prefix (e.g., `1joao/1joao-01-capitulo-1`)

### URL Normalization - Slug Handling (NEW)
**File**: `src/lib/slug.ts` - centralized href/slug generation

**Key Functions**:
```typescript
buildPostHref(slug)  // Input: "1joao/1joao-01-..." → Output: "/posts/1joao/1joao-01-..."
normalizeSlug(slug)  // Remove series prefix: "1joao/1joao-01-..." → "1joao-01-..."
parsePostSlug(slug)  // Extract metadata: "1joao/1joao-01-..." → { series: "1joao", fileName: "1joao-01-..." }
```

**Why**: 8+ components generate post links. `buildPostHref()` is the **single source of truth** for URL formatting.

**Import Pattern**:
```tsx
import { buildPostHref } from "@/lib/slug";

// Use in all Link components:
<Link href={buildPostHref(post.slug)}>...</Link>
```

**CRITICAL**: Use `buildPostHref()` in components:
- `HomeHero` (primary CTA)
- `SeriesCard` (series clickable)
- `PostPreview` (post cards)
- `LatestChapterCard` (featured post)
- `ChapterNavigation` (prev/next)
- `PostHeader` (breadcrumbs, if added)
- `Avatar` (author profile, if added)
- `HeroBento` (bento grid items, if added)
- `DynamicSeriesIndex` (índice dinâmico por série)
- `SeriesSidebar` (links da série e capítulo atual)

### Intelligent Navigation System
- `src/lib/navigation.ts`: `getChapterNavigation(slug)` extracts series prefix via regex, sorts chapters, returns previous/next links
- **Series pattern**: `{series}-{order}-{description}.md` where `{series}` is lowercase identifier extracted from first slug segment
- Example: `1joao-01-capitulo-1.md` → matches `1joao` prefix → finds `1joao-00-indice.md` as index → provides prev/next chapter links
- **Index detection**: Posts matching `*-00-indice` are treated as series landing pages (no chapter navigation)
- This enables **multi-series** sites; navigation auto-configures based on file naming convention alone

### Data Validation (NEW)
**File**: `src/lib/validation.ts` - Zod schema for frontmatter validation

**Behavior**:
- Validates required frontmatter fields: `title`, `excerpt`, `date`, `author`, `coverImage`, `ogImage`
- Runs at **build time** via `getPostBySlug()` - errors **interrupt build**
- Prevents corrupted posts from reaching production

**Asset Validation (NEW)**:
- `src/lib/api.ts`: `ensureAssetExists()` validates `coverImage` and `author.picture` paths
- Checks that image files exist in `/public/`
- Allows external URLs (http://, https://)
- **Fails build** if asset is missing → forces fix before deploy

**Pattern**:
```typescript
// In api.ts
const post = {
  ...data,
  ...ensureAssetExists(data) // Throws if images missing
}
```

### Component Architecture
- **Server Components**: `_components/` são Server Components por padrão. Dados vêm de `getPostBySlug()`/`getAllPosts()` e `getAllSeries()` (Supabase quando configurado; fallback FS).
- **Client Components**: Apenas `theme-switcher.tsx` é `'use client'` para interatividade.
- **Shared UI**: `Container`, `Header`, `Footer`, `CoverImage` fornecem layout consistente.
- **Post-specific**: `PostBody` (HTML), `PostHeader`, `PostPreview`, `ChapterNavigation`, `SeriesSidebar`, `DynamicSeriesIndex`.

### Type System
- `src/interfaces/post.ts`: `Post` extends frontmatter fields + `slug`, `content` (raw markdown, not HTML)
- `src/interfaces/author.ts`: `Author` object with `name`, `picture` URL
- `tsconfig.json` path alias: `@/*` → `src/*` simplifies imports across components and libs

## Styling & Theming

### Design System - Tokens (NEW)
**File**: `src/lib/theme-constants.ts` - centralized color, gradient, and shadow tokens

**Color Palette**:
- **Neutral Scale** (50-900): Cream (#fafaf8) → Dark Brown (#1a1410)
  - Light mode: 50-100 backgrounds, 600-900 text
  - Dark mode: 700-800 backgrounds, 50-400 text
- **Accent Blue & Purple**: 10-tone scales for brand colors
- **Usage**: `className="bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-50"`

**Shadows & Depth**:
- `shadow-xs` through `shadow-2xl` - hierarchy from subtle to dramatic
- `shadow-lg`: Cards, buttons, hover states
- `shadow-2xl`: Hero sections, modals, elevated components

**Gradients**:
- `from-accent-blue-600 to-accent-purple-600`: Brand CTA buttons
- `from-neutral-50 to-neutral-200`: Subtle backgrounds

**All tokens exported from `theme-constants.ts`**:
```typescript
import { COLORS, GRADIENTS, THEME_DEFAULT } from "@/lib/theme-constants";
// Use in components: className="bg-neutral-100 from-accent-blue-600"
```

### Dark Mode (Critical Pattern)
- **Strategy**: Tailwind `class` mode (not `media`) - `<html class="dark">` is toggled by `theme-switcher.tsx`
- **Anti-FOUC**: `NoFOUCScript` component in `layout.tsx` applies dark class in `<head>` before paint to prevent light flash
- **Persistence**: `localStorage.setItem("nextjs-blog-starter-theme", "dark"|"light")` in `theme-switcher.tsx`
- **Default Theme**: Set in `THEME_DEFAULT` constant (`"dark"` or `"light"` or `"system"`)
- **All dark variants use `dark:` prefix**: `text-neutral-900 dark:text-neutral-50`, `bg-neutral-100 dark:bg-neutral-800`

### Typography System
- **Foundation**: `@tailwindcss/typography` plugin required - provides `.prose` class for markdown content styling
- **Content wrapper**: `prose prose-lg dark:prose-invert max-w-none w-full text-justify` on `PostBody`

  - `prose-lg` = larger font/spacing for readability
  - `prose-stone` = stone color scheme (headings, links, text)
  - `dark:prose-invert` = inverts colors for dark mode (light text on dark bg)
  - `max-w-none w-full` = full width, prose doesn't constrain
  - `text-justify` = aligns text to both edges (Portuguese typography preference)
- **Table styling**: Prose automatically styles GFM tables; dark mode tables use `dark:border-slate-700`
- **Blockquote accent**: `prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-slate-800`

### Color Palette & Spacing
- **Neutrals**: Stone (50, 100, 300, 500, 700, 900) for text, backgrounds
- **Accents**: Blue (500, 600), Purple for interactive elements and highlights
- **Container padding**: Responsive - `px-5 md:px-8 lg:px-12` via `Container` component
- **Content constraints**: `max-w-5xl mx-auto` for prose text, `max-w-6xl mx-auto` for cover images

### Layout Primitives
- **Reusable**: `Container` (constrained width + responsive padding), `Section` separators, cover images
- **Homepage flow**: `Header` → `StudyIntro` (hero with description) → `AboutSection` (feature highlights) → `StudySeriesGrid` (cards with status badges)
- **Post flow**: `Header` → `PostHeader` (title + date) → `CoverImage` → `PostBody` (markdown) → `ChapterNavigation` (prev/next)

## Content Creation & Series Management

### File Structure Convention
**All markdown lives in `/_posts/{series}/` subdirectories:**
```
_posts/
  1joao/              # Series folder - must match series prefix
    1joao-00-indice.md          # Index/landing page (00 is reserved)
    1joao-01-capitulo-1.md      # Chapter 1
    1joao-02-capitulo-2.md      # Chapter 2
  mateus/
    mateus-00-indice.md
    mateus-01-capitulo-1.md
```

### Naming Rules (Critical for Navigation)
- **Pattern**: `{series}-{order:00-99}-{description}.md`
- **Series prefix**: Extracted from first slug segment in URL (e.g., `1joao` from `/posts/1joao-01-capitulo-1`)
- **Order**: Zero-padded (00, 01, 02, etc.) - determines chapter sequence in navigation
- **Index files**: MUST end with `-00-indice` to be detected as series landing pages (no chapter nav)
- **Deviation breaks navigation**: Renaming or moving files requires `next build` rebuild

### Frontmatter Template
```yaml
---
title: '1 João | Capítulo 1: A Palavra da Vida'
excerpt: 'Short description shown in series cards and meta tags'
coverImage: '/assets/blog/estudos/1joao-cover.png'
date: '2025-12-20T08:00:00.000Z'
author:
  name: Guilherme Braga
  picture: '/assets/blog/authors/jj.jpeg'
ogImage:
  url: '/assets/blog/estudos/1joao-cover.png'
---
```

### Homepage Series Registration
Add entries to `studySeries` array in `src/app/page.tsx`:
```typescript
{
  title: "1 João",
  description: "Exposição de 1 João...",
  slug: "1joao",        // Must match folder name
  status: "Em Andamento", // or "Completo"
  chapters: 5,
  lastUpdate: "2025-12-20",
  previewImage: "/assets/blog/capas/1joao.png"
}
```
Slugs in this array are the series prefixes used by `getChapterNavigation()` to find posts.

## Development Workflow

### Build & Runtime
- **Dev**: `npm run dev` inicia Next.js com **Turbopack**.
- **Prod**: `npm run build` + `npm start` com **ISR** (`revalidate=60`) nas páginas; conteúdo pode vir do Supabase.
- **Admin**: `/admin` é `force-dynamic` e usa Server Actions para upsert em Supabase + `revalidatePath`.

### Supabase Integration (Opcional, Preferencial)
- **Env vars**: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` em `.env.local`.
- **Clientes**: `getSupabaseAnonClient()` para leitura; `getSupabaseServiceClient()` para writes.
- **Series**: `src/lib/series.ts` lê do Supabase se configurado; caso contrário, usa `fallbackSeries`.
- **Posts**: `src/lib/api.ts` prioriza Supabase (`getAllPostsFromSupabase`) e faz fallback para `_posts/`.
- **Admin Actions**: `src/app/admin/actions.ts` (Zod valida, upsert em `series`/`posts`, revalida `/` e páginas de post).
- **Scripts úteis**:
  - Migrar FS → Supabase: `npx tsx scripts/migrate-to-supabase.ts`
  - Corrigir contagem/status séries: `npx tsx scripts/fix-series-counts.ts`

### Adding Features - By Feature Type

**New markdown field** (e.g., "keywords"):
1. Add to frontmatter in markdown files
2. Update `Post` interface in `src/interfaces/post.ts` to include field
3. `gray-matter` automatically parses any YAML fields → no code changes needed to read

**New Series**:
1. Create `_posts/{series-name}/` folder
2. Add `{series-name}-00-indice.md` and `{series-name}-01-*.md` files
3. Add entry to `studySeries` in `src/app/page.tsx` with metadata (title, chapters, status)
4. Navigation auto-configures via `getChapterNavigation()`; rebuild site with `next build`

**New Component**:
1. Create in `src/app/_components/{name}.tsx` as Server Component
2. Import with `import Component from "@/app/_components/name"`
3. If needs `'use client'`, ensure only state/event handlers use that; keep data fetching in parent Server Component

**Styling Changes**:
- **Utility classes**: Prefer Tailwind (e.g., `text-lg text-stone-900 dark:text-stone-100`)
- **Prose overrides**: Use Tailwind `prose-{element}:{styles}` in config or inline (e.g., `prose-blockquote:bg-blue-50`)
- **CSS modules**: Only for special cases like `switch.module.css` (scoped component-level styles)

### Windows PowerShell Execution Policy
If you encounter script execution errors, run:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass; npm run dev
```
This sets permissions for the current terminal session only.

## Deployment & Performance

### Vercel Optimization
- **ISR ativo**: `revalidate=60` para `/` e posts; conteúdo atualizado via Admin revalida páginas.
- **Admin dinâmico**: `/admin` roda no server (Server Actions), requer envs Supabase.
- **Imagens**: `next/image` para otimização automática.

### Key Deployment Settings
- Deploy a partir de `main` no GitHub.
- Variáveis Supabase devem estar presentes no Vercel para usar DB; sem elas, app funciona com fallback `_posts/`.

## Portuguese Localization

- **Language tag**: `<html lang="pt">` in `layout.tsx` (signals browsers + search engines)
- **Date formatting**: `date-fns` library handles locale-aware dates; check `DateFormatter` component for format
- **UI text**: All labels, navigation, badges in Portuguese (e.g., "Em Andamento", "Completo")
- **Content direction**: LTR (Portuguese is left-to-right; no RTL needed)
- **Typography**: Use `text-justify` for justified alignment (common in Portuguese printed books)

## Critical Patterns & Common Pitfalls

| Pitfall | Why It Breaks | Fix |
|---------|---------------|-----|
| Removing `remark-gfm` from deps | Markdown tables, strikethrough, tasklists fail silently | Keep it in `package.json` dependencies + `markdownToHtml.ts` |
| Post slug mismatch (e.g., `1joao-01-capitulo-1.md` vs `1joao-cap-1`) | `getPostBySlug()` faz matching exato no FS ou Supabase | Mantenha padrão `{series}/{fileName}` sem `.md` |
| Series prefix inconsistency (e.g., file is `1joao-01-*.md` but array has `1-joao`) | `getChapterNavigation()` regex won't extract correct series prefix | File prefix must match `studySeries.slug` exactly |
| Missing `-00-indice` file in series folder | Navegação retorna `null`; índice dinâmico pode falhar | Crie o índice por série com sufixo `-00-indice` |
| `<html class="dark">` not in DOM | Dark mode class never applied; toggles don't work | Ensure `NoFOUCScript` runs first; `theme-switcher.tsx` adds class to `document.documentElement` |
| Image paths in markdown as relative (`../assets/...`) | Images broken on deployed site | Use absolute paths from `/public/` root: `/assets/blog/estudos/image.png` |
| Not awaiting `props.params` in Server Component | Type error; build fails | Sempre `const params = await props.params` em `posts/[...slug]/page.tsx` |
| Supabase env ausente | Admin falha e conteúdo volta ao fallback | Configure `SUPABASE_*` ou opere apenas via `_posts/` |
| Não usar `buildPostHref()` | Links quebrados (variação de separadores/slug) | Normalize slugs e use `buildPostHref(slug)` em Links |

—

Se algo acima estiver impreciso ou faltando (especialmente fluxos do Admin e Supabase), me diga e ajusto rapidamente com exemplos diretos dos arquivos.
| Missing `@tailwindcss/typography` plugin | Prose styling doesn't apply; unstyled markdown | Install: `npm install -D @tailwindcss/typography` + add to `plugins` in `tailwind.config.ts` |
