"use client";

import { useState, useCallback } from "react";
import { Download, Scissors } from "lucide-react";
import { FileUploader } from "@/components/file-uploader";
import { ToolPageLayout, ToolActionButton, ToolStatusMessage } from "@/components/tool-layout";
import { splitPDF, getPDFPageCount } from "@/lib/pdf-utils";
import { Input } from "@/components/ui/input";

interface PageRange {
  start: string;
  end: string;
}

export function PDFSplitterTool() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [ranges, setRanges] = useState<PageRange[]>([{ start: "1", end: "" }]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFilesSelected = useCallback(async (files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setError(null);
      try {
        const count = await getPDFPageCount(files[0]);
        setPageCount(count);
        setRanges([{ start: "1", end: String(count) }]);
      } catch {
        setError("Failed to read PDF file");
      }
    }
  }, []);

  const addRange = () => {
    setRanges([...ranges, { start: "1", end: String(pageCount) }]);
  };

  const removeRange = (index: number) => {
    if (ranges.length > 1) {
      setRanges(ranges.filter((_, i) => i !== index));
    }
  };

  const updateRange = (index: number, field: keyof PageRange, value: string) => {
    const newRanges = [...ranges];
    newRanges[index][field] = value;
    setRanges(newRanges);
  };

  const handleSplit = async () => {
    if (!file) {
      setError("Please select a PDF file");
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const pageRanges = ranges.map((r) => ({
        start: parseInt(r.start) || 1,
        end: parseInt(r.end) || pageCount,
      }));

      const blobs = await splitPDF(file, pageRanges);

      for (let i = 0; i < blobs.length; i++) {
        const url = URL.createObjectURL(blobs[i]);
        const a = document.createElement("a");
        a.href = url;
        a.download = `split-${i + 1}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      setError("Failed to split PDF. Please check your page ranges.");
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolPageLayout
      title="PDF Splitter"
      description="Split a PDF into multiple files by page ranges"
      icon={<Scissors className="h-8 w-8" />}
      breadcrumbs={[{ label: "Tools", href: "/tools" }, { label: "PDF Splitter" }]}
    >
      <div className="space-y-6">
        <FileUploader
          accept={{ "application/pdf": [".pdf"] }}
          multiple={false}
          maxSize={100 * 1024 * 1024}
          onFilesSelected={handleFilesSelected}
          disabled={processing}
          loading={processing}
        />

        {pageCount > 0 && (
          <div className="clay-sm p-5">
            <p className="text-sm font-bold text-[#2D3557] dark:text-[#F0F4FF]">
              Total pages: <span className="text-[#62CDFF]">{pageCount}</span>
            </p>
          </div>
        )}

        {pageCount > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold">Page Ranges</h3>
              <button onClick={addRange} className="clay-sm px-4 py-2 text-sm font-bold text-[#62CDFF] hover:scale-105 transition-transform">
                + Add Range
              </button>
            </div>

            <div className="space-y-3">
              {ranges.map((range, index) => (
                <div key={index} className="clay-sm flex items-center gap-3 p-3">
                  <Input
                    type="number"
                    min={1}
                    max={pageCount}
                    value={range.start}
                    onChange={(e) => updateRange(index, "start", e.target.value)}
                    placeholder="Start"
                    className="clay-input w-24 h-12 text-center font-bold"
                  />
                  <span className="text-[#9CA3AF] dark:text-[#9CA3AF] font-bold">to</span>
                  <Input
                    type="number"
                    min={1}
                    max={pageCount}
                    value={range.end}
                    onChange={(e) => updateRange(index, "end", e.target.value)}
                    placeholder="End"
                    className="clay-input w-24 h-12 text-center font-bold"
                  />
                  {ranges.length > 1 && (
                    <button
                      onClick={() => removeRange(index)}
                      className="clay-sm flex h-10 w-10 items-center justify-center text-[#F76D6D] hover:scale-110 transition-transform"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {error && <ToolStatusMessage type="error" message={error} />}

        <ToolActionButton
          onClick={handleSplit}
          disabled={!file}
          loading={processing}
          loadingText="Splitting..."
          icon={<Download className="h-5 w-5" />}
          label="Split PDF"
        />
      </div>
    </ToolPageLayout>
  );
}
