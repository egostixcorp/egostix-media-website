"use client";

import React, { useState } from "react";
import { useDashboard } from "@/components/Dashboard/DashboardContext";
import { TrendingUp, MessageSquare, Activity } from "lucide-react";

const ServiceAutomationTab = () => {
  const { activeClient } = useDashboard();
  const [messagingChannel, setMessagingChannel] = useState("WhatsApp Cloud API");
  const [syncTarget, setSyncTarget] = useState("External CRM / Database");

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-neutral-200 dark:border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1">
          <h3 className="text-lg font-mono text-slate-900 dark:text-slate-100 font-semibold flex items-center gap-2">
            <TrendingUp className="size-5 text-blue-700 dark:text-blue-400" />
            Workflow Automation & Multi-Channel Messaging
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl font-inter">
            Automated messaging webhooks, bidirectional database synchronization, and background trigger pipelines for {activeClient?.name}.
          </p>
        </div>
        <span className="text-xs font-mono font-bold bg-green-100 dark:bg-emerald-950/50 text-green-700 dark:text-emerald-400 border border-green-200 dark:border-emerald-900/50 px-3 py-1 rounded">
          Gateway Connected
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-neutral-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-neutral-150 dark:border-slate-800 pb-2">
            <h4 className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 uppercase flex items-center gap-2">
              <MessageSquare className="size-4 text-blue-700 dark:text-blue-400" />
              Omnichannel Messaging Node
            </h4>
            <select
              value={messagingChannel}
              onChange={(e) => setMessagingChannel(e.target.value)}
              className="rounded border border-neutral-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 py-1 text-[10px] font-mono text-slate-900 dark:text-slate-100 focus:border-blue-700 focus:outline-none"
            >
              <option value="WhatsApp Cloud API">WhatsApp API</option>
              <option value="Telegram Bot API">Telegram Bot</option>
              <option value="Slack Webhook">Slack Webhook</option>
              <option value="SMS / Twilio Gateway">SMS / Twilio</option>
            </select>
          </div>
          <div className="space-y-2 text-xs font-mono text-slate-700 dark:text-slate-300">
            <p>Active Channel: {messagingChannel}</p>
            <p>Auto-Reply AI Concierge: Enabled (Real-Time)</p>
            <p>Dispatches Handled Today: 142 events</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-lg border border-neutral-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-neutral-150 dark:border-slate-800 pb-2">
            <h4 className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 uppercase flex items-center gap-2">
              <Activity className="size-4 text-blue-700 dark:text-blue-400" />
              External System & Database Sync
            </h4>
            <select
              value={syncTarget}
              onChange={(e) => setSyncTarget(e.target.value)}
              className="rounded border border-neutral-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 py-1 text-[10px] font-mono text-slate-900 dark:text-slate-100 focus:border-blue-700 focus:outline-none"
            >
              <option value="External CRM / Database">CRM / Cloud Database</option>
              <option value="EHR / Health Records">EHR / Medical Records</option>
              <option value="ERP / Inventory Systems">ERP / Inventory Ops</option>
              <option value="Custom REST Webhook">Custom REST Gateway</option>
            </select>
          </div>
          <div className="space-y-2 text-xs font-mono text-slate-700 dark:text-slate-300">
            <p>Sync Destination: {syncTarget}</p>
            <p>Security & Encryption: TLS 1.3 / AES-256 (Passed)</p>
            <p>Sync Frequency: Real-Time WebSockets & Webhooks</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceAutomationTab;
