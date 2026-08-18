"use client";

import React, { useState, useEffect } from "react";
import { useDashboard } from "../DashboardContext";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  Layers,
  Users,
  Inbox,
  Trello,
  LayoutDashboard,
  Sparkles,
  Check,
  X,
  FileCode,
  ArrowUpRight,
  TrendingUp,
  CreditCard,
  Target,
  Clock,
  Mail,
  Phone,
  Settings,
  Shield,
  Briefcase
} from "lucide-react";

const OwnerView = () => {
  const {
    clients,
    activeClient,
    activeTab,
    kanbanTasks,
    serviceUpgrades,
    leads,
    approveUpgrade,
    declineUpgrade,
    updateClientDetails,
    publishProject
  } = useDashboard();

  // Local drawer state for reviewing transcripts
  const [selectedLead, setSelectedLead] = useState(null);

  // Settings form states
  const [clientForm, setClientForm] = useState({
    name: activeClient?.name || "",
    ownerName: activeClient?.ownerName || "",
    ownerEmail: activeClient?.ownerEmail || ""
  });

  const [projectForm, setProjectForm] = useState({
    title: "",
    subtitle: "",
    client: "",
    service: "AI-Powered Business Websites",
    category: "real-world",
    year: new Date().getFullYear().toString(),
    summary: "",
    tags: "",
    metric1Value: "",
    metric1Label: "",
    metric2Value: "",
    metric2Label: "",
    metric3Value: "",
    metric3Label: "",
    challenge: "",
    solution: "",
    results: ""
  });

  const [clientSaveSuccess, setClientSaveSuccess] = useState(false);
  const [projectPublishSuccess, setProjectPublishSuccess] = useState(false);

  // Dynamic Provider Selectors
  const [crmProvider, setCrmProvider] = useState("HubSpot");
  const [skuSystem, setSkuSystem] = useState("ERP Console");
  const [dbEngine, setDbEngine] = useState("PostgreSQL");
  const [fleetTracker, setFleetTracker] = useState("GPS Routing");
  const [billingProvider, setBillingProvider] = useState("Stripe");
  const [cdnProvider, setCdnProvider] = useState("Mux CDN");
  const [messageGateway, setMessageGateway] = useState("WhatsApp API");
  const [syncNode, setSyncNode] = useState("EHR Medical");

  // Sync client form when activeClient context changes
  useEffect(() => {
    if (activeClient) {
      setClientForm({
        name: activeClient.name || "",
        ownerName: activeClient.ownerName || "",
        ownerEmail: activeClient.ownerEmail || ""
      });
    }
  }, [activeClient]);

  const handleClientUpdateSubmit = (e) => {
    e.preventDefault();
    updateClientDetails(activeClient.slug, clientForm);
    setClientSaveSuccess(true);
    setTimeout(() => setClientSaveSuccess(false), 3000);
  };

  const handleProjectPublishSubmit = (e) => {
    e.preventDefault();
    publishProject(projectForm);
    setProjectPublishSuccess(true);
    setProjectForm({
      title: "",
      subtitle: "",
      client: "",
      service: "AI-Powered Business Websites",
      category: "real-world",
      year: new Date().getFullYear().toString(),
      summary: "",
      tags: "",
      metric1Value: "",
      metric1Label: "",
      metric2Value: "",
      metric2Label: "",
      metric3Value: "",
      metric3Label: "",
      challenge: "",
      solution: "",
      results: ""
    });
    setTimeout(() => setProjectPublishSuccess(false), 3000);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* View Header */}
      <header className="h-16 border-b border-neutral-200 bg-white flex items-center justify-between px-8 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
            Owner Admin Console
          </span>
          <span className="text-slate-300">/</span>
          <h2 className="text-sm font-mono font-bold text-slate-900 flex items-center gap-2">
            Operations Center
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-red-500 animate-pulse" />
          <span className="text-[10px] font-mono text-slate-500 uppercase">
            Master Console Lock
          </span>
        </div>
      </header>

      {/* Main View Area */}
      <main className="flex-1 p-8 overflow-y-auto max-w-7xl w-full mx-auto space-y-8">

        {/* ================= ADMIN OPERATIONS TAB ================= */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Context Summary */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-2">
              <h3 className="text-base font-mono text-slate-900 font-semibold">
                Studio Revenue & System Operations
              </h3>
              <p className="text-xs text-slate-600 font-inter max-w-2xl">
                Real-time dashboard displaying Egostix Media recurring revenue metrics, total active client nodes, and active upgrades queue.
              </p>
            </div>

            {/* Financial indicators */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white rounded-lg border border-neutral-200 p-5 shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">
                    Monthly Recurring Revenue
                  </span>
                  <TrendingUp className="size-4 text-green-600" />
                </div>
                <div className="text-2xl font-mono font-bold text-slate-900">
                  $24,500
                </div>
                <p className="text-[9px] text-slate-500 font-mono">
                  +12.4% increase from last quarter.
                </p>
              </div>

              <div className="bg-white rounded-lg border border-neutral-200 p-5 shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">
                    Active Client Nodes
                  </span>
                  <Users className="size-4 text-blue-700" />
                </div>
                <div className="text-2xl font-mono font-bold text-slate-900">
                  {clients.length} / 10 Active
                </div>
                <p className="text-[9px] text-slate-500 font-mono">
                  All systems reporting active telemetry.
                </p>
              </div>

              <div className="bg-white rounded-lg border border-neutral-200 p-5 shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">
                    Pipeline Load Tasks
                  </span>
                  <Trello className="size-4 text-amber-600" />
                </div>
                <div className="text-2xl font-mono font-bold text-slate-900">
                  {kanbanTasks.filter((t) => t.status !== "deployed").length} Cards
                </div>
                <p className="text-[9px] text-slate-500 font-mono">
                  Tasks distribution across developer backlogs.
                </p>
              </div>

              <div className="bg-white rounded-lg border border-neutral-200 p-5 shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono uppercase text-slate-500 font-bold">
                    Pending Client Upgrades
                  </span>
                  <Layers className="size-4 text-red-600" />
                </div>
                <div className="text-2xl font-mono font-bold text-slate-900">
                  {serviceUpgrades.filter((u) => u.status === "pending").length} Queue
                </div>
                <p className="text-[9px] text-slate-500 font-mono">
                  Requires owner approval authorization.
                </p>
              </div>
            </div>

            {/* Recharts MRR & Staff Utilization chart */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">
                MRR Growth & Staff Capacity Audit (H1 2026)
              </h4>
              <div className="w-full h-56 bg-neutral-50/50 rounded border border-neutral-100 p-4">
                <ChartContainer
                  config={{
                    mrr: {
                      label: "MRR ($)",
                      color: "#1d4ed8"
                    },
                    capacity: {
                      label: "Staff Capacity (%)",
                      color: "#64748b"
                    }
                  }}
                  className="h-full w-full"
                >
                  <LineChart
                    data={[
                      { month: "Jan", mrr: 15000, capacity: 60 },
                      { month: "Feb", mrr: 16500, capacity: 65 },
                      { month: "Mar", mrr: 18000, capacity: 70 },
                      { month: "Apr", mrr: 19500, capacity: 75 },
                      { month: "May", mrr: 22000, capacity: 85 },
                      { month: "Jun", mrr: 24500, capacity: 90 }
                    ]}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis
                      dataKey="month"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                    />
                    <YAxis
                      yAxisId="left"
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `$${value / 1000}k`}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}%`}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="mrr"
                      stroke="var(--color-mrr)"
                      strokeWidth={2}
                      activeDot={{ r: 6 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="capacity"
                      stroke="var(--color-capacity)"
                      strokeWidth={2}
                      strokeDasharray="4 4"
                    />
                  </LineChart>
                </ChartContainer>
              </div>
            </div>
          </div>
        )}

        {/* ================= CLIENTS DIRECTORY TAB ================= */}
        {activeTab === "clients" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-1 border-b border-neutral-100 pb-4">
              <h3 className="text-base font-mono text-slate-900 font-semibold">
                Client Portal Directory
              </h3>
              <p className="text-xs text-slate-500 font-inter">
                Oversee active client configurations and systems statuses.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {clients.map((client) => {
                const clientTasks = kanbanTasks.filter((t) => t.clientSlug === client.slug);
                const clientLeads = leads.filter((l) => l.clientSlug === client.slug);

                return (
                  <article
                    key={client.slug}
                    className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-4 hover:border-blue-600 transition"
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-0.5">
                        <h4 className="text-sm font-bold text-slate-900">{client.name}</h4>
                        <p className="text-[10px] text-slate-500 font-mono">
                          Owner: {client.ownerName} • {client.ownerEmail}
                        </p>
                      </div>
                      <span className="text-[9px] font-mono uppercase bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                        {client.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-y border-neutral-100 py-3 text-xs font-mono">
                      <div>
                        <span className="text-[9px] text-slate-400 block uppercase">Leads Captured</span>
                        <span className="font-bold text-slate-900">{clientLeads.length} Qualified</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 block uppercase">Active Tasks</span>
                        <span className="font-bold text-slate-900">{clientTasks.filter((t) => t.status !== "deployed").length} Cards</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {client.activeServices.map((service, index) => (
                        <span
                          key={index}
                          className="rounded bg-neutral-50 border border-neutral-200 text-[8.5px] font-mono text-slate-700 px-2 py-0.5"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        )}

        {/* ================= SERVICE UPGRADES APPROVAL TAB ================= */}
        {activeTab === "upgrades" && (
          <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-6 animate-in fade-in duration-200">
            <div className="space-y-1 border-b border-neutral-100 pb-4">
              <h3 className="text-base font-mono text-slate-900 font-semibold">
                Service Upgrade & Internal Tools Request Queue
              </h3>
              <p className="text-xs text-slate-500 font-inter">
                Approve client portal requests to immediately append services to their workspace configs.
              </p>
            </div>

            <div className="space-y-4">
              {serviceUpgrades.filter((u) => u.status === "pending").length === 0 ? (
                <div className="text-center py-8 text-xs font-mono text-slate-400">
                  No pending service requests in queue.
                </div>
              ) : (
                serviceUpgrades.filter((u) => u.status === "pending").map((upgrade) => {
                  const requestClient = clients.find((c) => c.slug === upgrade.clientSlug);

                  return (
                    <div
                      key={upgrade.id}
                      className="border border-neutral-200 rounded p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-neutral-300 transition"
                    >
                      <div className="space-y-1.5 max-w-xl">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-slate-900">
                            {upgrade.serviceName}
                          </span>
                          <span className="text-slate-300">/</span>
                          <span className="text-[10px] font-mono text-blue-700 uppercase font-bold">
                            {requestClient?.shortName}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-650 leading-relaxed font-inter">
                          {upgrade.description}
                        </p>
                        <p className="text-[9px] text-slate-400 font-mono">Requested: {upgrade.requestedAt}</p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => approveUpgrade(upgrade.id)}
                          className="rounded border border-green-200 bg-green-50 px-3 py-1.5 font-mono text-xs font-semibold text-green-700 hover:bg-green-100 transition flex items-center gap-1"
                        >
                          <Check className="size-3.5" />
                          Approve
                        </button>
                        <button
                          onClick={() => declineUpgrade(upgrade.id)}
                          className="rounded border border-red-200 bg-red-50 px-3 py-1.5 font-mono text-xs font-semibold text-red-700 hover:bg-red-100 transition flex items-center gap-1"
                        >
                          <X className="size-3.5" />
                          Decline
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Past approved requests logs */}
            <div className="border-t border-neutral-100 pt-6 space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase text-slate-700 tracking-wider">
                Processed Requests History
              </h4>
              <div className="space-y-3">
                {serviceUpgrades.filter((u) => u.status !== "pending").map((upgrade) => {
                  const requestClient = clients.find((c) => c.slug === upgrade.clientSlug);

                  return (
                    <div
                      key={upgrade.id}
                      className="border border-neutral-200 bg-neutral-50/30 rounded p-3 flex justify-between items-center text-xs"
                    >
                      <div className="space-y-0.5">
                        <div className="font-bold text-slate-800">
                          {upgrade.serviceName} • <span className="font-mono text-[9px] text-slate-500 uppercase">{requestClient?.shortName}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-inter">{upgrade.description}</p>
                      </div>
                      <span className={`text-[8px] font-mono uppercase px-2 py-0.5 rounded-full ${
                        upgrade.status === "approved" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                        {upgrade.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================= GLOBAL LEAD HUB TAB ================= */}
        {activeTab === "leads" && (
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr] animate-in fade-in duration-200">
            {/* Leads Table */}
            <div className="bg-white rounded-lg border border-neutral-200 shadow-sm p-6 space-y-6">
              <div className="space-y-1 border-b border-neutral-105 pb-4">
                <h3 className="text-base font-mono text-slate-900 font-semibold">
                  Global Lead Hub Matrix
                </h3>
                <p className="text-xs text-slate-500 font-inter">
                  Monitor inbound qualified opportunities generated across all client platforms.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-neutral-200 font-mono text-[10px] uppercase text-slate-500 font-bold bg-neutral-50/50">
                      <th className="py-3 px-4">Contact</th>
                      <th className="py-3 px-4">Platform Node</th>
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => {
                      const lClient = clients.find((c) => c.slug === lead.clientSlug);

                      return (
                        <tr
                          key={lead.id}
                          onClick={() => setSelectedLead(lead)}
                          className={`border-b border-neutral-100 text-xs hover:bg-neutral-50/85 transition cursor-pointer ${
                            selectedLead?.id === lead.id ? "bg-blue-50/50" : ""
                          }`}
                        >
                          <td className="py-3 px-4">
                            <div className="font-semibold text-slate-900">{lead.name}</div>
                            <div className="text-[9px] text-slate-500 font-mono">{lead.email}</div>
                          </td>
                          <td className="py-3 px-4 font-mono text-[10px] text-blue-700 uppercase font-bold">
                            {lClient?.shortName}
                          </td>
                          <td className="py-3 px-4 font-mono text-[10px] text-slate-500">{lead.date}</td>
                          <td className="py-3 px-4 text-center">
                            <span className={`text-[8px] font-mono uppercase px-2 py-0.5 rounded-full ${
                              lead.status === "hot" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
                            }`}>
                              {lead.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Chat Log Transcript View */}
            <div className="bg-white rounded-lg border border-neutral-200 shadow-sm p-6 flex flex-col h-[520px]">
              {selectedLead ? (
                <div className="flex flex-col h-full space-y-4">
                  <div className="border-b border-neutral-200 pb-4 space-y-2.5">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold text-slate-900">{selectedLead.name}</h4>
                      <span className="text-[9px] font-mono uppercase bg-blue-100 text-blue-850 px-2 py-0.5 rounded">
                        Qualified lead
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-650 font-mono">
                      <div className="flex items-center gap-1">
                        <Mail className="size-3.5 text-slate-400" />
                        <span className="truncate">{selectedLead.email}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Phone className="size-3.5 text-slate-400" />
                        <span>{selectedLead.phone}</span>
                      </div>
                    </div>
                  </div>

                  {/* Log View */}
                  <div className="flex-1 overflow-y-auto space-y-3 bg-neutral-50 rounded border border-neutral-100 p-4 max-h-[300px]">
                    {selectedLead.chatLog.map((chat, idx) => (
                      <div
                        key={idx}
                        className={`flex flex-col max-w-[85%] rounded p-2.5 text-xs ${
                          chat.sender === "customer"
                            ? "bg-white border border-neutral-200 self-start text-slate-800"
                            : "bg-blue-700 text-white self-end ml-auto"
                        }`}
                      >
                        <span className="text-[8px] font-mono uppercase opacity-75 mb-0.5">
                          {chat.sender === "customer" ? "Customer" : "AI Concierge"}
                        </span>
                        <span>{chat.text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="bg-blue-50 border border-blue-100 rounded p-3 flex gap-2.5 items-start">
                    <Sparkles className="size-4 text-blue-700 mt-0.5 shrink-0" />
                    <div className="space-y-1">
                      <h5 className="text-[10px] font-mono font-bold text-blue-700 uppercase">AI Capture Analysis</h5>
                      <p className="text-[10px] text-blue-900 leading-normal">
                        <strong>Intent Log:</strong> {selectedLead.query}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-3 text-slate-400 font-mono text-xs">
                  <Inbox className="size-8 text-slate-300" />
                  <p>Select a qualified lead to inspect the full client-customer AI conversation transcript.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= PIPELINE REVIEW TAB ================= */}
        {activeTab === "kanban" && (
          <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-6 animate-in fade-in duration-200">
            <div className="space-y-1 border-b border-neutral-100 pb-4">
              <h3 className="text-base font-mono text-slate-900 font-semibold">
                Global Task Pipeline Audit
              </h3>
              <p className="text-xs text-slate-500 font-inter">
                Read-only overview of active development sprints across all client portal backlogs.
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-neutral-200 font-mono text-[10px] uppercase text-slate-500 font-bold bg-neutral-50/50">
                    <th className="py-3 px-4">Task</th>
                    <th className="py-3 px-4">Client Node</th>
                    <th className="py-3 px-4">Sprint Status</th>
                    <th className="py-3 px-4">Priority</th>
                    <th className="py-3 px-4 text-right">Deadline</th>
                  </tr>
                </thead>
                <tbody>
                  {kanbanTasks.map((task) => {
                    const tClient = clients.find((c) => c.slug === task.clientSlug);

                    return (
                      <tr key={task.id} className="border-b border-neutral-100 hover:bg-neutral-50/50 transition">
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-900">{task.title}</div>
                          <div className="text-[10px] text-slate-550 truncate max-w-sm">{task.description}</div>
                        </td>
                        <td className="py-3 px-4 font-mono font-bold text-blue-700 uppercase">
                          {tClient?.shortName}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded-full ${
                            task.status === "deployed" ? "bg-green-100 text-green-800" : task.status === "review" ? "bg-amber-100 text-amber-800" : task.status === "in-progress" ? "bg-blue-100 text-blue-800" : "bg-neutral-100 text-neutral-800"
                          }`}>
                            {task.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="capitalize">{task.priority}</span>
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-slate-500">{task.dueDate}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= INTERNAL SETTINGS & PUBLISHING TAB ================= */}
        {activeTab === "settings" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Header info */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-2">
              <h3 className="text-base font-mono text-slate-900 font-semibold flex items-center gap-2">
                <Settings className="size-4.5 text-blue-700" />
                Publish Case Study
              </h3>
              <p className="text-xs text-slate-650 font-inter max-w-2xl">
                Publish dynamic case studies and client projects directly to the Egostix Media Work page index.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-6 max-w-3xl mx-auto">
              <div className="space-y-1">
                <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">
                  Publish New Work Project
                </h4>
                <p className="text-[11px] text-slate-505">
                  Spin up new projects to feature on the public work page dynamic index.
                </p>
              </div>

              <form onSubmit={handleProjectPublishSubmit} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono font-bold uppercase text-slate-600">
                      Project Title
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chronos Health Engine"
                      value={projectForm.title}
                      onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                      className="w-full rounded border border-neutral-300 bg-white px-3 py-2 text-xs font-inter text-slate-900 focus:border-blue-700 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono font-bold uppercase text-slate-600">
                      Sub-title / Short Description
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. AI healthcare scheduling web systems"
                      value={projectForm.subtitle}
                      onChange={(e) => setProjectForm({ ...projectForm, subtitle: e.target.value })}
                      className="w-full rounded border border-neutral-300 bg-white px-3 py-2 text-xs font-inter text-slate-900 focus:border-blue-700 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono font-bold uppercase text-slate-600">
                      Client Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Chronos Health"
                      value={projectForm.client}
                      onChange={(e) => setProjectForm({ ...projectForm, client: e.target.value })}
                      className="w-full rounded border border-neutral-300 bg-white px-3 py-2 text-xs font-inter text-slate-900 focus:border-blue-700 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono font-bold uppercase text-slate-600">
                      Service Vertical
                    </label>
                    <select
                      value={projectForm.service}
                      onChange={(e) => setProjectForm({ ...projectForm, service: e.target.value })}
                      className="w-full rounded border border-neutral-300 bg-white px-2 py-2 text-xs font-mono text-slate-955 focus:border-blue-700 focus:outline-none"
                    >
                      <option value="AI-Powered Business Websites">AI-Powered Business Websites</option>
                      <option value="AI Internal Tools for SMBs">AI Internal Tools for SMBs</option>
                      <option value="Workflow Automation">Workflow Automation</option>
                      <option value="Creator Infrastructure">Creator Infrastructure</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono font-bold uppercase text-slate-600">
                      Project Category
                    </label>
                    <select
                      value={projectForm.category}
                      onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                      className="w-full rounded border border-neutral-300 bg-white px-2 py-2 text-xs font-mono text-slate-955 focus:border-blue-700 focus:outline-none"
                    >
                      <option value="real-world">Client Work</option>
                      <option value="skill-display">Showcase Prototype</option>
                    </select>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono font-bold uppercase text-slate-600">
                      Year
                    </label>
                    <input
                      type="text"
                      required
                      value={projectForm.year}
                      onChange={(e) => setProjectForm({ ...projectForm, year: e.target.value })}
                      className="w-full rounded border border-neutral-300 bg-white px-3 py-2 text-xs font-mono text-slate-900 focus:border-blue-700 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono font-bold uppercase text-slate-600">
                      Technology Tags (comma-separated)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="React, Next.js, OpenAI API"
                      value={projectForm.tags}
                      onChange={(e) => setProjectForm({ ...projectForm, tags: e.target.value })}
                      className="w-full rounded border border-neutral-300 bg-white px-3 py-2 text-xs font-inter text-slate-900 focus:border-blue-700 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Metrics */}
                <div className="space-y-2 border-t border-neutral-100 pt-4">
                  <h5 className="text-[10px] font-mono font-bold uppercase text-slate-500">
                    Performance Metrics (Provide up to 3)
                  </h5>
                  <div className="grid gap-3 sm:grid-cols-3">
                    <div className="rounded border border-neutral-200 p-3 space-y-2 bg-neutral-50/20">
                      <input
                        type="text"
                        required
                        placeholder="value (e.g. +40%)"
                        value={projectForm.metric1Value}
                        onChange={(e) => setProjectForm({ ...projectForm, metric1Value: e.target.value })}
                        className="w-full rounded border border-neutral-300 bg-white px-2 py-1 text-xs font-mono font-bold text-slate-900 focus:border-blue-700 focus:outline-none"
                      />
                      <input
                        type="text"
                        required
                        placeholder="label (e.g. Leads Generated)"
                        value={projectForm.metric1Label}
                        onChange={(e) => setProjectForm({ ...projectForm, metric1Label: e.target.value })}
                        className="w-full rounded border border-neutral-305 bg-white px-2 py-1 text-[10px] font-inter text-slate-655 focus:border-blue-700 focus:outline-none"
                      />
                    </div>
                    <div className="rounded border border-neutral-200 p-3 space-y-2 bg-neutral-50/20">
                      <input
                        type="text"
                        required
                        placeholder="value (e.g. 1.2s)"
                        value={projectForm.metric2Value}
                        onChange={(e) => setProjectForm({ ...projectForm, metric2Value: e.target.value })}
                        className="w-full rounded border border-neutral-300 bg-white px-2 py-1 text-xs font-mono font-bold text-slate-900 focus:border-blue-700 focus:outline-none"
                      />
                      <input
                        type="text"
                        required
                        placeholder="label (e.g. Latency reduction)"
                        value={projectForm.metric2Label}
                        onChange={(e) => setProjectForm({ ...projectForm, metric2Label: e.target.value })}
                        className="w-full rounded border border-neutral-305 bg-white px-2 py-1 text-[10px] font-inter text-slate-655 focus:border-blue-700 focus:outline-none"
                      />
                    </div>
                    <div className="rounded border border-neutral-200 p-3 space-y-2 bg-neutral-50/20">
                      <input
                        type="text"
                        required
                        placeholder="value (e.g. 99.9%)"
                        value={projectForm.metric3Value}
                        onChange={(e) => setProjectForm({ ...projectForm, metric3Value: e.target.value })}
                        className="w-full rounded border border-neutral-300 bg-white px-2 py-1 text-xs font-mono font-bold text-slate-900 focus:border-blue-700 focus:outline-none"
                      />
                      <input
                        type="text"
                        required
                        placeholder="label (e.g. Uptime SLA)"
                        value={projectForm.metric3Label}
                        onChange={(e) => setProjectForm({ ...projectForm, metric3Label: e.target.value })}
                        className="w-full rounded border border-neutral-305 bg-white px-2 py-1 text-[10px] font-inter text-slate-655 focus:border-blue-700 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Summary & Narrative */}
                <div className="space-y-3 border-t border-neutral-100 pt-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono font-bold uppercase text-slate-600">
                      Project Summary Description
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Detail a short summary about the scope, features, and target outcomes of this project..."
                      value={projectForm.summary}
                      onChange={(e) => setProjectForm({ ...projectForm, summary: e.target.value })}
                      className="w-full rounded border border-neutral-300 bg-white px-3 py-2 text-xs font-inter text-slate-900 focus:border-blue-700 focus:outline-none resize-none"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono font-bold uppercase text-slate-600">
                        Challenge
                      </label>
                      <textarea
                        required
                        rows={2}
                        placeholder="Problem statement..."
                        value={projectForm.challenge}
                        onChange={(e) => setProjectForm({ ...projectForm, challenge: e.target.value })}
                        className="w-full rounded border border-neutral-300 bg-white px-3 py-2 text-xs font-inter text-slate-900 focus:border-blue-700 focus:outline-none resize-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono font-bold uppercase text-slate-600">
                        Solution
                      </label>
                      <textarea
                        required
                        rows={2}
                        placeholder="Technical approach..."
                        value={projectForm.solution}
                        onChange={(e) => setProjectForm({ ...projectForm, solution: e.target.value })}
                        className="w-full rounded border border-neutral-300 bg-white px-3 py-2 text-xs font-inter text-slate-900 focus:border-blue-700 focus:outline-none resize-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="block text-[10px] font-mono font-bold uppercase text-slate-600">
                        Results
                      </label>
                      <textarea
                        required
                        rows={2}
                        placeholder="Quantified outcome..."
                        value={projectForm.results}
                        onChange={(e) => setProjectForm({ ...projectForm, results: e.target.value })}
                        className="w-full rounded border border-neutral-300 bg-white px-3 py-2 text-xs font-inter text-slate-900 focus:border-blue-700 focus:outline-none resize-none"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded bg-blue-700 py-3 font-mono text-xs font-bold text-white hover:bg-blue-800 transition shadow-sm flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="size-4" />
                  Publish Dynamic Project
                </button>
              </form>

              {projectPublishSuccess && (
                <div className="rounded border border-blue-200 bg-blue-50 p-3.5 text-xs text-blue-900 font-inter flex items-center gap-2 animate-in fade-in duration-200">
                  <Sparkles className="size-4 text-blue-700 shrink-0" />
                  Project published successfully! Visit the Work page to view it.
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= CLIENT PROFILE MANAGER TAB ================= */}
        {activeTab === "client-settings" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Header info */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-2">
              <h3 className="text-base font-mono text-slate-900 font-semibold flex items-center gap-2">
                <Users className="size-4.5 text-blue-700" />
                Client Profile Manager
              </h3>
              <p className="text-xs text-slate-655 font-inter max-w-2xl">
                Modify contact credentials, active nodes, and profile information for the selected client context.
              </p>
            </div>

            <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-6 max-w-xl mx-auto">
              <div className="space-y-1">
                <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">
                  Client Profile Credentials
                </h4>
                <p className="text-[11px] text-slate-555">
                  Update owner contact detail and credentials of the client portal.
                </p>
              </div>

              <div className="rounded bg-neutral-50/50 border border-neutral-100 p-3 flex items-center gap-3">
                <div className="size-8 rounded-full bg-blue-50 border border-blue-150 flex items-center justify-center font-mono font-bold text-xs text-blue-700 uppercase">
                  {activeClient?.shortName?.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900">{activeClient?.name}</h5>
                  <span className="text-[9px] font-mono uppercase bg-green-100 text-green-800 px-1.5 py-0.5 rounded">
                    Selected Node
                  </span>
                </div>
              </div>

              <form onSubmit={handleClientUpdateSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-[10px] font-mono font-bold uppercase text-slate-600">
                    Company Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={clientForm.name}
                    onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                    className="w-full rounded border border-neutral-300 bg-white px-3 py-2 text-xs font-inter text-slate-900 focus:border-blue-700 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-mono font-bold uppercase text-slate-600">
                    Contact Owner Name
                  </label>
                  <input
                    type="text"
                    required
                    value={clientForm.ownerName}
                    onChange={(e) => setClientForm({ ...clientForm, ownerName: e.target.value })}
                    className="w-full rounded border border-neutral-300 bg-white px-3 py-2 text-xs font-inter text-slate-900 focus:border-blue-700 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[10px] font-mono font-bold uppercase text-slate-600">
                    Contact Owner Email
                  </label>
                  <input
                    type="email"
                    required
                    value={clientForm.ownerEmail}
                    onChange={(e) => setClientForm({ ...clientForm, ownerEmail: e.target.value })}
                    className="w-full rounded border border-neutral-300 bg-white px-3 py-2 text-xs font-inter text-slate-900 focus:border-blue-700 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded bg-blue-700 px-4 py-2.5 font-mono text-xs font-semibold text-white hover:bg-blue-800 transition shadow-sm flex items-center justify-center gap-1.5"
                >
                  Save Changes
                </button>
              </form>

              {clientSaveSuccess && (
                <div className="rounded border border-green-200 bg-green-50 p-3 text-[11px] text-green-800 font-inter flex items-center gap-2 animate-in fade-in duration-200">
                  <Check className="size-4 shrink-0" />
                  Contact configuration updated successfully.
                </div>
              )}
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
              <div className="bg-white border border-neutral-205 rounded-lg p-6 shadow-sm space-y-4">
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
                          <td className="py-2.5 px-2 text-slate-555">{item.imp}</td>
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
                    <div className="bg-neutral-955 text-green-400 font-mono text-[9px] p-3 rounded h-32 overflow-y-auto space-y-1">
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
                    className="rounded border border-neutral-305 bg-white px-2 py-1 text-[10px] font-mono text-slate-900 focus:border-blue-700 focus:outline-none cursor-pointer"
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

                <div className="bg-neutral-955 text-green-400 font-mono text-[9px] p-4 rounded h-44 overflow-y-auto space-y-1">
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
                      <span className="font-bold text-slate-955 font-mono font-bold">
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
                  <div className="bg-neutral-955 text-green-400 font-mono text-[9px] p-3 rounded h-32 overflow-y-auto space-y-1">
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
              <div className="bg-white border border-neutral-205 rounded-lg p-6 shadow-sm space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">
                    Database Sync Gateway
                  </h4>
                  <select
                    value={syncNode}
                    onChange={(e) => setSyncNode(e.target.value)}
                    className="rounded border border-neutral-305 bg-white px-2 py-1 text-[10px] font-mono text-slate-900 focus:border-blue-700 focus:outline-none cursor-pointer"
                  >
                    <option value="EHR Medical">EHR Medical</option>
                    <option value="Salesforce CRM">Salesforce CRM</option>
                    <option value="Custom Webhook">Custom Webhook</option>
                  </select>
                </div>

                <div className="bg-neutral-955 text-green-400 font-mono text-[9px] p-4 rounded h-44 overflow-y-auto space-y-1">
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
                      <div>[Webhook] Trigger dispatched to custom gateway...</div>
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

export default OwnerView;
