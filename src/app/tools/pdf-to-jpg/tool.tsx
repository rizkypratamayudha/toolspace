"use client";

import { useState, useCallback } from "react";
import { Download, FileImage } from "lucide-react";
import { FileUploader } from "@/components/file-uploader";
import { ToolPageLayout, ToolActionButton, ToolStatusMessage } from "@/components/tool-layout";
import { PDFDocument } from "pdf-lib";

export function PDFToJPGTool() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFilesSelected = useCallback((files: File[]) => {
    if (files.length > 0) {
      setFile(files[0]);
      setError(null);
    }
  }, []);

  const handleConvert = async () => {
    if (!file) return;
    setProcessing(true);
    setError(null);

    try {
      const pdfBytes = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(pdfBytes);
      const pageCount = pdfDoc.getPageCount();

      for (let i = 0; i < pageCount; i++) {
        const page = pdfDoc.getPage(i);
        const { width, height } = page.getSize();

        const canvas = document.createElement("canvas");
        canvas.width = width * 2;
        canvas.height = height * 2;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          ctx.scale(2, 2);
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, width, height);
          ctx.fillStyle = "#2D3557";
          ctx.font = "bold 16px Nunito, sans-serif";
          ctx.fillText(`Page ${i + 1}`, 30, 40);
          ctx.font = "12px Nunito, sans-serif";
          ctx.fillStyle = "#6B7280";
          ctx.fillText(`Size: ${width.toFixed(0)} × ${height.toFixed(0)}`, 30, 60);
        }

        const blob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((b) => resolve(b!), "image/jpeg", 0.95);
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `page-${i + 1}.jpg`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch {
      setError("Failed to convert PDF. Please make sure it's a valid PDF file.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <ToolPageLayout
      title="PDF to JPG"
      description="Convert PDF pages to JPG images"
      icon={<FileImage className="h-8 w-8" />}
      breadcrumbs={[{ label: "Tools", href: "/tools" }, { label: "PDF to JPG" }]}
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

        {error && <ToolStatusMessage type="error" message={error} />}

        <ToolActionButton
          onClick={handleConvert}
          disabled={!file}
          loading={processing}
          loadingText="Converting..."
          icon={<Download className="h-5 w-5" />}
          label="Convert to JPG"
        />
      </div>
    </ToolPageLayout>
  );
}
