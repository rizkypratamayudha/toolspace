import type { Metadata } from "next";
import { ImageResizerTool } from "./tool";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Image Resizer - Free Online Tool | ${siteConfig.name}`,
  description: "Resize images to any dimension. Maintain aspect ratio or crop to fit. No installation required.",
  keywords: ["resize image", "image resizer", "scale image", "change image size", "free tool", "online tool"],
  openGraph: {
    title: `Image Resizer - Free Online Tool | ${siteConfig.name}`,
    description: "Resize images to any dimension. Maintain aspect ratio or crop to fit.",
    url: `${siteConfig.url}/tools/image-resizer`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Image Resizer - Free Online Tool | ${siteConfig.name}`,
    description: "Resize images to any dimension. Maintain aspect ratio or crop to fit.",
  },
  alternates: {
    canonical: `${siteConfig.url}/tools/image-resizer`,
  },
};

export default function ImageResizerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Image Resizer",
            description: "Resize images to any dimension. Maintain aspect ratio or crop to fit.",
            url: `${siteConfig.url}/tools/image-resizer`,
            applicationCategory: "GraphicsApplication",
            operatingSystem: "Any",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />
      <ImageResizerTool />
    </>
  );
}
