import type { Metadata } from "next";
import { JPGToPDFTool } from "./tool";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `JPG to PDF - Free Online Tool | ${siteConfig.name}`,
  description: "Convert JPG images to PDF format. Create PDF from photos in seconds. No installation required.",
  keywords: ["jpg to pdf", "jpeg to pdf", "image to pdf", "photo to pdf", "free tool", "online tool"],
  openGraph: {
    title: `JPG to PDF - Free Online Tool | ${siteConfig.name}`,
    description: "Convert JPG images to PDF format. Create PDF from photos in seconds.",
    url: `${siteConfig.url}/tools/jpg-to-pdf`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `JPG to PDF - Free Online Tool | ${siteConfig.name}`,
    description: "Convert JPG images to PDF format. Create PDF from photos in seconds.",
  },
  alternates: {
    canonical: `${siteConfig.url}/tools/jpg-to-pdf`,
  },
};

export default function JPGToPDFPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "JPG to PDF",
            description: "Convert JPG images to PDF format. Create PDF from photos in seconds.",
            url: `${siteConfig.url}/tools/jpg-to-pdf`,
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
      <JPGToPDFTool />
    </>
  );
}
