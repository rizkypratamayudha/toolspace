"use client";

import { useState, useCallback } from "react";
import { Download, Merge, Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { FileUploader } from "@/components/file-uploader";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { mergePDFs } from "@/lib/pdf-utils";
import { formatFileSize } from "@/config/tools";

export function PDFMergerTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFilesSelected = useCallback((selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setError(null);
    setSuccess(false);
  }, []);

  const handleMerge = async () => {
    if (files.length < 2) {
      setError("Please select at least 2 PDF files to merge");
      return;
    }

    setProcessing(true);
    setError(null);
    setSuccess(false);

    try {
      const mergedBlob = await mergePDFs(files);
      const url = URL.createObjectURL(mergedBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "merged.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setSuccess(true);
    } catch (err) {
      setError("Failed to merge PDFs. Please make sure all files are valid PDFs.");
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <Breadcrumbs items={[{ label: "Tools", href: "/tools" }, { label: "PDF Merger" }]} />

      {/* Tool Header */}
      <div className="mt-8 mb-10">
        <div className="flex items-center gap-5">
          <div className="clay-coral flex h-16 w-16 items-center justify-center text-white">
            <Merge className="h-8 w-8" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight">PDF Merger</h1>
            <p className="mt-2 text-lg text-[#6B7280] dark:text-[#9CA3AF] font-medium">
              Combine multiple PDFs into one document
            </p>
          </div>
        </div>
      </div>

      {/* Tool Content */}
      <div className="space-y-6">
        <FileUploader
          accept={{ "application/pdf": [".pdf"] }}
          multiple={true}
          maxFiles={20}
          maxSize={100 * 1024 * 1024}
          onFilesSelected={handleFilesSelected}
          disabled={processing}
          loading={processing}
        />

        {/* File Count Badge */}
        {files.length > 0 && (
          <div className="clay-sm flex items-center gap-4 p-5">
            <div className="clay-blue flex h-12 w-12 items-center justify-center text-white">
              <span className="text-lg font-extrabold">{files.length}</span>
            </div>
            <div>
              <p className="text-base font-bold text-[#2D3557] dark:text-[#F0F4FF]">
                {files.length} {files.length === 1 ? "file" : "files"} selected
              </p>
              <p className="text-sm text-[#9CA3AF] dark:text-[#9CA3AF] font-medium">
                Total: {formatFileSize(files.reduce((acc, f) => acc + f.size, 0))}
              </p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="clay-coral flex items-center gap-3 p-5 text-white">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p className="text-sm font-bold">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="clay-mint flex items-center gap-3 p-5 text-white">
            <CheckCircle2 className="h-5 w-5 shrink-0" />
            <p className="text-sm font-bold">
              PDF merged successfully! Your download should start automatically.
            </p>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleMerge}
          disabled={files.length < 2 || processing}
          className="clay-button w-full h-16 text-lg font-extrabold text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {processing ? (
            <>
              <Loader2 className="h-6 w-6 animate-spin" />
              Merging PDFs...
            </>
          ) : (
            <>
              <Download className="h-6 w-6" />
              Merge {files.length > 0 ? `${files.length} ` : ""}PDFs
            </>
          )}
        </button>
      </div>

      {/* How-to Section */}
      <div className="mt-20 space-y-8">
        <h2 className="text-3xl font-extrabold text-center">How to Merge PDF Files</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="clay-card flex flex-col items-center text-center p-8">
            <div className="clay-blue flex h-14 w-14 items-center justify-center text-white mb-5">
              <span className="text-xl font-extrabold">1</span>
            </div>
            <h3 className="text-lg font-extrabold mb-2">Upload Files</h3>
            <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] font-medium">
              Drag and drop your PDF files or click to select them.
            </p>
          </div>
          <div className="clay-card flex flex-col items-center text-center p-8">
            <div className="clay-coral flex h-14 w-14 items-center justify-center text-white mb-5">
              <span className="text-xl font-extrabold">2</span>
            </div>
            <h3 className="text-lg font-extrabold mb-2">Merge</h3>
            <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] font-medium">
              Click the merge button and wait a moment.
            </p>
          </div>
          <div className="clay-card flex flex-col items-center text-center p-8">
            <div className="clay-mint flex h-14 w-14 items-center justify-center text-white mb-5">
              <span className="text-xl font-extrabold">3</span>
            </div>
            <h3 className="text-lg font-extrabold mb-2">Download</h3>
            <p className="text-sm text-[#6B7280] dark:text-[#9CA3AF] font-medium">
              Your merged PDF downloads automatically.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-20 space-y-8">
        <h2 className="text-3xl font-extrabold text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="clay-card p-6">
            <h3 className="text-lg font-extrabold">Is my data safe?</h3>
            <p className="mt-3 text-sm text-[#6B7280] dark:text-[#9CA3AF] font-medium">
              Yes! All processing happens in your browser. Your files never leave your device.
            </p>
          </div>
          <div className="clay-card p-6">
            <h3 className="text-lg font-extrabold">What is the maximum file size?</h3>
            <p className="mt-3 text-sm text-[#6B7280] dark:text-[#9CA3AF] font-medium">
              You can upload PDF files up to 100MB each.
            </p>
          </div>
          <div className="clay-card p-6">
            <h3 className="text-lg font-extrabold">Can I reorder the pages?</h3>
            <p className="mt-3 text-sm text-[#6B7280] dark:text-[#9CA3AF] font-medium">
              Currently, files are merged in the order you upload them. Reorder feature coming soon!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
