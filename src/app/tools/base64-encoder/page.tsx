import type { Metadata } from "next";
import { Base64EncoderTool } from "./tool";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: `Base64 Encoder / Decoder - Free Online Tool | ${siteConfig.name}`,
  description: "Encode text to Base64 or decode Base64 strings. Supports text and file encoding. No installation required.",
  keywords: ["base64 encode", "base64 decode", "base64 converter", "encode base64", "free tool", "online tool"],
  openGraph: {
    title: `Base64 Encoder / Decoder - Free Online Tool | ${siteConfig.name}`,
    description: "Encode text to Base64 or decode Base64 strings. Supports text and file encoding.",
    url: `${siteConfig.url}/tools/base64-encoder`,
    siteName: siteConfig.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Base64 Encoder / Decoder - Free Online Tool | ${siteConfig.name}`,
    description: "Encode text to Base64 or decode Base64 strings. Supports text and file encoding.",
  },
  alternates: {
    canonical: `${siteConfig.url}/tools/base64-encoder`,
  },
};

export default function Base64EncoderPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Base64 Encoder / Decoder",
            description: "Encode text to Base64 or decode Base64 strings.",
            url: `${siteConfig.url}/tools/base64-encoder`,
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
      <Base64EncoderTool />
    </>
  );
}
