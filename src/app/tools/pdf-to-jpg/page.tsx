import type { Metadata } from "next";
import { PDFToJPGTool } from "./tool";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `PDF to JPG - Free Online Tool | ${siteConfig.name}`,
  description: "Convert PDF pages to JPG images. Extract images or convert entire pages. No installation required.",
  keywords: ["pdf to jpg", "pdf to image", "pdf to jpeg", "convert pdf to image", "free tool", "online tool"],
  openGraph: {
    title: `PDF to JPG - Free Online Tool | ${siteConfig.name}`,
    description: "Convert PDF pages to JPG images. Extract images or convert entire pages.",
    url: `${siteConfig.url}/tools/pdf-to-jpg`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `PDF to JPG - Free Online Tool | ${siteConfig.name}`,
    description: "Convert PDF pages to JPG images. Extract images or convert entire pages.",
  },
  alternates: {
    canonical: `${siteConfig.url}/tools/pdf-to-jpg`,
  },
};

export default function PDFToJPGPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "PDF to JPG",
            description: "Convert PDF pages to JPG images. Extract images or convert entire pages.",
            url: `${siteConfig.url}/tools/pdf-to-jpg`,
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
      <PDFToJPGTool />
    </>
  );
}
