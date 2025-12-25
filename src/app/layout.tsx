import Footer from "@/app/_components/footer";
import { HOME_OG_IMAGE_URL } from "@/lib/constants";
import { NoFOUCScript } from "./_components/theme-switcher";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import cn from "classnames";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `Divine Insights - Estudos Bíblicos Profundos`,
  description: `Explore estudos bíblicos detalhados com análises profundas das Escrituras Sagradas. Fortaleça sua caminhada espiritual com conteúdo de qualidade.`,
  metadataBase: new URL("https://divine-insights.vercel.app"),
  openGraph: {
    images: [HOME_OG_IMAGE_URL],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#000000"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      </head>
      <body
        className={cn(inter.className, "bg-[#F5F5F5] dark:bg-[#0D0D0D] text-[#1A1A1A] dark:text-[#F2F2F2]")} suppressHydrationWarning
      >
        {/* Inject theme script early to avoid FOUC and ensure updateDOM exists */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(${NoFOUCScript.toString()})("nextjs-blog-starter-theme")`,
          }}
        />
        <div className="min-h-screen" suppressHydrationWarning>{children}</div>
        <Footer />
      </body>
    </html>
  );
}
