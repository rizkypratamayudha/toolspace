"use client";

import { useState, useCallback } from "react";
import { Download, Maximize2 } from "lucide-react";
import { FileUploader } from "@/components/file-uploader";
import { ToolPageLayout, ToolActionButton, ToolStatusMessage } from "@/components/tool-layout";
import { Input } from "@/components/ui/input";

export function ImageResizerTool() {
  const [file, setFile] = useState<File | null>(null);
  const [width, setWidth] = useState("800");
  const [height, setHeight] = useState("600");
  const [maintainRatio, setMaintainRatio] = useState(true);
  const [originalDimensions, setOriginalDimensions] = useState<{ w: number; h: number } | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFilesSelected = useCallback((files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setError(null);

      const img = new Image();
      img.onload = () => {
        setOriginalDimensions({ w: img.width, h: img.height });
        setWidth(String(img.width));
        setHeight(String(img.height));
        URL.revokeObjectURL(img.src);
      };
      img.src = URL.createObjectURL(files[0]);
    }
  }, []);

  const handleWidthChange = (value: string) => {
    setWidth(value);
    if (maintainRatio && originalDimensions) {
      const ratio = originalDimensions.h / originalDimensions.w;
      setHeight(String(Math.round(parseInt(value) * ratio) || ""));
    }
  };

  const handleHeightChange = (value: string) => {
    setHeight(value);
    if (maintainRatio && originalDimensions) {
      const ratio = originalDimensions.w / originalDimensions.h;
      setWidth(String(Math.round(parseInt(value) * ratio) || ""));
    }
  };

  const handleResize = async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);

    try {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const img = new Image();

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Failed to load image"));
        img.src = URL.createObjectURL(file);
      });

      const newWidth = parseInt(width) || img.width;
      const newHeight = parseInt(height) || img.height;

      canvas.width = newWidth;
      canvas.height = newHeight;
      ctx?.drawImage(img, 0, 0, newWidth, newHeight);

      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => resolve(b!), "image/png");
      });

      URL.revokeObjectURL(img.src);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `resized-${file.name}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      setError("Failed to resize image. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolPageLayout
      title="Image Resizer"
      description="Resize images to any dimension"
      icon={<Maximize2 className="h-8 w-8" />}
      breadcrumbs={[{ label: "Tools", href: "/tools" }, { label: "Image Resizer" }]}
    >
      <div className="space-y-6">
        <FileUploader
          accept={{
            "image/jpeg": [".jpg", ".jpeg"],
            "image/png": [".png"],
            "image/webp": [".webp"],
          }}
          multiple={false}
          maxSize={50 * 1024 * 1024}
          onFilesSelected={handleFilesSelected}
          disabled={processing}
          loading={processing}
        />

        {originalDimensions && (
          <div className="clay-sm p-5">
            <p className="text-sm font-bold text-[#2D3557] dark:text-[#F0F4FF]">
              Original: <span className="text-[#62CDFF]">{originalDimensions.w} × {originalDimensions.h}</span>
            </p>
          </div>
        )}

        {originalDimensions && (
          <div className="clay-card p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="text-sm font-bold mb-2 block">Width (px)</label>
                <Input
                  type="number"
                  value={width}
                  onChange={(e) => handleWidthChange(e.target.value)}
                  className="clay-input h-12 text-center font-bold"
                />
              </div>
              <div className="flex-1">
                <label className="text-sm font-bold mb-2 block">Height (px)</label>
                <Input
                  type="number"
                  value={height}
                  onChange={(e) => handleHeightChange(e.target.value)}
                  className="clay-input h-12 text-center font-bold"
                />
              </div>
            </div>
            <label className="flex items-center gap-3 text-sm font-bold cursor-pointer">
              <input
                type="checkbox"
                checked={maintainRatio}
                onChange={(e) => setMaintainRatio(e.target.checked)}
                className="w-5 h-5 rounded"
              />
              Maintain aspect ratio
            </label>
          </div>
        )}

        {error && <ToolStatusMessage type="error" message={error} />}

        <ToolActionButton
          onClick={handleResize}
          disabled={!file}
          loading={processing}
          loadingText="Resizing..."
          icon={<Download className="h-5 w-5" />}
          label="Resize Image"
        />
      </div>
    </ToolPageLayout>
  );
}
