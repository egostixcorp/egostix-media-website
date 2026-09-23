"use client";

import React, { useState, useRef } from "react";
import { useDashboard } from "@/components/Dashboard/DashboardContext";
import { uploadFileAction, getSignedUrlAction } from "@/actions/files";
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
  UploadCloud,
  FileCode,
  CheckCircle2,
  Link as LinkIcon,
  ShieldCheck,
  Loader2
} from "lucide-react";

const FilesTab = () => {
  const { activeClient, role, uploadedFiles, deleteFile, refreshSession } = useDashboard();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const clientFiles = role === "client"
    ? uploadedFiles.filter((f) => f.clientSlug === activeClient?.slug)
    : uploadedFiles.filter((f) => f.clientSlug === activeClient?.slug || activeClient?.slug === "egostix-internal");

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setError("");
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setError("Please select a file to upload.");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("client_slug", activeClient?.slug || "egostix-internal");

      const res = await uploadFileAction(formData);
      if (!res.success) {
        setError(res.error || "Failed to upload file.");
      } else {
        setSelectedFile(null);
        setIsSheetOpen(false);
        if (refreshSession) await refreshSession();
      }
    } catch (err) {
      setError(err?.message || "An unexpected error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = async (file) => {
    if (!file.storagePath) {
      alert("Download link not available for this file record.");
      return;
    }
    const res = await getSignedUrlAction(file.storagePath);
    if (res.success && res.url) {
      window.open(res.url, "_blank");
    } else {
      alert(res.error || "Could not generate download URL.");
    }
  };

  const handleCopyLink = async (file) => {
    if (!file.storagePath) return;
    const res = await getSignedUrlAction(file.storagePath);
    if (res.success && res.url) {
      navigator.clipboard.writeText(res.url);
      setCopiedId(file.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Context Banner */}
      <div className="bg-white rounded-xl border border-neutral-200 p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 shadow-sm">
        <div className="space-y-1 sm:space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="p-1.5 sm:p-2 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 shrink-0">
              <FileText className="size-4 sm:size-5" />
            </span>
            <h3 className="text-lg sm:text-xl font-mono text-slate-900 font-bold">
              {role === "staff" ? "Client Files Sync & Cloud Storage" : "Shared Project Assets & Files"}
            </h3>
          </div>
          <p className="text-xs text-slate-600 max-w-2xl font-inter leading-relaxed">
            Secure cloud asset sync repository for architectural blueprints, brand guidelines, API access contracts, and export bundles.
          </p>
        </div>

        <button
          onClick={() => setIsSheetOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 active:scale-[0.98] text-white font-mono font-semibold text-xs px-5 py-3 rounded-lg shadow-sm transition duration-150 min-h-[44px]"
        >
          <UploadCloud className="size-4" />
          <span>Upload New Asset</span>
        </button>
      </div>

      {/* Slide-Over Sheet Drawer for File Uploads */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md bg-white p-4 sm:p-6 overflow-y-auto space-y-6">
          <SheetHeader className="text-left space-y-2 border-b border-neutral-100 pb-4">
            <SheetTitle className="text-base font-mono font-bold text-slate-900 flex items-center gap-2">
              <UploadCloud className="size-5 text-blue-700 shrink-0" />
              <span>Upload Asset to Cloud</span>
            </SheetTitle>
            <SheetDescription className="text-xs text-slate-500 font-inter">
              Upload files into the secure private storage bucket assigned to <strong className="text-slate-900">{activeClient?.name}</strong>.
            </SheetDescription>
          </SheetHeader>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded font-inter">
              {error}
            </div>
          )}

          <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs font-inter">
            {/* Visual Dropzone UI */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-neutral-300 rounded-xl p-5 sm:p-6 text-center hover:border-blue-500 transition-colors bg-neutral-50/50 space-y-2 cursor-pointer"
            >
              <UploadCloud className="size-8 text-blue-600 mx-auto" />
              <p className="font-mono text-xs text-slate-700 font-semibold break-all">
                {selectedFile ? selectedFile.name : "Click to select file from device"}
              </p>
              <p className="text-[10px] text-slate-400">
                {selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB` : "Supports PDF, PNG, SVG, ZIP, DOCX up to 50MB"}
              </p>
            </div>

            <SheetFooter className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsSheetOpen(false)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg text-slate-600 font-mono text-xs hover:bg-neutral-100 min-h-[44px]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isUploading || !selectedFile}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 disabled:opacity-50 active:scale-[0.98] text-white font-mono font-semibold text-xs shadow-sm transition flex items-center justify-center gap-2 min-h-[44px]"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <span>Upload File Asset</span>
                )}
              </button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>

      {/* File List Container (Mobile Cards + Desktop Table) */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
        <div className="p-3.5 sm:p-4 border-b border-neutral-200 bg-neutral-50 flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
            Stored Client Files ({clientFiles.length})
          </h4>
          <span className="text-[10px] font-mono text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 shrink-0" />
            <span>Encrypted Cloud Bucket</span>
          </span>
        </div>

        {/* Mobile View: Responsive Card List (Visible on <sm screens) */}
        <div className="block sm:hidden divide-y divide-neutral-100">
          {clientFiles.length === 0 ? (
            <div className="py-10 px-4 text-center text-slate-400 font-mono text-xs">
              No files uploaded yet for this client. Tap &quot;Upload New Asset&quot; above.
            </div>
          ) : (
            clientFiles.map((file) => (
              <div key={file.id} className="p-4 space-y-3 hover:bg-neutral-50/60 transition">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-600 border border-blue-100 shrink-0">
                    <FileCode className="size-5" />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <h5 className="font-mono text-xs font-bold text-slate-900 break-all leading-snug">
                      {file.name}
                    </h5>
                    <div className="flex flex-wrap items-center gap-2 text-[10px] font-mono text-slate-500">
                      <span className="px-1.5 py-0.5 bg-neutral-100 rounded text-slate-700 font-semibold">{file.type}</span>
                      <span>•</span>
                      <span>{file.size}</span>
                      <span>•</span>
                      <span>{file.uploadedAt || "Recent"}</span>
                    </div>
                  </div>
                </div>

                {/* Mobile Action Buttons Bar */}
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-100">
                  <button
                    onClick={() => handleDownload(file)}
                    className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-mono text-[11px] font-semibold transition min-h-[40px]"
                    title="Download"
                  >
                    <Download className="size-3.5" />
                    <span>Download</span>
                  </button>

                  <button
                    onClick={() => handleCopyLink(file)}
                    className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-slate-700 font-mono text-[11px] font-semibold transition min-h-[40px]"
                    title="Copy Link"
                  >
                    {copiedId === file.id ? (
                      <>
                        <CheckCircle2 className="size-3.5 text-green-600" />
                        <span className="text-green-700">Copied!</span>
                      </>
                    ) : (
                      <>
                        <LinkIcon className="size-3.5" />
                        <span>Share</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => deleteFile(file.id, file.storagePath)}
                    className="flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 font-mono text-[11px] font-semibold transition min-h-[40px]"
                    title="Delete"
                  >
                    <Trash2 className="size-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Desktop View: Full Data Table (Visible on sm: and up) */}
        <div className="hidden sm:block overflow-x-auto">
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
                    No files uploaded yet for this client context. Click &quot;Upload New Asset&quot; above.
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
                    <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">{file.uploadedAt || "Recent"}</td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleCopyLink(file)}
                          className="text-slate-500 hover:text-blue-700 p-1.5 rounded hover:bg-neutral-100 transition min-h-[36px] min-w-[36px] flex items-center justify-center"
                          title="Copy Signed Link"
                        >
                          {copiedId === file.id ? (
                            <CheckCircle2 className="size-4 text-green-600" />
                          ) : (
                            <LinkIcon className="size-4" />
                          )}
                        </button>
                        <button
                          onClick={() => handleDownload(file)}
                          className="text-blue-700 hover:text-blue-900 p-1.5 rounded hover:bg-blue-50 transition min-h-[36px] min-w-[36px] flex items-center justify-center"
                          title="Download Asset"
                        >
                          <Download className="size-4" />
                        </button>
                        <button
                          onClick={() => deleteFile(file.id, file.storagePath)}
                          className="text-slate-400 hover:text-red-600 p-1.5 rounded hover:bg-red-50 transition min-h-[36px] min-w-[36px] flex items-center justify-center"
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
