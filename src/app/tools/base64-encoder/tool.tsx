"use client";

import { useState } from "react";
import { Binary, Copy, Check, ArrowLeftRight } from "lucide-react";
import { ToolPageLayout, ToolStatusMessage } from "@/components/tool-layout";

export function Base64EncoderTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = () => {
    try {
      if (mode === "encode") {
        const encoded = btoa(unescape(encodeURIComponent(input)));
        setOutput(encoded);
      } else {
        const decoded = decodeURIComponent(escape(atob(input)));
        setOutput(decoded);
      }
      setError(null);
    } catch {
      setError(
        mode === "decode"
          ? "Invalid Base64 string. Please check your input."
          : "Failed to encode. Please check your input."
      );
      setOutput("");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSwap = () => {
    setInput(output);
    setOutput("");
    setMode(mode === "encode" ? "decode" : "encode");
  };

  return (
    <ToolPageLayout
      title="Base64 Encoder / Decoder"
      description="Encode text to Base64 or decode Base64 strings"
      icon={<Binary className="h-8 w-8" />}
      breadcrumbs={[{ label: "Tools", href: "/tools" }, { label: "Base64 Encoder" }]}
    >
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMode("encode")}
            className={`clay-sm px-5 py-3 text-sm font-bold transition-transform hover:scale-105 ${
              mode === "encode" ? "clay-button text-white" : "text-[#2D3557] dark:text-[#F0F4FF]"
            }`}
          >
            Encode
          </button>
          <button
            onClick={() => setMode("decode")}
            className={`clay-sm px-5 py-3 text-sm font-bold transition-transform hover:scale-105 ${
              mode === "decode" ? "clay-button text-white" : "text-[#2D3557] dark:text-[#F0F4FF]"
            }`}
          >
            Decode
          </button>
        </div>

        <div>
          <label className="text-sm font-bold mb-2 block">
            {mode === "encode" ? "Input Text" : "Input Base64"}
          </label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === "encode" ? "Enter text to encode..." : "Enter Base64 to decode..."}
            className="clay-input w-full h-40 p-5 font-mono text-sm resize-none focus:outline-none"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleConvert}
            disabled={!input.trim()}
            className="clay-button px-6 py-3 text-sm font-bold text-white disabled:opacity-50"
          >
            {mode === "encode" ? "Encode" : "Decode"}
          </button>
          <button
            onClick={handleSwap}
            disabled={!output}
            className="clay-sm px-6 py-3 text-sm font-bold text-[#2D3557] dark:text-[#F0F4FF] disabled:opacity-50 hover:scale-105 transition-transform flex items-center gap-2"
          >
            <ArrowLeftRight className="h-4 w-4" />
            Swap
          </button>
        </div>

        {error && <ToolStatusMessage type="error" message={error} />}

        {output && (
          <div className="relative">
            <label className="text-sm font-bold mb-2 block">
              {mode === "encode" ? "Base64 Output" : "Decoded Text"}
            </label>
            <pre className="clay-card p-5 font-mono text-sm overflow-auto max-h-64">
              {output}
            </pre>
            <button
              onClick={handleCopy}
              className="clay-sm absolute top-10 right-3 flex h-10 w-10 items-center justify-center text-[#62CDFF] hover:scale-110 transition-transform"
              aria-label="Copy output"
            >
              {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
            </button>
          </div>
        )}
      </div>
    </ToolPageLayout>
  );
}
