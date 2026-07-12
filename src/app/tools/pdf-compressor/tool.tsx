"use client";

import { useState, useCallback } from "react";
import { Download, Minimize2 } from "lucide-react";
import { FileUploader } from "@/components/file-uploader";
import { ToolPageLayout, ToolActionButton, ToolStatusMessage } from "@/components/tool-layout";
import { compressPDF } from "@/lib/pdf-utils";
import { formatFileSize } from "@/config/tools";

export function PDFCompressorTool() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ blob: Blob; savings: number } | null>(null);

  const handleFilesSelected = useCallback((files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setError(null);
      setResult(null);
    }
  }, []);

  const handleCompress = async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);
    setResult(null);

    try {
      const compressedBlob = await compressPDF(file);
      const savings = ((1 - compressedBlob.size / file.size) * 100);
      setResult({ blob: compressedBlob, savings });
    } catch {
      setError("Failed to compress PDF. Please try another file.");
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!result) return;
    const url = URL.createObjectURL(result.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "compressed.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <ToolPageLayout
      title="PDF Compressor"
      description="Reduce PDF file size without losing quality"
      icon={<Minimize2 className="h-8 w-8" />}
      breadcrumbs={[{ label: "Tools", href: "/tools" }, { label: "PDF Compressor" }]}
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

        {result && (
          <div className="clay-mint p-5 text-white">
            <p className="text-sm font-bold">
              Compression complete! Saved {result.savings.toFixed(1)}%
            </p>
            <p className="mt-1 text-sm opacity-90">
              {formatFileSize(file!.size)} → {formatFileSize(result.blob.size)}
            </p>
          </div>
        )}

        {error && <ToolStatusMessage type="error" message={error} />}

        {!result ? (
          <ToolActionButton
            onClick={handleCompress}
            disabled={!file}
            loading={processing}
            loadingText="Compressing..."
            icon={<Minimize2 className="h-5 w-5" />}
            label="Compress PDF"
          />
        ) : (
          <ToolActionButton
            onClick={handleDownload}
            icon={<Download className="h-5 w-5" />}
            label="Download Compressed PDF"
          />
        )}
      </div>
    </ToolPageLayout>
  );
}
