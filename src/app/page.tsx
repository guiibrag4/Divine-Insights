import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { HomeHero } from "@/app/_components/home-hero";
import { StudySeriesGrid } from "@/app/_components/study-series-grid";
import { LatestChapterCard } from "@/app/_components/latest-chapter-card";
import { SeriesFilters } from "@/app/_components/series-filters";
import { getAllPosts } from "@/lib/api";
import { getAllSeries } from "@/lib/series";

export const revalidate = 60; // Revalidar a cada 60 segundos

export default async function Index() {
  const [allPosts, studySeries] = await Promise.all([getAllPosts(), getAllSeries()]);
  const latestPost = allPosts[0];

  if (!latestPost) {
    return (
      <main>
        <Container>
          <Header />
          <p className="text-stone-600 dark:text-stone-300">Nenhum estudo publicado ainda.</p>
        </Container>
      </main>
    );
  }

  return (
    <main>
      <Container>
        <Header />
        <HomeHero primaryCtaSlug={latestPost.slug} indexSlug={studySeries[0].slug} />

        <LatestChapterCard post={latestPost} />
        <SeriesFilters />
        <StudySeriesGrid series={studySeries} />
      </Container>
    </main>
  );
}
