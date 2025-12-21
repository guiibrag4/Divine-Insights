import Link from "next/link";

type Props = {
  title: string;
  description: string;
};

export function AboutSection({ title, description }: Props) {
  return (
    <section className="mb-20 max-w-5xl mx-auto px-5">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-8 md:p-12 shadow-lg border border-stone-200 dark:border-slate-600">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-stone-900 dark:text-stone-100">
          {title}
        </h2>
        <p className="text-lg text-stone-700 dark:text-stone-300 leading-relaxed mb-6">
          {description}
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📖</span>
            </div>
            <div>
              <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-1">Estudos Profundos</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400">Análise verso a verso das Escrituras</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💡</span>
            </div>
            <div>
              <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-1">Aplicação Prática</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400">Reflexões para o dia a dia</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🔗</span>
            </div>
            <div>
              <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-1">Navegação Fácil</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400">Acesse os capítulos rapidamente</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
