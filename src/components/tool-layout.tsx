"use client";

import { ReactNode } from "react";
import { Breadcrumbs } from "./breadcrumbs";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

interface ToolPageLayoutProps {
  title: string;
  description: string;
  icon: ReactNode;
  breadcrumbs: { label: string; href?: string }[];
  children: ReactNode;
}

export function ToolPageLayout({
  title,
  description,
  icon,
  breadcrumbs,
  children,
}: ToolPageLayoutProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Breadcrumbs items={breadcrumbs} />

      {/* Tool Header */}
      <div className="mt-8 mb-10">
        <div className="flex items-center gap-5">
          <div className="clay-coral flex h-16 w-16 items-center justify-center text-white shrink-0">
            {icon}
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{title}</h1>
            <p className="mt-2 text-base md:text-lg text-[#6B7280] dark:text-[#9CA3AF] font-medium">
              {description}
            </p>
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}

interface ToolActionButtonProps {
  onClick: () => void;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  icon: ReactNode;
  label: string;
}

export function ToolActionButton({
  onClick,
  disabled,
  loading,
  loadingText = "Processing...",
  icon,
  label,
}: ToolActionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className="clay-button w-full h-14 md:h-16 text-base md:text-lg font-extrabold text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
    >
      {loading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          {loadingText}
        </>
      ) : (
        <>
          {icon}
          {label}
        </>
      )}
    </button>
  );
}

interface ToolStatusMessageProps {
  type: "error" | "success";
  message: string;
}

export function ToolStatusMessage({ type, message }: ToolStatusMessageProps) {
  if (type === "error") {
    return (
      <div className="clay-coral flex items-center gap-3 p-5 text-white">
        <AlertCircle className="h-5 w-5 shrink-0" />
        <p className="text-sm font-bold">{message}</p>
      </div>
    );
  }

  return (
    <div className="clay-mint flex items-center gap-3 p-5 text-white">
      <CheckCircle2 className="h-5 w-5 shrink-0" />
      <p className="text-sm font-bold">{message}</p>
    </div>
  );
}
