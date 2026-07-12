"use client";

import { useState } from "react";
import { Type, Copy, Check } from "lucide-react";
import { ToolPageLayout } from "@/components/tool-layout";

interface TextStats {
  characters: number;
  charactersNoSpaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  lines: number;
  readingTime: string;
  speakingTime: string;
}

function analyzeText(text: string): TextStats {
  const trimmed = text.trim();
  if (!trimmed) {
    return {
      characters: 0,
      charactersNoSpaces: 0,
      words: 0,
      sentences: 0,
      paragraphs: 0,
      lines: 0,
      readingTime: "0 min",
      speakingTime: "0 min",
    };
  }

  const words = trimmed.split(/\s+/).filter(Boolean);
  const sentences = trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const paragraphs = trimmed.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
  const lines = trimmed.split("\n");

  const readingMinutes = Math.ceil(words.length / 200);
  const speakingMinutes = Math.ceil(words.length / 130);

  return {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, "").length,
    words: words.length,
    sentences: sentences.length,
    paragraphs: paragraphs.length || 1,
    lines: lines.length,
    readingTime: readingMinutes < 1 ? "< 1 min" : `${readingMinutes} min`,
    speakingTime: speakingMinutes < 1 ? "< 1 min" : `${speakingMinutes} min`,
  };
}

export function WordCounterTool() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);

  const stats = analyzeText(text);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageLayout
      title="Word Counter"
      description="Count words, characters, sentences, and paragraphs"
      icon={<Type className="h-8 w-8" />}
      breadcrumbs={[{ label: "Tools", href: "/tools" }, { label: "Word Counter" }]}
    >
      <div className="space-y-6">
        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or paste your text here..."
            className="clay-input w-full h-64 p-5 text-base resize-none focus:outline-none font-medium"
          />
          {text && (
            <button
              onClick={handleCopy}
              className="clay-sm absolute top-3 right-3 flex h-10 w-10 items-center justify-center text-[#62CDFF] hover:scale-110 transition-transform"
              aria-label="Copy text"
            >
              {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <StatCard label="Characters" value={stats.characters} />
          <StatCard label="No Spaces" value={stats.charactersNoSpaces} />
          <StatCard label="Words" value={stats.words} />
          <StatCard label="Sentences" value={stats.sentences} />
          <StatCard label="Paragraphs" value={stats.paragraphs} />
          <StatCard label="Lines" value={stats.lines} />
          <StatCard label="Reading Time" value={stats.readingTime} isText />
          <StatCard label="Speaking Time" value={stats.speakingTime} isText />
        </div>
      </div>
    </ToolPageLayout>
  );
}

function StatCard({
  label,
  value,
  isText = false,
}: {
  label: string;
  value: number | string;
  isText?: boolean;
}) {
  return (
    <div className="clay-card p-4 text-center">
      <p className="text-xs font-bold text-[#9CA3AF] dark:text-[#9CA3AF] uppercase">{label}</p>
      <p className="mt-2 text-2xl font-extrabold text-[#2D3557] dark:text-[#F0F4FF]">
        {isText ? value : value.toLocaleString()}
      </p>
    </div>
  );
}
