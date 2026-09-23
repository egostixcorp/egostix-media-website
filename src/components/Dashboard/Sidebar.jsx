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
  LogOut,
  User,
  FileCode,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const serviceNavMap = {
  "AI-Powered Business Website": { id: "service-websites", route: "/dashboard/service-websites", label: "AI Business Websites", icon: Shield },
  "SEO Pipeline": { id: "service-websites", route: "/dashboard/service-websites", label: "AI Business Websites", icon: Shield },
  "CRM Sync (HubSpot)": { id: "service-websites", route: "/dashboard/service-websites", label: "AI Business Websites", icon: Shield },

  "AI Internal Tools (PulseOps ERP)": { id: "service-tools", route: "/dashboard/service-tools", label: "AI Internal Tools", icon: Layers },
  "Database Ops (PostgreSQL)": { id: "service-tools", route: "/dashboard/service-tools", label: "AI Internal Tools", icon: Layers },
  "GPS Fleet Analytics Routing": { id: "service-tools", route: "/dashboard/service-tools", label: "AI Internal Tools", icon: Layers },

  "AI Workflow Automation": { id: "service-automation", route: "/dashboard/service-automation", label: "Workflow Automation", icon: TrendingUp },
  "WhatsApp API Integration": { id: "service-automation", route: "/dashboard/service-automation", label: "Workflow Automation", icon: TrendingUp },
  "EHR Database Synchronization": { id: "service-automation", route: "/dashboard/service-automation", label: "Workflow Automation", icon: TrendingUp },

  "Creator Infrastructure": { id: "service-creator", route: "/dashboard/service-creator", label: "Creator Infrastructure", icon: Briefcase },
  "Stripe Membership Billing": { id: "service-creator", route: "/dashboard/service-creator", label: "Creator Infrastructure", icon: Briefcase },
  "Mux Video Streaming CDN": { id: "service-creator", route: "/dashboard/service-creator", label: "Creator Infrastructure", icon: Briefcase }
};

const Sidebar = ({ isOpen = false, onClose }) => {
  const pathname = usePathname();
  const {
    role,
    activeTab,
    setActiveTab,
    clients,
    selectedClientSlug,
    setSelectedClientSlug,
    activeClient,
    logout,
    currentUser,
  } = useDashboard();

  // Base client navigation items
  const baseClientNav = [
    { id: "analysis", route: "/dashboard/analysis", label: "Analysis Overview", icon: LayoutDashboard },
    { id: "plan-it", route: "/dashboard/plan-it", label: "Plan it", icon: Trello },
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
          route: moduleConf.route,
          label: moduleConf.label,
          icon: moduleConf.icon,
        });
      }
    });
  }

  const trailingClientNav = [
    { id: "leads", route: "/dashboard/leads", label: "Captured Leads", icon: Inbox },
    { id: "files", route: "/dashboard/files", label: "Shared Files", icon: FileText },
    { id: "upgrades", route: "/dashboard/upgrades", label: "Request Upgrades", icon: Layers },
    { id: "profile", route: "/dashboard/profile", label: "Profile Settings", icon: User },
  ];

  const clientNav = [...baseClientNav, ...customModuleNav, ...trailingClientNav];

  const staffNav = [
    { id: "analysis", route: "/dashboard/analysis", label: "System Analysis", icon: LayoutDashboard },
    { id: "plan-it", route: "/dashboard/plan-it", label: "Plan it (Board)", icon: Trello },
    { id: "files", route: "/dashboard/files", label: "Client Files Sync", icon: FileText },
    { id: "publish-case-study", route: "/dashboard/publish-case-study", label: "Publish Case Study", icon: FileCode },
    { id: "profile", route: "/dashboard/profile", label: "Profile Settings", icon: User },
    { id: "settings", route: "/dashboard/settings", label: "System ", icon: Settings },
  ];

  const ownerNav = [
    { id: "analysis", route: "/dashboard/analysis", label: "Admin Analysis", icon: LayoutDashboard },
    { id: "plan-it", route: "/dashboard/plan-it", label: "Plan it (Pipeline)", icon: Trello },
    { id: "clients", route: "/dashboard/clients", label: "Clients Directory", icon: Users },
    { id: "upgrades", route: "/dashboard/upgrades", label: "Service Requests", icon: Layers },
    { id: "leads", route: "/dashboard/leads", label: "Global Lead Hub", icon: Inbox },
    { id: "publish-case-study", route: "/dashboard/publish-case-study", label: "Publish Case Study", icon: FileCode },
    { id: "client-settings", route: "/dashboard/client-settings", label: "Client Profile Manager", icon: Users },
    { id: "profile", route: "/dashboard/profile", label: "Profile Settings", icon: User },
    { id: "settings", route: "/dashboard/settings", label: "System ", icon: Settings },
  ];

  const activeNav =
    role === "client" ? clientNav : role === "staff" ? staffNav : ownerNav;

  const displayEmail = currentUser?.email || "User Account";

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Mobile Dark Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden transition-opacity duration-200"
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar Drawer Container */}
      <aside
        className={`w-64 border-r border-neutral-200 bg-white flex flex-col h-screen fixed left-0 top-0 z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand Header with Mobile Close Button */}
        <div className="h-16 border-b border-neutral-200 flex items-center px-5 gap-3 justify-between bg-neutral-50/50">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2 overflow-hidden h-12 w-28"
          >
            <Image
              src="/egostix-media-trans.png"
              alt="Egostix Logo"
              width={500}
              height={56}
              className="object-fill"
            />
          </Link>

          <div className="flex items-center gap-2">
            <span className="text-[9px] font-mono font-bold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded uppercase tracking-wider">
              v1.2
            </span>
            {/* Close Button on Mobile */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-neutral-200 lg:hidden transition min-h-[36px] min-w-[36px] flex items-center justify-center"
              aria-label="Close Sidebar"
            >
              <span className="font-mono text-sm font-bold">✕</span>
            </button>
          </div>
        </div>

        {/* Context Client Selector (Visible when client tenants exist) */}
        {(role === "owner" || role === "staff") && clients.length > 0 && (
          <div className="p-4 border-b border-neutral-100 bg-neutral-50/40 space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-[10px] font-mono font-bold uppercase text-slate-500 tracking-wider">
                Active Client Context
              </label>
              {activeClient?.activeServices && (
                <span className="text-[9px] font-mono font-bold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.2 rounded">
                  {activeClient.activeServices.length} Modules
                </span>
              )}
            </div>
            <div className="relative">
              <select
                value={selectedClientSlug}
                onChange={(e) => setSelectedClientSlug(e.target.value)}
                className="w-full appearance-none rounded-lg border border-neutral-300 bg-white px-3 py-2 text-xs font-inter font-semibold text-slate-900 focus:border-blue-700 focus:outline-none pr-8 cursor-pointer shadow-xs hover:border-neutral-400 transition min-h-[40px]"
              >
                {clients.map((c) => (
                  <option key={c.slug} value={c.slug}>
                    {c.slug === "egostix-internal" ? "Egostix Media (Internal Agency)" : c.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-3 size-3.5 text-slate-500 pointer-events-none" />
            </div>
          </div>
        )}

        {/* Client view displaying active profile context */}
        {role === "client" && activeClient && (
          <div className="p-4 border-b border-neutral-100 flex items-center gap-3">
            <div className="size-9 rounded-xl bg-blue-50 border border-blue-200 overflow-hidden flex items-center justify-center font-mono font-bold text-xs text-blue-700 shadow-xs shrink-0">
              {activeClient.shortName ? activeClient.shortName.slice(0, 2).toUpperCase() : "CL"}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold font-mono text-slate-900 truncate">
                {activeClient.name}
              </h4>
              <p className="text-[10px] text-slate-500 font-mono">Client Portal ({activeClient.activeServices?.length || 0} Modules)</p>
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
            const isActive = pathname === item.route || (pathname === "/dashboard" && item.id === "analysis");

            return (
              <Link
                key={item.id}
                href={item.route}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-medium font-inter transition-all duration-150 min-h-[44px] ${
                  isActive
                    ? "bg-blue-50 text-blue-700 font-semibold border-l-2 border-blue-700 pl-2.5"
                    : "text-slate-700 hover:bg-neutral-100 hover:text-slate-900"
                }`}
              >
                <Icon
                  className={`size-4 ${isActive ? "text-blue-700" : "text-slate-500"}`}
                />
                {item.label}
              </Link>
            );
          })}

          {/* Service Control Commands for Staff/Owners */}
          {role !== "client" && (
            <div className="pt-4 border-t border-neutral-100 mt-4 space-y-1">
              <p className="px-3 text-[9px] font-mono font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Service Control Commands
              </p>
              {[
                { id: "service-websites", route: "/dashboard/service-websites", label: "AI Business Websites", icon: Shield },
                { id: "service-tools", route: "/dashboard/service-tools", label: "AI Internal Tools", icon: Layers },
                { id: "service-creator", route: "/dashboard/service-creator", label: "Creator Infrastructure", icon: Briefcase },
                { id: "service-automation", route: "/dashboard/service-automation", label: "Workflow Automation", icon: TrendingUp }
              ].filter((moduleConf) => {
                if (!activeClient || !activeClient.activeServices) return false;
                return activeClient.activeServices.some((serviceName) => {
                  const mapConf = serviceNavMap[serviceName];
                  return mapConf && mapConf.id === moduleConf.id;
                });
              }).map((moduleConf) => {
                const Icon = moduleConf.icon;
                const isActive = pathname === moduleConf.route;

                return (
                  <Link
                    key={moduleConf.id}
                    href={moduleConf.route}
                    onClick={() => handleNavClick(moduleConf.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded text-xs font-medium font-inter transition-all duration-150 min-h-[44px] ${
                      isActive
                        ? "bg-blue-50 text-blue-700 font-semibold border-l-2 border-blue-700 pl-2.5"
                        : "text-slate-700 hover:bg-neutral-100 hover:text-slate-900"
                    }`}
                  >
                    <Icon
                      className={`size-4 ${isActive ? "text-blue-700" : "text-slate-500"}`}
                    />
                    {moduleConf.label}
                  </Link>
                );
              })}
            </div>
          )}
        </nav>

        {/* Footer Info: Real Authenticated User Credentials + Settings Icon */}
        <div className="p-4 border-t border-neutral-200 bg-neutral-50/50 flex flex-col gap-2">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center font-mono font-bold text-xs text-blue-700 uppercase shrink-0">
              {displayEmail.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-mono font-bold text-slate-900 truncate leading-tight">
                {displayEmail}
              </p>
              <span className="inline-block text-[9px] font-mono font-semibold uppercase text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.2 rounded mt-0.5">
                {role.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 mt-1">
            <Link
              href="/dashboard/profile"
              onClick={onClose}
              className="p-2 rounded border border-neutral-200 bg-white hover:bg-blue-50 hover:border-blue-200 text-slate-700 hover:text-blue-700 transition min-h-[40px] min-w-[40px] flex items-center justify-center"
              title="Profile & Account Settings"
            >
              <Settings className="size-3.5" />
            </Link>
            <button
              onClick={logout}
              className="flex-1 py-2 px-3 rounded border border-neutral-200 bg-white hover:bg-red-50 hover:border-red-200 hover:text-red-700 text-slate-700 font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition min-h-[40px]"
            >
              <LogOut className="size-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
