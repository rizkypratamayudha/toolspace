import type { CategorySlug } from "./site";

export interface ToolConfig {
  slug: string;
  name: string;
  description: string;
  category: CategorySlug;
  icon: string;
  keywords: string[];
  maxFileSize?: number;
  supportedFormats?: string[];
}

export const tools: ToolConfig[] = [
  // PDF Tools
  {
    slug: "pdf-merger",
    name: "PDF Merger",
    description: "Merge multiple PDF files into one document. Fast, secure, and free.",
    category: "pdf",
    icon: "Merge",
    keywords: ["merge pdf", "combine pdf", "join pdf", "merge pdf files"],
    maxFileSize: 100 * 1024 * 1024,
    supportedFormats: ["application/pdf"],
  },
  {
    slug: "pdf-splitter",
    name: "PDF Splitter",
    description: "Split a PDF into multiple files. Extract specific pages or split every page.",
    category: "pdf",
    icon: "Scissors",
    keywords: ["split pdf", "extract pdf pages", "separate pdf", "cut pdf"],
    maxFileSize: 100 * 1024 * 1024,
    supportedFormats: ["application/pdf"],
  },
  {
    slug: "pdf-compressor",
    name: "PDF Compressor",
    description: "Reduce PDF file size without losing quality. Compress for web, email, or storage.",
    category: "pdf",
    icon: "Minimize2",
    keywords: ["compress pdf", "reduce pdf size", "pdf optimizer", "shrink pdf"],
    maxFileSize: 100 * 1024 * 1024,
    supportedFormats: ["application/pdf"],
  },
  {
    slug: "jpg-to-pdf",
    name: "JPG to PDF",
    description: "Convert JPG images to PDF format. Create PDF from photos in seconds.",
    category: "pdf",
    icon: "Image",
    keywords: ["jpg to pdf", "jpeg to pdf", "image to pdf", "photo to pdf"],
    maxFileSize: 50 * 1024 * 1024,
    supportedFormats: ["image/jpeg", "image/png", "image/webp"],
  },
  {
    slug: "pdf-to-jpg",
    name: "PDF to JPG",
    description: "Convert PDF pages to JPG images. Extract images or convert entire pages.",
    category: "pdf",
    icon: "FileImage",
    keywords: ["pdf to jpg", "pdf to image", "pdf to jpeg", "convert pdf to image"],
    maxFileSize: 100 * 1024 * 1024,
    supportedFormats: ["application/pdf"],
  },
  // Image Tools
  {
    slug: "image-compressor",
    name: "Image Compressor",
    description: "Compress JPEG, PNG, WebP images without losing quality. Reduce file size by up to 80%.",
    category: "image",
    icon: "Minimize2",
    keywords: ["compress image", "reduce image size", "image optimizer", "compress jpeg"],
    maxFileSize: 50 * 1024 * 1024,
    supportedFormats: ["image/jpeg", "image/png", "image/webp"],
  },
  {
    slug: "image-resizer",
    name: "Image Resizer",
    description: "Resize images to any dimension. Maintain aspect ratio or crop to fit.",
    category: "image",
    icon: "Maximize2",
    keywords: ["resize image", "image resizer", "scale image", "change image size"],
    maxFileSize: 50 * 1024 * 1024,
    supportedFormats: ["image/jpeg", "image/png", "image/webp"],
  },
  // Text Tools
  {
    slug: "word-counter",
    name: "Word Counter",
    description: "Count words, characters, sentences, and paragraphs. Includes reading time estimate.",
    category: "text",
    icon: "Type",
    keywords: ["word counter", "character counter", "word count", "text counter"],
  },
  // Developer Tools
  {
    slug: "json-formatter",
    name: "JSON Formatter",
    description: "Format, validate, and beautify JSON data. Minify or prettify JSON strings.",
    category: "developer",
    icon: "Code",
    keywords: ["json formatter", "json beautifier", "json validator", "format json"],
  },
  {
    slug: "base64-encoder",
    name: "Base64 Encoder / Decoder",
    description: "Encode text to Base64 or decode Base64 strings. Supports text and file encoding.",
    category: "developer",
    icon: "Binary",
    keywords: ["base64 encode", "base64 decode", "base64 converter", "encode base64"],
  },
];

export function getToolBySlug(slug: string): ToolConfig | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: CategorySlug): ToolConfig[] {
  return tools.filter((t) => t.category === category);
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}
