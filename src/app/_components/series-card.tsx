import Link from "next/link";
import { CalendarDays, BookOpen } from "lucide-react";
import DateFormatter from "./date-formatter";
import { buildPostHref } from "@/lib/slug";

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
  item: StudySeries;
};

export function SeriesCard({ item }: Props) {
  return (
    <Link
      href={buildPostHref(item.slug)}
      className="group block rounded-xl overflow-hidden shadow-2xl hover:shadow-2xl transition-all duration-300 border-2 border-stone-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
    >
      <div className="relative h-48">
        <img
          src={item.coverImage}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            item.status === "completo" ? "bg-green-500 text-white" : "bg-yellow-500 text-stone-900"
          }`}>
            {item.status === "completo" ? "✓ Completo" : "📝 Em Andamento"}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2 text-stone-900 dark:text-stone-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
          {item.title}
        </h3>
        <p className="text-stone-600 dark:text-stone-400 mb-4 line-clamp-3">
          {item.description}
        </p>
        <div className="flex items-center justify-between text-sm text-stone-500 dark:text-stone-500 pt-4 border-t border-stone-200 dark:border-slate-700">
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
