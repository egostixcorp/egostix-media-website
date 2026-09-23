"use client";

import React from "react";
import { DashboardProvider } from "@/components/Dashboard/DashboardContext";
import Sidebar from "@/components/Dashboard/Sidebar";
import DashboardHeader from "@/components/Dashboard/DashboardHeader";

const DashboardShell = ({ children }) => {
  return (
    <div className="min-h-screen bg-neutral-50 flex text-slate-900 font-inter">
      {/* Left Sidebar Menu */}
      <Sidebar />

      {/* Content Viewport Container */}
      <div className="flex-1 pl-64 flex flex-col min-h-screen">
        {/* Sticky Top Metadata Navigation Bar */}
        <DashboardHeader />

        {/* Tab/Route Page Content */}
        <div className="flex-1">
          {children}
        </div>
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
