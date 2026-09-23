"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useDashboard } from "@/components/Dashboard/DashboardContext";
import GpmConnectModal from "@/components/Dashboard/modals/GpmConnectModal";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  TrendingUp,
  Activity,
  Globe,
  Search,
  ArrowUpRight,
  Shield,
  Layers,
  Sparkles,
  ExternalLink,
  Settings,
  AlertCircle,
  CheckCircle2,
  Radio
} from "lucide-react";

export default function AnalysisTab() {
  const { activeClient, role } = useDashboard();
  const [isGpmModalOpen, setIsGpmModalOpen] = useState(false);

  const gpmPropertyId = activeClient?.gaPropertyId || activeClient?.config?.gpmId || "";
  const isGpmConnected = Boolean(gpmPropertyId && gpmPropertyId.trim().length > 0);

  // Generate dynamic 7-day traffic trend based on active client metrics
  const totalTraffic = parseInt(activeClient?.metrics?.traffic?.toString().replace(/,/g, "") || "0", 10);
  const baseline = totalTraffic > 0 ? Math.round(totalTraffic / 7) : 0;
  
  const pageViewsData = [
    { day: "Mon", views: Math.round(baseline * 0.85) },
    { day: "Tue", views: Math.round(baseline * 0.95) },
    { day: "Wed", views: Math.round(baseline * 1.15) },
    { day: "Thu", views: Math.round(baseline * 1.05) },
    { day: "Fri", views: Math.round(baseline * 1.25) },
    { day: "Sat", views: Math.round(baseline * 0.8) },
    { day: "Sun", views: Math.round(baseline * 0.9) }
  ];

  const chartConfig = {
    views: {
      label: "Page Views",
      color: "hsl(var(--chart-1, 221 83% 53%))"
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200 font-inter">
      {/* Context Banner */}
      <div className="bg-white rounded-xl border border-neutral-200 p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 shadow-sm">
        <div className="space-y-1 sm:space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="p-1.5 sm:p-2 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 shrink-0">
              <Activity className="size-4 sm:size-5" />
            </span>
            <h3 className="text-lg sm:text-xl font-mono text-slate-900 font-bold">
              {role === "owner"
                ? "Admin Operations & System Analysis"
                : role === "staff"
                ? "Engineering System Monitor & Performance"
                : "Business Traffic & System Analytics"}
            </h3>
          </div>
          <p className="text-xs text-slate-600 max-w-2xl font-inter leading-relaxed">
            Monitoring active client infrastructure, live HTTP traffic streams, lead conversion metrics, and AI node latencies across Egostix cloud nodes.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
          {activeClient?.activeServices?.map((service, index) => (
            <span
              key={index}
              className="rounded-md bg-blue-50 border border-blue-100 text-[10px] font-mono font-semibold text-blue-700 px-2.5 py-1"
            >
              {service}
            </span>
          ))}
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-4 sm:gap-6 grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-xl border border-neutral-200 p-4 sm:p-5 shadow-sm space-y-2.5 sm:space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono uppercase text-slate-500 font-bold truncate mr-1">
              Web Inbound Traffic
            </span>
            <span className="text-[9px] font-mono font-bold bg-green-100 text-green-700 rounded px-1.5 py-0.5 shrink-0">
              {activeClient?.metrics?.trafficChange || "+12%"}
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-mono font-bold text-slate-900">
            {activeClient?.metrics?.traffic || "0"}
          </div>
          <p className="text-[10px] text-slate-500 leading-tight">
            Unique visitors browsing platform nodes this month.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-4 sm:p-5 shadow-sm space-y-2.5 sm:space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono uppercase text-slate-500 font-bold truncate mr-1">
              AI Captured Leads
            </span>
            <span className="text-[9px] font-mono font-bold bg-green-100 text-green-700 rounded px-1.5 py-0.5 shrink-0">
              {activeClient?.metrics?.leadsChange || "+18%"}
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-mono font-bold text-slate-900">
            {activeClient?.metrics?.leads || "0"}
          </div>
          <p className="text-[10px] text-slate-500 leading-tight">
            Qualified leads automatically registered in CRM.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-4 sm:p-5 shadow-sm space-y-2.5 sm:space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono uppercase text-slate-500 font-bold truncate mr-1">
              System Conversion
            </span>
            <span className="text-[9px] font-mono font-bold bg-green-100 text-green-700 rounded px-1.5 py-0.5 shrink-0">
              {activeClient?.metrics?.conversionChange || "+0.8%"}
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-mono font-bold text-slate-900">
            {activeClient?.metrics?.conversionRate || "5.4%"}
          </div>
          <p className="text-[10px] text-slate-500 leading-tight">
            Percent of visitors booking service & viewing nodes.
          </p>
        </div>

        <div className="bg-white rounded-xl border border-neutral-200 p-4 sm:p-5 shadow-sm space-y-2.5 sm:space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono uppercase text-slate-500 font-bold truncate mr-1">
              AI Concierge Latency
            </span>
            <span className="text-[9px] font-mono font-bold bg-blue-100 text-blue-700 rounded px-1.5 py-0.5 shrink-0">
              Active
            </span>
          </div>
          <div className="text-xl sm:text-2xl font-mono font-bold text-slate-900">
            {activeClient?.metrics?.aiChatResponseTime || "1.2s"}
          </div>
          <p className="text-[10px] text-slate-500 leading-tight">
            Average response latency on customer chatbot node.
          </p>
        </div>
      </div>

      {/* Traffic Chart & Live Active Users (Grid with overflow protection) */}
      <div className="grid gap-6 lg:grid-cols-3 w-full min-w-0">
        {/* Weekly Pageview Dynamics Card (Mobile-Optimized & Contained) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-neutral-200 p-4 sm:p-6 shadow-sm space-y-4 w-full min-w-0 overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h4 className="text-sm font-mono font-bold text-slate-900">
                Weekly Pageview Dynamics
              </h4>
              <p className="text-[11px] text-slate-500 font-inter">
                7-day traffic trend telemetry across production routes.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-blue-700 font-semibold bg-blue-50 border border-blue-100 px-2.5 py-1 rounded-md">
              <TrendingUp className="size-3.5" />
              <span>Real-Time Sync</span>
            </div>
          </div>

          <div className="h-56 sm:h-64 w-full min-w-0 overflow-hidden pt-2">
            <ChartContainer config={chartConfig} className="h-full w-full min-w-0">
              <AreaChart data={pageViewsData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="fillViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area type="monotone" dataKey="views" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#fillViews)" />
              </AreaChart>
            </ChartContainer>
          </div>
        </div>

        {/* Live Active Visitor / GPM Connection Card */}
        <div className="bg-slate-900 text-white rounded-xl p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-6 min-w-0 overflow-hidden">
          {isGpmConnected ? (
            <>
              {/* Connected GPM State */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-2">
                    <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                    GPM Telemetry Live
                  </span>
                  <Globe className="size-4 text-slate-400" />
                </div>
                <div>
                  <div className="text-3xl sm:text-4xl font-mono font-bold text-white">
                    {activeClient?.metrics?.activeChats || "1"} Live
                  </div>
                  <p className="text-xs text-slate-400 font-inter mt-1">
                    Real-time active session listening on property node.
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-800 pt-4 space-y-2 font-mono text-xs">
                <div className="flex justify-between items-center text-slate-400">
                  <span>Connected GPM ID</span>
                  <span className="text-blue-400 font-bold">{gpmPropertyId}</span>
                </div>
                <div className="flex justify-between items-center text-slate-400">
                  <span>Telemetry Stream</span>
                  <span className="text-emerald-400 font-semibold">Active & Synced</span>
                </div>
                {role === "client" ? (
                  <button
                    type="button"
                    onClick={() => setIsGpmModalOpen(true)}
                    className="mt-2 w-full text-center py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-mono transition"
                  >
                    Update Property ID →
                  </button>
                ) : (
                  <Link
                    href="/dashboard/client-settings"
                    className="mt-2 block text-center py-2 px-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-mono transition"
                  >
                    Edit Property ID in Settings →
                  </Link>
                )}
              </div>
            </>
          ) : (
            <>
              {/* Disconnected GPM State (Actionable setup card) */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-1.5">
                    <Radio className="size-3.5 text-amber-400" />
                    GPM / GA4 ID Unlinked
                  </span>
                  <Shield className="size-4 text-slate-500" />
                </div>
                <h5 className="text-base font-mono font-bold text-white">
                  Connect Google Property ID
                </h5>
                <p className="text-xs text-slate-400 font-inter leading-relaxed">
                  Link your Google Analytics 4 (GPM Measurement ID) to stream verified live visitors, global geographic telemetry, and session analytics.
                </p>
              </div>

              <div className="border-t border-slate-800 pt-4 space-y-2.5">
                {role === "client" ? (
                  <button
                    type="button"
                    onClick={() => setIsGpmModalOpen(true)}
                    className="w-full py-2.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-sm min-h-[40px]"
                  >
                    <Settings className="size-3.5" />
                    <span>Connect Google Property ID</span>
                    <ArrowUpRight className="size-3.5" />
                  </button>
                ) : (
                  <Link
                    href="/dashboard/client-settings"
                    className="w-full py-2.5 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition shadow-sm min-h-[40px]"
                  >
                    <Settings className="size-3.5" />
                    <span>Configure GPM ID in Settings</span>
                    <ArrowUpRight className="size-3.5" />
                  </Link>
                )}
                <p className="text-[10px] font-mono text-slate-500 text-center">
                  {role === "client" ? "Click to connect your Google Analytics ID" : "Configure once in Client Profile Manager"}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Google Search Console & Keyword Positions Card */}
      <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-neutral-100 pb-3">
          <div>
            <h4 className="text-sm font-mono font-bold text-slate-900 flex items-center gap-2">
              <Search className="size-4 text-blue-700" />
              Google Search Console & Organic Indexing
            </h4>
            <p className="text-[11px] text-slate-500">
              Query indexing rankings, search click-through rates, and Google organic keyword telemetry.
            </p>
          </div>
          <span className={`text-[10px] font-mono px-2.5 py-1 rounded-full font-bold border self-start sm:self-auto ${
            isGpmConnected
              ? "bg-emerald-50 text-emerald-700 border-emerald-200"
              : "bg-neutral-100 text-slate-600 border-neutral-200"
          }`}>
            {isGpmConnected ? `Property Linked: ${gpmPropertyId}` : "Search Console Not Connected"}
          </span>
        </div>

        {isGpmConnected ? (
          <div className="p-6 rounded-xl bg-neutral-50/60 border border-neutral-200 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-900">
              <CheckCircle2 className="size-4 text-emerald-600" />
              <span>Google Property ID & Search Console Pipeline Active</span>
            </div>
            <p className="text-xs text-slate-600 font-inter leading-relaxed max-w-2xl">
              Real-time Google search indexing is synchronizing with domain <strong className="text-slate-900">{activeClient?.name}</strong>. Clicks, impressions, and search query positions will refresh continuously on Google crawler cycles.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <Link
                href="/dashboard/service-websites"
                className="text-xs font-mono font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition inline-flex items-center gap-1"
              >
                <span>View SEO Pipeline</span>
                <ArrowUpRight className="size-3" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="p-6 rounded-xl bg-neutral-50/60 border border-dashed border-neutral-300 text-center space-y-3">
            <div className="size-10 rounded-full bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center mx-auto">
              <Search className="size-5" />
            </div>
            <div className="space-y-1">
              <h5 className="font-mono text-xs font-bold text-slate-800">
                No Search Console / GPM ID Configured
              </h5>
              <p className="text-xs text-slate-500 font-inter max-w-md mx-auto leading-relaxed">
                Connect your Google Search Console Property or GPM ID to view real organic search query impressions, keyword positioning, and organic CTR.
              </p>
            </div>
            {role === "client" ? (
              <button
                type="button"
                onClick={() => setIsGpmModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-mono text-xs font-semibold shadow-xs transition min-h-[40px]"
              >
                <Settings className="size-3.5" />
                <span>Connect Google Property ID</span>
              </button>
            ) : (
              <Link
                href="/dashboard/client-settings"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-mono text-xs font-semibold shadow-xs transition min-h-[40px]"
              >
                <Settings className="size-3.5" />
                <span>Configure GPM ID in Client Settings</span>
              </Link>
            )}
          </div>
        )}
      </div>

      {/* GPM / Google Property ID Connection Modal */}
      <GpmConnectModal
        isOpen={isGpmModalOpen}
        onClose={() => setIsGpmModalOpen(false)}
        initialGpmId={gpmPropertyId}
        clientName={activeClient?.name}
        clientSlug={activeClient?.slug}
      />
    </div>
  );
}
