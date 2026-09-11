"use client";

import React, { useState } from "react";
import { useDashboard } from "@/components/Dashboard/DashboardContext";
import { Shield, Globe, CheckCircle2, RefreshCw } from "lucide-react";

const ServiceWebsitesTab = () => {
  const { activeClient } = useDashboard();
  const [crmProvider, setCrmProvider] = useState("HubSpot");

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="bg-white rounded-lg border border-neutral-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1">
          <h3 className="text-lg font-mono text-slate-900 font-semibold flex items-center gap-2">
            <Shield className="size-5 text-blue-700" />
            AI Business Websites & Marketing Node Control
          </h3>
          <p className="text-xs text-slate-600 max-w-2xl font-inter">
            Active web node deployment, SEO pipeline indexing, and CRM synchronization settings for {activeClient?.name}.
          </p>
        </div>
        <span className="text-xs font-mono font-bold bg-green-100 text-green-700 px-3 py-1 rounded">
          Node Online: 99.9% SLA
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-4">
          <h4 className="text-xs font-mono font-bold text-slate-900 uppercase border-b pb-2">
            CRM Integration Synchronization
          </h4>
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-[10px] font-mono text-slate-500 uppercase font-bold mb-1">
                Active CRM Provider
              </label>
              <select
                value={crmProvider}
                onChange={(e) => setCrmProvider(e.target.value)}
                className="w-full rounded border border-neutral-300 px-3 py-2 font-mono bg-white"
              >
                <option value="HubSpot">HubSpot CRM (Connected)</option>
                <option value="Salesforce">Salesforce Cloud</option>
                <option value="Zoho">Zoho CRM</option>
              </select>
            </div>
            <div className="p-3 bg-neutral-50 rounded border border-neutral-200 font-mono text-[11px] text-slate-700 space-y-1">
              <p>Status: Lead Sync Endpoint Active</p>
              <p>Last Webhook Trigger: 4 mins ago</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-4">
          <h4 className="text-xs font-mono font-bold text-slate-900 uppercase border-b pb-2">
            SEO Indexing & Sitemap Pipeline
          </h4>
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between text-slate-700 font-mono">
              <span>Google Search Console API</span>
              <span className="text-green-600 font-bold">Synced</span>
            </div>
            <div className="flex items-center justify-between text-slate-700 font-mono">
              <span>Dynamic XML Sitemap</span>
              <span className="text-green-600 font-bold">Auto-Generated</span>
            </div>
            <div className="flex items-center justify-between text-slate-700 font-mono">
              <span>Robots.txt Security Audit</span>
              <span className="text-blue-700 font-bold">Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceWebsitesTab;
