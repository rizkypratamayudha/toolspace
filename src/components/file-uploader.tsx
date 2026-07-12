"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, FileIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatFileSize } from "@/config/tools";

interface FileWithPreview extends File {
  preview?: string;
}

interface FileUploaderProps {
  accept: Record<string, string[]>;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number;
  onFilesSelected: (files: File[]) => void;
  disabled?: boolean;
  loading?: boolean;
}

export function FileUploader({
  accept,
  multiple = false,
  maxFiles = 10,
  maxSize = 100 * 1024 * 1024,
  onFilesSelected,
  disabled = false,
  loading = false,
}: FileUploaderProps) {
  const [files, setFiles] = useState<FileWithPreview[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
        })
      );
      setFiles(newFiles);
      onFilesSelected(acceptedFiles);
    },
    [onFilesSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    multiple,
    maxFiles,
    maxSize,
    disabled: disabled || loading,
  });

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    setFiles(newFiles);
    onFilesSelected(newFiles);
  };

  return (
    <div className="w-full space-y-4">
      <div
        {...getRootProps()}
        className={`relative flex flex-col items-center justify-center p-10 md:p-14 transition-all duration-200 cursor-pointer clay
          ${isDragActive
            ? "scale-[1.02] ring-4 ring-[#62CDFF]/30"
            : "hover:scale-[1.01]"
          }
          ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        <input {...getInputProps()} />
        <div className="clay-blue flex h-20 w-20 items-center justify-center text-white mb-6">
          {loading ? (
            <Loader2 className="h-10 w-10 animate-spin" />
          ) : (
            <Upload className="h-10 w-10" />
          )}
        </div>
        <p className="text-xl font-extrabold text-[#2D3557] dark:text-[#F0F4FF]">
          {isDragActive ? "Drop your files here..." : "Drag & drop files here"}
        </p>
        <p className="mt-2 text-base font-medium text-[#6B7280] dark:text-[#9CA3AF]">
          or <span className="text-[#62CDFF] font-bold">browse files</span>
        </p>
        <p className="mt-4 text-sm text-[#9CA3AF] dark:text-[#9CA3AF] font-medium">
          {multiple ? `Up to ${maxFiles} files` : "Single file"} • Max {formatFileSize(maxSize)}
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-3">
          {files.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="clay-sm flex items-center gap-4 p-4"
            >
              <div className="clay-input flex h-12 w-12 shrink-0 items-center justify-center">
                {file.preview ? (
                  <img
                    src={file.preview}
                    alt={file.name}
                    className="h-full w-full object-cover rounded-xl"
                  />
                ) : (
                  <FileIcon className="h-6 w-6 text-[#62CDFF]" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[#2D3557] dark:text-[#F0F4FF] truncate">{file.name}</p>
                <p className="text-xs text-[#9CA3AF] dark:text-[#9CA3AF] font-medium">{formatFileSize(file.size)}</p>
              </div>
              {loading ? (
                <Loader2 className="h-5 w-5 text-[#62CDFF] animate-spin" />
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(index);
                  }}
                  disabled={disabled || loading}
                  className="clay-sm flex h-8 w-8 items-center justify-center text-[#F76D6D] hover:scale-110 transition-transform"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
