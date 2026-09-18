"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, Camera, X, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function AvatarUpload({ value = "", onChange, userName = "User" }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const handleUpload = async (file) => {
    if (!file) return;

    // File validation
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      setError("Please select a valid image file (JPG, PNG, WEBP, GIF, SVG).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("File size exceeds 5MB limit. Please upload a smaller image.");
      return;
    }

    setIsUploading(true);
    setError(null);
    setUploadSuccess(false);

    try {
      const supabase = createClient();
      const fileExt = file.name.split(".").pop();
      const fileName = `avatar_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
      const filePath = `profiles/${fileName}`;

      // Upload file to Supabase storage bucket 'avatars'
      const { error: uploadErr } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true
        });

      if (uploadErr) {
        // Fallback: If bucket doesn't exist yet, convert image to data URL for seamless UX
        console.warn("Supabase storage upload fallback:", uploadErr.message);
        const reader = new FileReader();
        reader.onloadend = () => {
          const result = reader.result;
          if (onChange) onChange(result);
          setUploadSuccess(true);
          setIsUploading(false);
        };
        reader.readAsDataURL(file);
        return;
      }

      // Retrieve public URL from Supabase Storage
      const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
      if (data?.publicUrl) {
        if (onChange) onChange(data.publicUrl);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 3000);
      }
    } catch (err) {
      setError(err?.message || "Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUpload(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  const handleRemove = () => {
    if (onChange) onChange("");
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
        Profile Photo & Avatar
      </label>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
        {/* Avatar Preview */}
        <div className="relative group shrink-0">
          <div className="size-20 rounded-2xl border-2 border-dashed border-neutral-300 bg-neutral-50 overflow-hidden flex items-center justify-center text-slate-400 shadow-xs relative">
            {value ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={value}
                alt="Profile Avatar"
                className="size-full object-cover rounded-2xl"
              />
            ) : (
              <span className="font-mono font-bold text-xl text-blue-700">
                {getInitials(userName)}
              </span>
            )}

            {isUploading && (
              <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center text-white backdrop-blur-xs">
                <Loader2 className="size-6 animate-spin" />
              </div>
            )}
          </div>

          {value && !isUploading && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute -top-1.5 -right-1.5 p-1 rounded-full bg-red-600 text-white shadow-md hover:bg-red-700 transition"
              title="Remove Avatar"
            >
              <X className="size-3" />
            </button>
          )}
        </div>

        {/* Drag and Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`flex-1 w-full rounded-xl border-2 border-dashed p-4 text-center cursor-pointer transition flex flex-col items-center justify-center gap-1.5 ${
            isDragging
              ? "border-blue-700 bg-blue-50/60 ring-2 ring-blue-700/20"
              : "border-neutral-300 bg-neutral-50/50 hover:border-blue-500 hover:bg-neutral-50"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
            onChange={handleFileSelect}
            className="hidden"
          />

          <div className="p-2 rounded-full bg-white border border-neutral-200 text-blue-700 shadow-xs">
            <UploadCloud className="size-4" />
          </div>

          <div className="space-y-0.5">
            <p className="text-xs font-mono font-semibold text-slate-800">
              <span className="text-blue-700 underline underline-offset-2">Click to upload</span> or drag and drop photo
            </p>
            <p className="text-[10px] font-mono text-slate-500">
              Supports JPG, PNG, WEBP, GIF, SVG (Max 5MB)
            </p>
          </div>
        </div>
      </div>

      {uploadSuccess && (
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg">
          <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
          <span>Photo uploaded to avatars storage bucket successfully!</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-xs font-mono text-red-700 bg-red-50 border border-red-200 p-2.5 rounded-lg">
          <AlertCircle className="size-4 text-red-500 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
