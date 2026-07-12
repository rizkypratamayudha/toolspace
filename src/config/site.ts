export const siteConfig = {
  name: "ToolSpace",
  title: "ToolSpace - Free Online Tools",
  description:
    "Free online tools for PDF, images, text, and developers. Fast, secure, no signup required. Your files never leave your browser.",
  url: "https://toolspace.vercel.app",
  ogImage: "/og.png",
  links: {
    twitter: "",
    github: "",
  },
  categories: [
    { slug: "pdf", name: "PDF Tools", icon: "FileText", description: "Merge, split, compress, and convert PDF files" },
    { slug: "image", name: "Image Tools", icon: "Image", description: "Compress, resize, and convert images" },
    { slug: "text", name: "Text Tools", icon: "Type", description: "Count words, analyze text, and more" },
    { slug: "developer", name: "Developer Tools", icon: "Code", description: "JSON formatter, Base64, and encoding tools" },
  ] as const,
};

export type CategorySlug = (typeof siteConfig.categories)[number]["slug"];
