import Container from "@/app/_components/container";
import Header from "@/app/_components/header";
import { HomeHero } from "@/app/_components/home-hero";
import { StudySeriesGrid } from "@/app/_components/study-series-grid";
import { LatestChapterCard } from "@/app/_components/latest-chapter-card";
import { SeriesFilters } from "@/app/_components/series-filters";
import { getAllPosts } from "@/lib/api";

export default function Index() {
  const allPosts = getAllPosts();
  const latestPost = allPosts[0];

  // Identifica séries de estudos disponíveis
  const studySeries = [
    {
      title: "1 João",
      description: "Estudo completo sobre comunhão, luz e amor. Explore os ensinamentos profundos do apóstolo João sobre como viver em verdadeira comunhão com Deus e com os irmãos.",
      slug: "1joao/1joao-00-indice",
      coverImage: "/assets/blog/estudos/1joao-cover.png",
      chaptersCount: 2,
      lastUpdate: "2025-12-20T09:00:00.000Z",
      status: "em-andamento" as const,
    },
    {
      title: "Tiago",
      description: "A fé prática e viva. Descubra como aplicar a palavra de Deus no dia a dia através dos ensinamentos diretos e transformadores do apóstolo Tiago.",
      slug: "tiago/tiago-00-indice",
      coverImage: "/assets/blog/estudos/tiago-cover.png",
      chaptersCount: 4,
      lastUpdate: "2025-12-21T10:00:00.000Z",
      status: "completo" as const,
    },
  ];

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
