"use client";

import React, { useState } from "react";
import { useDashboard } from "@/components/Dashboard/DashboardContext";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter
} from "@/components/ui/sheet";
import {
  Trello,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
  Layers,
  Sparkles,
  Filter,
  ArrowRight,
  ShieldAlert
} from "lucide-react";

const PlanItTab = () => {
  const {
    activeClient,
    role,
    kanbanTasks,
    addKanbanTask,
    updateTaskStatus,
    deleteKanbanTask,
    clients
  } = useDashboard();

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("medium");
  const [newTaskClientSlug, setNewTaskClientSlug] = useState(activeClient?.slug || "egostix-internal");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [activeMobileCol, setActiveMobileCol] = useState("backlog");

  // Filter tasks based on role / active client context and priority filter
  const baseTasks = role === "client" 
    ? kanbanTasks.filter((t) => t.clientSlug === activeClient?.slug)
    : kanbanTasks.filter((t) => t.clientSlug === activeClient?.slug || activeClient?.slug === "egostix-internal");

  const filteredTasks = baseTasks.filter((t) => {
    if (priorityFilter === "all") return true;
    return t.priority === priorityFilter;
  });

  const columns = [
    { id: "backlog", title: "Backlog", fullTitle: "Backlog / Inbox", icon: Clock, color: "text-amber-600 bg-amber-50 border-amber-200" },
    { id: "in-progress", title: "In Progress", fullTitle: "In Sprint Engineering", icon: Layers, color: "text-blue-600 bg-blue-50 border-blue-200" },
    { id: "in-review", title: "Review", fullTitle: "QA & Client Review", icon: AlertCircle, color: "text-purple-600 bg-purple-50 border-purple-200" },
    { id: "done", title: "Done", fullTitle: "Completed & Published", icon: CheckCircle2, color: "text-green-600 bg-green-50 border-green-200" }
  ];

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    addKanbanTask({
      title: newTaskTitle,
      description: newTaskDesc || "Requested via project planning portal.",
      priority: newTaskPriority,
      clientSlug: role === "client" ? activeClient.slug : newTaskClientSlug,
      status: "backlog"
    });

    setNewTaskTitle("");
    setNewTaskDesc("");
    setNewTaskPriority("medium");
    setIsSheetOpen(false);
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-neutral-200 p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 shadow-sm">
        <div className="space-y-1 sm:space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="p-1.5 sm:p-2 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 shrink-0">
              <Trello className="size-4 sm:size-5" />
            </span>
            <h3 className="text-lg sm:text-xl font-mono text-slate-900 font-bold">
              {role === "owner"
                ? "Pipeline Review & Agile Strategy Board"
                : role === "staff"
                ? "Engineer Board Manager & Deliverables"
                : "Project Planning & Feature Request Board"}
            </h3>
          </div>
          <p className="text-xs text-slate-600 max-w-2xl font-inter leading-relaxed">
            Track active engineering deliverables, sprint timelines, and submit backlog requests directly to Egostix dev teams.
          </p>
        </div>

        <button
          onClick={() => setIsSheetOpen(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 active:scale-[0.98] text-white font-mono font-semibold text-xs px-5 py-3 rounded-lg shadow-sm transition duration-150 min-h-[44px]"
        >
          <Plus className="size-4" />
          <span>New Feature Request</span>
        </button>
      </div>

      {/* Priority Filter Bar */}
      <div className="bg-white rounded-xl border border-neutral-200 p-3.5 sm:p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Filter className="size-4 text-slate-400 shrink-0" />
          <span className="text-xs font-mono font-bold uppercase text-slate-500 tracking-wider mr-1">
            Priority:
          </span>
          <div className="flex flex-wrap gap-1.5">
            {["all", "critical", "high", "medium", "low"].map((p) => (
              <button
                key={p}
                onClick={() => setPriorityFilter(p)}
                className={`text-[11px] font-mono capitalize px-2.5 sm:px-3 py-1.5 rounded-md border transition min-h-[36px] flex items-center ${
                  priorityFilter === p
                    ? "bg-slate-900 text-white border-slate-900 font-semibold"
                    : "bg-neutral-50 text-slate-600 border-neutral-200 hover:bg-neutral-100"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <span className="text-xs font-mono text-slate-500 self-end sm:self-auto">
          Showing <strong className="text-slate-900">{filteredTasks.length}</strong> tasks
        </span>
      </div>

      {/* Mobile Column Segment Switcher (Visible on <md screens) */}
      <div className="block md:hidden bg-neutral-100 p-1 rounded-xl border border-neutral-200">
        <div className="grid grid-cols-4 gap-1">
          {columns.map((col) => {
            const count = filteredTasks.filter((t) => t.status === col.id).length;
            const isSelected = activeMobileCol === col.id;
            return (
              <button
                key={col.id}
                onClick={() => setActiveMobileCol(col.id)}
                className={`py-2 px-1 rounded-lg text-[11px] font-mono font-bold flex flex-col sm:flex-row items-center justify-center gap-1 transition ${
                  isSelected
                    ? "bg-white text-slate-900 shadow-xs border border-neutral-200/80"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <span className="truncate">{col.title}</span>
                <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${isSelected ? "bg-blue-100 text-blue-700" : "bg-neutral-200 text-slate-600"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Slide-Over Sheet Drawer for Requesting Features */}
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md bg-white p-4 sm:p-6 overflow-y-auto space-y-6">
          <SheetHeader className="text-left space-y-2 border-b border-neutral-100 pb-4">
            <SheetTitle className="text-base font-mono font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="size-5 text-blue-700 shrink-0" />
              <span>Submit Project Deliverable</span>
            </SheetTitle>
            <SheetDescription className="text-xs text-slate-500 font-inter">
              Submit a feature specification or engineering request directly to the Egostix sprint backlog.
            </SheetDescription>
          </SheetHeader>

          <form onSubmit={handleAddTask} className="space-y-4 text-xs font-inter">
            {(role === "owner" || role === "staff") && (
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
                  Client Account Context *
                </label>
                <select
                  value={newTaskClientSlug}
                  onChange={(e) => setNewTaskClientSlug(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-xs font-mono bg-white focus:border-blue-700 focus:outline-none min-h-[44px]"
                >
                  {clients.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
                Feature / Deliverable Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Add WhatsApp Automated Order Confirmation"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-xs font-inter focus:border-blue-700 focus:outline-none min-h-[44px]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
                Technical Description & Scope
              </label>
              <textarea
                rows={4}
                placeholder="Outline requirements, user flow, or integration endpoints..."
                value={newTaskDesc}
                onChange={(e) => setNewTaskDesc(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-xs font-inter focus:border-blue-700 focus:outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
                Sprint Priority Level
              </label>
              <select
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-xs font-mono bg-white min-h-[44px]"
              >
                <option value="low">Low Priority (Maintenance)</option>
                <option value="medium">Medium Priority (Standard)</option>
                <option value="high">High Priority (Urgent)</option>
                <option value="critical">Critical (Blocker)</option>
              </select>
            </div>

            <SheetFooter className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsSheetOpen(false)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-lg text-slate-600 font-mono text-xs hover:bg-neutral-100 min-h-[44px]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 active:scale-[0.98] text-white font-mono font-semibold text-xs shadow-sm transition min-h-[44px] flex items-center justify-center"
              >
                Add to Sprint Backlog
              </button>
            </SheetFooter>
          </form>
        </SheetContent>
      </Sheet>

      {/* Kanban Board Grid (Responsive: Tab view on mobile, Multi-column on md+) */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {columns.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.status === col.id);
          const Icon = col.icon;
          const isHiddenOnMobile = activeMobileCol !== col.id;

          return (
            <div
              key={col.id}
              className={`bg-neutral-50/80 rounded-xl border border-neutral-200 p-3.5 sm:p-4 flex flex-col min-h-[400px] sm:min-h-[520px] ${
                isHiddenOnMobile ? "hidden md:flex" : "flex"
              }`}
            >
              {/* Column Header */}
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-200">
                <div className="flex items-center gap-2">
                  <span className={`p-1.5 rounded-md border ${col.color}`}>
                    <Icon className="size-4" />
                  </span>
                  <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wide">
                    <span className="hidden sm:inline">{col.fullTitle}</span>
                    <span className="sm:hidden">{col.title}</span>
                  </h4>
                </div>
                <span className="text-[11px] font-mono font-bold bg-white border border-neutral-200 text-slate-700 rounded-full px-2.5 py-0.5 shadow-2xs">
                  {colTasks.length}
                </span>
              </div>

              {/* Task Cards */}
              <div className="flex-1 space-y-3">
                {colTasks.length === 0 ? (
                  <div className="border border-dashed border-neutral-300 rounded-xl p-8 text-center text-slate-400 text-xs font-mono flex flex-col items-center justify-center space-y-2">
                    <Trello className="size-6 text-slate-300" />
                    <p>No items in {col.title.toLowerCase()}</p>
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <div
                      key={task.id}
                      className="bg-white rounded-xl border border-neutral-200 p-3.5 sm:p-4 shadow-xs space-y-2.5 sm:space-y-3 hover:border-blue-300 hover:shadow-sm transition-all duration-150 group"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h5 className="text-xs font-semibold text-slate-900 font-inter leading-snug">
                          {task.title}
                        </h5>
                        <span
                          className={`text-[9px] font-mono uppercase font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                            task.priority === "critical"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : task.priority === "high"
                              ? "bg-amber-50 text-amber-700 border-amber-200"
                              : "bg-blue-50 text-blue-700 border-blue-200"
                          }`}
                        >
                          {task.priority}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-600 font-inter leading-relaxed line-clamp-3 sm:line-clamp-2">
                        {task.description}
                      </p>

                      <div className="flex items-center justify-between pt-2.5 border-t border-neutral-100 text-[10px] font-mono text-slate-500">
                        <span className="truncate max-w-[100px] sm:max-w-[120px]">
                          Client: {task.clientSlug}
                        </span>
                        <div className="flex items-center gap-1.5">
                          {(role === "owner" || role === "staff") && (
                            <select
                              value={task.status}
                              onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                              className="text-[10px] font-mono bg-neutral-100 border border-neutral-200 rounded px-1.5 py-1 text-slate-700 font-semibold cursor-pointer hover:bg-neutral-200 transition min-h-[32px]"
                            >
                              <option value="backlog">Backlog</option>
                              <option value="in-progress">In Progress</option>
                              <option value="in-review">In Review</option>
                              <option value="done">Done</option>
                            </select>
                          )}
                          <button
                            onClick={() => deleteKanbanTask(task.id)}
                            className="text-slate-400 hover:text-red-600 p-1.5 rounded hover:bg-red-50 transition min-h-[32px] min-w-[32px] flex items-center justify-center"
                            title="Delete task"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PlanItTab;
