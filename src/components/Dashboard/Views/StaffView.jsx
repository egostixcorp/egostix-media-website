"use client";

import React, { useState, useEffect } from "react";
import { useDashboard } from "../DashboardContext";
import {
  Trello,
  FileText,
  LayoutDashboard,
  Plus,
  Trash2,
  CheckCircle2,
  FileCode,
  ArrowRight,
  User,
  Activity,
  Cpu,
  Database,
  ArrowLeft,
  Calendar,
  AlertCircle,
  Settings,
  Check,
  Sparkles,
  Shield,
  TrendingUp,
  Layers,
  Users
} from "lucide-react";

const StaffView = () => {
  const {
    activeClient,
    clients,
    activeTab,
    kanbanTasks,
    uploadedFiles,
    addKanbanTask,
    moveKanbanTask,
    deleteKanbanTask,
    uploadFile,
    deleteFile,
    updateClientDetails,
    publishProject
  } = useDashboard();

  // Kanban adder form state
  const [taskForm, setTaskForm] = useState({ title: "", description: "", priority: "medium" });
  const [newTaskClientSlug, setNewTaskClientSlug] = useState(activeClient.slug);

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

  // Group task lists by client slug or global
  const activeClientTasks = kanbanTasks.filter((t) => t.clientSlug === activeClient.slug);
  const activeClientFiles = uploadedFiles.filter((f) => f.clientSlug === activeClient.slug);

  // Submit new Kanban task
  const handleTaskSubmit = (e) => {
    e.preventDefault();
    if (!taskForm.title) return;
    addKanbanTask({
      title: taskForm.title,
      description: taskForm.description,
      priority: taskForm.priority,
      clientSlug: newTaskClientSlug
    });
    setTaskForm({ title: "", description: "", priority: "medium" });
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen">
      {/* View Header */}
      <header className="h-16 border-b border-neutral-200 bg-white flex items-center justify-between px-8 sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider">
            Media Staff Portal
          </span>
          <span className="text-slate-300">/</span>
          <h2 className="text-sm font-mono font-bold text-slate-900 flex items-center gap-2">
            Managing: {activeClient.name}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="size-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-[10px] font-mono text-slate-500 uppercase">
            Engineering Node
          </span>
        </div>
      </header>

      {/* Main View Area */}
      <main className="flex-1 p-8 overflow-y-auto max-w-7xl w-full mx-auto space-y-8">

        {/* ================= WORKSPACE MONITOR TAB ================= */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-in fade-in duration-200">
            {/* Context Summary */}
            <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-2">
              <h3 className="text-base font-mono text-slate-900 font-semibold">
                Egostix Server Node Monitoring
              </h3>
              <p className="text-xs text-slate-600 font-inter max-w-2xl">
                Supervising deployment modules and background micro-workers. Check memory allocations, database nodes throughput, and active API chat threads.
              </p>
            </div>

            {/* Performance metrics */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white rounded-lg border border-neutral-200 p-5 shadow-sm space-y-3 flex items-start gap-4">
                <div className="size-10 rounded bg-blue-50 flex items-center justify-center border border-blue-100 text-blue-700 shrink-0">
                  <Cpu className="size-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-mono uppercase text-slate-500 font-bold block">
                    Server CPU Allocation
                  </span>
                  <div className="text-xl font-mono font-bold text-slate-900">
                    24.2% / 100%
                  </div>
                  <div className="w-32 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-blue-700 h-1.5" style={{ width: "24.2%" }} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-neutral-200 p-5 shadow-sm space-y-3 flex items-start gap-4">
                <div className="size-10 rounded bg-blue-50 flex items-center justify-center border border-blue-100 text-blue-700 shrink-0">
                  <Database className="size-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-mono uppercase text-slate-500 font-bold block">
                    PostgreSQL Disk Storage
                  </span>
                  <div className="text-xl font-mono font-bold text-slate-900">
                    1.42 GB / 20 GB
                  </div>
                  <div className="w-32 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-blue-700 h-1.5" style={{ width: "7.1%" }} />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg border border-neutral-200 p-5 shadow-sm space-y-3 flex items-start gap-4">
                <div className="size-10 rounded bg-blue-50 flex items-center justify-center border border-blue-100 text-blue-700 shrink-0">
                  <Activity className="size-5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-mono uppercase text-slate-500 font-bold block">
                    Background Workers Threads
                  </span>
                  <div className="text-xl font-mono font-bold text-slate-900 font-semibold">
                    18 / 18 Alive
                  </div>
                  <p className="text-[9px] text-green-600 font-mono flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-green-500 inline-block" />
                    All nodes operational
                  </p>
                </div>
              </div>
            </div>

            {/* Clients Active list summary */}
            <div className="bg-white rounded-lg border border-neutral-200 shadow-sm p-6 space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase text-slate-800 tracking-wider">
                Workspace Client Overview
              </h4>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {clients.map((c) => {
                  const tasks = kanbanTasks.filter((t) => t.clientSlug === c.slug);
                  const files = uploadedFiles.filter((f) => f.clientSlug === c.slug);

                  return (
                    <div key={c.slug} className="border border-neutral-200 rounded p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <h5 className="font-mono text-xs font-bold text-slate-900">{c.shortName}</h5>
                        <span className="text-[8px] font-mono uppercase bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                          {c.status}
                        </span>
                      </div>
                      <div className="space-y-1 text-[10px] text-slate-500 font-mono">
                        <div>Active Tasks: {tasks.filter((t) => t.status !== "deployed").length}</div>
                        <div>Files Uploaded: {files.length}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ================= KANBAN BOARD MANAGER TAB ================= */}
        {activeTab === "kanban" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Section Header & Task Form */}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 border-b border-neutral-200 pb-6">
              <div className="space-y-1">
                <h3 className="text-lg font-mono text-slate-900 font-semibold">
                  Client Project Board Manager
                </h3>
                <p className="text-xs text-slate-600 font-inter">
                  Edit columns, move client tasks, or add new backlog items dynamically. Client portals reflect these changes immediately.
                </p>
              </div>

              {/* Task Form Creator */}
              <form onSubmit={handleTaskSubmit} className="bg-white rounded border border-neutral-200 p-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 items-end flex-1 max-w-4xl shadow-sm">
                <div className="space-y-1">
                  <label className="block text-[9px] font-mono uppercase font-bold text-slate-500">
                    Task Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Integrate analytics API..."
                    value={taskForm.title}
                    onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                    className="w-full rounded border border-neutral-300 bg-white px-2 py-1.5 text-xs text-slate-900 focus:border-blue-750 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[9px] font-mono uppercase font-bold text-slate-500">
                    Client Node
                  </label>
                  <select
                    value={newTaskClientSlug}
                    onChange={(e) => setNewTaskClientSlug(e.target.value)}
                    className="w-full rounded border border-neutral-300 bg-white px-1.5 py-1.5 text-xs text-slate-900 focus:border-blue-750 focus:outline-none font-mono"
                  >
                    {clients.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.shortName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block text-[9px] font-mono uppercase font-bold text-slate-500">
                    Priority
                  </label>
                  <select
                    value={taskForm.priority}
                    onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
                    className="w-full rounded border border-neutral-300 bg-white px-1.5 py-1.5 text-xs text-slate-900 focus:border-blue-750 focus:outline-none font-mono"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="rounded bg-blue-700 px-4 py-2 font-mono text-xs font-semibold text-white hover:bg-blue-800 transition shadow-sm flex items-center justify-center gap-1 h-9"
                >
                  <Plus className="size-3.5" />
                  Add Task
                </button>
              </form>
            </div>

            {/* Kanban Columns */}
            <div className="grid gap-6 md:grid-cols-4 items-start">
              {/* BACKLOG COLUMN */}
              <div className="bg-neutral-100 rounded-lg p-4 border border-neutral-200/50 space-y-4">
                <div className="flex justify-between items-center px-1">
                  <h4 className="text-xs font-mono font-bold uppercase text-slate-700">Backlog</h4>
                  <span className="text-[10px] font-mono bg-neutral-200 text-slate-600 rounded-full px-2 py-0.5">
                    {activeClientTasks.filter((t) => t.status === "backlog").length}
                  </span>
                </div>
                <div className="space-y-3">
                  {activeClientTasks.filter((t) => t.status === "backlog").map((task) => (
                    <div key={task.id} className="bg-white rounded border border-neutral-200 p-4 space-y-3 shadow-sm hover:border-neutral-300 transition duration-150">
                      <div className="flex justify-between items-start gap-2">
                        <h5 className="text-xs font-bold text-slate-900 leading-tight">{task.title}</h5>
                        <button
                          onClick={() => deleteKanbanTask(task.id)}
                          className="text-slate-400 hover:text-red-600 transition p-0.5"
                          title="Delete card"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-600 font-inter">{task.description}</p>
                      <div className="flex items-center justify-between border-t border-neutral-100 pt-2">
                        <span className="text-[9px] font-mono text-slate-400">Due: {task.dueDate}</span>
                        <button
                          onClick={() => moveKanbanTask(task.id, "in-progress")}
                          className="text-[9px] font-mono font-bold text-blue-700 hover:text-blue-800 flex items-center gap-0.5"
                        >
                          Start
                          <ArrowRight className="size-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* IN PROGRESS COLUMN */}
              <div className="bg-neutral-100 rounded-lg p-4 border border-neutral-200/50 space-y-4">
                <div className="flex justify-between items-center px-1">
                  <h4 className="text-xs font-mono font-bold uppercase text-slate-700">In Progress</h4>
                  <span className="text-[10px] font-mono bg-blue-100 text-blue-700 rounded-full px-2 py-0.5">
                    {activeClientTasks.filter((t) => t.status === "in-progress").length}
                  </span>
                </div>
                <div className="space-y-3">
                  {activeClientTasks.filter((t) => t.status === "in-progress").map((task) => (
                    <div key={task.id} className="bg-white rounded border border-blue-200 p-4 space-y-3 shadow-sm hover:border-neutral-300 transition duration-150">
                      <h5 className="text-xs font-bold text-slate-900 leading-tight">{task.title}</h5>
                      <p className="text-[10px] text-slate-600 font-inter">{task.description}</p>
                      <div className="flex items-center justify-between border-t border-neutral-100 pt-2">
                        <button
                          onClick={() => moveKanbanTask(task.id, "backlog")}
                          className="text-[9px] font-mono text-slate-500 hover:text-slate-700 flex items-center gap-0.5"
                        >
                          <ArrowLeft className="size-3" />
                          Decline
                        </button>
                        <button
                          onClick={() => moveKanbanTask(task.id, "review")}
                          className="text-[9px] font-mono font-bold text-blue-700 hover:text-blue-800 flex items-center gap-0.5"
                        >
                          Review
                          <ArrowRight className="size-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* REVIEW COLUMN */}
              <div className="bg-neutral-100 rounded-lg p-4 border border-neutral-200/50 space-y-4">
                <div className="flex justify-between items-center px-1">
                  <h4 className="text-xs font-mono font-bold uppercase text-slate-700">Review</h4>
                  <span className="text-[10px] font-mono bg-amber-100 text-amber-700 rounded-full px-2 py-0.5">
                    {activeClientTasks.filter((t) => t.status === "review").length}
                  </span>
                </div>
                <div className="space-y-3">
                  {activeClientTasks.filter((t) => t.status === "review").map((task) => (
                    <div key={task.id} className="bg-white rounded border border-neutral-200 p-4 space-y-3 shadow-sm hover:border-neutral-300 transition duration-150">
                      <h5 className="text-xs font-bold text-slate-900 leading-tight">{task.title}</h5>
                      <p className="text-[10px] text-slate-600 font-inter">{task.description}</p>
                      <div className="flex items-center justify-between border-t border-neutral-100 pt-2">
                        <button
                          onClick={() => moveKanbanTask(task.id, "in-progress")}
                          className="text-[9px] font-mono text-slate-500 hover:text-slate-700 flex items-center gap-0.5"
                        >
                          <ArrowLeft className="size-3" />
                          Reject
                        </button>
                        <button
                          onClick={() => moveKanbanTask(task.id, "deployed")}
                          className="text-[9px] font-mono font-bold text-green-700 hover:text-green-800 flex items-center gap-0.5"
                        >
                          Deploy
                          <CheckCircle2 className="size-3 text-green-600" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* DEPLOYED COLUMN */}
              <div className="bg-neutral-100 rounded-lg p-4 border border-neutral-200/50 space-y-4">
                <div className="flex justify-between items-center px-1">
                  <h4 className="text-xs font-mono font-bold uppercase text-slate-700">Deployed</h4>
                  <span className="text-[10px] font-mono bg-green-100 text-green-700 rounded-full px-2 py-0.5">
                    {activeClientTasks.filter((t) => t.status === "deployed").length}
                  </span>
                </div>
                <div className="space-y-3">
                  {activeClientTasks.filter((t) => t.status === "deployed").map((task) => (
                    <div key={task.id} className="bg-white rounded border border-neutral-200 p-4 space-y-3 shadow-sm opacity-85">
                      <div className="flex justify-between items-center">
                        <h5 className="text-xs font-bold text-slate-750 line-through leading-tight">{task.title}</h5>
                        <CheckCircle2 className="size-4 text-green-600 shrink-0" />
                      </div>
                      <p className="text-[10px] text-slate-500 line-through font-inter">{task.description}</p>
                      <div className="text-right">
                        <button
                          onClick={() => deleteKanbanTask(task.id)}
                          className="text-[9px] font-mono text-red-500 hover:text-red-700"
                        >
                          Archive Card
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= CLIENT FILE SYNC TAB ================= */}
        {activeTab === "files" && (
          <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-6 animate-in fade-in duration-200">
            <div className="space-y-1 border-b border-neutral-100 pb-4">
              <h3 className="text-base font-mono text-slate-900 font-semibold">
                Client Upload Sync Console
              </h3>
              <p className="text-xs text-slate-500 font-inter">
                Review, download, and verify files uploaded by the active client context.
              </p>
            </div>

            <div className="space-y-3">
              {activeClientFiles.length === 0 ? (
                <div className="text-center py-8 text-xs font-mono text-slate-400">
                  No files synchronized for this client.
                </div>
              ) : (
                activeClientFiles.map((file) => (
                  <div
                    key={file.id}
                    className="flex items-center justify-between border border-neutral-200 rounded p-4 hover:border-blue-300 transition duration-150"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="size-9 rounded bg-blue-50 flex items-center justify-center border border-blue-100 text-blue-700 shrink-0">
                        <FileCode className="size-4.5" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">{file.name}</h4>
                        <p className="text-[9px] text-slate-500 font-mono">
                          Size: {file.size} • Uploaded by {file.uploadedBy} • {file.uploadedAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                      <span className={`text-[9px] font-mono uppercase px-2.5 py-0.5 rounded-full ${
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
                ))
              )}
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
                  <div className="size-8 rounded-full bg-blue-50 border border-blue-155 flex items-center justify-center font-mono font-bold text-xs text-blue-700 uppercase">
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
                          className="w-full rounded border border-neutral-305 bg-white px-2 py-1 text-xs font-mono font-bold text-slate-900 focus:border-blue-700 focus:outline-none"
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
                          className="w-full rounded border border-neutral-305 bg-white px-2 py-1 text-xs font-mono font-bold text-slate-900 focus:border-blue-700 focus:outline-none"
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
                          className="w-full rounded border border-neutral-305 bg-white px-2 py-1 text-xs font-mono font-bold text-slate-900 focus:border-blue-700 focus:outline-none"
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
              <p className="text-xs text-slate-555 font-inter">Monitor organic search rankings, query metrics, and meta indexing statuses.</p>
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
              <p className="text-xs text-slate-555 font-inter">Monitor background sync payloads and webhook integrations.</p>
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
              <p className="text-xs text-slate-555 font-inter">Supervise regional distribution warehouse stock levels and thresholds.</p>
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
              <p className="text-xs text-slate-555 font-inter">Audit active connections, CPU index read-write metrics, and table locks.</p>
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
              <p className="text-xs text-slate-555 font-inter">Audit active vehicle dispatches and coordinate routing sequences.</p>
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
              <p className="text-xs text-slate-555 font-inter">Configure triggers that run automatically when patient checkups finish.</p>
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
              <p className="text-xs text-slate-555 font-inter">Monitor message transmission, delivery rates, and webhook triggers.</p>
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
              <p className="text-xs text-slate-555 font-inter">Audit real-time sync telemetry with the hospital electronic records server.</p>
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
              <p className="text-xs text-slate-555 font-inter">Monitor video upload queues, student cohorts, and lesson structures.</p>
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
              <p className="text-xs text-slate-555 font-inter">Audit active customer subscriptions, churn percentages, and payment intents.</p>
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
              <p className="text-xs text-slate-555 font-inter">Configure secure playback, custom transcoder workers, and playback analytics.</p>
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

export default StaffView;
