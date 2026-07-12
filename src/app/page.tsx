import Link from "next/link";
import { siteConfig } from "@/config/site";
import { tools } from "@/config/tools";
import { ToolCard } from "@/components/tool-card";
import { Header, Footer } from "@/components/layout";
import {
  FileText,
  Image,
  Type,
  Code,
  Shield,
  Zap,
  Globe,
} from "lucide-react";

export default function Home() {
  const pdfTools = tools.filter((t) => t.category === "pdf");
  const imageTools = tools.filter((t) => t.category === "image");
  const textTools = tools.filter((t) => t.category === "text");
  const devTools = tools.filter((t) => t.category === "developer");

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden py-12 md:py-20">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#62CDFF] opacity-20 blur-3xl" />
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#D6A2FF] opacity-20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-[#7AE582] opacity-10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="clay-sm inline-flex items-center gap-2 px-5 py-2 mb-8">
            <Shield className="h-4 w-4 text-[#7AE582]" />
            <span className="text-sm font-bold text-[#2D3557] dark:text-[#F0F4FF]">100% Private — Your files never leave your browser</span>
          </div>
          
          <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl leading-tight">
            Free Online{" "}
            <span className="text-gradient">Tools</span>
          </h1>
          
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#6B7280] dark:text-[#9CA3AF] md:text-xl font-medium">
            {siteConfig.description}
          </p>
          
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <div className="clay-sm flex items-center gap-2 px-5 py-2.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#7AE582]" />
              <span className="text-sm font-bold text-[#2D3557] dark:text-[#F0F4FF]">No signup required</span>
            </div>
            <div className="clay-sm flex items-center gap-2 px-5 py-2.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#62CDFF]" />
              <span className="text-sm font-bold text-[#2D3557] dark:text-[#F0F4FF]">100% free</span>
            </div>
            <div className="clay-sm flex items-center gap-2 px-5 py-2.5">
              <div className="h-2.5 w-2.5 rounded-full bg-[#FFB347]" />
              <span className="text-sm font-bold text-[#2D3557] dark:text-[#F0F4FF]">Lightning fast</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tools by Category */}
      <main className="flex-1 pb-20">
        <div className="mx-auto max-w-6xl px-4 space-y-20">
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
      </main>

      {/* Features Section */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-extrabold text-center mb-16">Why ToolSpace?</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="clay-card flex flex-col items-center text-center p-8">
              <div className="clay-blue flex h-16 w-16 items-center justify-center text-white mb-6">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-extrabold mb-3">100% Private</h3>
              <p className="text-[#6B7280] dark:text-[#9CA3AF] font-medium">
                All processing happens in your browser. Your files never leave your device.
              </p>
            </div>
            <div className="clay-card flex flex-col items-center text-center p-8">
              <div className="clay-coral flex h-16 w-16 items-center justify-center text-white mb-6">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-extrabold mb-3">Lightning Fast</h3>
              <p className="text-[#6B7280] dark:text-[#9CA3AF] font-medium">
                Process files instantly in your browser. No waiting for uploads.
              </p>
            </div>
            <div className="clay-card flex flex-col items-center text-center p-8">
              <div className="clay-mint flex h-16 w-16 items-center justify-center text-white mb-6">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-extrabold mb-3">Works Everywhere</h3>
              <p className="text-[#6B7280] dark:text-[#9CA3AF] font-medium">
                Use on any device, any browser. No installation required.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
