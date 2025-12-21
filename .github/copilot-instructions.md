# Divine Insights - Copilot Instructions

## Project Overview
Static blog built with **Next.js 15 App Router** + TypeScript + Tailwind CSS for biblical studies content. Content is authored in Markdown files with frontmatter, processed server-side using `remark` and `gray-matter`.

## Architecture

### Content Flow (File-based CMS)
1. **Source**: Markdown files in `/_posts/` with frontmatter metadata (title, date, author, coverImage, excerpt)
2. **Reading**: `src/lib/api.ts` reads filesystem, parses frontmatter with `gray-matter`, returns typed `Post` objects
3. **Processing**: `src/lib/markdownToHtml.ts` converts markdown → HTML using `remark` + `remark-gfm` (GitHub Flavored Markdown)
4. **Rendering**: Server Components consume posts via `getAllPosts()` and `getPostBySlug()`

**Critical**: `remark-gfm` plugin is **mandatory** for table support and GFM features. Never remove it.

### Routing Structure
- `/` → `src/app/page.tsx` - Homepage with study series overview cards
- `/posts/[slug]` → `src/app/posts/[slug]/page.tsx` - Individual post/chapter page with dynamic navigation
- `/posts/1joao-00-indice` → Series index page with chapter listings
- Slugs derived from markdown filename (e.g., `1joao-01-capitulo-1.md` → `/posts/1joao-01-capitulo-1`)

### Navigation System
- **Intelligent chapter navigation**: `src/lib/navigation.ts` provides `getChapterNavigation()` function
- Automatically detects series from slug pattern (e.g., `1joao-XX-*` maps to series index `1joao-00-indice`)
- Navigation component (`ChapterNavigation`) shows Previous/Index/Next buttons with chapter titles
- Supports multiple series with pattern: `{series}-{order}-{description}.md`

### Type System
- `src/interfaces/post.ts` - Core `Post` type with all required fields
- `src/interfaces/author.ts` - `Author` type (name, picture)
- Path aliases: `@/*` maps to `src/*` (configured in `tsconfig.json`)

## Styling Conventions

### Theme System
- **Dark mode**: Implemented via `class` strategy (`tailwind.config.ts`: `darkMode: "class"`)
- Custom theme switcher in `src/app/_components/theme-switcher.tsx` with localStorage persistence (`STORAGE_KEY: "nextjs-blog-starter-theme"`)
- Anti-FOUC script injected in client component to apply dark class before paint
- Theme switcher accessible in Header component on all pages

### Design System
- **Color palette**: Stone shades (50-900) for neutrals, Blue/Purple gradients for accents
- **Typography**: Tailwind Typography plugin (`@tailwindcss/typography`) for markdown content
- **Post content styling**: 
  - `prose-lg prose-stone dark:prose-invert max-w-none w-full text-justify` - Main content wrapper
  - `max-w-5xl mx-auto` - Wide content container for text (5xl = ~1024px)
  - `max-w-6xl mx-auto` - Extra wide for cover images
  - Dark mode support: `dark:prose-invert` with custom modifiers for headings, links, tables, blockquotes
  - Responsive blockquotes: `prose-blockquote:bg-blue-50 dark:prose-blockquote:bg-slate-800`

### Layout Patterns
- Components use `Container` wrapper with responsive padding: `px-5 md:px-8 lg:px-12`
- Homepage features: `StudyIntro` (hero) → `AboutSection` (features) → `StudySeriesGrid` (cards)
- Post pages structure: Header → Title/Date → Cover Image → Content → ChapterNavigation
- Series cards show status badges ("Em Andamento" / "Completo"), chapter count, and last update date

## Key Files

### Content Creation
**Series naming convention**: `{series}-{order}-{description}.md`
- `{series}`: lowercase identifier (e.g., `1joao`, `genesis`)
- `{order}`: zero-padded number (00 for index, 01-99 for chapters)
- `{description}`: descriptive slug (e.g., `indice`, `capitulo-1`)

**Examples**:
- `1joao-00-indice.md` → Series index page
- `1joao-01-capitulo-1.md` → Chapter 1
- `1joao-02-capitulo-2.md` → Chapter 2

**Frontmatter structure**:
```yaml
---
title: '1 João | Capítulo 1: A Palavra da Vida'
excerpt: 'Short description shown in cards and meta tags'
coverImage: '/assets/blog/estudos/1joao-cover.png'
date: '2025-12-20T08:00:00.000Z'
author:
  name: Guilherme Braga
  picture: '/assets/blog/authors/jj.jpeg'
ogImage:
  url: '/assets/blog/estudos/1joao-cover.png'
---
```

### Component Organization
- All components in `src/app/_components/` are React Server Components by default
- Client components: `theme-switcher.tsx` (localStorage), `chapter-navigation.tsx` uses Link (SSR-safe)
- Homepage components: `study-intro.tsx`, `about-section.tsx`, `study-series-grid.tsx`
- Post components: `chapter-navigation.tsx` for intelligent previous/next navigation

### Adding New Series
1. Create markdown files: `{series}-00-indice.md` (index) + `{series}-01-*.md` (chapters)
2. Update homepage (`src/app/page.tsx`) → add entry to `studySeries` array
3. Navigation automatically works via `getChapterNavigation()` function

## Development Workflow

### Commands
- `npm run dev` - Start dev server with **Turbopack** (Next.js 15 default)
- `npm run build` - Production build with static generation
- `npm start` - Serve production build

### PowerShell Issues
If script execution is disabled, prefix commands with:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass; <command>
```

### Adding Features
1. **New markdown field**: Update `Post` interface → adjust frontmatter parsing if needed
2. **New component**: Create in `src/app/_components/` → import with `@/app/_components/...`
3. **Styling changes**: Prefer Tailwind utility classes; avoid CSS modules except for special cases (see `switch.module.css`)
4. **New series**: Follow naming convention, navigation auto-configures

## Portuguese Localization
- `<html lang="pt">` set in `layout.tsx`
- Date formatting uses `date-fns` library (see `src/app/_components/date-formatter.tsx`)
- All UI text in Portuguese: buttons, navigation labels, status badges
- Content is biblical studies in Portuguese (1 João series example)

## Deployment
Optimized for **Vercel** deployment (static export). All posts are statically generated at build time via `generateMetadata()` and `generateStaticParams()` in post page.

## Common Pitfalls
- Don't remove `remark-gfm` - breaks table rendering in markdown content
- Post slugs must match filenames exactly (without `.md` extension)
- Series naming convention is critical for navigation: `{series}-{order}-{description}.md`
- Image paths in markdown must be absolute from `/public/` root
- Dark mode class must be on `<html>` element (handled by theme switcher)
- Props in Server Components with Next.js 15 must be awaited (`await props.params`)
- Typography plugin required: `npm install -D @tailwindcss/typography` + add to `plugins` in `tailwind.config.ts`
