import type { Metadata } from "next";
import { PDFCompressorTool } from "./tool";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `PDF Compressor - Free Online Tool | ${siteConfig.name}`,
  description: "Reduce PDF file size without losing quality. Compress for web, email, or storage. No installation required.",
  keywords: ["compress pdf", "reduce pdf size", "pdf optimizer", "shrink pdf", "free tool", "online tool"],
  openGraph: {
    title: `PDF Compressor - Free Online Tool | ${siteConfig.name}`,
    description: "Reduce PDF file size without losing quality. Compress for web, email, or storage.",
    url: `${siteConfig.url}/tools/pdf-compressor`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `PDF Compressor - Free Online Tool | ${siteConfig.name}`,
    description: "Reduce PDF file size without losing quality. Compress for web, email, or storage.",
  },
  alternates: {
    canonical: `${siteConfig.url}/tools/pdf-compressor`,
  },
};

export default function PDFCompressorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "PDF Compressor",
            description: "Reduce PDF file size without losing quality.",
            url: `${siteConfig.url}/tools/pdf-compressor`,
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
      <PDFCompressorTool />
    </>
  );
}
