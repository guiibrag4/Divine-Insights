import { SeriesCard } from "./series-card";

type StudySeries = {
  title: string;
  description: string;
  slug: string;
  coverImage: string;
  chaptersCount: number;
  lastUpdate: string;
  status: "em-andamento" | "completo";
};

type Props = {
  series: StudySeries[];
};

export function StudySeriesGrid({ series }: Props) {
  return (
    <section className="mb-32">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 text-stone-900 dark:text-stone-100 text-center">
        Séries de Estudos Disponíveis
      </h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-5">
        {series.map((item) => (
          <SeriesCard key={item.slug} item={item} />
        ))}
      </div>
    </section>
  );
}
