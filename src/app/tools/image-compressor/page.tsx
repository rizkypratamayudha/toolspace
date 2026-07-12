import type { Metadata } from "next";
import { ImageCompressorTool } from "./tool";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Image Compressor - Free Online Tool | ${siteConfig.name}`,
  description: "Compress JPEG, PNG, WebP images without losing quality. Reduce file size by up to 80%. No installation required.",
  keywords: ["compress image", "reduce image size", "image optimizer", "compress jpeg", "free tool", "online tool"],
  openGraph: {
    title: `Image Compressor - Free Online Tool | ${siteConfig.name}`,
    description: "Compress JPEG, PNG, WebP images without losing quality. Reduce file size by up to 80%.",
    url: `${siteConfig.url}/tools/image-compressor`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Image Compressor - Free Online Tool | ${siteConfig.name}`,
    description: "Compress JPEG, PNG, WebP images without losing quality. Reduce file size by up to 80%.",
  },
  alternates: {
    canonical: `${siteConfig.url}/tools/image-compressor`,
  },
};

export default function ImageCompressorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Image Compressor",
            description: "Compress JPEG, PNG, WebP images without losing quality.",
            url: `${siteConfig.url}/tools/image-compressor`,
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
      <ImageCompressorTool />
    </>
  );
}
