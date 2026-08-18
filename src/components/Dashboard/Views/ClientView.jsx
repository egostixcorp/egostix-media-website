"use client";

import React, { useState } from "react";
import { useDashboard } from "../DashboardContext";
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  TrendingUp,
  Inbox,
  FileText,
  Trello,
  Plus,
  Send,
  Trash2,
  FileCode,
  Download,
  AlertCircle,
  CheckCircle2,
  Search,
  ArrowUpRight,
  User,
  Phone,
  Mail,
  Calendar,
  Layers,
  Sparkles,
  Globe,
  Activity,
  MousePointerClick,
  Eye,
  Shield,
  Briefcase
} from "lucide-react";

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

const ClientView = () => {
  const {
    activeClient,
    activeTab,
    setActiveTab,
    kanbanTasks,
    uploadedFiles,
    serviceUpgrades,
    leads,
    addKanbanTask,
    uploadFile,
    deleteFile,
    requestUpgrade
  } = useDashboard();

  const hasGA = !!activeClient?.gaPropertyId;

  // Local state helper for forms/drawers
  const [fileForm, setFileForm] = useState({ name: "", type: "Image Document", size: "1.2 MB" });
  const [upgradeForm, setUpgradeForm] = useState({ serviceName: "AI Internal Tool Dashboard", description: "" });
  const [selectedLead, setSelectedLead] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [searchLeadQuery, setSearchLeadQuery] = useState("");

  // Dynamic Provider Selectors
  const [crmProvider, setCrmProvider] = useState("HubSpot");
  const [skuSystem, setSkuSystem] = useState("ERP Console");
  const [dbEngine, setDbEngine] = useState("PostgreSQL");
  const [fleetTracker, setFleetTracker] = useState("GPS Routing");
  const [billingProvider, setBillingProvider] = useState("Stripe");
  const [cdnProvider, setCdnProvider] = useState("Mux CDN");
  const [messageGateway, setMessageGateway] = useState("WhatsApp API");
  const [syncNode, setSyncNode] = useState("EHR Medical");

  // Filters for client slug
  const clientTasks = kanbanTasks.filter((t) => t.clientSlug === activeClient.slug);
  const clientFiles = uploadedFiles.filter((f) => f.clientSlug === activeClient.slug);
  const clientUpgrades = serviceUpgrades.filter((u) => u.clientSlug === activeClient.slug);
  const clientLeads = leads.filter((l) => l.clientSlug === activeClient.slug);

  const filteredLeads = clientLeads.filter(
    (l) =>
      l.name.toLowerCase().includes(searchLeadQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchLeadQuery.toLowerCase())
  );

  // File Upload Form Submission
  const handleFileUpload = (e) => {
    e.preventDefault();
    if (!fileForm.name) return;
    const nameWithExt = fileForm.name.includes(".") 
      ? fileForm.name 
      : `${fileForm.name}.${fileForm.type === "PDF Document" ? "pdf" : fileForm.type === "SVG Vector" ? "svg" : "png"}`;
    uploadFile(nameWithExt, fileForm.size, fileForm.type);
    setFileForm({ name: "", type: "Image Document", size: "1.2 MB" });
  };

  // Service Request Submission
  const handleUpgradeRequest = (e) => {
    e.preventDefault();
    if (!upgradeForm.description) return;
    requestUpgrade(upgradeForm.serviceName, upgradeForm.description);
    setUpgradeForm({ serviceName: "AI Internal Tool Dashboard", description: "" });
  };

  // Submit client task request to Kanban backlog
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle) return;
    addKanbanTask({
      title: newTaskTitle,
      description: "Requested by client via portal.",
      priority: "medium"
    });
    setNewTaskTitle("");
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* View Header */}
      <header className="h-16 border-b border-neutral-200 bg-white flex items-center justify-between px-8 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
            Portal
          </span>
          <span className="text-slate-300">/</span>
          <h2 className="text-sm font-mono font-bold text-slate-900 flex items-center gap-2">
            {activeClient.name}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-mono text-slate-500 uppercase">
            Active System Sync
          </span>
        </div>
      </header>

      {/* Main View Area */}
      <main className="flex-1 p-8 overflow-y-auto max-w-7xl w-full mx-auto space-y-8">
        
        {/* ================= OVERVIEW / ANALYTICS TAB ================= */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Context Summary */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
              <div className="space-y-1">
                <h3 className="text-lg font-mono text-slate-900 font-semibold">
                  Where Imagination Meets Intelligence
                </h3>
                <p className="text-xs text-slate-600 max-w-2xl font-inter">
                  Your business systems are actively running on Egostix servers. Monitor traffic metrics, qualified leads, and AI performance logs below.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {activeClient.activeServices.map((service, index) => (
                  <span
                    key={index}
                    className="rounded bg-blue-50 border border-blue-100 text-[10px] font-mono text-blue-700 px-2 py-0.5"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white rounded-lg border border-neutral-200 p-5 shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">
                    Web Inbound Traffic
                  </span>
                  <span className="text-[9px] font-mono font-bold bg-green-100 text-green-700 rounded px-1.5 py-0.5">
                    {activeClient.metrics.trafficChange}
                  </span>
                </div>
                <div className="text-2xl font-mono font-bold text-slate-900">
                  {activeClient.metrics.traffic}
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">
                  Unique visitors browsing listing nodes this month.
                </p>
              </div>

              <div className="bg-white rounded-lg border border-neutral-200 p-5 shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">
                    AI Captured Leads
                  </span>
                  <span className="text-[9px] font-mono font-bold bg-green-100 text-green-700 rounded px-1.5 py-0.5">
                    {activeClient.metrics.leadsChange}
                  </span>
                </div>
                <div className="text-2xl font-mono font-bold text-slate-900">
                  {activeClient.metrics.leads}
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
                    {activeClient.metrics.conversionChange}
                  </span>
                </div>
                <div className="text-2xl font-mono font-bold text-slate-900">
                  {activeClient.metrics.conversionRate}
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">
                  Percent of visitors booking viewing/appointment nodes.
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
                  {activeClient.metrics.aiChatResponseTime}
                </div>
                <p className="text-[10px] text-slate-500 leading-tight">
                  Average response latency on client chatbot node.
                </p>
              </div>
            </div>

            {/* Compounding conversion chart */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">
                Compounding Conversion Analytics (Past 7 Days)
              </h4>
              <div className="w-full h-56 bg-neutral-50/50 rounded border border-neutral-100 p-4">
                <ChartContainer
                  config={{
                    conversion: {
                      label: "Conversion Rate",
                      color: "#1d4ed8"
                    }
                  }}
                  className="h-full w-full"
                >
                  <BarChart
                    data={[
                      { day: "Mon", rate: 3.5 },
                      { day: "Tue", rate: 4.2 },
                      { day: "Wed", rate: 4.8 },
                      { day: "Thu", rate: 4.5 },
                      { day: "Fri", rate: 5.1 },
                      { day: "Sat", rate: 5.6 },
                      { day: "Sun", rate: 6.2 }
                    ]}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="day"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                      dataKey="rate"
                      fill="var(--color-conversion)"
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ChartContainer>
              </div>
            </div>

            {/* Split Analytics Cards (GA4 / Search Console) */}
            <div className="grid gap-6 md:grid-cols-2">
              
              {/* Card 1: Search Console Organic Performance */}
              <div className="relative border border-neutral-200 rounded-lg bg-white p-6 shadow-sm flex flex-col justify-between min-h-[340px]">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider flex items-center gap-1.5">
                        <Search className="size-4 text-blue-600" />
                        Google Search Performance
                      </h4>
                      <p className="text-[10px] text-slate-500 font-inter">
                        Organic query click rates and average search rankings.
                      </p>
                    </div>
                    {hasGA && (
                      <span className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-2 py-0.5 text-[8px] font-mono text-green-700">
                        GSC Sync Active
                      </span>
                    )}
                  </div>

                  {/* List / Table Content */}
                  <div className={`space-y-3 transition-all duration-300 ${!hasGA ? 'blur-[1.5px] opacity-25 select-none pointer-events-none' : ''}`}>
                    <table className="w-full text-left font-mono text-[10px] border-collapse">
                      <thead>
                        <tr className="border-b border-neutral-200 text-slate-500 uppercase">
                          <th className="pb-2">Query</th>
                          <th className="pb-2">Clicks</th>
                          <th className="pb-2 text-right">Avg Position</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(analyticsData[activeClient.slug] || analyticsData["egostix-internal"]).searchPerformance.map((item, i) => (
                          <tr key={i} className="border-b border-neutral-100 last:border-0">
                            <td className="py-2.5 font-bold text-slate-800">&quot;{item.query}&quot;</td>
                            <td className="py-2.5 text-slate-700">{item.clicks}</td>
                            <td className="py-2.5 text-right text-slate-700">{item.position}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Card-level Fallback if no GA */}
                {!hasGA && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-slate-900/5 backdrop-blur-[2.5px] z-10 rounded-lg text-center">
                    <div className="max-w-[280px] bg-white border border-neutral-300 rounded-lg p-5 shadow-lg space-y-3">
                      <div className="mx-auto size-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                        <Search className="size-5 animate-pulse" />
                      </div>
                      <div className="space-y-1">
                        <h5 className="font-mono text-xs font-bold text-slate-900 uppercase tracking-wider">
                          Search Console Required
                        </h5>
                        <p className="text-[10px] text-slate-600 leading-normal font-inter">
                          Link Google Search Console data stream to track organic keyword clicks and average positions.
                        </p>
                      </div>
                      <button 
                        onClick={() => setActiveTab("upgrades")}
                        className="w-full rounded bg-blue-700 py-1.5 font-mono text-[10px] font-bold text-white hover:bg-blue-800 transition shadow-sm animate-in fade-in duration-300"
                      >
                        Connect Search Console
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Card 2: GA4 Geographic Locations */}
              <div className="relative border border-neutral-200 rounded-lg bg-white p-6 shadow-sm flex flex-col justify-between min-h-[340px]">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider flex items-center gap-1.5">
                        <Globe className="size-4 text-blue-600" />
                        Top User Locations
                      </h4>
                      <p className="text-[10px] text-slate-500 font-inter">
                        Real-time visitor geographic distribution logs.
                      </p>
                    </div>
                    {hasGA && (
                      <span className="flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-full px-2 py-0.5 text-[8px] font-mono text-green-700">
                        GA4 Stream Connected
                      </span>
                    )}
                  </div>

                  {/* Locations Bars List */}
                  <div className={`space-y-3 pt-1 transition-all duration-300 ${!hasGA ? 'blur-[1.5px] opacity-25 select-none pointer-events-none' : ''}`}>
                    {(analyticsData[activeClient.slug] || analyticsData["egostix-internal"]).locations.map((loc, i) => {
                      const totalUsers = (analyticsData[activeClient.slug] || analyticsData["egostix-internal"]).locations.reduce((sum, item) => sum + item.users, 0) || 1;
                      const percentage = Math.round((loc.users / totalUsers) * 100);
                      return (
                        <div key={i} className="space-y-1">
                          <div className="flex justify-between text-[10px] font-mono text-slate-700">
                            <span>{loc.city}, {loc.country}</span>
                            <span className="font-bold">{loc.users} users</span>
                          </div>
                          <div className="w-full bg-neutral-100 h-1 rounded-full overflow-hidden">
                            <div className="bg-blue-600 h-full rounded-full" style={{ width: `${percentage}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Card-level Fallback if no GA */}
                {!hasGA && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-slate-900/5 backdrop-blur-[2.5px] z-10 rounded-lg text-center">
                    <div className="max-w-[280px] bg-white border border-neutral-300 rounded-lg p-5 shadow-lg space-y-3">
                      <div className="mx-auto size-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
                        <Globe className="size-5 animate-pulse" />
                      </div>
                      <div className="space-y-1">
                        <h5 className="font-mono text-xs font-bold text-slate-900 uppercase tracking-wider">
                          GA4 Stream Required
                        </h5>
                        <p className="text-[10px] text-slate-600 leading-normal font-inter">
                          Link Google Analytics (GA4) stream to view real-time visitor geographics and city traffic distribution.
                        </p>
                      </div>
                      <button 
                        onClick={() => setActiveTab("upgrades")}
                        className="w-full rounded bg-blue-700 py-1.5 font-mono text-[10px] font-bold text-white hover:bg-blue-800 transition shadow-sm animate-in fade-in duration-300"
                      >
                        Connect Google Analytics
                      </button>
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* ================= GOOGLE ANALYTICS TAB ================= */}
        {activeTab === "analytics" && (() => {
          const clientData = analyticsData[activeClient.slug] || analyticsData["egostix-internal"];
          const totalClicks = clientData.searchPerformance?.reduce((sum, item) => sum + item.clicks, 0) || 0;
          const totalPageviews = clientData.pageViewsData?.reduce((sum, item) => sum + item.views, 0) || 0;
          
          return (
            <div className="space-y-8 animate-in fade-in duration-200">
              {/* Section Header */}
              <div className="bg-white rounded-lg border border-neutral-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
                <div className="space-y-1">
                  <h3 className="text-lg font-mono text-slate-900 font-semibold flex items-center gap-2">
                    <TrendingUp className="size-5 text-blue-600 animate-pulse" />
                    Google Analytics Dashboard
                  </h3>
                  <p className="text-xs text-slate-600 max-w-2xl font-inter">
                    Real-time Google Analytics (GA4) and Search Console (GSC) telemetry. This view displays organic search clicks, CTR, and visitor locations active on your system nodes.
                  </p>
                </div>
                <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-3 py-1 text-[10px] font-mono text-green-700">
                  <span className="size-2 rounded-full bg-green-500 animate-pulse" />
                  Live GA4 Connected
                </div>
              </div>

              {/* Quick Metrics Grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="bg-white rounded-lg border border-neutral-200 p-5 shadow-sm space-y-2">
                  <div className="flex justify-between items-center text-slate-500">
                    <span className="text-[10px] font-mono uppercase font-bold">Active Right Now</span>
                    <Activity className="size-4 text-green-600 animate-pulse" />
                  </div>
                  <div className="text-3xl font-mono font-bold text-slate-900 flex items-baseline gap-1">
                    {clientData.activeNow}
                    <span className="text-xs font-normal text-slate-500">users</span>
                  </div>
                  <p className="text-[9px] text-slate-400 font-inter">
                    Active sessions in the last 30 minutes.
                  </p>
                </div>

                <div className="bg-white rounded-lg border border-neutral-200 p-5 shadow-sm space-y-2">
                  <div className="flex justify-between items-center text-slate-500">
                    <span className="text-[10px] font-mono uppercase font-bold">Average CTR</span>
                    <MousePointerClick className="size-4 text-blue-600" />
                  </div>
                  <div className="text-3xl font-mono font-bold text-slate-900">
                    {clientData.avgCtr}
                  </div>
                  <p className="text-[9px] text-slate-400 font-inter">
                    Click-through rate of organic queries.
                  </p>
                </div>

                <div className="bg-white rounded-lg border border-neutral-200 p-5 shadow-sm space-y-2">
                  <div className="flex justify-between items-center text-slate-500">
                    <span className="text-[10px] font-mono uppercase font-bold">Monthly Search Clicks</span>
                    <ArrowUpRight className="size-4 text-blue-600" />
                  </div>
                  <div className="text-3xl font-mono font-bold text-slate-900">
                    {totalClicks}
                  </div>
                  <p className="text-[9px] text-slate-400 font-inter">
                    Total clicks from organic Google Search listings.
                  </p>
                </div>

                <div className="bg-white rounded-lg border border-neutral-200 p-5 shadow-sm space-y-2">
                  <div className="flex justify-between items-center text-slate-500">
                    <span className="text-[10px] font-mono uppercase font-bold">Page views</span>
                    <Eye className="size-4 text-blue-600" />
                  </div>
                  <div className="text-3xl font-mono font-bold text-slate-900">
                    {totalPageviews.toLocaleString()}
                  </div>
                  <p className="text-[9px] text-slate-400 font-inter">
                    Total page view hits registered past 7 days.
                  </p>
                </div>
              </div>

              {/* Main Graphs and Geo Grid */}
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Pageviews Line Chart */}
                <div className="lg:col-span-2 bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-4">
                  <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">
                    Pageviews Performance (Last 7 Days)
                  </h4>
                  <div className="w-full h-64 bg-neutral-50/50 rounded border border-neutral-100 p-4">
                    <ChartContainer
                      config={{
                        views: {
                          label: "Pageviews",
                          color: "#1d4ed8"
                        }
                      }}
                      className="h-full w-full"
                    >
                      <AreaChart
                        data={clientData.pageViewsData || []}
                        margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-views)" stopOpacity={0.2}/>
                            <stop offset="95%" stopColor="var(--color-views)" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis
                          dataKey="day"
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tickFormatter={(value) => value.toLocaleString()}
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area
                          type="monotone"
                          dataKey="views"
                          stroke="var(--color-views)"
                          fillOpacity={1}
                          fill="url(#colorViews)"
                        />
                      </AreaChart>
                    </ChartContainer>
                  </div>
                </div>

                {/* Geographic Locations List */}
                <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm flex flex-col justify-between">
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider flex items-center gap-1.5">
                      <Globe className="size-4 text-slate-500" />
                      Top Active Locations
                    </h4>
                    <div className="space-y-4 pt-2">
                      {clientData.locations?.map((loc, i) => {
                        const totalUsers = clientData.locations?.reduce((sum, item) => sum + item.users, 0) || 1;
                        const percentage = Math.round((loc.users / totalUsers) * 100);
                        return (
                          <div key={i} className="space-y-1">
                            <div className="flex justify-between text-xs font-mono text-slate-700">
                              <span>{loc.city}, {loc.country}</span>
                              <span className="font-bold">{loc.users} active ({percentage}%)</span>
                            </div>
                            <div className="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
                              <div 
                                className="bg-blue-600 h-full rounded-full transition-all duration-500" 
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono pt-4 border-t border-neutral-100 flex justify-between">
                    <span>Audited via GA4 API</span>
                    <span>Compound Real-time</span>
                  </div>
                </div>
              </div>

              {/* Organic Search Console Performance Table */}
              <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">
                  Google Search Console - Top Organic Keywords
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-neutral-200 text-slate-500 text-[10px] uppercase">
                        <th className="pb-3 pl-2">Query Keyword</th>
                        <th className="pb-3">Clicks</th>
                        <th className="pb-3">Impressions</th>
                        <th className="pb-3">Click-through Rate</th>
                        <th className="pb-3 pr-2 text-right">Avg Position</th>
                      </tr>
                    </thead>
                    <tbody>
                      {clientData.searchPerformance?.map((item, i) => (
                        <tr key={i} className="border-b border-neutral-100 hover:bg-neutral-50/50 transition">
                          <td className="py-3 pl-2 font-bold text-slate-800">&quot;{item.query}&quot;</td>
                          <td className="py-3 text-slate-700">{item.clicks}</td>
                          <td className="py-3 text-slate-500">{item.impressions}</td>
                          <td className="py-3 text-emerald-600 font-bold">{item.ctr}</td>
                          <td className="py-3 pr-2 text-right text-slate-700">{item.position}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        })()}

        {/* ================= KANBAN BOARD TAB ================= */}
        {activeTab === "kanban" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Section Header & Suggest Form */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-200 pb-5">
              <div className="space-y-1">
                <h3 className="text-lg font-mono text-slate-900 font-semibold">
                  Real-time Project Plan
                </h3>
                <p className="text-xs text-slate-600 font-inter">
                  Monitor active task milestones. Add a feedback card or new request straight to the backlog.
                </p>
              </div>

              {/* Task Adder */}
              <form onSubmit={handleAddTask} className="flex items-center gap-2 max-w-sm w-full">
                <input
                  type="text"
                  placeholder="Request system change..."
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className="flex-1 rounded border border-neutral-300 bg-white px-3 py-2 text-xs font-inter text-slate-900 focus:border-blue-700 focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded bg-blue-700 px-4 py-2 font-mono text-xs font-semibold text-white hover:bg-blue-800 transition shadow-sm flex items-center gap-1.5"
                >
                  <Plus className="size-3.5" />
                  Request
                </button>
              </form>
            </div>

            {/* Kanban Grid */}
            <div className="grid gap-6 md:grid-cols-4 items-start">
              {/* Backlog Column */}
              <div className="bg-neutral-100 rounded-lg p-4 border border-neutral-200/50 space-y-4">
                <div className="flex justify-between items-center px-1">
                  <h4 className="text-xs font-mono font-bold uppercase text-slate-700">Backlog</h4>
                  <span className="text-[10px] font-mono bg-neutral-200 text-slate-600 rounded-full px-2 py-0.5">
                    {clientTasks.filter((t) => t.status === "backlog").length}
                  </span>
                </div>
                <div className="space-y-3">
                  {clientTasks.filter((t) => t.status === "backlog").map((task) => (
                    <div key={task.id} className="bg-white rounded border border-neutral-200 p-4 space-y-3 shadow-sm hover:border-neutral-300 transition duration-150">
                      <div className="flex justify-between items-start gap-2">
                        <h5 className="text-xs font-bold text-slate-900 leading-tight">{task.title}</h5>
                        <span className={`text-[8px] font-mono uppercase px-1.5 py-0.5 rounded ${
                          task.priority === "high" ? "bg-red-50 text-red-700 border border-red-100" : task.priority === "medium" ? "bg-amber-50 text-amber-700 border border-amber-100" : "bg-green-50 text-green-700 border border-green-100"
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-600 leading-relaxed font-inter">{task.description}</p>
                      <div className="text-[9px] font-mono text-slate-400">Due: {task.dueDate}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* In Progress Column */}
              <div className="bg-neutral-100 rounded-lg p-4 border border-neutral-200/50 space-y-4">
                <div className="flex justify-between items-center px-1">
                  <h4 className="text-xs font-mono font-bold uppercase text-slate-700">In Progress</h4>
                  <span className="text-[10px] font-mono bg-blue-100 text-blue-700 rounded-full px-2 py-0.5">
                    {clientTasks.filter((t) => t.status === "in-progress").length}
                  </span>
                </div>
                <div className="space-y-3">
                  {clientTasks.filter((t) => t.status === "in-progress").map((task) => (
                    <div key={task.id} className="bg-white rounded border border-blue-200 p-4 space-y-3 shadow-sm hover:border-neutral-300 transition duration-150">
                      <div className="flex justify-between items-start gap-2">
                        <h5 className="text-xs font-bold text-slate-900 leading-tight">{task.title}</h5>
                        <span className={`text-[8px] font-mono uppercase px-1.5 py-0.5 rounded ${
                          task.priority === "high" ? "bg-red-50 text-red-700 border border-red-100" : task.priority === "medium" ? "bg-amber-50 text-amber-700 border border-amber-100" : "bg-green-50 text-green-700 border border-green-100"
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-600 leading-relaxed font-inter">{task.description}</p>
                      <div className="text-[9px] font-mono text-slate-400">Due: {task.dueDate}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Review Column */}
              <div className="bg-neutral-100 rounded-lg p-4 border border-neutral-200/50 space-y-4">
                <div className="flex justify-between items-center px-1">
                  <h4 className="text-xs font-mono font-bold uppercase text-slate-700">Review</h4>
                  <span className="text-[10px] font-mono bg-amber-100 text-amber-700 rounded-full px-2 py-0.5">
                    {clientTasks.filter((t) => t.status === "review").length}
                  </span>
                </div>
                <div className="space-y-3">
                  {clientTasks.filter((t) => t.status === "review").map((task) => (
                    <div key={task.id} className="bg-white rounded border border-neutral-200 p-4 space-y-3 shadow-sm hover:border-neutral-300 transition duration-150">
                      <div className="flex justify-between items-start gap-2">
                        <h5 className="text-xs font-bold text-slate-900 leading-tight">{task.title}</h5>
                        <span className={`text-[8px] font-mono uppercase px-1.5 py-0.5 rounded ${
                          task.priority === "high" ? "bg-red-50 text-red-700 border border-red-100" : task.priority === "medium" ? "bg-amber-50 text-amber-700 border border-amber-100" : "bg-green-50 text-green-700 border border-green-100"
                        }`}>
                          {task.priority}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-600 leading-relaxed font-inter">{task.description}</p>
                      <div className="text-[9px] font-mono text-slate-400">Due: {task.dueDate}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Deployed Column */}
              <div className="bg-neutral-100 rounded-lg p-4 border border-neutral-200/50 space-y-4">
                <div className="flex justify-between items-center px-1">
                  <h4 className="text-xs font-mono font-bold uppercase text-slate-700">Deployed</h4>
                  <span className="text-[10px] font-mono bg-green-100 text-green-700 rounded-full px-2 py-0.5">
                    {clientTasks.filter((t) => t.status === "deployed").length}
                  </span>
                </div>
                <div className="space-y-3">
                  {clientTasks.filter((t) => t.status === "deployed").map((task) => (
                    <div key={task.id} className="bg-white rounded border border-neutral-200 p-4 space-y-3 shadow-sm opacity-80">
                      <div className="flex justify-between items-start gap-2">
                        <h5 className="text-xs font-bold text-slate-700 leading-tight line-through">{task.title}</h5>
                        <CheckCircle2 className="size-4 text-green-600 shrink-0" />
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed font-inter line-through">{task.description}</p>
                      <div className="text-[9px] font-mono text-slate-400">Archived</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= LEADS TRIAGE TAB ================= */}
        {activeTab === "leads" && (
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] animate-in fade-in duration-200">
            {/* Left side: Leads table list */}
            <div className="bg-white rounded-lg border border-neutral-200 shadow-sm p-6 space-y-6 h-fit">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-base font-mono text-slate-900 font-semibold">
                    Captured Contacts
                  </h3>
                  <p className="text-xs text-slate-500 font-inter">
                    AI chatbot registers, qualifiers, and books users automatically.
                  </p>
                </div>
                {/* Search */}
                <div className="relative max-w-xs w-full">
                  <input
                    type="text"
                    placeholder="Search contact..."
                    value={searchLeadQuery}
                    onChange={(e) => setSearchLeadQuery(e.target.value)}
                    className="w-full rounded border border-neutral-300 bg-white pl-8 pr-3 py-1.5 text-xs font-inter text-slate-900 focus:border-blue-700 focus:outline-none"
                  />
                  <Search className="absolute left-2.5 top-2 size-3.5 text-slate-400" />
                </div>
              </div>

              {/* Table list */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-200 font-mono text-[10px] uppercase text-slate-500 font-bold bg-neutral-50/50">
                      <th className="py-3 px-4">Contact</th>
                      <th className="py-3 px-4">Date Capture</th>
                      <th className="py-3 px-4 text-center">Score</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLeads.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center py-8 text-xs font-mono text-slate-400">
                          No leads captured by AI yet.
                        </td>
                      </tr>
                    ) : (
                      filteredLeads.map((lead) => (
                        <tr
                          key={lead.id}
                          onClick={() => setSelectedLead(lead)}
                          className={`border-b border-neutral-100 text-xs hover:bg-neutral-50/85 transition cursor-pointer ${
                            selectedLead?.id === lead.id ? "bg-blue-50/50" : ""
                          }`}
                        >
                          <td className="py-3.5 px-4 space-y-0.5">
                            <div className="font-semibold text-slate-900">{lead.name}</div>
                            <div className="text-[10px] text-slate-500 font-mono">{lead.email}</div>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[10px] text-slate-600">
                            {lead.date}
                          </td>
                          <td className="py-3.5 px-4 text-center">
                            <span className={`text-[8px] font-mono uppercase font-bold px-2 py-0.5 rounded-full ${
                              lead.status === "hot" ? "bg-red-100 text-red-800" : lead.status === "warm" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"
                            }`}>
                              {lead.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button className="text-[10px] font-mono font-bold text-blue-700 hover:text-blue-800 flex items-center justify-end gap-1 w-full">
                              Transcript
                              <ArrowUpRight className="size-3" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right side: AI Conversation Transcript */}
            <div className="bg-white rounded-lg border border-neutral-200 shadow-sm p-6 flex flex-col h-[520px]">
              {selectedLead ? (
                <div className="flex flex-col h-full space-y-4">
                  {/* Lead details header */}
                  <div className="border-b border-neutral-200 pb-4 space-y-2.5">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold text-slate-900">{selectedLead.name}</h4>
                      <span className="text-[9px] font-mono bg-neutral-100 text-slate-600 rounded px-2 py-0.5">
                        Captured Live
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-600 font-mono">
                      <div className="flex items-center gap-1.5">
                        <Mail className="size-3.5 text-slate-400" />
                        <span className="truncate">{selectedLead.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone className="size-3.5 text-slate-400" />
                        <span>{selectedLead.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Message Stream */}
                  <div className="flex-1 overflow-y-auto space-y-3 bg-neutral-50 rounded border border-neutral-100 p-4 max-h-[320px]">
                    <p className="text-center text-[9px] font-mono text-slate-400 uppercase tracking-widest border-b border-neutral-200/50 pb-2 mb-2">
                      Secured Chat Log
                    </p>
                    {selectedLead.chatLog.map((chat, idx) => (
                      <div
                        key={idx}
                        className={`flex flex-col max-w-[80%] rounded p-2.5 text-xs ${
                          chat.sender === "customer"
                            ? "bg-white border border-neutral-200 self-start text-slate-800"
                            : "bg-blue-700 text-white self-end ml-auto"
                        }`}
                      >
                        <span className="text-[8px] font-mono uppercase opacity-75 mb-0.5">
                          {chat.sender === "customer" ? "User" : "AI Agent"}
                        </span>
                        <span>{chat.text}</span>
                      </div>
                    ))}
                  </div>

                  {/* Summary prompt block */}
                  <div className="bg-blue-50 border border-blue-100 rounded p-3 flex gap-2.5 items-start">
                    <Sparkles className="size-4 text-blue-700 mt-0.5 shrink-0" />
                    <div className="space-y-1">
                      <h5 className="text-[10px] font-mono font-bold text-blue-700 uppercase">
                        AI Intent Analysis
                      </h5>
                      <p className="text-[10px] text-blue-900 leading-normal">
                        <strong>User Intent:</strong> {selectedLead.query}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-3 text-slate-400 font-mono text-xs">
                  <Inbox className="size-8 text-slate-300" />
                  <p>Select a lead from the list to review the fully qualified AI conversation logs.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= SYNC FILE PORTAL ================= */}
        {activeTab === "files" && (
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] animate-in fade-in duration-200">
            {/* File List */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-6">
              <div className="space-y-1 border-b border-neutral-100 pb-4">
                <h3 className="text-base font-mono text-slate-900 font-semibold">
                  Policy Documents & Sync Files
                </h3>
                <p className="text-xs text-slate-500 font-inter">
                  Terms, system guidelines, design templates, and asset scopes.
                </p>
              </div>

              <div className="space-y-3">
                {clientFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between border border-neutral-200 hover:border-blue-300 rounded p-4 transition duration-150"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="size-9 rounded bg-blue-50 flex items-center justify-center border border-blue-100 text-blue-700 shrink-0">
                        <FileCode className="size-4.5" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">{file.name}</h4>
                        <p className="text-[9px] text-slate-500 font-mono">
                          Uploaded: {file.uploadedAt} • By {file.uploadedBy}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className="text-[10px] font-mono text-slate-600">{file.size}</span>
                      <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full ${
                        file.status === "Verified" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                      }`}>
                        {file.status}
                      </span>
                      <button
                        onClick={() => deleteFile(file.id)}
                        className="p-1 rounded text-slate-400 hover:text-red-600 hover:bg-neutral-50 transition"
                        title="Delete file"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sync Upload Widget */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-6 h-fit">
              <div className="space-y-1">
                <h3 className="text-sm font-mono text-slate-900 font-semibold">
                  Upload & Sync Assets
                </h3>
                <p className="text-xs text-slate-500 font-inter">
                  Upload guidelines, scopes, or vector designs to sync with your engineering team.
                </p>
              </div>

              <form onSubmit={handleFileUpload} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono font-bold uppercase text-slate-600">
                    File Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. logo_artwork"
                    value={fileForm.name}
                    onChange={(e) => setFileForm({ ...fileForm, name: e.target.value })}
                    className="w-full rounded border border-neutral-300 bg-white px-3 py-2 text-xs font-inter text-slate-900 focus:border-blue-700 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono font-bold uppercase text-slate-600">
                      Doc Type
                    </label>
                    <select
                      value={fileForm.type}
                      onChange={(e) => setFileForm({ ...fileForm, type: e.target.value })}
                      className="w-full rounded border border-neutral-300 bg-white px-2 py-2 text-xs font-mono text-slate-950 focus:border-blue-700 focus:outline-none"
                    >
                      <option value="PDF Document">PDF Document</option>
                      <option value="SVG Vector">SVG Vector</option>
                      <option value="Markdown File">Markdown File</option>
                      <option value="SQL Schema">SQL Schema</option>
                      <option value="Image Document">PNG Image</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono font-bold uppercase text-slate-600">
                      File Size
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 1.2 MB"
                      value={fileForm.size}
                      onChange={(e) => setFileForm({ ...fileForm, size: e.target.value })}
                      className="w-full rounded border border-neutral-300 bg-white px-3 py-2 text-xs font-mono text-slate-900 focus:border-blue-700 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded bg-blue-700 px-4 py-2.5 font-mono text-xs font-semibold text-white hover:bg-blue-800 transition shadow-sm flex items-center justify-center gap-2"
                >
                  <Send className="size-3.5" />
                  Sync to Team Files
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ================= UPGRADES TAB ================= */}
        {activeTab === "upgrades" && (
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] animate-in fade-in duration-200">
            {/* Offerings Menu catalog */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-3">
                <h3 className="text-base font-mono text-slate-900 font-semibold">
                  Scale your System Infrastructure
                </h3>
                <p className="text-xs text-slate-500 font-inter">
                  Extend your website system with operational capabilities. Select an upgrade or request a bespoke internal tool.
                </p>
              </div>

              {/* Service Cards */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="bg-white border border-neutral-200 hover:border-blue-600 rounded p-5 space-y-3 shadow-sm transition">
                  <h4 className="text-xs font-mono font-bold uppercase text-blue-700">Internal SMB Tool</h4>
                  <p className="text-[10px] text-slate-600 leading-normal font-inter">
                    Admin portals, dashboards, fleet coordinators, database trackers, and CRM synchronizers.
                  </p>
                </div>
                <div className="bg-white border border-neutral-200 hover:border-blue-600 rounded p-5 space-y-3 shadow-sm transition">
                  <h4 className="text-xs font-mono font-bold uppercase text-blue-700">Workflow Automation</h4>
                  <p className="text-[10px] text-slate-600 leading-normal font-inter">
                    WhatsApp trigger hooks, custom webhook loops, automated patients routing, and daily alerts.
                  </p>
                </div>
                <div className="bg-white border border-neutral-200 hover:border-blue-600 rounded p-5 space-y-3 shadow-sm transition">
                  <h4 className="text-xs font-mono font-bold uppercase text-blue-700">Creator Infrastructure</h4>
                  <p className="text-[10px] text-slate-600 leading-normal font-inter">
                    Bespoke video pipelines, automated transcribers, lesson libraries, and custom Stripe integrations.
                  </p>
                </div>
                <div className="bg-white border border-neutral-200 hover:border-blue-600 rounded p-5 space-y-3 shadow-sm transition">
                  <h4 className="text-xs font-mono font-bold uppercase text-blue-700">Advanced Analytics Hub</h4>
                  <p className="text-[10px] text-slate-600 leading-normal font-inter">
                    Visual heatmaps, search path trackers, leads retention metrics, and customized Google Console APIs.
                  </p>
                </div>
              </div>
            </div>

            {/* Request Form & Pending List */}
            <div className="space-y-6">
              {/* Form */}
              <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-4">
                <div className="space-y-1">
                  <h4 className="text-sm font-mono text-slate-900 font-semibold">
                    Request Upgrade Node
                  </h4>
                  <p className="text-xs text-slate-500 font-inter">
                    Outline scope and criteria. Our owners will review and spin up a prototype.
                  </p>
                </div>

                <form onSubmit={handleUpgradeRequest} className="space-y-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono font-bold uppercase text-slate-600">
                      System Module
                    </label>
                    <select
                      value={upgradeForm.serviceName}
                      onChange={(e) => setUpgradeForm({ ...upgradeForm, serviceName: e.target.value })}
                      className="w-full rounded border border-neutral-300 bg-white px-2 py-2 text-xs font-mono text-slate-950 focus:border-blue-700 focus:outline-none"
                    >
                      <option value="AI Internal Tool Dashboard">AI Internal Tool Dashboard</option>
                      <option value="WhatsApp Automation Extension">WhatsApp Automation Extension</option>
                      <option value="Creator Subscription Core">Creator Subscription Core</option>
                      <option value="SEO/Analytics compounding engine">SEO/Analytics Compounding Engine</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono font-bold uppercase text-slate-600">
                      Scope Specifications
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="e.g. Integrate custom lead lists with Airtable..."
                      value={upgradeForm.description}
                      onChange={(e) => setUpgradeForm({ ...upgradeForm, description: e.target.value })}
                      className="w-full rounded border border-neutral-300 bg-white px-3 py-2 text-xs font-inter text-slate-900 focus:border-blue-700 focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded bg-blue-700 px-4 py-2.5 font-mono text-xs font-semibold text-white hover:bg-blue-800 transition shadow-sm flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="size-3.5" />
                    Submit Upgrade Request
                  </button>
                </form>
              </div>

              {/* Status List */}
              <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">
                  Request Sync Queue
                </h4>
                <div className="space-y-3">
                  {clientUpgrades.map((upgrade) => (
                    <div
                      key={upgrade.id}
                      className="border border-neutral-200 rounded p-3 space-y-2 text-xs"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold font-mono text-slate-900">{upgrade.serviceName}</span>
                        <span className={`text-[8px] font-mono uppercase px-2 py-0.5 rounded-full ${
                          upgrade.status === "approved" ? "bg-green-100 text-green-800" : upgrade.status === "pending" ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800"
                        }`}>
                          {upgrade.status}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-600 font-inter">{upgrade.description}</p>
                      <p className="text-[8px] text-slate-400 font-mono text-right">Requested: {upgrade.requestedAt}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= SERVICE 1: AI BUSINESS WEBSITES ================= */}
        {activeTab === "service-websites" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Page Header */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
              <div className="space-y-1">
                <h3 className="text-lg font-mono text-slate-900 font-semibold flex items-center gap-2">
                  <Shield className="size-5 text-blue-700" />
                  AI Business Websites Console
                </h3>
                <p className="text-xs text-slate-600 max-w-2xl font-inter">
                  Supervise active listings database nodes, organic keyword compounding schedules, and CRM synchronization gateways.
                </p>
              </div>
              <span className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-full px-3 py-1 text-[10px] font-mono text-blue-700">
                System Active
              </span>
            </div>

            {/* Grid of sub-sections */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Sub-section 1: Listings Manager */}
              <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">
                  Listings Database Manager
                </h4>
                <div className="grid gap-4">
                  {[
                    { title: "5th Avenue Penthouse", price: "$4,200,000", status: "Active", views: "1,240" },
                    { title: "Park Avenue Triplex", price: "$6,800,000", status: "Active", views: "890" },
                    { title: "SoHo Industrial Loft", price: "$1,850,000", status: "Review", views: "412" }
                  ].map((item, idx) => (
                    <div key={idx} className="border border-neutral-100 rounded p-3 space-y-2 text-xs">
                      <span className={`text-[8px] font-mono uppercase px-2 py-0.5 rounded-full ${
                        item.status === "Active" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                      }`}>{item.status}</span>
                      <h5 className="font-bold text-slate-955">{item.title}</h5>
                      <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 pt-1 border-t border-neutral-50">
                        <span>Price: <strong>{item.price}</strong></span>
                        <span>Views: <strong>{item.views}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sub-section 2: SEO Keyword Compounder */}
              <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">
                  SEO Keyword Tracker
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs font-mono">
                    <thead>
                      <tr className="border-b border-neutral-200 text-slate-500 font-bold bg-neutral-50/50">
                        <th className="py-2 px-2">Keyword</th>
                        <th className="py-2 px-2">Impressions</th>
                        <th className="py-2 px-2 text-right">Position</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { word: "luxury apartments nyc", imp: "45.2k", pos: "1.2" },
                        { word: "penthouse fifth avenue", imp: "12.8k", pos: "2.1" },
                        { word: "buy loft soho nyc", imp: "8.9k", pos: "4.5" }
                      ].map((item, idx) => (
                        <tr key={idx} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50 transition">
                          <td className="py-2.5 px-2 text-slate-900 font-semibold">{item.word}</td>
                          <td className="py-2.5 px-2 text-slate-500">{item.imp}</td>
                          <td className="py-2.5 px-2 text-right text-slate-700">{item.pos}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sub-section 3: CRM & Contact Sync Gateway */}
              <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">
                      CRM Sync Gateway
                    </h4>
                    
                    {/* CRM Selector */}
                    <div className="relative">
                      <select
                        value={crmProvider}
                        onChange={(e) => setCrmProvider(e.target.value)}
                        className="rounded border border-neutral-300 bg-white px-2 py-1 text-[10px] font-mono text-slate-900 focus:border-blue-700 focus:outline-none cursor-pointer"
                      >
                        <option value="HubSpot">HubSpot CRM</option>
                        <option value="Salesforce">Salesforce</option>
                        <option value="Zoho">Zoho CRM</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-3 font-mono text-[10px]">
                    <div className="flex justify-between">
                      <span className="text-slate-500">API Connection:</span>
                      <span className="text-green-600 font-bold">Connected</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Active Node:</span>
                      <span className="font-bold text-blue-700">{crmProvider} API</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Last Sync Cycle:</span>
                      <span>5 mins ago</span>
                    </div>
                  </div>

                  {/* Webhook Logs depending on selected CRM provider */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase text-slate-500 font-bold block">Webhook Event Log</span>
                    <div className="bg-neutral-950 text-green-400 font-mono text-[9px] p-3 rounded h-32 overflow-y-auto space-y-1">
                      {crmProvider === "HubSpot" && (
                        <>
                          <div>[2026-07-22 15:10] Syncing HubSpot lead view...</div>
                          <div>[2026-07-22 15:10] POST payload {"->"} HubSpot API: 200 OK</div>
                          <div>[2026-07-22 15:05] Synced client lead: Robert Henderson {"->"} Success</div>
                        </>
                      )}
                      {crmProvider === "Salesforce" && (
                        <>
                          <div>[2026-07-22 15:10] Connecting Salesforce Client API...</div>
                          <div>[2026-07-22 15:10] POST lead object {"->"} Salesforce Salesforce_Lead: 200 OK</div>
                          <div>[2026-07-22 15:05] Synced SF lead: Robert Henderson {"->"} Sync Success</div>
                        </>
                      )}
                      {crmProvider === "Zoho" && (
                        <>
                          <div>[2026-07-22 15:10] Zoho CRM module listener connected...</div>
                          <div>[2026-07-22 15:10] POST lead parameters {"->"} Zoho API: 201 Created</div>
                          <div>[2026-07-22 15:05] Synced Zoho lead: Robert Henderson {"->"} Success</div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= SERVICE 2: AI INTERNAL TOOLS ================= */}
        {activeTab === "service-tools" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Page Header */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
              <div className="space-y-1">
                <h3 className="text-lg font-mono text-slate-900 font-semibold flex items-center gap-2">
                  <Layers className="size-5 text-blue-700" />
                  AI Internal Tools Dashboard
                </h3>
                <p className="text-xs text-slate-600 max-w-2xl font-inter">
                  Monitor custom inventory tracking modules, relational database indices telemetry, and real-time logistics dispatch routing.
                </p>
              </div>
              <span className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-full px-3 py-1 text-[10px] font-mono text-blue-700">
                System Active
              </span>
            </div>

            {/* Grid of sub-sections */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Sub-section 1: Inventory SKU Manager */}
              <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">
                    Inventory SKU Manager
                  </h4>
                  <select
                    value={skuSystem}
                    onChange={(e) => setSkuSystem(e.target.value)}
                    className="rounded border border-neutral-300 bg-white px-2 py-1 text-[10px] font-mono text-slate-900 focus:border-blue-700 focus:outline-none cursor-pointer"
                  >
                    <option value="ERP Console">ERP Console</option>
                    <option value="Warehouse Stock">Warehouse Stock</option>
                    <option value="Local Inventory">Local Inventory</option>
                  </select>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-neutral-200 font-mono text-[10px] uppercase text-slate-500 font-bold bg-neutral-50/50">
                        <th className="py-2 px-2">SKU Code</th>
                        <th className="py-2 px-2">Stock Count</th>
                        <th className="py-2 px-2 text-right">Reorder Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {skuSystem === "ERP Console" && (
                        <>
                          <tr className="border-b border-neutral-100 font-inter">
                            <td className="py-2.5 px-2 font-mono text-slate-600">PL-SKU-990</td>
                            <td className="py-2.5 px-2 text-slate-900 font-semibold">240 units</td>
                            <td className="py-2.5 px-2 text-right"><span className="bg-green-100 text-green-800 text-[8px] font-mono font-bold px-2 py-0.5 rounded-full">Normal</span></td>
                          </tr>
                          <tr className="border-b border-neutral-100 font-inter">
                            <td className="py-2.5 px-2 font-mono text-slate-600">PL-SKU-412</td>
                            <td className="py-2.5 px-2 text-slate-900 font-semibold">12 units</td>
                            <td className="py-2.5 px-2 text-right"><span className="bg-red-100 text-red-800 text-[8px] font-mono font-bold px-2 py-0.5 rounded-full">Low Stock</span></td>
                          </tr>
                        </>
                      )}
                      {skuSystem === "Warehouse Stock" && (
                        <>
                          <tr className="border-b border-neutral-100 font-inter">
                            <td className="py-2.5 px-2 font-mono text-slate-600">WH-SKU-102</td>
                            <td className="py-2.5 px-2 text-slate-900 font-semibold">1,450 units</td>
                            <td className="py-2.5 px-2 text-right"><span className="bg-green-100 text-green-800 text-[8px] font-mono font-bold px-2 py-0.5 rounded-full">Normal</span></td>
                          </tr>
                          <tr className="border-b border-neutral-100 font-inter">
                            <td className="py-2.5 px-2 font-mono text-slate-600">WH-SKU-056</td>
                            <td className="py-2.5 px-2 text-slate-900 font-semibold">8 units</td>
                            <td className="py-2.5 px-2 text-right"><span className="bg-red-100 text-red-800 text-[8px] font-mono font-bold px-2 py-0.5 rounded-full">Low Stock</span></td>
                          </tr>
                        </>
                      )}
                      {skuSystem === "Local Inventory" && (
                        <>
                          <tr className="border-b border-neutral-100 font-inter">
                            <td className="py-2.5 px-2 font-mono text-slate-600">LOC-SKU-312</td>
                            <td className="py-2.5 px-2 text-slate-900 font-semibold">45 units</td>
                            <td className="py-2.5 px-2 text-right"><span className="bg-green-100 text-green-800 text-[8px] font-mono font-bold px-2 py-0.5 rounded-full">Normal</span></td>
                          </tr>
                          <tr className="border-b border-neutral-100 font-inter">
                            <td className="py-2.5 px-2 font-mono text-slate-600">LOC-SKU-808</td>
                            <td className="py-2.5 px-2 text-slate-900 font-semibold">2 units</td>
                            <td className="py-2.5 px-2 text-right"><span className="bg-red-100 text-red-800 text-[8px] font-mono font-bold px-2 py-0.5 rounded-full">Low Stock</span></td>
                          </tr>
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Sub-section 2: Relational DB Monitor */}
              <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">
                    Relational DB Monitor
                  </h4>
                  <select
                    value={dbEngine}
                    onChange={(e) => setDbEngine(e.target.value)}
                    className="rounded border border-neutral-300 bg-white px-2 py-1 text-[10px] font-mono text-slate-900 focus:border-blue-700 focus:outline-none cursor-pointer"
                  >
                    <option value="PostgreSQL">PostgreSQL</option>
                    <option value="MySQL">MySQL</option>
                    <option value="MongoDB">MongoDB</option>
                  </select>
                </div>

                <div className="grid gap-4 text-xs font-mono">
                  <div className="flex justify-between border-b border-neutral-100 pb-2">
                    <span className="text-slate-500">Database Engine:</span>
                    <span className="font-bold text-blue-700">{dbEngine}</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 pb-2">
                    <span className="text-slate-500">Connections:</span>
                    <span>{dbEngine === "MongoDB" ? "12 Active" : "42 / 100"}</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 pb-2">
                    <span className="text-slate-500">Index Cache Ratio:</span>
                    <span className="text-green-600 font-bold">{dbEngine === "MySQL" ? "98.42%" : "99.85%"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Avg Read Latency:</span>
                    <span>{dbEngine === "MongoDB" ? "0.85ms" : "1.45ms"}</span>
                  </div>
                </div>
              </div>

              {/* Sub-section 3: Fleet Route Tracker */}
              <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">
                    Fleet Route Tracker
                  </h4>
                  <select
                    value={fleetTracker}
                    onChange={(e) => setFleetTracker(e.target.value)}
                    className="rounded border border-neutral-300 bg-white px-2 py-1 text-[10px] font-mono text-slate-900 focus:border-blue-700 focus:outline-none cursor-pointer"
                  >
                    <option value="GPS Routing">GPS Routing</option>
                    <option value="Delivery Status">Delivery Status</option>
                    <option value="Dispatch Log">Dispatch Log</option>
                  </select>
                </div>

                <div className="bg-neutral-950 text-green-400 font-mono text-[9px] p-4 rounded h-44 overflow-y-auto space-y-1">
                  {fleetTracker === "GPS Routing" && (
                    <>
                      <div>[TRK-09] Driver: John Miller | Coordinates: 40.7128° N, 74.0060° W</div>
                      <div>[TRK-09] Route state: En Route (SLA: Nominal)</div>
                      <div>[TRK-14] Driver: Aleksey Volkov | Coordinates: 34.0522° N, 118.2437° W</div>
                      <div>[TRK-14] Route state: Loading (Delay: 5m)</div>
                    </>
                  )}
                  {fleetTracker === "Delivery Status" && (
                    <>
                      <div>[TRK-22] Delivery Completed: SoHo Warehouse, NYC (14:42)</div>
                      <div>[TRK-08] Dispatch package out for delivery (Estimated: 25m)</div>
                      <div>[TRK-15] Delivery Scheduled: Bronx Terminal, NY (16:30)</div>
                    </>
                  )}
                  {fleetTracker === "Dispatch Log" && (
                    <>
                      <div>[SYSTEM] Listening for logistics dispatcher webhooks...</div>
                      <div>[SYSTEM] Dispatch Node initialized at NYC center.</div>
                      <div>[SYSTEM] 12 fleet vehicles registered on route gateway.</div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= SERVICE 3: CREATOR INFRASTRUCTURE ================= */}
        {activeTab === "service-creator" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Page Header */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
              <div className="space-y-1">
                <h3 className="text-lg font-mono text-slate-900 font-semibold flex items-center gap-2">
                  <Briefcase className="size-5 text-blue-700" />
                  Creator Infrastructure Hub
                </h3>
                <p className="text-xs text-slate-600 max-w-2xl font-inter">
                  Supervise active members, dynamic payments gateways, and video transcoder workers.
                </p>
              </div>
              <span className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-full px-3 py-1 text-[10px] font-mono text-blue-700">
                System Active
              </span>
            </div>

            {/* Grid of sub-sections */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Sub-section 1: Creator Hub Console */}
              <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">
                  Creator Hub Analytics
                </h4>
                <div className="space-y-4 font-mono text-xs">
                  <div className="flex justify-between border-b border-neutral-100 pb-2">
                    <span className="text-slate-500">Student Cohorts:</span>
                    <span className="font-bold">12 Active</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-100 pb-2">
                    <span className="text-slate-500">Lessons Published:</span>
                    <span className="font-bold">184 published</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Streaming Playback SLA:</span>
                    <span className="text-green-600 font-bold">99.98% Healthy</span>
                  </div>
                </div>
              </div>

              {/* Sub-section 2: Membership Billing */}
              <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">
                      Membership Billing
                    </h4>
                    <select
                      value={billingProvider}
                      onChange={(e) => setBillingProvider(e.target.value)}
                      className="rounded border border-neutral-300 bg-white px-2 py-1 text-[10px] font-mono text-slate-900 focus:border-blue-700 focus:outline-none cursor-pointer"
                    >
                      <option value="Stripe">Stripe</option>
                      <option value="Razorpay">Razorpay</option>
                    </select>
                  </div>

                  <div className="grid gap-4 text-xs font-mono">
                    <div className="flex justify-between border-b border-neutral-100 pb-2">
                      <span className="text-slate-500">Active Gateway:</span>
                      <span className="font-bold text-blue-700">{billingProvider}</span>
                    </div>
                    <div className="flex justify-between border-b border-neutral-100 pb-2">
                      <span className="text-slate-500">Monthly Revenue (MRR):</span>
                      <span className="font-bold text-slate-950">
                        {billingProvider === "Stripe" ? "$18,450" : "₹15,42,000"}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-neutral-100 pb-2">
                      <span className="text-slate-500">Active Subscribers:</span>
                      <span>412 Users</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Churn Percentage:</span>
                      <span className="text-emerald-600 font-bold">1.2%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sub-section 3: Video CDN Streaming */}
              <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">
                    Video CDN Streaming
                  </h4>
                  <select
                    value={cdnProvider}
                    onChange={(e) => setCdnProvider(e.target.value)}
                    className="rounded border border-neutral-300 bg-white px-2 py-1 text-[10px] font-mono text-slate-900 focus:border-blue-700 focus:outline-none cursor-pointer"
                  >
                    <option value="Mux CDN">Mux CDN</option>
                    <option value="Vimeo CDN">Vimeo CDN</option>
                    <option value="YouTube CDN">YouTube CDN</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <div className="bg-neutral-50 border border-neutral-200 rounded p-4 text-xs font-mono text-slate-500 space-y-2">
                    <div className="flex justify-between items-center text-slate-800">
                      <span className="font-bold truncate max-w-[140px]">
                        {cdnProvider === "Mux CDN" ? "NextJs_Tutorial_L12" : "Vimeo_Render_L12"}
                      </span>
                      <span className="text-[9px] uppercase font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">Transcoding (82%)</span>
                    </div>
                    <div className="w-full bg-neutral-200 rounded-full h-1 overflow-hidden">
                      <div className="bg-blue-700 h-1" style={{ width: "82%" }} />
                    </div>
                  </div>
                  <div className="flex justify-between text-xs font-mono text-slate-600 px-1 pt-1">
                    <span>Edge Caching:</span>
                    <strong className="text-slate-950">98.92% (Cloudflare CDN)</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= SERVICE 4: WORKFLOW AUTOMATION ================= */}
        {activeTab === "service-automation" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Page Header */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
              <div className="space-y-1">
                <h3 className="text-lg font-mono text-slate-900 font-semibold flex items-center gap-2">
                  <TrendingUp className="size-5 text-blue-700" />
                  AI Workflow Automation Console
                </h3>
                <p className="text-xs text-slate-600 max-w-2xl font-inter">
                  Configure automated messaging triggers, listen to background sync pipelines, and audit API dispatches.
                </p>
              </div>
              <span className="flex items-center gap-1.5 bg-blue-50 border border-blue-200 rounded-full px-3 py-1 text-[10px] font-mono text-blue-700">
                System Active
              </span>
            </div>

            {/* Grid of sub-sections */}
            <div className="grid gap-6 lg:grid-cols-3">
              {/* Sub-section 1: Workflow Automation Logs */}
              <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm space-y-4">
                <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">
                  Automation Logs
                </h4>
                <div className="space-y-3">
                  {[
                    { name: "Post-Treatment Loop", desc: "Dispatch client follow-up checkups 48 hours post-session.", trigger: "Session completed" },
                    { name: "Low-Stock notification", desc: "Alert administrator when product counts dip below threshold.", trigger: "SKU < 15%" }
                  ].map((item, idx) => (
                    <div key={idx} className="border border-neutral-100 rounded p-3 text-xs space-y-1.5">
                      <h5 className="font-bold text-slate-900 font-mono">{item.name}</h5>
                      <p className="text-slate-500 leading-normal">{item.desc}</p>
                      <div className="text-[9px] font-mono text-slate-400">Trigger: {item.trigger}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sub-section 2: Instant Messaging Node */}
              <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">
                      Instant Messaging Node
                    </h4>
                    <select
                      value={messageGateway}
                      onChange={(e) => setMessageGateway(e.target.value)}
                      className="rounded border border-neutral-300 bg-white px-2 py-1 text-[10px] font-mono text-slate-900 focus:border-blue-700 focus:outline-none cursor-pointer"
                    >
                      <option value="WhatsApp API">WhatsApp API</option>
                      <option value="Telegram Bot">Telegram Bot</option>
                      <option value="Slack Webhook">Slack Webhook</option>
                    </select>
                  </div>

                  <div className="grid gap-3 text-xs font-mono">
                    <div className="flex justify-between border-b border-neutral-100 pb-2">
                      <span className="text-slate-500">Sender Node:</span>
                      <span className="font-bold text-blue-700">{messageGateway}</span>
                    </div>
                    <div className="flex justify-between border-b border-neutral-100 pb-2">
                      <span className="text-slate-500">Delivery SLA:</span>
                      <span className="text-green-600 font-bold">99.4% Success</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Daily Messages:</span>
                      <span>1,420 sent</span>
                    </div>
                  </div>

                  {/* Dynamic Logs based on selection */}
                  <div className="bg-neutral-950 text-green-400 font-mono text-[9px] p-3 rounded h-32 overflow-y-auto space-y-1">
                    {messageGateway === "WhatsApp API" && (
                      <>
                        <div>[2026-07-22 17:05] Booking update: Sent (WhatsApp API)</div>
                        <div>[2026-07-22 16:50] Prescription dispatch {"->"} Sent</div>
                      </>
                    )}
                    {messageGateway === "Telegram Bot" && (
                      <>
                        <div>[2026-07-22 17:05] Dispatching Telegram message payload...</div>
                        <div>[2026-07-22 16:50] Telegram API response: 200 OK</div>
                      </>
                    )}
                    {messageGateway === "Slack Webhook" && (
                      <>
                        <div>[2026-07-22 17:05] POST webhook payload {"->"} Slack #notifications</div>
                        <div>[2026-07-22 16:50] Slack API response: 200 OK</div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Sub-section 3: Database Sync Gateway */}
              <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">
                    Database Sync Gateway
                  </h4>
                  <select
                    value={syncNode}
                    onChange={(e) => setSyncNode(e.target.value)}
                    className="rounded border border-neutral-300 bg-white px-2 py-1 text-[10px] font-mono text-slate-900 focus:border-blue-700 focus:outline-none cursor-pointer"
                  >
                    <option value="EHR Medical">EHR Medical</option>
                    <option value="Salesforce CRM">Salesforce CRM</option>
                    <option value="Custom Webhook">Custom Webhook</option>
                  </select>
                </div>

                <div className="bg-neutral-950 text-green-400 font-mono text-[9px] p-4 rounded h-44 overflow-y-auto space-y-1">
                  {syncNode === "EHR Medical" && (
                    <>
                      <div>[EHR Node] Listening for clinic database triggers...</div>
                      <div>[EHR Node] Rescheduled acupuncture reservation: Thomas Miller</div>
                      <div>[EHR Node] DB sync status: 100% Synced (API nominal)</div>
                    </>
                  )}
                  {syncNode === "Salesforce CRM" && (
                    <>
                      <div>[SF Sync] Authenticating Salesforce Oauth token...</div>
                      <div>[SF Sync] Pulled 12 updated account records from CRM pipeline.</div>
                      <div>[SF Sync] Sync cycle success (latency: 120ms)</div>
                    </>
                  )}
                  {syncNode === "Custom Webhook" && (
                    <>
                      <div>[Webhook] Trigger dispatched to custom endpoint gateway...</div>
                      <div>[Webhook] POST payload sent (size: 1.2KB) {"->"} 200 Success</div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ClientView;
