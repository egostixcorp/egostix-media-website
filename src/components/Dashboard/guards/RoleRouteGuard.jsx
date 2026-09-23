"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDashboard } from "@/components/Dashboard/DashboardContext";
import { ShieldAlert, Lock, ArrowLeft, LayoutDashboard } from "lucide-react";

// Route Access Control Matrix
const ROUTE_PERMISSIONS = {
  // Owner-only administrative routes
  "/dashboard/client-settings": {
    allowedRoles: ["owner"],
    roleLabel: "Agency Owner",
    routeName: "Client Profile Manager"
  },
  "/dashboard/clients": {
    allowedRoles: ["owner"],
    roleLabel: "Agency Owner",
    routeName: "Clients Directory"
  },

  // Staff & Owner engineering routes
  "/dashboard/publish-case-study": {
    allowedRoles: ["owner", "staff"],
    roleLabel: "Staff Engineer or Agency Owner",
    routeName: "Case Study Publisher"
  },
  "/dashboard/settings": {
    allowedRoles: ["owner", "staff"],
    roleLabel: "Staff Engineer or Agency Owner",
    routeName: "System Settings & Integrations"
  }
};

export default function RoleRouteGuard({ children }) {
  const pathname = usePathname();
  const { role, isLoadingData, currentUser } = useDashboard();

  // Allow children to render while session and role are being hydrated from Supabase
  if (isLoadingData) {
    return <>{children}</>;
  }

  const routeConfig = ROUTE_PERMISSIONS[pathname];

  // If the route has restricted permissions and the current role is not permitted
  if (routeConfig && !routeConfig.allowedRoles.includes(role)) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4 sm:p-8 font-inter animate-in fade-in duration-200">
        <div className="max-w-lg w-full bg-white rounded-2xl border border-neutral-200 shadow-sm p-6 sm:p-8 text-center space-y-6">
          {/* Security Icon Badge */}
          <div className="size-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto shadow-xs">
            <ShieldAlert className="size-8" />
          </div>

          {/* Alert Content */}
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-100 text-amber-800 uppercase tracking-wider">
              <Lock className="size-3" />
              Access Restricted
            </span>
            <h2 className="text-lg sm:text-xl font-mono font-bold text-slate-900">
              {routeConfig.routeName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-inter leading-relaxed">
              This administrative area is restricted to <strong className="text-slate-800">{routeConfig.roleLabel}</strong> accounts.
            </p>
          </div>

          {/* Current Session Metadata Box */}
          <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-left font-mono text-xs space-y-1.5">
            <div className="flex justify-between items-center text-slate-500">
              <span>Current Account</span>
              <span className="text-slate-800 font-semibold truncate max-w-[200px]">
                {currentUser?.email || "User Account"}
              </span>
            </div>
            <div className="flex justify-between items-center text-slate-500">
              <span>Assigned Role</span>
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-50 text-blue-700 border border-blue-200">
                {role} View
              </span>
            </div>
          </div>

          {/* Action Redirection Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-2">
            <Link
              href="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 active:scale-[0.98] text-white font-mono text-xs font-semibold shadow-xs transition min-h-[44px]"
            >
              <LayoutDashboard className="size-4" />
              <span>Return to Overview</span>
            </Link>
            <Link
              href="/dashboard/analysis"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 text-slate-700 font-mono text-xs font-semibold transition min-h-[44px]"
            >
              <ArrowLeft className="size-4" />
              <span>System Analysis</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
