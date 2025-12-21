import Link from "next/link";
import { BookOpen } from "lucide-react";
import DateFormatter from "./date-formatter";
import { type Post } from "@/interfaces/post";
import { buildPostHref } from "@/lib/slug";

export function LatestChapterCard({ post }: { post: Post }) {
  return (
    <section className="mt-12 md:mt-16 mb-12">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 text-stone-900 dark:text-stone-100">
        Último capítulo publicado
      </h2>
      <Link
        href={buildPostHref(post.slug)}
        className="group block rounded-2xl overflow-hidden shadow-2xl hover:shadow-2xl transition-shadow border-2 border-stone-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
      >
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="md:col-span-2 p-6 md:p-8">
            <h3 className="text-2xl font-bold mb-2 text-stone-900 dark:text-stone-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
              {post.title}
            </h3>
            <p className="text-stone-600 dark:text-stone-400 mb-4 line-clamp-3">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-3 text-sm text-stone-500 dark:text-stone-500">
              <BookOpen className="w-4 h-4" />
              <DateFormatter dateString={post.date} />
            </div>
          </div>
          <div className="relative">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent"></div>
          </div>
        </div>
      </Link>
    </section>
  );
}
