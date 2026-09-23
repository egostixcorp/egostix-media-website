"use client";

import React, { useState } from "react";
import { DashboardProvider } from "@/components/Dashboard/DashboardContext";
import Sidebar from "@/components/Dashboard/Sidebar";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";
import RoleRouteGuard from "@/components/Dashboard/guards/RoleRouteGuard";

const DashboardShell = ({ children }) => {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50 flex text-slate-900 font-inter relative">
      {/* Left Sidebar Menu (Slide-out Drawer on Mobile, Fixed on Desktop) */}
      <Sidebar
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
      />

      {/* Content Viewport Container */}
      <div className="flex-1 pl-0 lg:pl-64 flex flex-col min-h-screen w-full min-w-0">
        {/* Sticky Top Metadata Navigation Bar with Mobile Toggle */}
        <DashboardHeader onOpenMobileNav={() => setIsMobileNavOpen(true)} />

        {/* Tab/Route Page Content Protected by Role Guard */}
        <main className="flex-1 w-full min-w-0">
          <RoleRouteGuard>
            {children}
          </RoleRouteGuard>
        </main>
      </div>
    </div>
  );
};

export default function DashboardClientLayout({ children }) {
  return (
    <DashboardProvider>
      <DashboardShell>{children}</DashboardShell>
    </DashboardProvider>
  );
}
