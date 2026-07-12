import type { Metadata } from "next";
import { JSONFormatterTool } from "./tool";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `JSON Formatter - Free Online Tool | ${siteConfig.name}`,
  description: "Format, validate, and beautify JSON data. Minify or prettify JSON strings. No installation required.",
  keywords: ["json formatter", "json beautifier", "json validator", "format json", "free tool", "online tool"],
  openGraph: {
    title: `JSON Formatter - Free Online Tool | ${siteConfig.name}`,
    description: "Format, validate, and beautify JSON data. Minify or prettify JSON strings.",
    url: `${siteConfig.url}/tools/json-formatter`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `JSON Formatter - Free Online Tool | ${siteConfig.name}`,
    description: "Format, validate, and beautify JSON data. Minify or prettify JSON strings.",
  },
  alternates: {
    canonical: `${siteConfig.url}/tools/json-formatter`,
  },
};

export default function JSONFormatterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "JSON Formatter",
            description: "Format, validate, and beautify JSON data.",
            url: `${siteConfig.url}/tools/json-formatter`,
            applicationCategory: "DeveloperApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />
      <JSONFormatterTool />
    </>
  );
}
