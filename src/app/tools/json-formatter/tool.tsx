"use client";

import { useState } from "react";
import { Code, Copy, Check } from "lucide-react";
import { ToolPageLayout, ToolStatusMessage } from "@/components/tool-layout";

export function JSONFormatterTool() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [indent, setIndent] = useState(2);

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError(null);
    } catch {
      setError("Invalid JSON. Please check your syntax.");
      setOutput("");
    }
  };

  const handleMinify = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError(null);
    } catch {
      setError("Invalid JSON. Please check your syntax.");
      setOutput("");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolPageLayout
      title="JSON Formatter"
      description="Format, validate, and beautify JSON data"
      icon={<Code className="h-8 w-8" />}
      breadcrumbs={[{ label: "Tools", href: "/tools" }, { label: "JSON Formatter" }]}
    >
      <div className="space-y-6">
        <div>
          <label className="text-sm font-bold mb-2 block">Input JSON</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"key": "value", "number": 42}'
            className="clay-input w-full h-48 p-5 font-mono text-sm resize-none focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-bold">Indent:</label>
            <select
              value={indent}
              onChange={(e) => setIndent(Number(e.target.value))}
              className="clay-input px-4 py-2 text-sm font-bold cursor-pointer"
            >
              <option value={2}>2 spaces</option>
              <option value={4}>4 spaces</option>
              <option value={8}>8 spaces</option>
            </select>
          </div>
          <button
            onClick={handleFormat}
            disabled={!input.trim()}
            className="clay-button px-6 py-3 text-sm font-bold text-white disabled:opacity-50"
          >
            Format
          </button>
          <button
            onClick={handleMinify}
            disabled={!input.trim()}
            className="clay-sm px-6 py-3 text-sm font-bold text-[#2D3557] dark:text-[#F0F4FF] disabled:opacity-50 hover:scale-105 transition-transform"
          >
            Minify
          </button>
        </div>

        {error && <ToolStatusMessage type="error" message={error} />}

        {output && (
          <div className="relative">
            <label className="text-sm font-bold mb-2 block">Output</label>
            <pre className="clay-card p-5 font-mono text-sm overflow-auto max-h-96">
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
