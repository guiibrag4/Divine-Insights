# Divine Insights - Copilot Instructions

## Project Overview
Static blog for biblical studies built with **Next.js 15 App Router** + TypeScript + Tailwind CSS. Content is file-based (Markdown in `/_posts/`) with intelligent series navigation. The site emphasizes Portuguese localization, dark mode support, and minimal design. Deploy target is Vercel (static export).

## Architecture

### Content Flow (File-based CMS)
1. **Source**: Markdown in `/_posts/{series}/` with required frontmatter: `title`, `excerpt`, `date`, `author`, `coverImage`
2. **Reading**: `src/lib/api.ts` recursively scans `_posts/`, parses YAML frontmatter via `gray-matter`, returns fully-typed `Post` objects
3. **Processing**: `markdownToHtml()` converts markdown → HTML using `remark` + `remark-gfm` (enables GFM: tables, strikethrough, tasklists)
4. **Rendering**: All `src/app/_components/` are Server Components by default; posts hydrate via `getAllPosts()` and `getPostBySlug(slug)`

**Why this matters**: The `gray-matter` parsing extracts frontmatter from markdown file **content** field - don't modify post object shape without updating all usages.

### Routing (File-based CMS → Static Routes)
- `/` → `src/app/page.tsx` - Homepage lists all series from `studySeries` array (hardcoded study metadata)
- `/posts/[...slug]` → `src/app/posts/[...slug]/page.tsx` - Handles nested paths like `posts/1joao/1joao-01-capitulo-1`
- `generateStaticParams()` pre-builds routes at `next build` time for all markdown files
- Slugs are **relative paths from `_posts/`** including directory prefix (e.g., `1joao/1joao-01-capitulo-1`)

### Intelligent Navigation System
- `src/lib/navigation.ts`: `getChapterNavigation(slug)` extracts series prefix via regex, sorts chapters, returns previous/next links
- **Series pattern**: `{series}-{order}-{description}.md` where `{series}` is lowercase identifier extracted from first slug segment
- Example: `1joao-01-capitulo-1.md` → matches `1joao` prefix → finds `1joao-00-indice.md` as index → provides prev/next chapter links
- **Index detection**: Posts matching `*-00-indice` are treated as series landing pages (no chapter navigation)
- This enables **multi-series** sites; navigation auto-configures based on file naming convention alone

### Component Architecture
- **Server Components**: All `_components/` are Server Components for optimal performance; access filesystem directly via `getPostBySlug()` in `page.tsx`
- **Client Components**: Only `theme-switcher.tsx` (dark mode toggle, localStorage) is marked `'use client'` for interactivity
- **Shared UI**: `Container`, `Header`, `Footer`, `CoverImage` provide consistent layout across pages
- **Post-specific**: `PostBody` (renders HTML), `PostHeader` (title/date), `PostPreview` (card in grids), `ChapterNavigation` (prev/next buttons)

### Type System
- `src/interfaces/post.ts`: `Post` extends frontmatter fields + `slug`, `content` (raw markdown, not HTML)
- `src/interfaces/author.ts`: `Author` object with `name`, `picture` URL
- `tsconfig.json` path alias: `@/*` → `src/*` simplifies imports across components and libs

## Styling & Theming

### Dark Mode (Critical Pattern)
- **Strategy**: Tailwind `class` mode (not `media`) - `<html class="dark">` is toggled by `theme-switcher.tsx`
- **Anti-FOUC**: `NoFOUCScript` component in `layout.tsx` applies dark class in `<head>` before paint to prevent light flash
- **Persistence**: `localStorage.setItem("nextjs-blog-starter-theme", "dark"|"light")` in `theme-switcher.tsx`
- **All dark variants use `dark:` prefix**: `text-stone-900 dark:text-stone-100`, `prose dark:prose-invert`, `bg-slate-50 dark:bg-slate-900`

### Typography System
- **Foundation**: `@tailwindcss/typography` plugin required - provides `.prose` class for markdown content styling
- **Content wrapper**: `prose prose-lg prose-stone dark:prose-invert max-w-none w-full text-justify` on `PostBody`
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
- **Dev**: `npm run dev` launches Next.js with **Turbopack** (Next.js 15 default, much faster builds)
- **Production**: `npm run build` pre-renders all routes via `generateStaticParams()` + `generateMetadata()`, then `npm start` serves static files
- **Static Export**: Site is fully static - no server-side computation after build (important for Vercel)

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
- **Static Export**: All pages pre-rendered at `next build` time via `generateStaticParams()` 
- **Zero Runtime**: No server-side logic after build; Vercel serves HTML/CSS/JS directly (Edge Network fast)
- **Image optimization**: Use `next/image` for responsive images (auto-optimized by Vercel)
- **Incremental Static Regeneration**: Not used (static-only approach); requires full rebuild for content changes

### Key Deployment Settings
- Deploy from `main` branch on GitHub
- Vercel automatically runs `npm run build` → serves `out/` directory
- Environment: Node.js default (no special env vars needed)

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
| Post slug mismatch (e.g., `1joao-01-capitulo-1.md` but access as `1joao-cap-1`) | `getPostBySlug()` does exact filesystem path matching | Slug in URL must match filename exactly (minus `.md`) |
| Series prefix inconsistency (e.g., file is `1joao-01-*.md` but array has `1-joao`) | `getChapterNavigation()` regex won't extract correct series prefix | File prefix must match `studySeries.slug` exactly |
| Missing `-00-indice` file in series folder | Navigation returns `null`; chapter nav doesn't appear | Create index file for every series (name must end with `-00-indice`) |
| `<html class="dark">` not in DOM | Dark mode class never applied; toggles don't work | Ensure `NoFOUCScript` runs first; `theme-switcher.tsx` adds class to `document.documentElement` |
| Image paths in markdown as relative (`../assets/...`) | Images broken on deployed site | Use absolute paths from `/public/` root: `/assets/blog/estudos/image.png` |
| Not awaiting `props.params` in Server Component | Type error; build fails | Always `const params = await props.params` in post page |
| Missing `@tailwindcss/typography` plugin | Prose styling doesn't apply; unstyled markdown | Install: `npm install -D @tailwindcss/typography` + add to `plugins` in `tailwind.config.ts` |
