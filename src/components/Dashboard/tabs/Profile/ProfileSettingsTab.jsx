"use client";

import React, { useState, useEffect } from "react";
import { useDashboard } from "@/components/Dashboard/DashboardContext";
import { useTheme } from "next-themes";
import { User, Mail, Building2, Phone, ShieldCheck, CheckCircle2, Save, Sun, Moon, Laptop, Palette, Check } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import AvatarUpload from "@/components/global/AvatarUpload";

const ProfileSettingsTab = () => {
  const { currentUser, role } = useDashboard();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [profileForm, setProfileForm] = useState({
    name: "",
    email: currentUser?.email || "",
    company: "",
    phone: "",
    avatarUrl: ""
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState("");

  useEffect(() => {
    if (currentUser) {
      setProfileForm((prev) => ({
        ...prev,
        email: currentUser.email || "",
        name: currentUser.user_metadata?.full_name || currentUser.user_metadata?.name || "",
        company: currentUser.user_metadata?.company || "",
        phone: currentUser.phone || currentUser.user_metadata?.phone || "",
        avatarUrl: currentUser.user_metadata?.avatar_url || ""
      }));

      // Fetch profile row from DB if available
      const fetchProfile = async () => {
        try {
          const supabase = createClient();
          const { data } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", currentUser.id)
            .maybeSingle();

          if (data) {
            setProfileForm((prev) => ({
              ...prev,
              name: data.full_name || prev.name,
              company: data.company_name || prev.company,
              phone: data.phone || prev.phone,
              avatarUrl: data.avatar_url || prev.avatarUrl
            }));
          }
        } catch (err) {
          console.error("Error loading user profile row:", err);
        }
      };

      fetchProfile();
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setSaveError("");
    setSaveSuccess(false);

    try {
      const supabase = createClient();
      if (currentUser?.id) {
        // 1. Update Supabase Auth metadata
        await supabase.auth.updateUser({
          data: {
            full_name: profileForm.name,
            company: profileForm.company,
            phone: profileForm.phone,
            avatar_url: profileForm.avatarUrl
          }
        });

        // 2. Upsert profile table row
        await supabase.from("profiles").upsert({
          id: currentUser.id,
          full_name: profileForm.name,
          email: profileForm.email,
          company_name: profileForm.company,
          phone: profileForm.phone,
          avatar_url: profileForm.avatarUrl,
          updated_at: new Date().toISOString()
        });
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3500);
    } catch (err) {
      setSaveError(err?.message || "Failed to update profile settings.");
    } finally {
      setIsSaving(false);
    }
  };

  const themeOptions = [
    {
      id: "light",
      label: "Light Theme",
      description: "Crisp white interface with high clarity and contrast",
      icon: Sun,
      previewBg: "bg-white border-neutral-200 text-slate-900"
    },
    {
      id: "dark",
      label: "Dark Theme",
      description: "Deep obsidian slate theme optimized for low light",
      icon: Moon,
      previewBg: "bg-slate-950 border-slate-800 text-white"
    },
    {
      id: "system",
      label: "System Preference",
      description: "Automatically syncs with your operating system theme",
      icon: Laptop,
      previewBg: "bg-gradient-to-r from-white to-slate-950 border-neutral-300 text-slate-800"
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200 font-inter">
      {/* Context Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-neutral-200 dark:border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-800/80 text-blue-700 dark:text-blue-300">
              <User className="size-5" />
            </span>
            <h3 className="text-xl font-mono text-slate-900 dark:text-slate-100 font-bold">
              Active User Account & Profile Settings
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl font-inter leading-relaxed">
            Manage your personal account profile, contact credentials, organization details, and theme appearance preferences.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 px-3 py-1.5 rounded-lg uppercase">
            Role: {role}
          </span>
        </div>
      </div>

      {saveSuccess && (
        <div className="bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800/80 rounded-xl p-4 flex items-center gap-3 text-green-800 dark:text-green-300 text-xs font-mono shadow-xs">
          <CheckCircle2 className="size-5 text-green-600 dark:text-green-400 shrink-0" />
          <span>Profile details updated successfully! Changes saved to database.</span>
        </div>
      )}

      {saveError && (
        <div className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800/80 rounded-xl p-4 flex items-center gap-3 text-red-800 dark:text-red-300 text-xs font-mono shadow-xs">
          <ShieldCheck className="size-5 text-red-500 dark:text-red-400 shrink-0" />
          <span>{saveError}</span>
        </div>
      )}

      {/* SECTION 1: Appearance & Theme Preferences */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-neutral-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-100 dark:border-slate-800 pb-4">
          <div className="space-y-0.5">
            <h4 className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
              <Palette className="size-4 text-blue-700 dark:text-blue-400" />
              Appearance & Theme Preferences
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Select your interface color theme. Changes take effect instantly across all dashboard views.
            </p>
          </div>
          {mounted && (
            <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-neutral-200 dark:border-slate-700">
              Active: {theme}
            </span>
          )}
        </div>

        <div className="grid gap-4 sm:grid-cols-3 pt-2">
          {themeOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = mounted && theme === opt.id;

            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setTheme(opt.id)}
                className={`p-4 rounded-xl border text-left transition relative flex flex-col justify-between gap-3 ${
                  isSelected
                    ? "border-blue-600 dark:border-blue-500 bg-blue-50/50 dark:bg-blue-950/40 ring-1 ring-blue-600/30"
                    : "border-neutral-200 dark:border-slate-800 bg-neutral-50/40 dark:bg-slate-900/40 hover:border-neutral-300 dark:hover:border-slate-700"
                }`}
              >
                <div className="flex items-start justify-between w-full">
                  <div className="flex items-center gap-2.5">
                    <span className={`p-2 rounded-lg border ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-neutral-200 dark:border-slate-700"
                    }`}>
                      <Icon className="size-4" />
                    </span>
                    <div>
                      <h5 className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100">
                        {opt.label}
                      </h5>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="size-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                      <Check className="size-3 stroke-[3]" />
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-inter">
                  {opt.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: Main Profile Form Card */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-neutral-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-100 dark:border-slate-800 pb-4">
          <h4 className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider flex items-center gap-2">
            <User className="size-4 text-blue-700 dark:text-blue-400" />
            Personal Profile Parameters
          </h4>
          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            {currentUser?.email || "Account Settings"}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs font-inter max-w-xl">
          {/* Avatar Upload (Drag & Drop + Storage Bucket Integration) */}
          <AvatarUpload
            value={profileForm.avatarUrl}
            onChange={(url) => setProfileForm((prev) => ({ ...prev, avatarUrl: url }))}
            userName={profileForm.name || currentUser?.email || "User"}
          />

          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono uppercase text-slate-700 dark:text-slate-300 font-bold">
              Full Name *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Enter your full name"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full rounded-lg border border-neutral-300 dark:border-slate-700 bg-white dark:bg-slate-800 pl-9 pr-3.5 py-2.5 text-xs font-inter text-slate-900 dark:text-slate-100 focus:border-blue-700 dark:focus:border-blue-500 focus:outline-none min-h-[44px]"
              />
              <User className="absolute left-3 top-3 size-4 text-slate-400 dark:text-slate-500" />
            </div>
          </div>

          {/* Email Address (Readonly / Primary Auth) */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono uppercase text-slate-700 dark:text-slate-300 font-bold">
              Work Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                disabled
                value={profileForm.email}
                className="w-full rounded-lg border border-neutral-200 dark:border-slate-800 bg-neutral-50 dark:bg-slate-800/50 pl-9 pr-3.5 py-2.5 text-xs font-mono text-slate-600 dark:text-slate-400 cursor-not-allowed min-h-[44px]"
              />
              <Mail className="absolute left-3 top-3 size-4 text-slate-400 dark:text-slate-500" />
            </div>
          </div>

          {/* Company / Brand Name */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono uppercase text-slate-700 dark:text-slate-300 font-bold">
              Organization / Company Name
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Egostix Media"
                value={profileForm.company}
                onChange={(e) => setProfileForm({ ...profileForm, company: e.target.value })}
                className="w-full rounded-lg border border-neutral-300 dark:border-slate-700 bg-white dark:bg-slate-800 pl-9 pr-3.5 py-2.5 text-xs font-inter text-slate-900 dark:text-slate-100 focus:border-blue-700 dark:focus:border-blue-500 focus:outline-none min-h-[44px]"
              />
              <Building2 className="absolute left-3 top-3 size-4 text-slate-400 dark:text-slate-500" />
            </div>
          </div>

          {/* Direct Phone Number */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono uppercase text-slate-700 dark:text-slate-300 font-bold">
              Contact Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                className="w-full rounded-lg border border-neutral-300 dark:border-slate-700 bg-white dark:bg-slate-800 pl-9 pr-3.5 py-2.5 text-xs font-inter text-slate-900 dark:text-slate-100 focus:border-blue-700 dark:focus:border-blue-500 focus:outline-none min-h-[44px]"
              />
              <Phone className="absolute left-3 top-3 size-4 text-slate-400 dark:text-slate-500" />
            </div>
          </div>

          {/* Submit Action Button */}
          <div className="pt-4 border-t border-neutral-100 dark:border-slate-800 flex items-center justify-between">
            <button
              type="submit"
              disabled={isSaving}
              className="py-3 px-6 rounded-lg bg-blue-700 hover:bg-blue-800 active:scale-[0.98] text-white font-mono font-semibold text-xs transition shadow-sm inline-flex items-center gap-2 min-h-[44px]"
            >
              <Save className="size-4" />
              <span>{isSaving ? "Saving Profile..." : "Save Profile Details"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettingsTab;
