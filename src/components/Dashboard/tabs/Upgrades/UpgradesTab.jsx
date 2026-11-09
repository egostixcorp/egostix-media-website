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
  Layers,
  Sparkles,
  Shield,
  Database,
  MessageSquare,
  Video,
  Activity,
  CheckCircle2,
  Clock,
  ArrowRight,
  ChevronRight
} from "lucide-react";

const availableModules = [
  {
    id: "ai-website",
    name: "AI Business Website & Growth Engine",
    category: "Marketing & Lead Engine",
    icon: Shield,
    badge: "99.9% SLA",
    color: "text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 border-blue-100 dark:border-blue-900/50",
    description: "High-performance dynamic site with built-in Google Search Console indexing, automated sitemaps, and custom AI lead chat concierges."
  },
  {
    id: "pulse-erp",
    name: "Custom AI Internal Tools & ERP Platform",
    category: "Operations & Logistics",
    icon: Database,
    badge: "Scalable Cloud Architecture",
    color: "text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/50 border-purple-100 dark:border-purple-900/50",
    description: "Custom internal ERP and operations dashboard with real-time stock control, high-availability database ops, and fleet logistics routing."
  },
  {
    id: "whatsapp-bot",
    name: "Omnichannel AI Messaging Concierge",
    category: "Workflow Automation",
    icon: MessageSquare,
    badge: "Multi-Platform API",
    color: "text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-900/50",
    description: "Automated messaging triggers across WhatsApp, Telegram, SMS, or custom webhooks with instant AI customer qualification and CRM sync."
  },
  {
    id: "mux-stripe",
    name: "Creator Infrastructure & Video Streaming CDN",
    category: "Media Streaming & Monetization",
    icon: Video,
    badge: "Adaptive Streaming CDN",
    color: "text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 border-amber-100 dark:border-amber-900/50",
    description: "Custom membership subscription billing gateway paired with adaptive video streaming CDN architecture and member portals."
  },
  {
    id: "ehr-medical",
    name: "Enterprise Database & System Synchronization",
    category: "Enterprise Infrastructure",
    icon: Activity,
    badge: "Enterprise Security",
    color: "text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 border-rose-100 dark:border-rose-900/50",
    description: "Secure real-time bidirectional synchronization between web endpoints and internal databases, CRM, EHR, ERP, or legacy systems."
  }
];

const UpgradesTab = () => {
  const { activeClient, role, serviceUpgrades, requestUpgrade } = useDashboard();
  const [activeModuleForSheet, setActiveModuleForSheet] = useState(null);
  const [description, setDescription] = useState("");
  const [slaTier, setSlaTier] = useState("Standard (48h Deployment)");

  const clientUpgrades = role === "client"
    ? serviceUpgrades.filter((u) => u.clientSlug === activeClient?.slug)
    : serviceUpgrades;

  const handleOpenSheet = (module) => {
    setActiveModuleForSheet(module);
    setDescription("");
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    if (!description.trim() || !activeModuleForSheet) return;

    requestUpgrade(activeModuleForSheet.name, `${description} [SLA: ${slaTier}]`);
    setActiveModuleForSheet(null);
    setDescription("");
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Context Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-neutral-200 dark:border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/50 text-blue-700 dark:text-blue-400">
              <Layers className="size-5" />
            </span>
            <h3 className="text-xl font-mono text-slate-900 dark:text-slate-100 font-bold">
              {role === "owner" ? "Service Requests & Infrastructure Upgrades" : "Request System Upgrade / New Module"}
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl font-inter leading-relaxed">
            Expand your digital infrastructure by provisioning custom AI internal tools, automated workflows, or dedicated video streaming nodes.
          </p>
        </div>
      </div>

      {/* Available Infrastructure Catalog Grid */}
      <div className="space-y-4">
        <h4 className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
          Available Infrastructure Service Catalog
        </h4>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {availableModules.map((module) => {
            const Icon = module.icon;

            return (
              <div
                key={module.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-neutral-200 dark:border-slate-800 p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-blue-300 dark:hover:border-blue-600/60 hover:shadow-sm transition duration-150"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <span className={`p-2 rounded-lg border ${module.color}`}>
                      <Icon className="size-5" />
                    </span>
                    <span className="text-[9px] font-mono font-bold bg-neutral-100 dark:bg-slate-800 border border-neutral-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-full px-2.5 py-0.5">
                      {module.badge}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase font-semibold">
                      {module.category}
                    </span>
                    <h5 className="text-sm font-mono font-bold text-slate-900 dark:text-slate-100 leading-snug mt-0.5">
                      {module.name}
                    </h5>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 font-inter leading-relaxed">
                    {module.description}
                  </p>
                </div>

                <button
                  onClick={() => handleOpenSheet(module)}
                  className="w-full py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 active:scale-[0.98] text-white font-mono font-semibold text-xs transition duration-150 flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <span>Provision Module</span>
                  <ChevronRight className="size-4" />
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Slide-Over Sheet Component for Provisioning Module */}
      <Sheet open={!!activeModuleForSheet} onOpenChange={(open) => !open && setActiveModuleForSheet(null)}>
        <SheetContent side="right" className="w-full sm:max-w-md bg-white dark:bg-slate-900 border-l border-neutral-200 dark:border-slate-800 p-6 overflow-y-auto space-y-6">
          {activeModuleForSheet && (
            <>
              <SheetHeader className="text-left space-y-2 border-b border-neutral-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <span className={`p-1.5 rounded border ${activeModuleForSheet.color}`}>
                    <Sparkles className="size-4" />
                  </span>
                  <SheetTitle className="text-base font-mono font-bold text-slate-900 dark:text-slate-100">
                    Provision Infrastructure Request
                  </SheetTitle>
                </div>
                <SheetDescription className="text-xs text-slate-500 dark:text-slate-400 font-inter">
                  Target Module: <strong className="text-slate-900 dark:text-slate-100">{activeModuleForSheet.name}</strong>
                </SheetDescription>
              </SheetHeader>

              <form onSubmit={handleRequestSubmit} className="space-y-4 text-xs font-inter">
                <div className="bg-neutral-50 dark:bg-slate-800/80 rounded-lg border border-neutral-200 dark:border-slate-700 p-4 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-slate-400 dark:text-slate-500 font-bold">Module Summary</span>
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300">{activeModuleForSheet.description}</p>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono uppercase text-slate-700 dark:text-slate-300 font-bold">
                    Target Deployment SLA Tier
                  </label>
                  <select
                    value={slaTier}
                    onChange={(e) => setSlaTier(e.target.value)}
                    className="w-full rounded-lg border border-neutral-300 dark:border-slate-700 px-3 py-2.5 text-xs font-mono bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:border-blue-700 dark:focus:border-blue-500 focus:outline-none min-h-[44px]"
                  >
                    <option value="Standard (48h Deployment)">Standard Tier (48h Deployment)</option>
                    <option value="Priority (24h Express)">Priority Tier (24h Express Deploy)</option>
                    <option value="Custom Cluster (Dedicated)">Custom Dedicated Cluster</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono uppercase text-slate-700 dark:text-slate-300 font-bold">
                    Business Requirements & Technical Scope *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Describe operational workflow bottlenecks or desired custom integrations..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-lg border border-neutral-300 dark:border-slate-700 px-3 py-2.5 text-xs font-inter bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:border-blue-700 dark:focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <SheetFooter className="pt-4 border-t border-neutral-100 dark:border-slate-800 flex flex-row justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveModuleForSheet(null)}
                    className="px-4 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 font-mono text-xs hover:bg-neutral-100 dark:hover:bg-slate-800 min-h-[44px]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 active:scale-[0.98] text-white font-mono font-semibold text-xs shadow-sm transition min-h-[44px]"
                  >
                    Submit Provisioning Ticket
                  </button>
                </SheetFooter>
              </form>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Active Upgrade Requests Section */}
      <div className="space-y-4">
        <h4 className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
          Active Upgrade Tickets ({clientUpgrades.length})
        </h4>

        {clientUpgrades.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-neutral-200 dark:border-slate-800 p-8 text-center text-slate-400 dark:text-slate-500 font-mono text-xs shadow-xs">
            No upgrade requests recorded. Select a module above to submit a provisioning ticket.
          </div>
        ) : (
          <div className="space-y-3">
            {clientUpgrades.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-slate-900 rounded-xl border border-neutral-200 dark:border-slate-800 p-5 shadow-xs space-y-3 hover:border-neutral-300 dark:hover:border-slate-700 transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="text-sm font-mono font-bold text-slate-900 dark:text-slate-100">
                      {item.serviceName}
                    </h5>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                      Requested by: {item.clientSlug}
                    </span>
                  </div>
                  <span
                    className={`text-[9px] font-mono uppercase font-bold px-2.5 py-1 rounded-full border ${
                      item.status === "Approved" || item.status === "Active"
                        ? "bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300 border-green-200 dark:border-green-900/50"
                        : "bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-900/50"
                    }`}
                  >
                    {item.status || "In Assessment"}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 font-inter leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-2 border-t border-neutral-100 dark:border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500">
                  <span>Submitted: {item.date || "Today"}</span>
                  <span>Egostix Engineering Assessment</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UpgradesTab;
