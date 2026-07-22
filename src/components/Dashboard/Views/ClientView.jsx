"use client";

import React, { useState } from "react";
import { useDashboard } from "../DashboardContext";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
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
  Sparkles
} from "lucide-react";

const ClientView = () => {
  const {
    activeClient,
    activeTab,
    kanbanTasks,
    uploadedFiles,
    serviceUpgrades,
    leads,
    addKanbanTask,
    uploadFile,
    deleteFile,
    requestUpgrade
  } = useDashboard();

  // Local state helper for forms/drawers
  const [fileForm, setFileForm] = useState({ name: "", type: "Image Document", size: "1.2 MB" });
  const [upgradeForm, setUpgradeForm] = useState({ serviceName: "AI Internal Tool Dashboard", description: "" });
  const [selectedLead, setSelectedLead] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [searchLeadQuery, setSearchLeadQuery] = useState("");

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
          </div>
        )}

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
      </main>
    </div>
  );
};

export default ClientView;
