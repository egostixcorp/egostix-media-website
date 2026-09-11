"use client";

import React from "react";
import { useDashboard } from "@/components/Dashboard/DashboardContext";
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { TrendingUp, Activity, Globe, Eye, Search, ArrowUpRight, Shield, Layers } from "lucide-react";

const analyticsData = {
  "egostix-internal": {
    activeNow: 8,
    avgCtr: "15.2%",
    locations: [
      { city: "Kolkata", country: "IN", users: 4 },
      { city: "New York", country: "US", users: 2 },
      { city: "London", country: "GB", users: 2 }
    ],
    searchPerformance: [
      { query: "egostix media digital agency", clicks: 220, impressions: 780, ctr: "28.2%", position: 1.0 },
      { query: "ai business website development", clicks: 85, impressions: 1370, ctr: "6.2%", position: 3.8 },
      { query: "custom erp development smb", clicks: 42, impressions: 380, ctr: "11.0%", position: 2.5 }
    ],
    pageViewsData: [
      { day: "Mon", views: 950 },
      { day: "Tue", views: 1050 },
      { day: "Wed", views: 1200 },
      { day: "Thu", views: 1100 },
      { day: "Fri", views: 1300 },
      { day: "Sat", views: 850 },
      { day: "Sun", views: 900 }
    ]
  },
  "apex-realty-platform": {
    activeNow: 14,
    avgCtr: "14.3%",
    locations: [
      { city: "Los Angeles", country: "US", users: 6 },
      { city: "New York", country: "US", users: 4 },
      { city: "London", country: "GB", users: 3 },
      { city: "Berlin", country: "DE", users: 1 }
    ],
    searchPerformance: [
      { query: "luxury villas malibu", clicks: 145, impressions: 1170, ctr: "12.4%", position: 1.2 },
      { query: "malibu homes for sale", clicks: 92, impressions: 1080, ctr: "8.5%", position: 2.4 },
      { query: "apex luxury real estate", clicks: 57, impressions: 258, ctr: "22.1%", position: 1.0 }
    ],
    pageViewsData: [
      { day: "Mon", views: 1200 },
      { day: "Tue", views: 1450 },
      { day: "Wed", views: 1680 },
      { day: "Thu", views: 1540 },
      { day: "Fri", views: 1890 },
      { day: "Sat", views: 2100 },
      { day: "Sun", views: 2350 }
    ]
  },
  "pulse-ops-erp": {
    activeNow: 2,
    avgCtr: "22.6%",
    locations: [
      { city: "Chicago", country: "US", users: 1 },
      { city: "San Francisco", country: "US", users: 1 }
    ],
    searchPerformance: [
      { query: "pulse logistics tracking", clicks: 310, impressions: 685, ctr: "45.2%", position: 1.0 },
      { query: "illinois fleet distribution", clicks: 48, impressions: 1000, ctr: "4.8%", position: 5.6 },
      { query: "pulseops erp", clicks: 24, impressions: 133, ctr: "18.0%", position: 1.2 }
    ],
    pageViewsData: [
      { day: "Mon", views: 240 },
      { day: "Tue", views: 280 },
      { day: "Wed", views: 310 },
      { day: "Thu", views: 290 },
      { day: "Fri", views: 340 },
      { day: "Sat", views: 180 },
      { day: "Sun", views: 150 }
    ]
  },
  "chronos-support-engine": {
    activeNow: 6,
    avgCtr: "16.4%",
    locations: [
      { city: "Seattle", country: "US", users: 3 },
      { city: "Vancouver", country: "CA", users: 2 },
      { city: "Portland", country: "US", users: 1 }
    ],
    searchPerformance: [
      { query: "chronos health booking", clicks: 185, impressions: 750, ctr: "24.6%", position: 1.1 },
      { query: "acupuncture seattle reservation", clicks: 74, impressions: 804, ctr: "9.2%", position: 2.8 },
      { query: "chronos virtual assistant", clicks: 35, impressions: 227, ctr: "15.4%", position: 1.5 }
    ],
    pageViewsData: [
      { day: "Mon", views: 850 },
      { day: "Tue", views: 920 },
      { day: "Wed", views: 980 },
      { day: "Thu", views: 940 },
      { day: "Fri", views: 1050 },
      { day: "Sat", views: 620 },
      { day: "Sun", views: 580 }
    ]
  },
  "synth-academy": {
    activeNow: 28,
    avgCtr: "19.4%",
    locations: [
      { city: "New York", country: "US", users: 9 },
      { city: "London", country: "GB", users: 7 },
      { city: "Paris", country: "FR", users: 5 },
      { city: "Tokyo", country: "JP", users: 4 },
      { city: "Sydney", country: "AU", users: 3 }
    ],
    searchPerformance: [
      { query: "synth academy creator", clicks: 820, impressions: 2530, ctr: "32.4%", position: 1.0 },
      { query: "stripe membership nextjs", clicks: 412, impressions: 2780, ctr: "14.8%", position: 2.1 },
      { query: "mux video integration cdn", clicks: 215, impressions: 1920, ctr: "11.2%", position: 3.4 }
    ],
    pageViewsData: [
      { day: "Mon", views: 3200 },
      { day: "Tue", views: 3500 },
      { day: "Wed", views: 3800 },
      { day: "Thu", views: 3600 },
      { day: "Fri", views: 4100 },
      { day: "Sat", views: 4500 },
      { day: "Sun", views: 4800 }
    ]
  }
};

const AnalysisTab = () => {
  const { activeClient, role } = useDashboard();
  const clientKey = activeClient?.slug || "egostix-internal";
  const data = analyticsData[clientKey] || analyticsData["egostix-internal"];

  const chartConfig = {
    views: {
      label: "Page Views",
      color: "hsl(var(--chart-1, 221 83% 53%))"
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Context Banner */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1">
          <h3 className="text-lg font-mono text-slate-900 font-semibold flex items-center gap-2">
            <Activity className="size-5 text-blue-700" />
            {role === "owner"
              ? "Admin Operations & System Analysis"
              : role === "staff"
              ? "Engineering System Monitor & Performance"
              : "Business Traffic & System Analytics"}
          </h3>
          <p className="text-xs text-slate-600 max-w-2xl font-inter">
            Monitoring active client infrastructure, live HTTP traffic streams, lead conversion metrics, and AI node latencies across Egostix cloud nodes.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {activeClient?.activeServices?.map((service, index) => (
            <span
              key={index}
              className="rounded bg-blue-50 border border-blue-100 text-[10px] font-mono text-blue-700 px-2 py-0.5"
            >
              {service}
            </span>
          ))}
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white rounded-lg border border-neutral-200 p-5 shadow-sm space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">
              Web Inbound Traffic
            </span>
            <span className="text-[9px] font-mono font-bold bg-green-100 text-green-700 rounded px-1.5 py-0.5">
              {activeClient?.metrics?.trafficChange || "+12%"}
            </span>
          </div>
          <div className="text-2xl font-mono font-bold text-slate-900">
            {activeClient?.metrics?.traffic || "0"}
          </div>
          <p className="text-[10px] text-slate-500 leading-tight">
            Unique visitors browsing platform nodes this month.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-5 shadow-sm space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">
              AI Captured Leads
            </span>
            <span className="text-[9px] font-mono font-bold bg-green-100 text-green-700 rounded px-1.5 py-0.5">
              {activeClient?.metrics?.leadsChange || "+18%"}
            </span>
          </div>
          <div className="text-2xl font-mono font-bold text-slate-900">
            {activeClient?.metrics?.leads || "0"}
          </div>
          <p className="text-[10px] text-slate-500 leading-tight">
            Qualified leads automatically registered in CRM.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-5 shadow-sm space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">
              System Conversion
            </span>
            <span className="text-[9px] font-mono font-bold bg-green-100 text-green-700 rounded px-1.5 py-0.5">
              {activeClient?.metrics?.conversionChange || "+0.8%"}
            </span>
          </div>
          <div className="text-2xl font-mono font-bold text-slate-900">
            {activeClient?.metrics?.conversionRate || "5.4%"}
          </div>
          <p className="text-[10px] text-slate-500 leading-tight">
            Percent of visitors booking service & viewing nodes.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-5 shadow-sm space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">
              AI Concierge Latency
            </span>
            <span className="text-[9px] font-mono font-bold bg-blue-100 text-blue-700 rounded px-1.5 py-0.5">
              Active
            </span>
          </div>
          <div className="text-2xl font-mono font-bold text-slate-900">
            {activeClient?.metrics?.aiChatResponseTime || "1.2s"}
          </div>
          <p className="text-[10px] text-slate-500 leading-tight">
            Average response latency on customer chatbot node.
          </p>
        </div>
      </div>

      {/* Traffic Chart & Live Active Users */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-mono font-semibold text-slate-900">
                Weekly Pageview Dynamics
              </h4>
              <p className="text-[11px] text-slate-500">
                7-day traffic trend graph across production routes.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-blue-700 font-semibold bg-blue-50 px-2.5 py-1 rounded">
              <TrendingUp className="size-3.5" />
              <span>Real-Time Sync</span>
            </div>
          </div>
          <div className="h-64 w-full">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <AreaChart data={data.pageViewsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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

        {/* Live Active Visitor Widget */}
        <div className="bg-slate-900 text-white rounded-lg p-6 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold flex items-center gap-2">
                <span className="size-2 rounded-full bg-emerald-400 animate-ping" />
                Active Right Now
              </span>
              <Globe className="size-4 text-slate-400" />
            </div>
            <div className="text-4xl font-mono font-bold text-white">
              {data.activeNow}
            </div>
            <p className="text-xs text-slate-400 font-inter">
              Live sessions on platform web routes across global regions.
            </p>
          </div>

          <div className="border-t border-slate-800 pt-4 space-y-2">
            <span className="text-[10px] font-mono uppercase text-slate-400 font-semibold block">
              Top Session Cities
            </span>
            <div className="space-y-1.5">
              {data.locations.map((loc, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-medium">{loc.city}, {loc.country}</span>
                  <span className="font-mono text-blue-400 font-bold">{loc.users} live</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Search Console Keywords Table */}
      <div className="bg-white rounded-lg border border-neutral-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-mono font-semibold text-slate-900 flex items-center gap-2">
              <Search className="size-4 text-slate-500" />
              Search Performance & Organic Keyword Positions
            </h4>
            <p className="text-[11px] text-slate-500">
              Query indexing rankings and impressions on Google Search Console node.
            </p>
          </div>
          <span className="text-[10px] font-mono bg-neutral-100 text-slate-700 px-2 py-1 rounded border border-neutral-200">
            Average CTR: {data.avgCtr}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-inter">
            <thead className="bg-neutral-50 text-[10px] font-mono uppercase text-slate-500 border-y border-neutral-200">
              <tr>
                <th className="py-2.5 px-3 font-semibold">Target Search Query</th>
                <th className="py-2.5 px-3 font-semibold">Clicks</th>
                <th className="py-2.5 px-3 font-semibold">Impressions</th>
                <th className="py-2.5 px-3 font-semibold">CTR</th>
                <th className="py-2.5 px-3 font-semibold">Avg Position</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {data.searchPerformance.map((item, idx) => (
                <tr key={idx} className="hover:bg-neutral-50/60 transition-colors">
                  <td className="py-3 px-3 font-medium text-slate-900 font-mono flex items-center gap-1.5">
                    <span>{item.query}</span>
                    <ArrowUpRight className="size-3 text-slate-400" />
                  </td>
                  <td className="py-3 px-3 text-slate-700 font-mono">{item.clicks}</td>
                  <td className="py-3 px-3 text-slate-700 font-mono">{item.impressions}</td>
                  <td className="py-3 px-3 font-mono font-semibold text-emerald-600">{item.ctr}</td>
                  <td className="py-3 px-3 font-mono font-bold text-slate-900">#{item.position.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AnalysisTab;
