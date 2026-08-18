"use client";

import { useDashboard } from "@/components/Dashboard/DashboardContext";
import {
  LayoutDashboard,
  Trello,
  FileText,
  TrendingUp,
  Inbox,
  Settings,
  Shield,
  Users,
  Briefcase,
  Layers,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const serviceNavMap = {
  "AI-Powered Business Website": { id: "service-websites", label: "AI Business Websites", icon: Shield },
  "SEO Pipeline": { id: "service-websites", label: "AI Business Websites", icon: Shield },
  "CRM Sync (HubSpot)": { id: "service-websites", label: "AI Business Websites", icon: Shield },
  
  "AI Internal Tools (PulseOps ERP)": { id: "service-tools", label: "AI Internal Tools", icon: Layers },
  "Database Ops (PostgreSQL)": { id: "service-tools", label: "AI Internal Tools", icon: Layers },
  "GPS Fleet Analytics Routing": { id: "service-tools", label: "AI Internal Tools", icon: Layers },
  
  "AI Workflow Automation": { id: "service-automation", label: "Workflow Automation", icon: TrendingUp },
  "WhatsApp API Integration": { id: "service-automation", label: "Workflow Automation", icon: TrendingUp },
  "EHR Database Synchronization": { id: "service-automation", label: "Workflow Automation", icon: TrendingUp },
  
  "Creator Infrastructure": { id: "service-creator", label: "Creator Infrastructure", icon: Briefcase },
  "Stripe Membership Billing": { id: "service-creator", label: "Creator Infrastructure", icon: Briefcase },
  "Mux Video Streaming CDN": { id: "service-creator", label: "Creator Infrastructure", icon: Briefcase }
};

const Sidebar = () => {
  const {
    role,
    setRole,
    activeTab,
    setActiveTab,
    clients,
    selectedClientSlug,
    setSelectedClientSlug,
    activeClient,
    logout,
  } = useDashboard();

  // Base client navigation items
  const baseClientNav = [
    { id: "overview", label: "Analytics Overview", icon: LayoutDashboard },
    { id: "analytics", label: "Traffic Analytics", icon: TrendingUp },
  ];

  // Dynamic modules inlined based on active services
  const customModuleNav = [];
  if (activeClient && activeClient.activeServices) {
    const seenIds = new Set();
    activeClient.activeServices.forEach((serviceName) => {
      const moduleConf = serviceNavMap[serviceName];
      if (moduleConf && !seenIds.has(moduleConf.id)) {
        seenIds.add(moduleConf.id);
        customModuleNav.push({
          id: moduleConf.id,
          label: moduleConf.label,
          icon: moduleConf.icon,
        });
      }
    });
  }

  const trailingClientNav = [
    { id: "kanban", label: "Project Board", icon: Trello },
    { id: "leads", label: "Captured Leads", icon: Inbox },
    { id: "files", label: "Shared Files", icon: FileText },
    { id: "upgrades", label: "Request Upgrades", icon: Layers },
  ];

  const clientNav = [...baseClientNav, ...customModuleNav, ...trailingClientNav];

  const staffNav = [
    { id: "overview", label: "System Monitor", icon: LayoutDashboard },
    { id: "kanban", label: "Board Manager", icon: Trello },
    { id: "files", label: "Client Files Sync", icon: FileText },
    { id: "settings", label: "Publish Case Study", icon: Settings },
  ];

  const ownerNav = [
    { id: "overview", label: "Admin Operations", icon: LayoutDashboard },
    { id: "clients", label: "Clients Directory", icon: Users },
    { id: "upgrades", label: "Service Requests", icon: Layers },
    { id: "leads", label: "Global Lead Hub", icon: Inbox },
    { id: "kanban", label: "Pipeline Review", icon: Trello },
    { id: "settings", label: "Publish Case Study", icon: Settings },
    { id: "client-settings", label: "Client Profile Manager", icon: Users },
  ];

  const activeNav =
    role === "client" ? clientNav : role === "staff" ? staffNav : ownerNav;

  return (
    <aside className="w-64 border-r border-neutral-200 bg-white flex flex-col h-screen fixed left-0 top-0 z-30">
      {/* Brand Header */}
      <div className="h-16 border-b border-neutral-200 flex items-center px-6 gap-3 justify-between bg-neutral-50/50">
        <Link
          href="/"
          className="flex items-center gap-2 overflow-hidden h-12 w-28 redd"
        >
          <Image
            src="/egostix-media-trans.png"
            alt="Egostix Logo"
            width={500}
            height={56}
            className="object-fill "
          />
        </Link>
        <span className="text-[9px] font-mono font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded uppercase tracking-wider">
          v1.2
        </span>
      </div>

      {/* Role Simulator Switcher */}
      <div className="p-4 border-b border-neutral-100 bg-neutral-50/20">
        <label className="block text-[10px] font-mono font-semibold uppercase text-slate-500 tracking-wider mb-1.5">
          Simulated User Role
        </label>
        <div className="relative">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full appearance-none rounded border border-neutral-300 bg-white px-3 py-2 text-xs font-mono text-slate-900 focus:border-blue-700 focus:outline-none pr-8 cursor-pointer shadow-sm hover:border-neutral-400 transition"
          >
            <option value="client">Client (Apex / Chronos)</option>
            <option value="staff">Media Staff (Engineer)</option>
            <option value="owner">Company Owner (Admin)</option>
          </select>
          <ChevronDown className="absolute right-2.5 top-2.5 size-3.5 text-slate-500 pointer-events-none" />
        </div>
      </div>

      {/* Context Client Selector (Visible for Staff/Owners to toggle who they manage) */}
      {(role === "owner" || role === "staff") && (
        <div className="p-4 border-b border-neutral-100 bg-neutral-50/40">
          <label className="block text-[10px] font-mono font-semibold uppercase text-slate-500 tracking-wider mb-1.5">
            Active Client Context
          </label>
          <div className="relative">
            <select
              value={selectedClientSlug}
              onChange={(e) => setSelectedClientSlug(e.target.value)}
              className="w-full appearance-none rounded border border-neutral-300 bg-white px-3 py-2 text-xs font-inter font-medium text-slate-900 focus:border-blue-700 focus:outline-none pr-8 cursor-pointer shadow-sm hover:border-neutral-400 transition"
            >
              {clients.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.slug === "egostix-internal" ? "Egostix Media (Agency Internal)" : c.shortName}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-2.5 top-2.5 size-3.5 text-slate-500 pointer-events-none" />
          </div>
        </div>
      )}

      {/* Client view displaying active profile context */}
      {role === "client" && (
        <div className="p-4 border-b border-neutral-100 flex items-center gap-3">
          <div className="size-8 rounded-full bg-blue-50 border border-neutral-200 overflow-hidden flex items-center justify-center font-mono font-bold text-xs text-blue-700">
            {activeClient?.shortName.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-semibold text-slate-900 truncate">
              {activeClient?.name}
            </h4>
            <p className="text-[10px] text-slate-500 font-mono">Client View</p>
          </div>
        </div>
      )}

      {/* Scrollable Navigation Area */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        <p className="px-3 text-[9px] font-mono font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Navigation
        </p>
        {activeNav.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded text-xs font-medium font-inter transition-all duration-150 ${
                isActive
                  ? "bg-blue-50 text-blue-700 font-semibold border-l-2 border-blue-700 pl-2.5"
                  : "text-slate-700 hover:bg-neutral-100 hover:text-slate-900"
              }`}
            >
              <Icon
                className={`size-4 ${isActive ? "text-blue-700" : "text-slate-500"}`}
              />
              {item.label}
            </button>
          );
        })}

        {/* Service Control Commands for Staff/Owners */}
        {role !== "client" && (
          <div className="pt-4 border-t border-neutral-100 mt-4 space-y-1">
            <p className="px-3 text-[9px] font-mono font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Service Control Commands
            </p>
            {[
              { id: "service-websites", label: "AI Business Websites", icon: Shield },
              { id: "service-tools", label: "AI Internal Tools", icon: Layers },
              { id: "service-creator", label: "Creator Infrastructure", icon: Briefcase },
              { id: "service-automation", label: "Workflow Automation", icon: TrendingUp }
            ].filter((moduleConf) => {
              if (!activeClient || !activeClient.activeServices) return false;
              return activeClient.activeServices.some((serviceName) => {
                const mapConf = serviceNavMap[serviceName];
                return mapConf && mapConf.id === moduleConf.id;
              });
            }).map((moduleConf) => {
              const Icon = moduleConf.icon;
              const isActive = activeTab === moduleConf.id;

              return (
                <button
                  key={moduleConf.id}
                  onClick={() => setActiveTab(moduleConf.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded text-xs font-medium font-inter transition-all duration-150 ${
                    isActive
                      ? "bg-blue-50 text-blue-700 font-semibold border-l-2 border-blue-700 pl-2.5"
                      : "text-slate-700 hover:bg-neutral-100 hover:text-slate-900"
                  }`}
                >
                  <Icon
                    className={`size-4 ${isActive ? "text-blue-700" : "text-slate-500"}`}
                  />
                  {moduleConf.label}
                </button>
              );
            })}
          </div>
        )}
      </nav>

      {/* Footer Info: User Credentials */}
      <div className="p-4 border-t border-neutral-200 bg-neutral-50/50 flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <div className="size-6 rounded-full bg-slate-200 border border-neutral-300 flex items-center justify-center font-mono font-bold text-[10px] text-slate-700 uppercase">
            {role === "client" ? activeClient?.ownerName.slice(0, 2) : "EM"}
          </div>
          <div className="min-w-0 flex flex-col">
            <p className="text-[10px] font-semibold text-slate-900 truncate leading-tight">
              {role === "client"
                ? activeClient?.ownerName
                : role === "staff"
                  ? "Titas (Engineer)"
                  : "Arun & Titas (Owners)"}
            </p>
            <p className="text-[8px] text-slate-500 font-mono truncate">
              {role === "client" ? activeClient?.ownerEmail : "ops@egostix.com"}
            </p>
            <button
              onClick={logout}
              className="text-[9px] font-mono font-bold text-red-650 hover:text-red-750 hover:underline mt-1 text-left"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
