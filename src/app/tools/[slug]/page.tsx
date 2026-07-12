import type { Metadata } from "next";
import { getToolBySlug } from "@/config/tools";
import { siteConfig } from "@/config/site";
import { ToolPageClient } from "./client";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return {
      title: "Tool Not Found",
    };
  }

  const title = `${tool.name} - Free Online Tool | ${siteConfig.name}`;
  const description = `${tool.description} No installation required. Works in your browser.`;

  return {
    title,
    description,
    keywords: [...tool.keywords, "free tool", "online tool", "no signup"],
    openGraph: {
      title,
      description,
      url: `${siteConfig.url}/tools/${tool.slug}`,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    alternates: {
      canonical: `${siteConfig.url}/tools/${tool.slug}`,
    },
  };
}

export default async function ToolPageLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  const jsonLd = tool
    ? {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: tool.name,
        description: tool.description,
        url: `${siteConfig.url}/tools/${tool.slug}`,
        applicationCategory: "UtilityApplication",
        operatingSystem: "Web Browser",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
      }
    : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      {children}
    </>
  );
}
