"use client";

import React from "react";
import { useDashboard } from "@/components/Dashboard/DashboardContext";
import { TrendingUp, MessageSquare, Activity } from "lucide-react";

const ServiceAutomationTab = () => {
  const { activeClient } = useDashboard();

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="bg-white rounded-lg border border-neutral-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1">
          <h3 className="text-lg font-mono text-slate-900 font-semibold flex items-center gap-2">
            <TrendingUp className="size-5 text-blue-700" />
            Workflow Automation & WhatsApp Business Integration
          </h3>
          <p className="text-xs text-slate-600 max-w-2xl font-inter">
            Automated messaging webhooks, EHR medical data sync, and background trigger pipelines for {activeClient?.name}.
          </p>
        </div>
        <span className="text-xs font-mono font-bold bg-green-100 text-green-700 px-3 py-1 rounded">
          Gateway Connected
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-4">
          <h4 className="text-xs font-mono font-bold text-slate-900 uppercase border-b pb-2 flex items-center gap-2">
            <MessageSquare className="size-4 text-blue-700" />
            WhatsApp Business API Webhook
          </h4>
          <div className="space-y-2 text-xs font-mono text-slate-700">
            <p>API Version: Meta Business Cloud v19.0</p>
            <p>Auto-Reply Bot: Enabled</p>
            <p>Messages Handled Today: 142</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-4">
          <h4 className="text-xs font-mono font-bold text-slate-900 uppercase border-b pb-2 flex items-center gap-2">
            <Activity className="size-4 text-blue-700" />
            EHR / Medical Database Sync Node
          </h4>
          <div className="space-y-2 text-xs font-mono text-slate-700">
            <p>HIPAA Compliance Audit: Passed</p>
            <p>Sync Frequency: Real-Time WebSockets</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceAutomationTab;
