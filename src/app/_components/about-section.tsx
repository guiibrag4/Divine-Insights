import Link from "next/link";

type Props = {
  title: string;
  description: string;
};

export function AboutSection({ title, description }: Props) {
  return (
    <section className="mb-20 max-w-5xl mx-auto px-5">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-neutral-800 dark:to-neutral-800 rounded-2xl p-8 md:p-12 shadow-[0_10px_40px_rgb(0,0,0,0.1)] ring-1 ring-black/5 dark:ring-white/5 border border-[#D4D4D4] dark:border-[#262626]">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#1A1A1A] dark:text-[#F2F2F2]">
          {title}
        </h2>
        <p className="text-lg text-[#1A1A1A] dark:text-[#F2F2F2] leading-relaxed mb-6">
          {description}
        </p>
        
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
              <span className="text-2xl">📖</span>
            </div>
            <div>
              <h3 className="font-semibold text-[#1A1A1A] dark:text-[#F2F2F2] mb-1">Estudos Profundos</h3>
              <p className="text-sm text-[#666666] dark:text-[#A0A0A0]">Análise verso a verso das Escrituras</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <span className="text-2xl">💡</span>
            </div>
            <div>
              <h3 className="font-semibold text-[#1A1A1A] dark:text-[#F2F2F2] mb-1">Aplicação Prática</h3>
              <p className="text-sm text-[#666666] dark:text-[#A0A0A0]">Reflexões para o dia a dia</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <span className="text-2xl">🔗</span>
            </div>
            <div>
              <h3 className="font-semibold text-[#1A1A1A] dark:text-[#F2F2F2] mb-1">Navegação Fácil</h3>
              <p className="text-sm text-[#666666] dark:text-[#A0A0A0]">Acesse os capítulos rapidamente</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
