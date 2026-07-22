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
  Shield
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
                System Configurations & Work Publisher
              </h3>
              <p className="text-xs text-slate-650 font-inter max-w-2xl">
                Configure operational settings for active clients and publish dynamic case studies directly to the Egostix Media Work page.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_1.8fr]">
              {/* Left Column: Edit active client contacts */}
              <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm h-fit space-y-6">
                <div className="space-y-1">
                  <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">
                    Client Node Configuration
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Modify active client portal company and owner details.
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

              {/* Right Column: Publish New Project */}
              <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-6">
                <div className="space-y-1">
                  <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">
                    Publish New Work Project
                  </h4>
                  <p className="text-[11px] text-slate-500">
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
                        className="w-full rounded border border-neutral-300 bg-white px-2 py-2 text-xs font-mono text-slate-950 focus:border-blue-700 focus:outline-none"
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
                        className="w-full rounded border border-neutral-300 bg-white px-2 py-2 text-xs font-mono text-slate-950 focus:border-blue-700 focus:outline-none"
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
                          className="w-full rounded border border-neutral-350 bg-white px-2 py-1 text-[10px] font-inter text-slate-650 focus:border-blue-700 focus:outline-none"
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
                          className="w-full rounded border border-neutral-350 bg-white px-2 py-1 text-[10px] font-inter text-slate-650 focus:border-blue-700 focus:outline-none"
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
                          className="w-full rounded border border-neutral-350 bg-white px-2 py-1 text-[10px] font-inter text-slate-650 focus:border-blue-700 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Summary & Narratives */}
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
                          placeholder="The roadblock..."
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
                          placeholder="What we built..."
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
          </div>
        )}

        {/* ================= CLIENT SPECIFIC SIMULATION VIEWS ================= */}
        {activeTab === "client-listings" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-2">
              <h3 className="text-base font-mono text-slate-900 font-semibold flex items-center gap-2">
                <Shield className="size-4.5 text-blue-700" />
                Apex Realty Listings Manager
              </h3>
              <p className="text-xs text-slate-555 font-inter">Manage property listings synced to the {"client's"} public facing portal database.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { title: "5th Avenue Penthouse", price: "$4,200,000", status: "Active", views: "1,240" },
                { title: "Park Avenue Triplex", price: "$6,800,000", status: "Active", views: "890" },
                { title: "SoHo Industrial Loft", price: "$1,850,000", status: "Review", views: "412" }
              ].map((item, idx) => (
                <div key={idx} className="bg-white border border-neutral-200 rounded-lg p-5 shadow-sm space-y-2.5">
                  <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-full ${
                    item.status === "Active" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                  }`}>{item.status}</span>
                  <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                  <div className="flex justify-between items-center text-xs font-mono border-t border-neutral-100 pt-2 text-slate-600">
                    <span>Price: <strong>{item.price}</strong></span>
                    <span>Views: <strong>{item.views}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "client-seo" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-2">
              <h3 className="text-base font-mono text-slate-900 font-semibold flex items-center gap-2">
                <TrendingUp className="size-4.5 text-blue-700" />
                SEO Keyword Compounder Console
              </h3>
              <p className="text-xs text-slate-550 font-inter">Monitor organic search rankings, query metrics, and meta indexing statuses.</p>
            </div>
            <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">Top Organic Keywords</h4>
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-neutral-200 font-mono text-[10px] uppercase text-slate-500 font-bold bg-neutral-50/50">
                    <th className="py-2.5 px-3">Keyword</th>
                    <th className="py-2.5 px-3">Impressions</th>
                    <th className="py-2.5 px-3">CTR</th>
                    <th className="py-2.5 px-3 text-right">Position</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { word: "luxury apartments nyc", imp: "45.2k", ctr: "5.4%", pos: "1.2" },
                    { word: "penthouse fifth avenue", imp: "12.8k", ctr: "8.2%", pos: "2.1" },
                    { word: "buy loft soho nyc", imp: "8.9k", ctr: "3.1%", pos: "4.5" }
                  ].map((item, idx) => (
                    <tr key={idx} className="border-b border-neutral-100 font-inter">
                      <td className="py-3 px-3 text-slate-900 font-semibold">{item.word}</td>
                      <td className="py-3 px-3 font-mono">{item.imp}</td>
                      <td className="py-3 px-3 font-mono text-green-700">{item.ctr}</td>
                      <td className="py-3 px-3 font-mono text-right">{item.pos}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "client-crm" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-2">
              <h3 className="text-base font-mono text-slate-900 font-semibold flex items-center gap-2">
                <Layers className="size-4.5 text-blue-700" />
                CRM HubSpot Sync Gateway
              </h3>
              <p className="text-xs text-slate-550 font-inter">Monitor background sync payloads and webhook integrations.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-[1fr_1.5fr]">
              <div className="bg-white border border-neutral-200 rounded-lg p-5 shadow-sm space-y-4">
                <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">Sync Status</h4>
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">API Connection:</span>
                    <span className="text-green-600 font-bold">Connected</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Last Sync Cycle:</span>
                    <span>5 mins ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Errors logged:</span>
                    <span className="text-slate-650">0 errors</span>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-neutral-200 rounded-lg p-5 shadow-sm space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">Recent Webhook Logs</h4>
                <div className="bg-neutral-900 text-green-400 font-mono text-[10px] p-4 rounded overflow-x-auto h-40 space-y-1">
                  <div>[2026-07-22 15:10] Syncing Apex broker viewing request...</div>
                  <div>[2026-07-22 15:10] POST payload {"->"} HubSpot contacts API: 200 OK</div>
                  <div>[2026-07-22 15:05] Synced client lead: Robert Henderson {"->"} Sync Success</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "client-erp" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-2">
              <h3 className="text-base font-mono text-slate-900 font-semibold flex items-center gap-2">
                <Shield className="size-4.5 text-blue-700" />
                PulseOps ERP SKU Console
              </h3>
              <p className="text-xs text-slate-550 font-inter">Supervise regional distribution warehouse stock levels and thresholds.</p>
            </div>
            <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">Warehouse Inventory SKU Levels</h4>
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-neutral-200 font-mono text-[10px] uppercase text-slate-500 font-bold bg-neutral-50/50">
                    <th className="py-2.5 px-3">SKU Code</th>
                    <th className="py-2.5 px-3">Product Name</th>
                    <th className="py-2.5 px-3 text-center">Stock Count</th>
                    <th className="py-2.5 px-3 text-right">Reorder Alert</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { code: "PL-SKU-990", name: "Heavy Cargo Straps", qty: 240, status: "Normal" },
                    { code: "PL-SKU-412", name: "Industrial Hydraulic Fluid", qty: 12, status: "Low Stock Alert" },
                    { code: "PL-SKU-185", name: "GPS Logging Receivers", qty: 154, status: "Normal" }
                  ].map((item, idx) => (
                    <tr key={idx} className="border-b border-neutral-100 font-inter">
                      <td className="py-3 px-3 font-mono text-slate-600">{item.code}</td>
                      <td className="py-3 px-3 text-slate-900 font-semibold">{item.name}</td>
                      <td className="py-3 px-3 text-center font-mono">{item.qty} units</td>
                      <td className="py-3 px-3 text-right font-mono">
                        <span className={`text-[8.5px] uppercase font-bold px-2 py-0.5 rounded-full ${
                          item.status === "Normal" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>{item.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "client-db" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-2">
              <h3 className="text-base font-mono text-slate-900 font-semibold flex items-center gap-2">
                <Layers className="size-4.5 text-blue-700" />
                PostgreSQL Relational Database Monitor
              </h3>
              <p className="text-xs text-slate-550 font-inter">Audit active connections, CPU index read-write metrics, and table locks.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="bg-white border border-neutral-200 rounded-lg p-5 shadow-sm space-y-1.5">
                <span className="text-[9px] font-mono uppercase text-slate-500">Active Connections</span>
                <div className="text-2xl font-mono font-bold text-slate-900">42 / 100</div>
                <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-blue-700 h-1.5" style={{ width: "42%" }} />
                </div>
              </div>
              <div className="bg-white border border-neutral-200 rounded-lg p-5 shadow-sm space-y-1.5">
                <span className="text-[9px] font-mono uppercase text-slate-500">Query Cache Hit Ratio</span>
                <div className="text-2xl font-mono font-bold text-green-700">99.85%</div>
                <span className="text-[9.5px] font-inter text-slate-500 leading-tight block">Optimized indexing working correctly.</span>
              </div>
              <div className="bg-white border border-neutral-200 rounded-lg p-5 shadow-sm space-y-1.5">
                <span className="text-[9px] font-mono uppercase text-slate-500">Storage Read Latency</span>
                <div className="text-2xl font-mono font-bold text-slate-900">1.45ms</div>
                <span className="text-[9.5px] font-inter text-slate-500 leading-tight block">SSD read rates reporting nominal speed.</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "client-fleet" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-2">
              <h3 className="text-base font-mono text-slate-900 font-semibold flex items-center gap-2">
                <Users className="size-4.5 text-blue-700" />
                GPS Fleet Logistics Route Command
              </h3>
              <p className="text-xs text-slate-550 font-inter">Audit active vehicle dispatches and coordinate routing sequences.</p>
            </div>
            <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">Live Fleet Telemetry Tracker</h4>
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-neutral-200 font-mono text-[10px] uppercase text-slate-500 font-bold bg-neutral-50/50">
                    <th className="py-2.5 px-3">Vehicle ID</th>
                    <th className="py-2.5 px-3">Driver Name</th>
                    <th className="py-2.5 px-3">GPS Coordinates</th>
                    <th className="py-2.5 px-3 text-right">Route Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { id: "TRK-09", driver: "John Miller", coords: "40.7128° N, 74.0060° W", status: "En Route" },
                    { id: "TRK-14", driver: "Aleksey Volkov", coords: "34.0522° N, 118.2437° W", status: "Loading" },
                    { id: "TRK-22", driver: "Devon Green", coords: "41.8781° N, 87.6298° W", status: "Completed" }
                  ].map((item, idx) => (
                    <tr key={idx} className="border-b border-neutral-100 font-inter">
                      <td className="py-3 px-3 font-mono text-blue-750 uppercase font-bold">{item.id}</td>
                      <td className="py-3 px-3 text-slate-900 font-semibold">{item.driver}</td>
                      <td className="py-3 px-3 font-mono text-slate-500">{item.coords}</td>
                      <td className="py-3 px-3 text-right font-mono">
                        <span className={`text-[8.5px] uppercase font-bold px-2 py-0.5 rounded-full ${
                          item.status === "En Route" ? "bg-blue-100 text-blue-800" : item.status === "Loading" ? "bg-amber-100 text-amber-800" : "bg-green-100 text-green-800"
                        }`}>{item.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "client-triggers" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-2">
              <h3 className="text-base font-mono text-slate-900 font-semibold flex items-center gap-2">
                <TrendingUp className="size-4.5 text-blue-700" />
                Workflow Triggers Configuration
              </h3>
              <p className="text-xs text-slate-550 font-inter">Configure triggers that run automatically when patient checkups finish.</p>
            </div>
            <div className="bg-white border border-neutral-200 rounded-lg p-6 shadow-sm space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">Patient Automation Loops</h4>
              <div className="space-y-3">
                {[
                  { name: "Post-Treatment Feedback Loop", desc: "Dispatch patient compliance checking forms 48 hours post-acupuncture.", trigger: "Acupuncture session completed", delay: "48 Hours", status: "Active" },
                  { name: "Low-Stock SKU Notification", desc: "Send SMS alerts to operations when clinic inventory levels dip below threshold.", trigger: "SKU count < 15%", delay: "Instant", status: "Active" }
                ].map((item, idx) => (
                  <div key={idx} className="border border-neutral-200 rounded p-4 flex justify-between items-center text-xs">
                    <div className="space-y-1 max-w-xl">
                      <h5 className="font-bold text-slate-900 font-mono">{item.name}</h5>
                      <p className="text-slate-500 font-inter">{item.desc}</p>
                      <div className="text-[9.5px] font-mono text-slate-400">Trigger: {item.trigger} • Delay: {item.delay}</div>
                    </div>
                    <span className="text-[9px] font-mono uppercase bg-green-100 text-green-800 px-2 py-0.5 rounded-full">{item.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "client-whatsapp" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-2">
              <h3 className="text-base font-mono text-slate-900 font-semibold flex items-center gap-2">
                <Shield className="size-4.5 text-blue-700" />
                WhatsApp Automation API Node
              </h3>
              <p className="text-xs text-slate-550 font-inter">Monitor message transmission, delivery rates, and webhook triggers.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white border border-neutral-200 rounded-lg p-5 shadow-sm space-y-4">
                <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">API Node Status</h4>
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Sender Token:</span>
                    <span className="text-green-600 font-bold">Verified & Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Delivery Rate:</span>
                    <span>99.4% Successful</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Daily Messages Dispatched:</span>
                    <span>1,420</span>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-neutral-200 rounded-lg p-5 shadow-sm space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">Recent Dispatches</h4>
                <div className="bg-neutral-900 text-green-400 font-mono text-[10px] p-4 rounded overflow-x-auto h-40 space-y-1">
                  <div>[2026-07-22 17:05] Booking moved Wednesday: Thomas Miller {"->"} Sent (WhatsApp API)</div>
                  <div>[2026-07-22 16:50] Prescription confirmation dispatch {"->"} Sent</div>
                  <div>[2026-07-22 16:24] Appointment reminder: Sarah Lin {"->"} Sent</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "client-ehr" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-2">
              <h3 className="text-base font-mono text-slate-900 font-semibold flex items-center gap-2">
                <Layers className="size-4.5 text-blue-700" />
                EHR Patient Database Synchronization
              </h3>
              <p className="text-xs text-slate-550 font-inter">Audit real-time sync telemetry with the hospital electronic records server.</p>
            </div>
            <div className="bg-white border border-neutral-200 rounded-lg p-5 shadow-sm space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">Sync Telemetry Feed</h4>
              <div className="bg-neutral-900 text-green-400 font-mono text-[10px] p-4 rounded overflow-x-auto h-48 space-y-1">
                <div>[2026-07-22 17:15] Listening for patient checkup updates...</div>
                <div>[2026-07-22 17:05] EHR database updated: Patient Thomas Miller rescheduled acupuncture session.</div>
                <div>[2026-07-22 16:45] Full local clinic database sync completed. (Status: 100% Synced)</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "client-creator" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-2">
              <h3 className="text-base font-mono text-slate-900 font-semibold flex items-center gap-2">
                <Shield className="size-4.5 text-blue-700" />
                Creator Infrastructure Hub
              </h3>
              <p className="text-xs text-slate-550 font-inter">Monitor video upload queues, student cohorts, and lesson structures.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-white border border-neutral-200 rounded-lg p-5 shadow-sm space-y-4">
                <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">Infrastructure Analytics</h4>
                <div className="space-y-3 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Student Cohorts:</span>
                    <span>12 Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Total Course Lessons:</span>
                    <span>184 published</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Streaming Playback SLA:</span>
                    <span className="text-green-600 font-bold">99.98% Healthy</span>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-neutral-200 rounded-lg p-5 shadow-sm space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">Video Rendering Queue</h4>
                <div className="bg-neutral-50 border border-neutral-200 rounded p-4 text-xs font-mono text-slate-500 space-y-2">
                  <div className="flex justify-between items-center text-slate-800">
                    <span className="font-bold">NextJs_Tutorial_Lesson_12.mp4</span>
                    <span className="text-[9.5px] uppercase font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">Rendering (82%)</span>
                  </div>
                  <div className="w-full bg-neutral-200 rounded-full h-1 overflow-hidden">
                    <div className="bg-blue-700 h-1" style={{ width: "82%" }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "client-stripe" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-2">
              <h3 className="text-base font-mono text-slate-900 font-semibold flex items-center gap-2">
                <Layers className="size-4.5 text-blue-700" />
                Stripe Membership Subscription Hub
              </h3>
              <p className="text-xs text-slate-550 font-inter">Audit active customer subscriptions, churn percentages, and payment intents.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="bg-white border border-neutral-200 rounded-lg p-5 shadow-sm space-y-1.5">
                <span className="text-[9px] font-mono uppercase text-slate-500">Monthly Membership MRR</span>
                <div className="text-2xl font-mono font-bold text-slate-900">$18,450</div>
                <span className="text-[9.5px] font-mono text-green-705 block">+14.2% increase</span>
              </div>
              <div className="bg-white border border-neutral-200 rounded-lg p-5 shadow-sm space-y-1.5">
                <span className="text-[9px] font-mono uppercase text-slate-500">Active Subscribers</span>
                <div className="text-2xl font-mono font-bold text-slate-900">412 Users</div>
                <span className="text-[9.5px] font-mono text-slate-500 block">Churn rate: 1.2%</span>
              </div>
              <div className="bg-white border border-neutral-200 rounded-lg p-5 shadow-sm space-y-1.5">
                <span className="text-[9px] font-mono uppercase text-slate-500">Failed Invoices</span>
                <div className="text-2xl font-mono font-bold text-red-650">0 Users</div>
                <span className="text-[9.5px] font-mono text-green-700 block font-bold">All accounts synced</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === "client-mux" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-2">
              <h3 className="text-base font-mono text-slate-900 font-semibold flex items-center gap-2">
                <TrendingUp className="size-4.5 text-blue-700" />
                Mux CDN Stream Manager
              </h3>
              <p className="text-xs text-slate-550 font-inter">Configure secure playback, custom transcoder workers, and playback analytics.</p>
            </div>
            <div className="bg-white border border-neutral-200 rounded-lg p-5 shadow-sm space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">Active Transcoding Workers</h4>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between border-b border-neutral-100 pb-2">
                  <span>transcoder-worker-01:</span>
                  <span className="text-green-600 font-bold">Idle / Ready</span>
                </div>
                <div className="flex justify-between border-b border-neutral-100 pb-2">
                  <span>transcoder-worker-02:</span>
                  <span className="text-blue-700 font-bold">Transcoding nextjs_tutorial_12 (120 fps)</span>
                </div>
                <div className="flex justify-between">
                  <span>CDN Cache Hit Rate:</span>
                  <span className="font-bold">98.92% (Cloudflare edge)</span>
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
