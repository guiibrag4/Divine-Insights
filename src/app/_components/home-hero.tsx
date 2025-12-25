"use client";
import { BookOpen, SunMedium, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { heroImages } from "@/lib/brand";
import { useMemo } from "react";
import { buildPostHref } from "@/lib/slug";

type Props = {
  primaryCtaSlug: string; // capítulo mais recente
  indexSlug: string; // índice da série principal
};

export function HomeHero({ primaryCtaSlug, indexSlug }: Props) {
  const picked = useMemo(() => {
    // Use deterministic selection based on date to avoid hydration mismatch
    // Same image all day, rotates next day
    const today = new Date().getDate();
    const i = today % heroImages.length;
    return heroImages[i];
  }, []);
  return (
    <section className="mt-10 md:mt-14 mb-8 md:mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Bloco editorial */}
        <div>
          <p className="mt-4 text-lg md:text-xl text-neutral-600 dark:text-neutral-400">
            Estudos bíblicos profundos com aplicação prática e navegação inteligente.
          </p>
          <div className="mt-6 flex gap-3">
            <Link
              href={buildPostHref(primaryCtaSlug)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-gradient-to-r from-accent-blue-600 to-accent-purple-600 text-white shadow-lg hover:shadow-xl hover:from-accent-blue-700 hover:to-accent-purple-700 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue-600"
            >
              <BookOpen className="w-5 h-5" />
              Começar a Ler
            </Link>
          </div>

          {/* Ícones removidos conforme pedido */}
        </div>

        {/* Visual à direita (rotaciona entre 3 imagens de identidade) */}
        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-accent-blue-100 to-accent-purple-100 dark:from-neutral-800 dark:to-neutral-700">
            <Image
              src={picked.src}
              alt={picked.alt}
              width={900}
              height={600}
              className="object-cover w-full h-[280px] md:h-[340px]"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent rounded-2xl" />
        </div>
      </div>
    </section>
  );
}
