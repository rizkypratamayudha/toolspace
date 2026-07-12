"use client";

import { useState, useCallback } from "react";
import { Download, Minimize2 } from "lucide-react";
import { FileUploader } from "@/components/file-uploader";
import { ToolPageLayout, ToolActionButton, ToolStatusMessage } from "@/components/tool-layout";
import { formatFileSize } from "@/config/tools";

interface CompressedResult {
  original: File;
  compressed: Blob;
  savings: number;
}

export function ImageCompressorTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [results, setResults] = useState<CompressedResult[]>([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFilesSelected = useCallback((selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setResults([]);
    setError(null);
  }, []);

  const compressImage = (file: File, quality: number = 0.7): Promise<CompressedResult> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const savings = ((1 - blob.size / file.size) * 100);
              URL.revokeObjectURL(img.src);
              resolve({ original: file, compressed: blob, savings });
            } else {
              reject(new Error("Failed to compress image"));
            }
          },
          "image/jpeg",
          quality
        );
      };

      img.onerror = () => {
        URL.revokeObjectURL(img.src);
        reject(new Error("Failed to load image"));
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleCompress = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    setError(null);
    setResults([]);

    try {
      const compressedResults = await Promise.all(
        files.map((file) => compressImage(file))
      );
      setResults(compressedResults);
    } catch {
      setError("Failed to compress images. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  const downloadAll = () => {
    results.forEach((result) => {
      const url = URL.createObjectURL(result.compressed);
      const a = document.createElement("a");
      a.href = url;
      const ext = result.original.name.split(".").pop();
      a.download = result.original.name.replace(`.${ext}`, `-compressed.jpg`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  };

  return (
    <ToolPageLayout
      title="Image Compressor"
      description="Compress JPEG, PNG, WebP images without losing quality"
      icon={<Minimize2 className="h-8 w-8" />}
      breadcrumbs={[{ label: "Tools", href: "/tools" }, { label: "Image Compressor" }]}
    >
      <div className="space-y-6">
        <FileUploader
          accept={{
            "image/jpeg": [".jpg", ".jpeg"],
            "image/png": [".png"],
            "image/webp": [".webp"],
          }}
          multiple={true}
          maxFiles={20}
          maxSize={50 * 1024 * 1024}
          onFilesSelected={handleFilesSelected}
          disabled={processing}
          loading={processing}
        />

        {results.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-extrabold">Results</h3>
            {results.map((result, index) => (
              <div
                key={index}
                className="clay-sm flex items-center justify-between p-4"
              >
                <div>
                  <p className="text-sm font-bold">{result.original.name}</p>
                  <p className="text-xs text-[#9CA3AF]">
                    {formatFileSize(result.original.size)} → {formatFileSize(result.compressed.size)}
                  </p>
                </div>
                <span className="clay-mint px-3 py-1 text-xs font-bold text-white">
                  -{result.savings.toFixed(1)}%
                </span>
              </div>
            ))}
          </div>
        )}

        {error && <ToolStatusMessage type="error" message={error} />}

        {results.length === 0 ? (
          <ToolActionButton
            onClick={handleCompress}
            disabled={files.length === 0}
            loading={processing}
            loadingText="Compressing..."
            icon={<Minimize2 className="h-5 w-5" />}
            label="Compress Images"
          />
        ) : (
          <ToolActionButton
            onClick={downloadAll}
            icon={<Download className="h-5 w-5" />}
            label="Download All"
          />
        )}
      </div>
    </ToolPageLayout>
  );
}
