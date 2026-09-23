"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useDashboard } from "@/components/Dashboard/DashboardContext";
import {
  LayoutDashboard,
  Trello,
  Inbox,
  FileText,
  Layers,
  User,
  Users,
  FileCode,
  Settings,
  Shield,
  TrendingUp,
  Briefcase,
  Activity,
  ChevronRight,
  Menu,
  Zap
} from "lucide-react";

const routeConfig = {
  "/dashboard": {
    title: "Overview",
    category: "Operations",
    icon: LayoutDashboard,
    descriptions: {
      client: "Welcome to your client workspace. Monitor your live system performance, search visibility, and active service deliverables.",
      staff: "Engineering operations dashboard. Review real-time client systems, active sprint tickets, and telemetry logs.",
      owner: "Master executive dashboard. Monitor multi-tenant client infrastructure, conversion velocity, and agency operations."
    }
  },
  "/dashboard/analysis": {
    title: "System Analysis",
    category: "Telemetry",
    icon: Activity,
    descriptions: {
      client: "Live website traffic, keyword search performance, and visitor geographic breakdown for your domain.",
      staff: "Server response latencies, error logs, and infrastructure monitoring across client nodes.",
      owner: "Global multi-tenant analytics, aggregate visitor telemetry, and lead conversion rates."
    }
  },
  "/dashboard/plan-it": {
    title: "Plan-it Delivery Pipeline",
    category: "Delivery",
    icon: Trello,
    descriptions: {
      client: "Track upcoming features, system milestone roadmap, and deliverables in real-time.",
      staff: "Engineering sprint board. Update task progress, review pull requests, and prioritize backlog items.",
      owner: "Global production pipeline. Monitor feature velocity and delivery bottlenecks across all accounts."
    }
  },
  "/dashboard/leads": {
    title: "Captured Leads Hub",
    category: "Inbound",
    icon: Inbox,
    descriptions: {
      client: "Inbound prospect inquiries and form submissions captured directly from your web platform.",
      staff: "CRM webhook logs, automated lead scoring, and integration payload inspectors.",
      owner: "Global agency lead generation, conversion funnel health, and client acquisition pipelines."
    }
  },
  "/dashboard/files": {
    title: "Shared Files & Assets",
    category: "Repository",
    icon: FileText,
    descriptions: {
      client: "Access production design mockups, software contracts, and shared system assets.",
      staff: "Upload client deliverables, documentation assets, and technical schemas.",
      owner: "Multi-tenant file storage management, asset audit logs, and download telemetry."
    }
  },
  "/dashboard/upgrades": {
    title: "Service Upgrades & Expansion",
    category: "Services",
    icon: Layers,
    descriptions: {
      client: "Request new AI tools, CRM automations, and custom modules to expand your system capabilities.",
      staff: "Technical scoping and architectural review queue for client upgrade requests.",
      owner: "Commercial upgrade approvals, custom scope pricing, and retainer expansions."
    }
  },
  "/dashboard/profile": {
    title: "Profile & Account Settings",
    category: "Account",
    icon: User,
    descriptions: {
      client: "Manage your client account credentials, contact information, and security preferences.",
      staff: "Staff engineer account credentials, workspace preferences, and security keys.",
      owner: "Master administrator credentials, organization profile, and global preferences."
    }
  },
  "/dashboard/clients": {
    title: "Clients Directory",
    category: "Administration",
    icon: Users,
    descriptions: {
      client: "Client organization directory and account details.",
      staff: "Active client organization roster, assigned service packages, and engineering leads.",
      owner: "Master client account manager. Provision new client tenants and configure active service allocations."
    }
  },
  "/dashboard/publish-case-study": {
    title: "Case Study Publisher",
    category: "Marketing CMS",
    icon: FileCode,
    descriptions: {
      client: "Case study showcase preview console.",
      staff: "Draft and stage client case studies, upload device mockups, and configure telemetry metrics.",
      owner: "Review, publish, and manage live case studies showcased on the public /work portfolio."
    }
  },
  "/dashboard/client-settings": {
    title: "Client Profile Manager",
    category: "Administration",
    icon: Users,
    descriptions: {
      client: "Client organization configuration.",
      staff: "Configure custom domains, DNS records, and API webhook endpoints for client organizations.",
      owner: "Full client organization provisioning, credential allocation, and service tier configurations."
    }
  },
  "/dashboard/settings": {
    title: "System Settings & Integrations",
    category: "System",
    icon: Settings,
    descriptions: {
      client: "Workspace preferences and system notifications.",
      staff: "Database health, Supabase connection status, and environment diagnostics.",
      owner: "Master system integrations, third-party API credentials (OpenAI, Stripe, Resend), and platform settings."
    }
  },
  "/dashboard/service-websites": {
    title: "AI Business Websites",
    category: "Service Console",
    icon: Shield,
    descriptions: {
      client: "Live website performance scores, SEO ranking diagnostics, and SSL security status.",
      staff: "Next.js edge deployment logs, CDN cache hit rates, and domain routing.",
      owner: "Multi-site deployment portfolio overview, domain renewals, and uptime reliability."
    }
  },
  "/dashboard/service-tools": {
    title: "AI Internal Tools",
    category: "Service Console",
    icon: Layers,
    descriptions: {
      client: "Internal tools usage metrics, active database records, and operational efficiency telemetry.",
      staff: "PostgreSQL query latency telemetry, vector embedding indexes, and server health.",
      owner: "Internal tooling compute costs, operational ROI, and infrastructure scaling."
    }
  },
  "/dashboard/service-automation": {
    title: "Workflow Automation",
    category: "Service Console",
    icon: TrendingUp,
    descriptions: {
      client: "Automated workflow execution logs, WhatsApp message triggers, and email sync counts.",
      staff: "Webhook retry pipelines, automated script logs, and execution error telemetry.",
      owner: "Agency automation reliability score, total operational hours saved, and execution volumes."
    }
  },
  "/dashboard/service-creator": {
    title: "Creator Infrastructure",
    category: "Service Console",
    icon: Briefcase,
    descriptions: {
      client: "Active membership subscriber counts, recurring Stripe revenue, and video playback metrics.",
      staff: "Mux video encoding logs, CDN bandwidth telemetry, and webhook subscriber events.",
      owner: "Creator platform gross merchandise volume (GMV), subscription health, and retention metrics."
    }
  }
};

const DashboardHeader = ({ onOpenMobileNav }) => {
  const pathname = usePathname();
  const { role, activeClient } = useDashboard();

  // Find configuration for current route (or fallback)
  const currentConfig = routeConfig[pathname] || {
    title: "Dashboard",
    category: "Workspace",
    icon: LayoutDashboard,
    descriptions: {
      client: "Manage and monitor your digital infrastructure.",
      staff: "Engineering console and client telemetry workspace.",
      owner: "Master agency operations and system management."
    }
  };

  const Icon = currentConfig.icon;
  const description =
    currentConfig.descriptions[role] || currentConfig.descriptions.owner;

  // Role pill styling
  const roleBadgeStyles = {
    owner: "bg-purple-50 text-purple-700 border-purple-200",
    staff: "bg-blue-50 text-blue-700 border-blue-200",
    client: "bg-emerald-50 text-emerald-700 border-emerald-200"
  };

  const roleLabels = {
    owner: "Owner View",
    staff: "Staff View",
    client: "Client Portal"
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-neutral-200/80 bg-white/95 backdrop-blur-md px-4 sm:px-8 py-3 sm:py-4 transition-all shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col gap-2.5 sm:gap-3">
        {/* Top Meta Navigation & Badges Row */}
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Mobile Drawer Button + Breadcrumb Trail */}
          <div className="flex items-center gap-2 min-w-0">
            {/* Mobile Hamburger Drawer Trigger (44px min touch target) */}
            <button
              onClick={onOpenMobileNav}
              type="button"
              className="lg:hidden p-2 -ml-1 rounded-lg text-slate-700 hover:text-blue-700 hover:bg-neutral-100 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-600 transition flex items-center justify-center shrink-0 min-w-[40px] min-h-[40px]"
              aria-label="Open Navigation Menu"
            >
              <Menu className="size-5" />
            </button>

            {/* Breadcrumb Trail */}
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono text-neutral-500 truncate">
              <span className="text-neutral-400 hidden xs:inline">Dashboard</span>
              <ChevronRight className="size-3 text-neutral-300 hidden xs:inline shrink-0" />
              <span className="text-neutral-400 truncate max-w-[80px] sm:max-w-none">{currentConfig.category}</span>
              <ChevronRight className="size-3 text-neutral-300 shrink-0" />
              <span className="font-semibold text-neutral-900 truncate">{currentConfig.title}</span>
            </div>
          </div>

          {/* Right Status & Role Metadata */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* Active Client Context Badge */}
            {activeClient && (
              <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-md border border-neutral-200 bg-neutral-50 px-2 sm:px-2.5 py-1 text-[10px] font-mono text-neutral-700 max-w-[120px] sm:max-w-none truncate">
                <span className="size-1.5 rounded-full bg-blue-600 shrink-0" />
                <span className="font-semibold truncate">{activeClient.shortName || activeClient.name}</span>
              </span>
            )}

            {/* Role Badge */}
            <span
              className={`inline-flex items-center gap-1 rounded-md border px-2 sm:px-2.5 py-1 text-[10px] font-mono font-bold tracking-wide uppercase ${
                roleBadgeStyles[role] || roleBadgeStyles.owner
              }`}
            >
              <Zap className="size-3 shrink-0" />
              <span>{roleLabels[role] || "Dashboard"}</span>
            </span>

            {/* Live Status Pill */}
            <span className="hidden md:inline-flex items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50/80 px-2 py-1 text-[10px] font-mono text-emerald-700">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Live</span>
            </span>
          </div>
        </div>

        {/* Page Title & Context Description Row */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-0.5 sm:space-y-1 min-w-0">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="p-1 sm:p-1.5 rounded-lg bg-neutral-100 text-neutral-800 shrink-0">
                <Icon className="size-4 sm:size-5 text-blue-700" />
              </div>
              <h1 className="text-lg sm:text-2xl font-mono font-bold tracking-tight text-neutral-900 truncate">
                {currentConfig.title}
              </h1>
            </div>
            <p className="text-xs sm:text-sm font-inter text-neutral-600 leading-relaxed max-w-3xl line-clamp-2 sm:line-clamp-none">
              {description}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
