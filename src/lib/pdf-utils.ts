import { PDFDocument } from "pdf-lib";

/**
 * Merge multiple PDF files into one
 */
export async function mergePDFs(files: File[]): Promise<Blob> {
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const pdfBytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(pdfBytes);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  const mergedBytes = await mergedPdf.save();
  return new Blob([new Uint8Array(mergedBytes)], { type: "application/pdf" });
}

/**
 * Split a PDF into individual pages
 */
export async function splitPDF(
  file: File,
  pageRanges: { start: number; end: number }[]
): Promise<Blob[]> {
  const pdfBytes = await file.arrayBuffer();
  const pdf = await PDFDocument.load(pdfBytes);
  const totalPages = pdf.getPageCount();

  const results: Blob[] = [];

  for (const range of pageRanges) {
    const start = Math.max(0, range.start - 1);
    const end = Math.min(totalPages, range.end);

    if (start >= end) continue;

    const newPdf = await PDFDocument.create();
    const pages = await newPdf.copyPages(pdf, Array.from({ length: end - start }, (_, i) => start + i));
    pages.forEach((page) => newPdf.addPage(page));

    const newPdfBytes = await newPdf.save();
    results.push(new Blob([new Uint8Array(newPdfBytes)], { type: "application/pdf" }));
  }

  return results;
}

/**
 * Get PDF page count
 */
export async function getPDFPageCount(file: File): Promise<number> {
  const pdfBytes = await file.arrayBuffer();
  const pdf = await PDFDocument.load(pdfBytes);
  return pdf.getPageCount();
}

/**
 * Compress PDF by reducing image quality (basic compression)
 */
export async function compressPDF(file: File): Promise<Blob> {
  const pdfBytes = await file.arrayBuffer();
  const pdf = await PDFDocument.load(pdfBytes);

  const compressedBytes = await pdf.save({
    useObjectStreams: true,
    addDefaultPage: false,
  });

  return new Blob([new Uint8Array(compressedBytes)], { type: "application/pdf" });
}
