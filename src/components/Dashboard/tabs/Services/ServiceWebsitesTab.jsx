"use client";

import React, { useState } from "react";
import { useDashboard } from "@/components/Dashboard/DashboardContext";
import { Shield, Globe, CheckCircle2, RefreshCw } from "lucide-react";

const ServiceWebsitesTab = () => {
  const { activeClient } = useDashboard();
  const [crmProvider, setCrmProvider] = useState("HubSpot");

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-neutral-200 dark:border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1">
          <h3 className="text-lg font-mono text-slate-900 dark:text-slate-100 font-semibold flex items-center gap-2">
            <Shield className="size-5 text-blue-700 dark:text-blue-400" />
            AI Business Websites & Marketing Node Control
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl font-inter">
            Active web node deployment, SEO pipeline indexing, and CRM synchronization settings for {activeClient?.name}.
          </p>
        </div>
        <span className="text-xs font-mono font-bold bg-green-100 dark:bg-emerald-950/50 text-green-700 dark:text-emerald-400 border border-green-200 dark:border-emerald-900/50 px-3 py-1 rounded">
          Node Online: 99.9% SLA
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-neutral-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <h4 className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 uppercase border-b border-neutral-150 dark:border-slate-800 pb-2">
            CRM Integration Synchronization
          </h4>
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold mb-1">
                Active CRM Provider
              </label>
              <select
                value={crmProvider}
                onChange={(e) => setCrmProvider(e.target.value)}
                className="w-full rounded border border-neutral-300 dark:border-slate-700 px-3 py-2 font-mono bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:border-blue-700 focus:outline-none"
              >
                <option value="HubSpot">HubSpot CRM</option>
                <option value="Salesforce">Salesforce Cloud</option>
                <option value="Zoho">Zoho CRM</option>
                <option value="Custom CRM Webhook">Custom CRM / REST Webhook</option>
              </select>
            </div>
            <div className="p-3 bg-neutral-50 dark:bg-slate-800/60 rounded border border-neutral-200 dark:border-slate-700 font-mono text-[11px] text-slate-700 dark:text-slate-300 space-y-1">
              <p>Active Endpoint: {crmProvider} Gateway (Online)</p>
              <p>Last Sync Webhook: Real-time event processed</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-lg border border-neutral-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <h4 className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 uppercase border-b border-neutral-150 dark:border-slate-800 pb-2">
            SEO Indexing & Sitemap Pipeline
          </h4>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 font-mono">
              <span>Google Search Console API</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">Synced</span>
            </div>
            <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 font-mono">
              <span>Dynamic XML Sitemap</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">Auto-Generated</span>
            </div>
            <div className="flex items-center justify-between text-slate-700 dark:text-slate-300 font-mono">
              <span>Robots.txt Security Audit</span>
              <span className="text-blue-700 dark:text-blue-400 font-bold">Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceWebsitesTab;
