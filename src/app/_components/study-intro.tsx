export function StudyIntro() {
  return (
    <section className="mt-12 mb-8">
      <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        {/* Hero - Esquerda */}
        <div className="flex-shrink-0 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight mb-4 text-stone-900 dark:text-stone-100">
            Divine Insights
          </h1>
          <p className="text-lg md:text-xl text-stone-600 dark:text-stone-400 leading-relaxed">
            Estudos bíblicos profundos para fortalecer sua caminhada espiritual
          </p>
          <div className="mt-6 h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mx-auto md:mx-0"></div>
        </div>

        {/* About - Direita */}
        <div className="flex-1">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 md:p-8 shadow-lg border border-stone-200 dark:border-slate-600">
            <p className="text-base md:text-lg text-stone-700 dark:text-stone-300 leading-relaxed mb-6">
              Cada série foi elaborada para proporcionar compreensão bíblica sólida e aplicação prática para sua vida espiritual.
            </p>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">📖</span>
                </div>
                <p className="text-xs font-semibold text-stone-900 dark:text-stone-100">Estudos Profundos</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">💡</span>
                </div>
                <p className="text-xs font-semibold text-stone-900 dark:text-stone-100">Aplicação Prática</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl">🔗</span>
                </div>
                <p className="text-xs font-semibold text-stone-900 dark:text-stone-100">Navegação Fácil</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
