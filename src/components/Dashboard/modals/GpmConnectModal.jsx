"use client";

import React, { useState, useEffect } from "react";
import { useDashboard } from "@/components/Dashboard/DashboardContext";
import {
  Radio,
  Globe,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  Sparkles,
  HelpCircle,
  ArrowRight,
  Shield
} from "lucide-react";

export default function GpmConnectModal({
  isOpen = false,
  onClose,
  initialGpmId = "",
  clientName = "Client Organization",
  clientSlug = ""
}) {
  const { activeClient, updateClientDetails, requestUpgrade } = useDashboard();

  const [gpmId, setGpmId] = useState(initialGpmId);
  const [needAssistance, setNeedAssistance] = useState(false);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setGpmId(initialGpmId || activeClient?.gaPropertyId || "");
      setNeedAssistance(false);
      setNotes("");
      setError("");
      setSuccess(false);
    }
  }, [isOpen, initialGpmId, activeClient]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedId = gpmId.trim();

    if (!trimmedId && !needAssistance) {
      setError("Please enter a Google Property ID or request engineering setup assistance.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const targetSlug = clientSlug || activeClient?.slug;

      if (targetSlug) {
        // Persist the GPM / GA4 ID to Supabase
        await updateClientDetails(targetSlug, {
          ...(activeClient || {}),
          gaPropertyId: trimmedId
        });

        // If client requested engineering assistance, log a service request
        if (needAssistance) {
          await requestUpgrade(
            "Google Analytics 4 & GPM Setup Assistance",
            `Client requested engineering assistance for domain: ${clientName}. Notes: ${notes || "None provided"}`
          );
        }
      }

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        if (onClose) onClose();
      }, 1500);
    } catch (err) {
      setError(err?.message || "Failed to update Google Property ID. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 font-inter animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        aria-hidden="true"
      />

      {/* Modal Dialog Card */}
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-neutral-200 shadow-2xl overflow-hidden z-10 space-y-0">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl bg-blue-600/30 border border-blue-500/40 text-blue-400 flex items-center justify-center shrink-0">
              <Radio className="size-5" />
            </div>
            <div>
              <h3 className="font-mono font-bold text-base text-white">
                Connect Google Property ID
              </h3>
              <p className="text-xs text-slate-400 font-inter mt-0.5">
                Link GA4 / GPM measurement telemetry to your dashboard.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition min-h-[36px] min-w-[36px] flex items-center justify-center"
            aria-label="Close modal"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Content & Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5 bg-white text-xs">
          {/* Client Organization Pill */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-neutral-50 border border-neutral-200">
            <div className="space-y-0.5">
              <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">
                Target Organization
              </span>
              <p className="font-mono font-bold text-slate-900 text-xs">
                {clientName}
              </p>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
              Live Domain Context
            </span>
          </div>

          {/* Property ID Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
                Google Property ID / GA4 Measurement ID
              </label>
              <span className="text-[10px] text-slate-400 font-mono">
                e.g. G-8R8XK08XKZ
              </span>
            </div>
            <input
              type="text"
              placeholder="e.g. G-XXXXXXXXXX or 432890123"
              value={gpmId}
              onChange={(e) => setGpmId(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-xs font-mono text-slate-900 focus:border-blue-700 focus:outline-none min-h-[44px]"
            />
            <p className="text-[11px] text-slate-500 font-inter">
              Found in Google Analytics under <strong>Admin &gt; Data Streams &gt; Measurement ID</strong>.
            </p>
          </div>

          {/* Assistance Option */}
          <div className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50/60 space-y-3">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={needAssistance}
                onChange={(e) => setNeedAssistance(e.target.checked)}
                className="mt-0.5 size-4 rounded border-neutral-300 text-blue-600 focus:ring-blue-500"
              />
              <div className="space-y-0.5">
                <span className="font-mono font-semibold text-xs text-slate-800 flex items-center gap-1.5">
                  <Sparkles className="size-3.5 text-blue-600" />
                  Request Egostix Engineering Tag Setup
                </span>
                <p className="text-[11px] text-slate-500 font-inter leading-relaxed">
                  Check this if you need our engineering team to install Google Tag Manager / GA4 tracking tags on your domain.
                </p>
              </div>
            </label>

            {needAssistance && (
              <div className="space-y-1.5 pt-2 border-t border-neutral-200/80 animate-in fade-in duration-150">
                <label className="block text-[10px] font-mono uppercase text-slate-600 font-bold">
                  Additional Notes / Access Instructions (Optional)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g., Domain is hosted on Cloudflare; please verify DNS records."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-xs font-inter focus:border-blue-700 focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Success Banner */}
          {success && (
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-800 bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
              <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
              <span>Google Property linked successfully! Streaming telemetry...</span>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div className="flex items-center gap-2 text-xs font-mono text-red-800 bg-red-50 border border-red-200 p-3 rounded-xl">
              <AlertCircle className="size-4 text-red-500 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-neutral-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-slate-700 font-mono text-xs font-semibold transition min-h-[40px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || success}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 active:scale-[0.98] disabled:opacity-50 text-white font-mono text-xs font-semibold shadow-xs transition min-h-[40px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  <span>Linking Property...</span>
                </>
              ) : (
                <>
                  <Radio className="size-3.5" />
                  <span>Submit &amp; Link Property</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
