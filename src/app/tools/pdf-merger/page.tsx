import type { Metadata } from "next";
import { PDFMergerTool } from "./tool";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `PDF Merger - Free Online Tool | ${siteConfig.name}`,
  description: "Merge multiple PDF files into one document. Fast, secure, and free. No installation required.",
  keywords: ["merge pdf", "combine pdf", "join pdf", "merge pdf files", "free tool", "online tool"],
  openGraph: {
    title: `PDF Merger - Free Online Tool | ${siteConfig.name}`,
    description: "Merge multiple PDF files into one document. Fast, secure, and free.",
    url: `${siteConfig.url}/tools/pdf-merger`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `PDF Merger - Free Online Tool | ${siteConfig.name}`,
    description: "Merge multiple PDF files into one document. Fast, secure, and free.",
  },
  alternates: {
    canonical: `${siteConfig.url}/tools/pdf-merger`,
  },
};

export default function PDFMergerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "PDF Merger",
            description: "Free online tool to merge multiple PDF files into one document.",
            url: `${siteConfig.url}/tools/pdf-merger`,
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
      <PDFMergerTool />
    </>
  );
}
