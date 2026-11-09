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
import ThemeToggle from "@/components/Dashboard/ThemeToggle";

const serviceNavMap = {
  // Websites
  "AI-Powered Business Website": { id: "service-websites", route: "/dashboard/service-websites", label: "AI Business Websites", icon: Shield },
  "SEO Pipeline": { id: "service-websites", route: "/dashboard/service-websites", label: "AI Business Websites", icon: Shield },
  "SEO Pipeline & Automated Indexing": { id: "service-websites", route: "/dashboard/service-websites", label: "AI Business Websites", icon: Shield },
  "CRM Sync (HubSpot)": { id: "service-websites", route: "/dashboard/service-websites", label: "AI Business Websites", icon: Shield },
  "CRM Synchronization & Integration": { id: "service-websites", route: "/dashboard/service-websites", label: "AI Business Websites", icon: Shield },

  // Internal Tools
  "AI Internal Tools (PulseOps ERP)": { id: "service-tools", route: "/dashboard/service-tools", label: "AI Internal Tools", icon: Layers },
  "Custom AI Internal Tools & ERP": { id: "service-tools", route: "/dashboard/service-tools", label: "AI Internal Tools", icon: Layers },
  "Database Ops (PostgreSQL)": { id: "service-tools", route: "/dashboard/service-tools", label: "AI Internal Tools", icon: Layers },
  "Database Operations & Architecture": { id: "service-tools", route: "/dashboard/service-tools", label: "AI Internal Tools", icon: Layers },
  "GPS Fleet Analytics Routing": { id: "service-tools", route: "/dashboard/service-tools", label: "AI Internal Tools", icon: Layers },
  "Fleet & Logistics Analytics Routing": { id: "service-tools", route: "/dashboard/service-tools", label: "AI Internal Tools", icon: Layers },

  // Automation
  "AI Workflow Automation": { id: "service-automation", route: "/dashboard/service-automation", label: "Workflow Automation", icon: TrendingUp },
  "AI Workflow & Task Automation": { id: "service-automation", route: "/dashboard/service-automation", label: "Workflow Automation", icon: TrendingUp },
  "WhatsApp API Integration": { id: "service-automation", route: "/dashboard/service-automation", label: "Workflow Automation", icon: TrendingUp },
  "Omnichannel Messaging & API Integration": { id: "service-automation", route: "/dashboard/service-automation", label: "Workflow Automation", icon: TrendingUp },
  "EHR Database Synchronization": { id: "service-automation", route: "/dashboard/service-automation", label: "Workflow Automation", icon: TrendingUp },
  "External System & Database Synchronization": { id: "service-automation", route: "/dashboard/service-automation", label: "Workflow Automation", icon: TrendingUp },

  // Creator
  "Creator Infrastructure": { id: "service-creator", route: "/dashboard/service-creator", label: "Creator Infrastructure", icon: Briefcase },
  "Creator & Community Infrastructure": { id: "service-creator", route: "/dashboard/service-creator", label: "Creator Infrastructure", icon: Briefcase },
  "Stripe Membership Billing": { id: "service-creator", route: "/dashboard/service-creator", label: "Creator Infrastructure", icon: Briefcase },
  "Membership & Subscription Billing Gateway": { id: "service-creator", route: "/dashboard/service-creator", label: "Creator Infrastructure", icon: Briefcase },
  "Mux Video Streaming CDN": { id: "service-creator", route: "/dashboard/service-creator", label: "Creator Infrastructure", icon: Briefcase },
  "Adaptive Video Streaming & CDN Architecture": { id: "service-creator", route: "/dashboard/service-creator", label: "Creator Infrastructure", icon: Briefcase }
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
        className={`w-64 border-r border-neutral-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col h-screen fixed left-0 top-0 z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand Header with Mobile Close Button */}
        <div className="h-16 border-b border-neutral-200 dark:border-slate-800 flex items-center px-5 gap-3 justify-between bg-neutral-50/50 dark:bg-slate-900/50">
          <Link
            href="/"
            onClick={onClose}
            className="flex items-center gap-2 overflow-hidden h-12 w-28 brightness-100 dark:brightness-110"
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
            <span className="text-[9px] font-mono font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 px-1.5 py-0.5 rounded uppercase tracking-wider">
              v1.2
            </span>
            {/* Close Button on Mobile */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-slate-800 lg:hidden transition min-h-[36px] min-w-[36px] flex items-center justify-center"
              aria-label="Close Sidebar"
            >
              <span className="font-mono text-sm font-bold">✕</span>
            </button>
          </div>
        </div>

        {/* Context Client Selector (Visible when client tenants exist) */}
        {(role === "owner" || role === "staff") && clients.length > 0 && (
          <div className="p-4 border-b border-neutral-100 dark:border-slate-800 bg-neutral-50/40 dark:bg-slate-900/40 space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-[10px] font-mono font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider">
                Active Client Context
              </label>
              {activeClient?.activeServices && (
                <span className="text-[9px] font-mono font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 px-1.5 py-0.2 rounded">
                  {activeClient.activeServices.length} Modules
                </span>
              )}
            </div>
            <div className="relative">
              <select
                value={selectedClientSlug}
                onChange={(e) => setSelectedClientSlug(e.target.value)}
                className="w-full appearance-none rounded-lg border border-neutral-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-3 py-2 text-xs font-inter font-semibold text-slate-900 dark:text-slate-100 focus:border-blue-700 dark:focus:border-blue-500 focus:outline-none pr-8 cursor-pointer shadow-xs hover:border-neutral-400 dark:hover:border-slate-600 transition min-h-[40px]"
              >
                {clients.map((c) => (
                  <option key={c.slug} value={c.slug} className="dark:bg-slate-800 dark:text-slate-100">
                    {c.slug === "egostix-internal" ? "Egostix Media (Internal Agency)" : c.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-3 size-3.5 text-slate-500 dark:text-slate-400 pointer-events-none" />
            </div>
          </div>
        )}

        {/* Client view displaying active profile context */}
        {role === "client" && activeClient && (
          <div className="p-4 border-b border-neutral-100 dark:border-slate-800 flex items-center gap-3">
            <div className="size-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 overflow-hidden flex items-center justify-center font-mono font-bold text-xs text-blue-700 dark:text-blue-300 shadow-xs shrink-0">
              {activeClient.shortName ? activeClient.shortName.slice(0, 2).toUpperCase() : "CL"}
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-xs font-bold font-mono text-slate-900 dark:text-slate-100 truncate">
                {activeClient.name}
              </h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Client Portal ({activeClient.activeServices?.length || 0} Modules)</p>
            </div>
          </div>
        )}

        {/* Scrollable Navigation Area */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <p className="px-3 text-[9px] font-mono font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
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
                    ? "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-semibold border-l-2 border-blue-700 dark:border-blue-500 pl-2.5"
                    : "text-slate-700 dark:text-slate-300 hover:bg-neutral-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                <Icon
                  className={`size-4 ${isActive ? "text-blue-700 dark:text-blue-400" : "text-slate-500 dark:text-slate-400"}`}
                />
                {item.label}
              </Link>
            );
          })}

          {/* Service Control Commands for Staff/Owners */}
          {role !== "client" && (
            <div className="pt-4 border-t border-neutral-100 dark:border-slate-800 mt-4 space-y-1">
              <p className="px-3 text-[9px] font-mono font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
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
                        ? "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-semibold border-l-2 border-blue-700 dark:border-blue-500 pl-2.5"
                        : "text-slate-700 dark:text-slate-300 hover:bg-neutral-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <Icon
                      className={`size-4 ${isActive ? "text-blue-700 dark:text-blue-400" : "text-slate-500 dark:text-slate-400"}`}
                    />
                    {moduleConf.label}
                  </Link>
                );
              })}
            </div>
          )}
        </nav>

        {/* Footer Info: Real Authenticated User Credentials + Settings Icon + Quick Theme Switcher */}
        <div className="p-4 border-t border-neutral-200 dark:border-slate-800 bg-neutral-50/50 dark:bg-slate-900/50 flex flex-col gap-2">
          <div className="flex items-center gap-2.5">
            <div className="size-8 rounded-full bg-blue-100 dark:bg-blue-950 border border-blue-200 dark:border-blue-800/80 flex items-center justify-center font-mono font-bold text-xs text-blue-700 dark:text-blue-300 uppercase shrink-0">
              {displayEmail.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 truncate leading-tight">
                {displayEmail}
              </p>
              <span className="inline-block text-[9px] font-mono font-semibold uppercase text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/80 px-1.5 py-0.2 rounded mt-0.5">
                {role.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 mt-1">
            <ThemeToggle variant="icon" />
            <Link
              href="/dashboard/profile"
              onClick={onClose}
              className="p-2 rounded-lg border border-neutral-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-blue-950/50 hover:border-blue-200 dark:hover:border-blue-800 text-slate-700 dark:text-slate-300 hover:text-blue-700 dark:hover:text-blue-400 transition min-h-[40px] min-w-[40px] flex items-center justify-center"
              title="Profile & Account Settings"
            >
              <Settings className="size-3.5" />
            </Link>
            <button
              onClick={logout}
              className="flex-1 py-2 px-3 rounded-lg border border-neutral-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-red-50 dark:hover:bg-red-950/50 hover:border-red-200 dark:hover:border-red-800 hover:text-red-700 dark:hover:text-red-400 text-slate-700 dark:text-slate-300 font-mono text-xs font-semibold flex items-center justify-center gap-1.5 transition min-h-[40px]"
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
