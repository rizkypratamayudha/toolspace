"use client";

import { useState, useCallback } from "react";
import { Download, Image } from "lucide-react";
import { FileUploader } from "@/components/file-uploader";
import { ToolPageLayout, ToolActionButton, ToolStatusMessage } from "@/components/tool-layout";
import { PDFDocument } from "pdf-lib";

export function JPGToPDFTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFilesSelected = useCallback((selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setError(null);
  }, []);

  const handleConvert = async () => {
    if (files.length === 0) return;
    setProcessing(true);
    setError(null);

    try {
      const pdfDoc = await PDFDocument.create();

      for (const file of files) {
        const imageBytes = await file.arrayBuffer();
        let image;

        if (file.type === "image/jpeg" || file.type === "image/jpg") {
          image = await pdfDoc.embedJpg(imageBytes);
        } else {
          image = await pdfDoc.embedPng(imageBytes);
        }

        const page = pdfDoc.addPage([image.width, image.height]);
        page.drawImage(image, {
          x: 0,
          y: 0,
          width: image.width,
          height: image.height,
        });
      }

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([new Uint8Array(pdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "converted.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      setError("Failed to convert images. Please make sure they are valid image files.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolPageLayout
      title="JPG to PDF"
      description="Convert JPG images to PDF format"
      icon={<Image className="h-8 w-8" />}
      breadcrumbs={[{ label: "Tools", href: "/tools" }, { label: "JPG to PDF" }]}
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

        {files.length > 0 && (
          <div className="clay-sm p-5">
            <p className="text-sm font-bold text-[#2D3557] dark:text-[#F0F4FF]">
              <span className="text-[#62CDFF]">{files.length}</span> images selected
            </p>
          </div>
        )}

        {error && <ToolStatusMessage type="error" message={error} />}

        <ToolActionButton
          onClick={handleConvert}
          disabled={files.length === 0}
          loading={processing}
          loadingText="Converting..."
          icon={<Download className="h-5 w-5" />}
          label="Convert to PDF"
        />
      </div>
    </ToolPageLayout>
  );
}
