import Link from "next/link";
import DateFormatter from "./date-formatter";
import { getAllPosts } from "@/lib/api";
import { buildPostHref } from "@/lib/slug";

// Ícones SVG consistentes (stroke)
const IconBook = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5V4.5Z" />
  </svg>
);
const IconLampHeart = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
    <path d="M9 18h6" />
    <path d="M12 2a7 7 0 0 1 7 7c0 2.2-1 4.2-2.7 5.5L15 18H9l-1.3-3.5A7 7 0 0 1 5 9a7 7 0 0 1 7-7Z" />
    <path d="M12 10c.9-1.1 2.9-.7 3 1 0 1.5-2.1 2.7-3 3.5-.9-.8-3-2-3-3.5.1-1.7 2.1-2.1 3-1Z" />
  </svg>
);
const IconCompass = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M16 8l-4 8-4-4 8-4Z" />
  </svg>
);
const IconArrowRight = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} {...props}>
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
  </svg>
);

// Versículo do dia (rotaciona por data)
const VERSES = [
  {
    ref: "1 João 1:7",
    text:
      "Se, porém, andarmos na luz, como ele está na luz, mantemos comunhão uns com os outros, e o sangue de Jesus, seu Filho, nos purifica de todo pecado.",
  },
  {
    ref: "1 João 2:6",
    text: "Aquele que afirma que permanece nele deve andar como ele andou.",
  },
  {
    ref: "Romanos 12:1",
    text:
      "Apresentem o seu corpo como sacrifício vivo, santo e agradável a Deus; esse é o culto racional de vocês.",
  },
];

export async function HeroBento() {
  const posts = await getAllPosts();
  const latest = posts[0];
  // Evitar hidratação divergente: derive o índice de um dado estável (data do último post)
  const stableDate = latest ? new Date(latest.date) : new Date(0);
  const verse = VERSES[stableDate.getUTCDate() % VERSES.length];

  if (!latest) {
    return null;
  }

  return (
    <section className="mt-10 mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tile Título + Ilustração Bíblica */}
        <div className="overflow-hidden rounded-2xl p-6 md:p-8 bg-white/70 dark:bg-slate-800 border border-stone-200 dark:border-slate-700 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            {/* Ilustração à esquerda */}
            <div className="md:w-2/5 w-full">
              <div className="rounded-xl overflow-hidden shadow-md ring-1 ring-stone-200/70 dark:ring-slate-700/70">
                <img
                  src="/assets/blog/estudos/1joao-cover.png"
                  alt="Ilustração bíblica"
                  className="w-full h-36 md:h-40 lg:h-48 object-cover"
                />
              </div>
            </div>

            {/* Título e badges à direita */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-stone-900 dark:text-stone-100 mb-3">
                Divine Insights
              </h1>
              <p className="text-stone-600 dark:text-stone-400 text-lg max-w-lg">
                Estudos bíblicos profundos para fortalecer sua caminhada espiritual.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm bg-stone-100 dark:bg-slate-700 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-slate-600">
                  <IconBook className="w-4 h-4" /> Estudo Expositivo
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm bg-stone-100 dark:bg-slate-700 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-slate-600">
                  <IconLampHeart className="w-4 h-4" /> Aplicação Prática
                </span>
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm bg-stone-100 dark:bg-slate-700 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-slate-600">
                  <IconCompass className="w-4 h-4" /> Navegação por Capítulos
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tile Último Estudo */}
        <Link
          href={buildPostHref(latest.slug)}
          className="group overflow-hidden rounded-2xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm hover:shadow-lg transition-all"
        >
          <div className="relative h-40 md:h-48">
            <img
              src={latest.coverImage}
              alt={latest.title}
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100"
            />
            <span className="absolute top-3 left-3 px-2 py-1 text-xs rounded-full bg-stone-900 text-white shadow">Último estudo</span>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-2 line-clamp-2">
              {latest.title}
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 mb-4 line-clamp-2">
              {latest.excerpt}
            </p>
            <div className="flex items-center justify-between text-sm">
              <span className="text-stone-500 dark:text-stone-500">
                <DateFormatter dateString={latest.date} />
              </span>
              <IconArrowRight className="w-5 h-5 text-stone-700 dark:text-stone-300 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>

        {/* Tile Explorar Séries */}
        <Link
          href="#series"
          className="overflow-hidden rounded-2xl border border-stone-200 dark:border-slate-700 bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-sm hover:shadow-lg transition-all"
        >
          <div className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-3">
              <IconCompass className="w-6 h-6" />
              <h3 className="text-2xl font-semibold">Explorar Séries</h3>
            </div>
            <p className="opacity-90">Veja todos os estudos disponíveis e comece por onde preferir.</p>
            <div className="mt-6 inline-flex items-center gap-2 bg-white/15 px-3 py-1.5 rounded-full text-sm">
              Ver séries
              <IconArrowRight className="w-4 h-4" />
            </div>
          </div>
        </Link>

        {/* Tile Versículo do Dia */}
        <div className="overflow-hidden rounded-2xl border border-stone-200 dark:border-slate-700 bg-white dark:bg-slate-800 shadow-sm">
          <div className="p-6 md:p-8">
            <h3 className="text-2xl font-semibold text-stone-900 dark:text-stone-100 mb-2">Versículo do Dia</h3>
            <p className="text-stone-700 dark:text-stone-300 leading-relaxed">“{verse.text}”</p>
            <p className="mt-3 text-sm text-stone-500 dark:text-stone-500">{verse.ref}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroBento;
