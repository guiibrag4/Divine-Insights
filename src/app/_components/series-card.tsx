import Link from "next/link";
import { CalendarDays, BookOpen } from "lucide-react";
import DateFormatter from "./date-formatter";
import { buildPostHref } from "@/lib/slug";
import { type Series } from "@/interfaces/series";

type Props = {
  item: Series;
};

export function SeriesCard({ item }: Props) {
  return (
    <Link
      href={buildPostHref(item.slug)}
      className="theme-card group block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-neutral-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
    >
      <div className="relative h-48">
        <img
          src={item.coverImage}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              item.status === "completo"
                ? "bg-green-500 text-white"
                : item.status === "em-andamento"
                ? "bg-yellow-500 text-stone-900"
                : "bg-stone-500 text-white"
            }`}
          >
            {item.status === "completo"
              ? "✓ Completo"
              : item.status === "em-andamento"
              ? "📝 Em Andamento"
              : "Rascunho"}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-neutral-900 dark:text-neutral-50 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {item.title}
        </h3>
        <p className="text-neutral-700 dark:text-neutral-300 mb-4 line-clamp-3">
          {item.description}
        </p>
        <div className="flex items-center justify-between text-sm text-neutral-500 dark:text-neutral-400 pt-4 border-t border-neutral-200 dark:border-slate-700">
          <span className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            {item.chaptersCount} capítulos
          </span>
          <span className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4" />
            <DateFormatter dateString={item.lastUpdate} />
          </span>
        </div>
      </div>
    </Link>
  );
}
