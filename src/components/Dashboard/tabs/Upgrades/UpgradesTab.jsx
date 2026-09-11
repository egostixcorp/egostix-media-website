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
    name: "AI Business Website & SEO Pipeline",
    category: "Marketing & Lead Engine",
    icon: Shield,
    badge: "99.9% SLA",
    color: "text-blue-700 bg-blue-50 border-blue-100",
    description: "High-performance dynamic site with built-in Google Search Console indexing, automated sitemaps, and AI lead chat concierges."
  },
  {
    id: "pulse-erp",
    name: "AI Internal Tools (PulseOps ERP)",
    category: "Operations & Logistics",
    icon: Database,
    badge: "PostgreSQL Cloud",
    color: "text-purple-700 bg-purple-50 border-purple-100",
    description: "Custom internal ERP dashboard with real-time stock control, PostgreSQL Aurora database ops, and fleet GPS routing."
  },
  {
    id: "whatsapp-bot",
    name: "WhatsApp Automated Business Concierge",
    category: "Workflow Automation",
    icon: MessageSquare,
    badge: "Meta Cloud API",
    color: "text-emerald-700 bg-emerald-50 border-emerald-100",
    description: "Automated WhatsApp messaging triggers, instant AI customer qualification, and CRM lead sync."
  },
  {
    id: "mux-stripe",
    name: "Creator Infrastructure & Mux Video CDN",
    category: "Media Streaming & Monetization",
    icon: Video,
    badge: "4K Edge CDN",
    color: "text-amber-700 bg-amber-50 border-amber-100",
    description: "Stripe Connect membership subscription billing paired with Mux adaptive video streaming CDN nodes."
  },
  {
    id: "ehr-medical",
    name: "EHR Medical Database Synchronization",
    category: "Healthcare Infrastructure",
    icon: Activity,
    badge: "HIPAA Compliant",
    color: "text-rose-700 bg-rose-50 border-rose-100",
    description: "Secure HIPAA-compliant real-time patient appointment booking and medical record synchronization."
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
      <div className="bg-white rounded-xl border border-neutral-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-blue-50 border border-blue-100 text-blue-700">
              <Layers className="size-5" />
            </span>
            <h3 className="text-xl font-mono text-slate-900 font-bold">
              {role === "owner" ? "Service Requests & Infrastructure Upgrades" : "Request System Upgrade / New Module"}
            </h3>
          </div>
          <p className="text-xs text-slate-600 max-w-2xl font-inter leading-relaxed">
            Expand your digital infrastructure by provisioning custom AI internal tools, automated workflows, or dedicated video streaming nodes.
          </p>
        </div>
      </div>

      {/* Available Infrastructure Catalog Grid */}
      <div className="space-y-4">
        <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
          Available Infrastructure Service Catalog
        </h4>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {availableModules.map((module) => {
            const Icon = module.icon;

            return (
              <div
                key={module.id}
                className="bg-white rounded-xl border border-neutral-200 p-6 shadow-xs flex flex-col justify-between space-y-4 hover:border-blue-300 hover:shadow-sm transition duration-150"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <span className={`p-2 rounded-lg border ${module.color}`}>
                      <Icon className="size-5" />
                    </span>
                    <span className="text-[9px] font-mono font-bold bg-neutral-100 border border-neutral-200 text-slate-700 rounded-full px-2.5 py-0.5">
                      {module.badge}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-semibold">
                      {module.category}
                    </span>
                    <h5 className="text-sm font-mono font-bold text-slate-900 leading-snug mt-0.5">
                      {module.name}
                    </h5>
                  </div>

                  <p className="text-xs text-slate-600 font-inter leading-relaxed">
                    {module.description}
                  </p>
                </div>

                <button
                  onClick={() => handleOpenSheet(module)}
                  className="w-full py-2.5 px-4 rounded-lg bg-slate-900 hover:bg-blue-700 active:scale-[0.98] text-white font-mono font-semibold text-xs transition duration-150 flex items-center justify-center gap-2 min-h-[44px]"
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
        <SheetContent side="right" className="w-full sm:max-w-md bg-white p-6 overflow-y-auto space-y-6">
          {activeModuleForSheet && (
            <>
              <SheetHeader className="text-left space-y-2 border-b border-neutral-100 pb-4">
                <div className="flex items-center gap-2">
                  <span className={`p-1.5 rounded border ${activeModuleForSheet.color}`}>
                    <Sparkles className="size-4" />
                  </span>
                  <SheetTitle className="text-base font-mono font-bold text-slate-900">
                    Provision Infrastructure Request
                  </SheetTitle>
                </div>
                <SheetDescription className="text-xs text-slate-500 font-inter">
                  Target Module: <strong className="text-slate-900">{activeModuleForSheet.name}</strong>
                </SheetDescription>
              </SheetHeader>

              <form onSubmit={handleRequestSubmit} className="space-y-4 text-xs font-inter">
                <div className="bg-neutral-50 rounded-lg border border-neutral-200 p-4 space-y-1.5">
                  <span className="text-[10px] font-mono uppercase text-slate-400 font-bold">Module Summary</span>
                  <p className="text-xs font-medium text-slate-700">{activeModuleForSheet.description}</p>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
                    Target Deployment SLA Tier
                  </label>
                  <select
                    value={slaTier}
                    onChange={(e) => setSlaTier(e.target.value)}
                    className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-xs font-mono bg-white focus:border-blue-700 focus:outline-none min-h-[44px]"
                  >
                    <option value="Standard (48h Deployment)">Standard Tier (48h Deployment)</option>
                    <option value="Priority (24h Express)">Priority Tier (24h Express Deploy)</option>
                    <option value="Custom Cluster (Dedicated)">Custom Dedicated Cluster</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
                    Business Requirements & Technical Scope *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Describe operational workflow bottlenecks or desired custom integrations..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-xs font-inter focus:border-blue-700 focus:outline-none"
                  />
                </div>

                <SheetFooter className="pt-4 border-t border-neutral-100 flex flex-row justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveModuleForSheet(null)}
                    className="px-4 py-2.5 rounded-lg text-slate-600 font-mono text-xs hover:bg-neutral-100 min-h-[44px]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 active:scale-[0.98] text-white font-mono font-semibold text-xs shadow-sm transition min-h-[44px]"
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
        <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
          Active Upgrade Tickets ({clientUpgrades.length})
        </h4>

        {clientUpgrades.length === 0 ? (
          <div className="bg-white rounded-xl border border-neutral-200 p-8 text-center text-slate-400 font-mono text-xs shadow-xs">
            No upgrade requests recorded. Select a module above to submit a provisioning ticket.
          </div>
        ) : (
          <div className="space-y-3">
            {clientUpgrades.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-neutral-200 p-5 shadow-xs space-y-3 hover:border-neutral-300 transition"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h5 className="text-sm font-mono font-bold text-slate-900">
                      {item.serviceName}
                    </h5>
                    <span className="text-[10px] font-mono text-slate-500">
                      Requested by: {item.clientSlug}
                    </span>
                  </div>
                  <span
                    className={`text-[9px] font-mono uppercase font-bold px-2.5 py-1 rounded-full border ${
                      item.status === "Approved" || item.status === "Active"
                        ? "bg-green-100 text-green-700 border-green-200"
                        : "bg-amber-100 text-amber-700 border-amber-200"
                    }`}
                  >
                    {item.status || "In Assessment"}
                  </span>
                </div>

                <p className="text-xs text-slate-600 font-inter leading-relaxed">
                  {item.description}
                </p>

                <div className="pt-2 border-t border-neutral-100 flex items-center justify-between text-[10px] font-mono text-slate-400">
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
