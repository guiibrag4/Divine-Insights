import { upsertPostAction, upsertSeriesAction } from "./actions";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 via-white to-neutral-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-10">
        <header className="rounded-3xl border border-white/60 dark:border-slate-800 bg-white/70 dark:bg-slate-900/50 shadow-xl shadow-blue-900/5 dark:shadow-black/30 backdrop-blur-lg p-8 space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">Administração</p>
              <h1 className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-stone-50">Painel Administrativo</h1>
              <p className="text-stone-600 dark:text-stone-300 max-w-2xl">
                Gerencie séries e capítulos em um fluxo rápido e seguro. Todos os envios atualizam o site imediatamente via Supabase.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-200 border border-blue-100 dark:border-blue-800 px-3 py-1 text-sm font-medium">
                <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                Live sync
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-amber-50 text-amber-800 dark:bg-amber-900/40 dark:text-amber-200 border border-amber-100 dark:border-amber-800 px-3 py-1 text-sm font-medium">
                Supabase ready
              </span>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 text-sm">
            <div className="flex items-center gap-3 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 px-4 py-3">
              <div className="h-9 w-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-semibold">S</div>
              <div>
                <p className="text-stone-500 dark:text-stone-400">Conectado a</p>
                <p className="font-semibold text-stone-900 dark:text-stone-50">Supabase</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 px-4 py-3">
              <div className="h-9 w-9 rounded-full bg-emerald-600 text-white flex items-center justify-center text-lg font-semibold">✔</div>
              <div>
                <p className="text-stone-500 dark:text-stone-400">Validação</p>
                <p className="font-semibold text-stone-900 dark:text-stone-50">Campos obrigatórios</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 px-4 py-3">
              <div className="h-9 w-9 rounded-full bg-amber-500 text-white flex items-center justify-center text-lg font-semibold">!</div>
              <div>
                <p className="text-stone-500 dark:text-stone-400">Variáveis</p>
                <p className="font-semibold text-stone-900 dark:text-stone-50">SUPABASE_* configuradas</p>
              </div>
            </div>
          </div>
        </header>

        <section className="grid lg:grid-cols-2 gap-8">
          {/* Série */}
          <div className="rounded-3xl border border-white/60 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 shadow-xl shadow-blue-900/5 dark:shadow-black/30 backdrop-blur-xl p-6 space-y-6">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-300">Coleção</p>
              <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-50">Criar / Atualizar Série</h2>
              <p className="text-sm text-stone-600 dark:text-stone-400">Defina capa, slug, status e contagem de capítulos.</p>
            </div>
            <form action={upsertSeriesAction} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-stone-800 dark:text-stone-200">Título</label>
                <input
                  name="title"
                  required
                  placeholder="Estudos em Tiago"
                  className="w-full rounded-xl border border-black dark:border-black bg-white/60 dark:bg-slate-900/60 px-3 py-3 text-base text-stone-900 dark:text-stone-50 shadow-inner shadow-black/5 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-stone-800 dark:text-stone-200">Slug Prefix (ex: tiago)</label>
                  <input
                    name="slugPrefix"
                    required
                    className="w-full rounded-xl border border-black dark:border-black bg-white/60 dark:bg-slate-900/60 px-3 py-3 text-base text-stone-900 dark:text-stone-50 shadow-inner shadow-black/5 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-stone-800 dark:text-stone-200">Slug da página índice (opcional)</label>
                  <input
                    name="indexSlug"
                    placeholder="tiago/tiago-00-indice"
                    className="w-full rounded-xl border border-black dark:border-black bg-white/60 dark:bg-slate-900/60 px-3 py-3 text-base text-stone-900 dark:text-stone-50 shadow-inner shadow-black/5 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-stone-800 dark:text-stone-200">Descrição</label>
                <textarea
                  name="description"
                  required
                  rows={3}
                  className="w-full rounded-xl border border-black dark:border-black bg-white/60 dark:bg-slate-900/60 px-3 py-3 text-base text-stone-900 dark:text-stone-50 shadow-inner shadow-black/5 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-stone-800 dark:text-stone-200">URL da capa</label>
                <input
                  name="coverImage"
                  required
                  className="w-full rounded-xl border border-black dark:border-black bg-white/60 dark:bg-slate-900/60 px-3 py-3 text-base text-stone-900 dark:text-stone-50 shadow-inner shadow-black/5 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-stone-800 dark:text-stone-200">Status</label>
                  <select
                    name="status"
                    className="w-full rounded-xl border border-black dark:border-black bg-white/60 dark:bg-slate-900/60 px-3 py-3 text-base text-stone-900 dark:text-stone-50 shadow-inner shadow-black/5 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                  >
                    <option value="em-andamento">Em andamento</option>
                    <option value="completo">Completo</option>
                    <option value="rascunho">Rascunho</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-stone-800 dark:text-stone-200">Qtd capítulos</label>
                  <input
                    name="chaptersCount"
                    type="number"
                    min={0}
                    defaultValue={0}
                    className="w-full rounded-xl border border-black dark:border-black bg-white/60 dark:bg-slate-900/60 px-3 py-3 text-base text-stone-900 dark:text-stone-50 shadow-inner shadow-black/5 focus:outline-none focus:ring-2 focus:ring-blue-500/60"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 font-semibold shadow-lg shadow-blue-600/20 hover:scale-[1.01] transition"
              >
                Salvar série
              </button>
            </form>
          </div>

          {/* Post */}
          <div className="rounded-3xl border border-white/60 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 shadow-xl shadow-blue-900/5 dark:shadow-black/30 backdrop-blur-xl p-6 space-y-6">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-300">Conteúdo</p>
              <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-50">Criar / Atualizar Capítulo</h2>
              <p className="text-sm text-stone-600 dark:text-stone-400">Inclua metadados, capa, autor e o markdown completo.</p>
            </div>
            <form action={upsertPostAction} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-stone-800 dark:text-stone-200">Série (prefixo)</label>
                  <input
                    name="seriesSlug"
                    placeholder="tiago"
                    required
                    className="w-full rounded-xl border border-black dark:border-black bg-white/60 dark:bg-slate-900/60 px-3 py-3 text-base text-stone-900 dark:text-stone-50 shadow-inner shadow-black/5 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-stone-800 dark:text-stone-200">Slug do capítulo</label>
                  <input
                    name="slug"
                    placeholder="tiago-01-fe-pratica"
                    required
                    className="w-full rounded-xl border border-black dark:border-black bg-white/60 dark:bg-slate-900/60 px-3 py-3 text-base text-stone-900 dark:text-stone-50 shadow-inner shadow-black/5 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-stone-800 dark:text-stone-200">Título</label>
                <input
                  name="title"
                  required
                  placeholder="Tiago | Capítulo 5: A Oração Eficaz"
                  className="w-full rounded-xl border border-black dark:border-black bg-white/60 dark:bg-slate-900/60 px-3 py-3 text-base text-stone-900 dark:text-stone-50 shadow-inner shadow-black/5 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-stone-800 dark:text-stone-200">
                  Resumo (excerpt) <span className="text-stone-500 text-xs">mín. 10 caracteres</span>
                </label>
                <textarea
                  name="excerpt"
                  required
                  minLength={10}
                  rows={3}
                  placeholder="Um breve resumo do capítulo para aparecer nos cards..."
                  className="w-full rounded-xl border border-black dark:border-black bg-white/60 dark:bg-slate-900/60 px-3 py-3 text-base text-stone-900 dark:text-stone-50 shadow-inner shadow-black/5 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-stone-800 dark:text-stone-200">Data (ISO)</label>
                  <input
                    name="date"
                    placeholder="2025-12-21"
                    required
                    className="w-full rounded-xl border border-black dark:border-black bg-white/60 dark:bg-slate-900/60 px-3 py-3 text-base text-stone-900 dark:text-stone-50 shadow-inner shadow-black/5 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-stone-800 dark:text-stone-200">URL da capa</label>
                  <input
                    name="coverImage"
                    required
                    placeholder="/assets/blog/estudos/tiago-05-cover.png"
                    className="w-full rounded-xl border border-black dark:border-black bg-white/60 dark:bg-slate-900/60 px-3 py-3 text-base text-stone-900 dark:text-stone-50 shadow-inner shadow-black/5 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-stone-800 dark:text-stone-200">OG Image (opcional)</label>
                  <input
                    name="ogImage"
                    placeholder="defaults para capa"
                    className="w-full rounded-xl border border-black dark:border-black bg-white/60 dark:bg-slate-900/60 px-3 py-3 text-base text-stone-900 dark:text-stone-50 shadow-inner shadow-black/5 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-stone-800 dark:text-stone-200">Autor</label>
                  <input
                    name="authorName"
                    required
                    placeholder="Guilherme Braga"
                    className="w-full rounded-xl border border-black dark:border-black bg-white/60 dark:bg-slate-900/60 px-3 py-3 text-base text-stone-900 dark:text-stone-50 shadow-inner shadow-black/5 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-stone-800 dark:text-stone-200">Foto do autor</label>
                <input
                  name="authorPicture"
                  required
                  placeholder="/assets/blog/authors/jj.jpeg"
                  className="w-full rounded-xl border border-black dark:border-black bg-white/60 dark:bg-slate-900/60 px-3 py-3 text-base text-stone-900 dark:text-stone-50 shadow-inner shadow-black/5 focus:outline-none focus:ring-2 focus:ring-emerald-500/60"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-stone-800 dark:text-stone-200">
                  Conteúdo (markdown) <span className="text-stone-500 text-xs">mín. 10 caracteres</span>
                </label>
                <textarea
                  name="content"
                  required
                  minLength={10}
                  rows={10}
                  placeholder="# Título do Capítulo&#10;&#10;## Subtítulo&#10;&#10;Seu conteúdo em markdown aqui..."
                  className="w-full rounded-xl border border-black dark:border-black bg-white/60 dark:bg-slate-900/60 px-3 py-3 text-base text-stone-900 dark:text-stone-50 shadow-inner shadow-black/5 focus:outline-none focus:ring-2 focus:ring-emerald-500/60 font-mono text-sm"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 font-semibold shadow-lg shadow-emerald-600/20 hover:scale-[1.01] transition"
              >
                Salvar capítulo
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
