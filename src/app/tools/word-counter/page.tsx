import type { Metadata } from "next";
import { WordCounterTool } from "./tool";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Word Counter - Free Online Tool | ${siteConfig.name}`,
  description: "Count words, characters, sentences, and paragraphs. Includes reading time estimate. No installation required.",
  keywords: ["word counter", "character counter", "word count", "text counter", "free tool", "online tool"],
  openGraph: {
    title: `Word Counter - Free Online Tool | ${siteConfig.name}`,
    description: "Count words, characters, sentences, and paragraphs. Includes reading time estimate.",
    url: `${siteConfig.url}/tools/word-counter`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Word Counter - Free Online Tool | ${siteConfig.name}`,
    description: "Count words, characters, sentences, and paragraphs. Includes reading time estimate.",
  },
  alternates: {
    canonical: `${siteConfig.url}/tools/word-counter`,
  },
};

export default function WordCounterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Word Counter",
            description: "Count words, characters, sentences, and paragraphs. Includes reading time estimate.",
            url: `${siteConfig.url}/tools/word-counter`,
            applicationCategory: "UtilityApplication",
            operatingSystem: "Web Browser",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />
      <WordCounterTool />
    </>
  );
}
