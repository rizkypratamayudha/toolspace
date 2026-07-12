import type { Metadata } from "next";
import { PDFSplitterTool } from "./tool";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `PDF Splitter - Free Online Tool | ${siteConfig.name}`,
  description: "Split a PDF into multiple files. Extract specific pages or split every page. No installation required.",
  keywords: ["split pdf", "extract pdf pages", "separate pdf", "cut pdf", "free tool", "online tool"],
  openGraph: {
    title: `PDF Splitter - Free Online Tool | ${siteConfig.name}`,
    description: "Split a PDF into multiple files. Extract specific pages or split every page.",
    url: `${siteConfig.url}/tools/pdf-splitter`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `PDF Splitter - Free Online Tool | ${siteConfig.name}`,
    description: "Split a PDF into multiple files. Extract specific pages or split every page.",
  },
  alternates: {
    canonical: `${siteConfig.url}/tools/pdf-splitter`,
  },
};

export default function PDFSplitterPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "PDF Splitter",
            description: "Split a PDF into multiple files. Extract specific pages or split every page.",
            url: `${siteConfig.url}/tools/pdf-splitter`,
            applicationCategory: "DocumentApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />
      <PDFSplitterTool />
    </>
  );
}
