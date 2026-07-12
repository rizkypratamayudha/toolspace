"use client";

import Link from "next/link";
import {
  FileText,
  Image,
  Type,
  Code,
  Merge,
  Scissors,
  Minimize2,
  Maximize2,
  FileImage,
  Binary,
} from "lucide-react";
import type { ToolConfig } from "@/config/tools";

const iconMap = {
  Merge,
  Scissors,
  Minimize2,
  Maximize2,
  Image,
  FileImage,
  FileText,
  Type,
  Code,
  Binary,
} as const;

const categoryStyles: Record<string, { clay: string; icon: string }> = {
  pdf: {
    clay: "clay-card",
    icon: "text-[#F76D6D]",
  },
  image: {
    clay: "clay-card",
    icon: "text-[#62CDFF]",
  },
  text: {
    clay: "clay-card",
    icon: "text-[#7AE582]",
  },
  developer: {
    clay: "clay-card",
    icon: "text-[#D6A2FF]",
  },
};

const iconBg: Record<string, string> = {
  pdf: "clay-coral",
  image: "clay-blue",
  text: "clay-mint",
  developer: "clay-lavender",
};

export function ToolCard({ tool }: { tool: ToolConfig }) {
  const IconComponent = iconMap[tool.icon as keyof typeof iconMap] || FileText;
  const styles = categoryStyles[tool.category] || categoryStyles.pdf;
  const iconBgStyle = iconBg[tool.category] || iconBg.pdf;

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={`group relative flex flex-col p-6 transition-all duration-200 ${styles.clay} hover:scale-[1.02]`}
    >
      <div className="flex items-start gap-4">
        <div className={`${iconBgStyle} flex h-12 w-12 shrink-0 items-center justify-center text-white`}>
          <IconComponent className="h-6 w-6" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-extrabold text-[#2D3557] dark:text-[#F0F4FF] group-hover:text-[#62CDFF] transition-colors">
            {tool.name}
          </h3>
          <p className="mt-2 text-sm text-[#6B7280] dark:text-[#9CA3AF] line-clamp-2 font-medium">
            {tool.description}
          </p>
        </div>
      </div>
      <div className="mt-5">
        <span className="clay-sm inline-flex items-center px-3 py-1 text-xs font-bold text-[#7AE582]">
          Free
        </span>
      </div>
    </Link>
  );
}
