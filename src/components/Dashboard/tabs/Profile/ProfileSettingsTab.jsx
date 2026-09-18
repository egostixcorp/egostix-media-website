"use client";

import React, { useState, useEffect } from "react";
import { useDashboard } from "@/components/Dashboard/DashboardContext";
import { User, Mail, Building2, Phone, ShieldCheck, CheckCircle2, Save, Key } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import AvatarUpload from "@/components/global/AvatarUpload";

const ProfileSettingsTab = () => {
  const { currentUser, role } = useDashboard();
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

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Context Banner */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-blue-50 border border-blue-100 text-blue-700">
              <User className="size-5" />
            </span>
            <h3 className="text-xl font-mono text-slate-900 font-bold">
              Active User Account & Profile Settings
            </h3>
          </div>
          <p className="text-xs text-slate-600 max-w-2xl font-inter leading-relaxed">
            Manage your personal account profile, contact credentials, organization details, and security parameters.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-lg uppercase">
            Role: {role}
          </span>
        </div>
      </div>

      {saveSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 text-green-800 text-xs font-mono shadow-xs">
          <CheckCircle2 className="size-5 text-green-600 shrink-0" />
          <span>Profile details updated successfully! Changes saved to database.</span>
        </div>
      )}

      {saveError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 text-red-800 text-xs font-mono shadow-xs">
          <ShieldCheck className="size-5 text-red-500 shrink-0" />
          <span>{saveError}</span>
        </div>
      )}

      {/* Main Profile Form Card */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
          <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <User className="size-4 text-blue-700" />
            Personal Profile Parameters
          </h4>
          <span className="text-[11px] font-mono text-slate-500">
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
            <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
              Full Name *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Enter your full name"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full rounded-lg border border-neutral-300 pl-9 pr-3.5 py-2.5 text-xs font-inter focus:border-blue-700 focus:outline-none min-h-[44px]"
              />
              <User className="absolute left-3 top-3 size-4 text-slate-400" />
            </div>
          </div>

          {/* Email Address (Readonly / Primary Auth) */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
              Work Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                disabled
                value={profileForm.email}
                className="w-full rounded-lg border border-neutral-200 bg-neutral-50 pl-9 pr-3.5 py-2.5 text-xs font-mono text-slate-600 cursor-not-allowed min-h-[44px]"
              />
              <Mail className="absolute left-3 top-3 size-4 text-slate-400" />
            </div>
          </div>

          {/* Company / Brand Name */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
              Organization / Company Name
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="e.g. Egostix Media"
                value={profileForm.company}
                onChange={(e) => setProfileForm({ ...profileForm, company: e.target.value })}
                className="w-full rounded-lg border border-neutral-300 pl-9 pr-3.5 py-2.5 text-xs font-inter focus:border-blue-700 focus:outline-none min-h-[44px]"
              />
              <Building2 className="absolute left-3 top-3 size-4 text-slate-400" />
            </div>
          </div>

          {/* Direct Phone Number */}
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
              Contact Phone Number
            </label>
            <div className="relative">
              <input
                type="tel"
                placeholder="+91 98765 43210"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                className="w-full rounded-lg border border-neutral-300 pl-9 pr-3.5 py-2.5 text-xs font-inter focus:border-blue-700 focus:outline-none min-h-[44px]"
              />
              <Phone className="absolute left-3 top-3 size-4 text-slate-400" />
            </div>
          </div>

          {/* Submit Action Button */}
          <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
            <button
              type="submit"
              disabled={isSaving}
              className="py-3 px-6 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-mono font-semibold text-xs transition shadow-sm inline-flex items-center gap-2 min-h-[44px]"
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
