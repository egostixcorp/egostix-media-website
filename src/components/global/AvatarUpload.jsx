"use client";

import React, { useState, useRef } from "react";
import { Camera, Trash2, Loader2, CheckCircle2, AlertCircle, Image as ImageIcon } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function AvatarUpload({ value = "", onChange, userName = "User" }) {
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
        // Fallback: If bucket does not exist, convert image to data URL for seamless UX
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
    <div className="space-y-3 font-inter">
      <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
        Profile Photo & Avatar
      </label>

      {/* Single Unified Card: Avatar Preview + Direct Input Controls */}
      <div className="rounded-xl border border-neutral-200 bg-neutral-50/60 p-4 sm:p-5 flex flex-col sm:flex-row items-center sm:items-center gap-4 sm:gap-5 shadow-xs transition">
        {/* Avatar Visual Preview */}
        <div className="relative shrink-0">
          <div className="size-20 rounded-2xl border-2 border-neutral-200 bg-white overflow-hidden flex items-center justify-center text-slate-400 shadow-sm relative ring-4 ring-neutral-100">
            {value ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={value}
                alt="Profile Avatar"
                className="size-full object-cover rounded-2xl"
              />
            ) : (
              <span className="font-mono font-bold text-2xl text-blue-700">
                {getInitials(userName)}
              </span>
            )}

            {isUploading && (
              <div className="absolute inset-0 bg-slate-950/70 flex flex-col items-center justify-center text-white backdrop-blur-xs">
                <Loader2 className="size-6 animate-spin text-blue-400" />
              </div>
            )}
          </div>
        </div>

        {/* Action Controls & Metadata Info */}
        <div className="min-w-0 flex-1 space-y-2 text-center sm:text-left w-full">
          <div className="space-y-0.5">
            <h5 className="font-mono text-xs font-bold text-slate-900">
              {userName || "Your Profile"}
            </h5>
            <p className="text-[11px] text-slate-500 font-inter">
              JPG, PNG, WebP up to 5MB. Photo will appear across platform headers and activity logs.
            </p>
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/svg+xml"
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white font-mono text-xs font-semibold shadow-xs transition min-h-[40px]"
            >
              {isUploading ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Camera className="size-3.5" />
                  <span>{value ? "Change Photo" : "Upload Photo"}</span>
                </>
              )}
            </button>

            {value && !isUploading && (
              <button
                type="button"
                onClick={handleRemove}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-neutral-200 bg-white hover:bg-red-50 hover:border-red-200 text-red-600 font-mono text-xs font-semibold transition min-h-[40px]"
              >
                <Trash2 className="size-3.5" />
                <span>Remove</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {uploadSuccess && (
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 p-2.5 rounded-lg">
          <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
          <span>Profile photo updated successfully!</span>
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
