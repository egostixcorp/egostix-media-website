"use client";

import React, { useState, useEffect } from "react";
import { useDashboard } from "@/components/Dashboard/DashboardContext";
import { Users, CheckCircle2, Shield, Layers, UserCheck } from "lucide-react";

const ClientSettingsTab = () => {
  const { activeClient, updateClientDetails } = useDashboard();

  const [clientForm, setClientForm] = useState({
    name: activeClient?.name || "",
    ownerName: activeClient?.ownerName || "",
    ownerEmail: activeClient?.ownerEmail || ""
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (activeClient) {
      setClientForm({
        name: activeClient.name || "",
        ownerName: activeClient.ownerName || "",
        ownerEmail: activeClient.ownerEmail || ""
      });
    }
  }, [activeClient]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!activeClient) return;

    updateClientDetails(activeClient.slug, clientForm);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Context Banner */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-blue-50 border border-blue-100 text-blue-700">
              <Users className="size-5" />
            </span>
            <h3 className="text-xl font-mono text-slate-900 font-bold">
              Client Profile & Account Parameters Manager
            </h3>
          </div>
          <p className="text-xs text-slate-600 max-w-2xl font-inter leading-relaxed">
            Modify client company credentials, active account owner parameters, and tenant context configs.
          </p>
        </div>
      </div>

      {saveSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 text-green-800 text-xs font-mono shadow-xs">
          <CheckCircle2 className="size-5 text-green-600 shrink-0" />
          <span>Client parameters updated successfully! Active context refreshed.</span>
        </div>
      )}

      {/* Form Card */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-6">
        <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider border-b border-neutral-100 pb-3 flex items-center gap-2">
          <UserCheck className="size-4 text-blue-700" />
          Editing Active Context: {activeClient?.name}
        </h4>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-inter max-w-xl">
          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
              Client Company / Organization Name *
            </label>
            <input
              type="text"
              required
              value={clientForm.name}
              onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
              className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-xs font-inter focus:border-blue-700 focus:outline-none min-h-[44px]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
              Account Owner Representative Name *
            </label>
            <input
              type="text"
              required
              value={clientForm.ownerName}
              onChange={(e) => setClientForm({ ...clientForm, ownerName: e.target.value })}
              className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-xs font-inter focus:border-blue-700 focus:outline-none min-h-[44px]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
              Account Owner Email Address *
            </label>
            <input
              type="email"
              required
              value={clientForm.ownerEmail}
              onChange={(e) => setClientForm({ ...clientForm, ownerEmail: e.target.value })}
              className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-xs font-inter focus:border-blue-700 focus:outline-none min-h-[44px]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="py-3 px-6 rounded-lg bg-blue-700 hover:bg-blue-800 active:scale-[0.98] text-white font-mono font-semibold text-xs transition shadow-sm min-h-[44px]"
            >
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientSettingsTab;
