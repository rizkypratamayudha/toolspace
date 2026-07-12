import type { Metadata } from "next";
import { tools } from "@/config/tools";
import { ToolCard } from "@/components/tool-card";
import {
  FileText,
  Image,
  Type,
  Code,
} from "lucide-react";

export const metadata: Metadata = {
  title: "All Free Online Tools",
  description: "Browse all free online tools. PDF, image, text, and developer tools - all free, fast, and secure.",
};

const categoryMeta = {
  pdf: { icon: FileText, clay: "clay-coral" },
  image: { icon: Image, clay: "clay-blue" },
  text: { icon: Type, clay: "clay-mint" },
  developer: { icon: Code, clay: "clay-lavender" },
} as const;

export default function ToolsPage() {
  const pdfTools = tools.filter((t) => t.category === "pdf");
  const imageTools = tools.filter((t) => t.category === "image");
  const textTools = tools.filter((t) => t.category === "text");
  const devTools = tools.filter((t) => t.category === "developer");

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mb-16 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight">All Free Online Tools</h1>
        <p className="mt-4 text-xl text-[#6B7280] dark:text-[#9CA3AF] font-medium">
          Everything you need, all in one place.
        </p>
      </div>

      <div className="space-y-20">
        {/* PDF Tools */}
        <section id="pdf">
          <div className="flex items-center gap-4 mb-8">
            <div className="clay-coral flex h-14 w-14 items-center justify-center text-white">
              <FileText className="h-7 w-7" />
            </div>
            <h2 className="text-3xl font-extrabold">PDF Tools</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pdfTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>

        {/* Image Tools */}
        <section id="image">
          <div className="flex items-center gap-4 mb-8">
            <div className="clay-blue flex h-14 w-14 items-center justify-center text-white">
              <Image className="h-7 w-7" />
            </div>
            <h2 className="text-3xl font-extrabold">Image Tools</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {imageTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>

        {/* Text Tools */}
        <section id="text">
          <div className="flex items-center gap-4 mb-8">
            <div className="clay-mint flex h-14 w-14 items-center justify-center text-white">
              <Type className="h-7 w-7" />
            </div>
            <h2 className="text-3xl font-extrabold">Text Tools</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {textTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>

        {/* Developer Tools */}
        <section id="developer">
          <div className="flex items-center gap-4 mb-8">
            <div className="clay-lavender flex h-14 w-14 items-center justify-center text-white">
              <Code className="h-7 w-7" />
            </div>
            <h2 className="text-3xl font-extrabold">Developer Tools</h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {devTools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
