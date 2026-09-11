"use client";

import React, { useState } from "react";
import { useDashboard } from "@/components/Dashboard/DashboardContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter
} from "@/components/ui/sheet";
import {
  FileText,
  Download,
  Trash2,
  Plus,
  UploadCloud,
  FileCode,
  CheckCircle2,
  Link as LinkIcon,
  ShieldCheck
} from "lucide-react";

const FilesTab = () => {
  const { activeClient, role, uploadedFiles, uploadFile, deleteFile } = useDashboard();
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("PDF Document");
  const [fileSize, setFileSize] = useState("1.4 MB");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const clientFiles = role === "client"
    ? uploadedFiles.filter((f) => f.clientSlug === activeClient?.slug)
    : uploadedFiles.filter((f) => f.clientSlug === activeClient?.slug || activeClient?.slug === "egostix-internal");

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!fileName.trim()) return;

    const fullFileName = fileName.includes(".")
      ? fileName
      : `${fileName}.${fileType === "PDF Document" ? "pdf" : fileType === "SVG Vector" ? "svg" : "png"}`;

    uploadFile(fullFileName, fileSize, fileType);
    setFileName("");
    setIsSheetOpen(false);
  };

  const handleCopyLink = (id) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Context Banner */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-blue-50 border border-blue-100 text-blue-700">
              <FileText className="size-5" />
            </span>
            <h3 className="text-xl font-mono text-slate-900 font-bold">
              {role === "staff" ? "Client Files Sync & Cloud Storage" : "Shared Project Assets & Files"}
            </h3>
          </div>
          <p className="text-xs text-slate-600 max-w-2xl font-inter leading-relaxed">
            Secure cloud asset sync repository for architectural blueprints, brand guidelines, API access contracts, and export bundles.
          </p>
        </div>

        <button
          onClick={() => setIsSheetOpen(true)}
          className="flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 active:scale-[0.98] text-white font-mono font-semibold text-xs px-5 py-3 rounded-lg shadow-sm transition duration-150 min-h-[44px]"
        >
          <UploadCloud className="size-4" />
          <span>Upload New Asset</span>
        </button>
      </div>

      {/* Slide-Over Sheet Drawer for File Uploads */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md bg-white p-6 overflow-y-auto space-y-6">
          <SheetHeader className="text-left space-y-2 border-b border-neutral-100 pb-4">
            <SheetTitle className="text-base font-mono font-bold text-slate-900 flex items-center gap-2">
              <UploadCloud className="size-5 text-blue-700" />
              Upload Asset to Egostix Cloud
            </SheetTitle>
            <SheetDescription className="text-xs text-slate-500 font-inter">
              Upload files into the secure encrypted S3 bucket assigned to <strong className="text-slate-900">{activeClient?.name}</strong>.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs font-inter">
            {/* Visual Dropzone UI */}
            <div className="border-2 border-dashed border-neutral-300 rounded-xl p-6 text-center hover:border-blue-500 transition-colors bg-neutral-50/50 space-y-2 cursor-pointer">
              <UploadCloud className="size-8 text-blue-600 mx-auto" />
              <p className="font-mono text-xs text-slate-700 font-semibold">
                Drag and drop asset here or enter metadata below
              </p>
              <p className="text-[10px] text-slate-400">Supports PDF, PNG, SVG, ZIP up to 50MB</p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
                Asset Name / Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Apex_Realty_Brand_Guidelines"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-xs font-inter focus:border-blue-700 focus:outline-none min-h-[44px]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
                Asset Document Type
              </label>
              <select
                value={fileType}
                onChange={(e) => setFileType(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-xs font-mono bg-white focus:border-blue-700 focus:outline-none min-h-[44px]"
              >
                <option value="PDF Document">PDF Document (.pdf)</option>
                <option value="Image Document">PNG Image (.png)</option>
                <option value="SVG Vector">SVG Vector (.svg)</option>
                <option value="ZIP Archive">ZIP Archive (.zip)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
                Simulated File Size
              </label>
              <input
                type="text"
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-xs font-mono bg-white min-h-[44px]"
              />
            </div>

            <SheetFooter className="pt-4 border-t border-neutral-100 flex flex-row justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsSheetOpen(false)}
                className="px-4 py-2.5 rounded-lg text-slate-600 font-mono text-xs hover:bg-neutral-100 min-h-[44px]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 active:scale-[0.98] text-white font-mono font-semibold text-xs shadow-sm transition min-h-[44px]"
              >
                Upload File Asset
              </button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>

      {/* File List Table */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between">
          <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
            Stored Client Files ({clientFiles.length})
          </h4>
          <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
            <ShieldCheck className="size-3.5" />
            <span>AES-256 Encrypted S3 Bucket</span>
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-inter">
            <thead className="bg-neutral-50 text-[10px] font-mono uppercase text-slate-500 border-b border-neutral-200">
              <tr>
                <th className="py-3 px-4 font-semibold">File Name</th>
                <th className="py-3 px-4 font-semibold">Document Type</th>
                <th className="py-3 px-4 font-semibold">File Size</th>
                <th className="py-3 px-4 font-semibold">Date Added</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {clientFiles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400 font-mono text-xs">
                    No files uploaded yet for this client context. Click "Upload New Asset" above.
                  </td>
                </tr>
              ) : (
                clientFiles.map((file) => (
                  <tr key={file.id} className="hover:bg-neutral-50/70 transition-colors">
                    <td className="py-3.5 px-4 text-slate-900 font-mono font-semibold flex items-center gap-2">
                      <FileCode className="size-4 text-blue-600 shrink-0" />
                      <span>{file.name}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">{file.type}</td>
                    <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">{file.size}</td>
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">{file.date || "Recent"}</td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleCopyLink(file.id)}
                          className="text-slate-500 hover:text-blue-700 p-1.5 rounded hover:bg-neutral-100 transition"
                          title="Copy Share Link"
                        >
                          {copiedId === file.id ? (
                            <CheckCircle2 className="size-4 text-green-600" />
                          ) : (
                            <LinkIcon className="size-4" />
                          )}
                        </button>
                        <button className="text-blue-700 hover:text-blue-900 p-1.5 rounded hover:bg-blue-50 transition" title="Download Asset">
                          <Download className="size-4" />
                        </button>
                        <button
                          onClick={() => deleteFile(file.id)}
                          className="text-slate-400 hover:text-red-600 p-1.5 rounded hover:bg-red-50 transition"
                          title="Delete Asset"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FilesTab;
