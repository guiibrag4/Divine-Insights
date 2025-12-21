import { upsertPostAction, upsertSeriesAction } from "./actions";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-10 space-y-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-50">Painel Administrativo</h1>
        <p className="text-stone-600 dark:text-stone-300">
          Insira os dados da série e dos capítulos. O conteúdo é salvo no Supabase e fica disponível imediatamente.
        </p>
        <div className="text-sm text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/40 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
          Certifique-se de configurar as variáveis de ambiente SUPABASE_URL, SUPABASE_ANON_KEY e SUPABASE_SERVICE_ROLE_KEY no projeto.
        </div>
      </header>

      <section className="grid md:grid-cols-2 gap-10">
        {/* Série */}
        <div className="rounded-2xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-6 space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-50">Criar / Atualizar Série</h2>
            <p className="text-sm text-stone-600 dark:text-stone-400">Define capa, slug e status da coleção.</p>
          </div>
          <form action={upsertSeriesAction} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium">Título</label>
              <input name="slug" required placeholder="tiago-05-oracao" className="w-full rounded-md border border-stone-300 dark:border-slate-600 bg-transparent px-3 py-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Slug Prefix (ex: tiago)</label>
                <input name="slugPrefix" required className="w-full rounded-md border border-stone-300 dark:border-slate-600 bg-transparent px-3 py-2" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Slug da página índice (opcional)</label>
                <input name="indexSlug" placeholder="tiago/tiago-00-indice" className="w-full rounded-md border border-stone-300 dark:border-slate-600 bg-transparent px-3 py-2" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Descrição</label>
              <textarea name="description" required rows={3} className="w-full rounded-md border border-stone-300 dark:border-slate-600 bg-transparent px-3 py-2" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">URL da capa</label>
              <input name="coverImage" required className="w-full rounded-md border border-stone-300 dark:border-slate-600 bg-transparent px-3 py-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Status</label>
                <select name="status" className="w-full rounded-md border border-stone-300 dark:border-slate-600 bg-transparent px-3 py-2">
                  <option value="em-andamento">Em andamento</option>
                  <option value="completo">Completo</option>
                  <option value="rascunho">Rascunho</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Qtd capítulos</label>
                <input name="chaptersCount" type="number" min={0} defaultValue={0} className="w-full rounded-md border border-stone-300 dark:border-slate-600 bg-transparent px-3 py-2" />
              </div>
            </div>
            <button type="submit" className="w-full rounded-md bg-stone-900 text-white py-2 font-semibold hover:bg-stone-800">
              Salvar série
            </button>
          </form>
        </div>

        {/* Post */}
        <div className="rounded-2xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm p-6 space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-50">Criar / Atualizar Capítulo</h2>
            <p className="text-sm text-stone-600 dark:text-stone-400">Inclui metadados, capa e conteúdo em markdown.</p>
          </div>
          <form action={upsertPostAction} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Série (prefixo)</label>
                <input name="seriesSlug" placeholder="tiago" required className="w-full rounded-md border border-stone-300 dark:border-slate-600 bg-transparent px-3 py-2" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Slug do capítulo</label>
                <input name="slug" placeholder="tiago-01-fe-pratica" required className="w-full rounded-md border border-stone-300 dark:border-slate-600 bg-transparent px-3 py-2" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Título</label>
              <input name="title" required placeholder="Tiago | Capítulo 5: A Oração Eficaz" className="w-full rounded-md border border-stone-300 dark:border-slate-600 bg-transparent px-3 py-2" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Resumo (excerpt) <span className="text-stone-500 text-xs">mín. 10 caracteres</span></label>
              <textarea name="excerpt" required minLength={10} rows={3} placeholder="Um breve resumo do capítulo para aparecer nos cards..." className="w-full rounded-md border border-stone-300 dark:border-slate-600 bg-transparent px-3 py-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">Data (ISO)</label>
                <input name="date" placeholder="2025-12-21" required className="w-full rounded-md border border-stone-300 dark:border-slate-600 bg-transparent px-3 py-2" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">URL da capa</label>
                <input name="coverImage" required placeholder="/assets/blog/estudos/tiago-05-cover.png" className="w-full rounded-md border border-stone-300 dark:border-slate-600 bg-transparent px-3 py-2" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium">OG Image (opcional)</label>
                <input name="ogImage" placeholder="defaults para capa" className="w-full rounded-md border border-stone-300 dark:border-slate-600 bg-transparent px-3 py-2" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium">Autor</label>
                <input name="authorName" required placeholder="Guilherme Braga" className="w-full rounded-md border border-stone-300 dark:border-slate-600 bg-transparent px-3 py-2" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Foto do autor</label>
              <input name="authorPicture" required placeholder="/assets/blog/authors/jj.jpeg" className="w-full rounded-md border border-stone-300 dark:border-slate-600 bg-transparent px-3 py-2" />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Conteúdo (markdown) <span className="text-stone-500 text-xs">mín. 10 caracteres</span></label>
              <textarea name="content" required minLength={10} rows={10} placeholder="# Título do Capítulo&#10;&#10;## Subtítulo&#10;&#10;Seu conteúdo em markdown aqui..." className="w-full rounded-md border border-stone-300 dark:border-slate-600 bg-transparent px-3 py-2 font-mono text-sm" />
            </div>
            <button type="submit" className="w-full rounded-md bg-blue-600 text-white py-2 font-semibold hover:bg-blue-500">
              Salvar capítulo
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
