"use client";

import React from "react";
import { DashboardProvider, useDashboard } from "@/components/Dashboard/DashboardContext";
import Sidebar from "./Sidebar";

const DashboardShell = ({ children }) => {
  const { isLoggedIn } = useDashboard();

  if (!isLoggedIn) {
    return <div className="min-h-screen bg-neutral-50 flex flex-col">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex text-slate-900 font-inter">
      {/* Left Sidebar Menu */}
      <Sidebar />

      {/* Content Viewport Container */}
      <div className="flex-1 pl-64 flex flex-col min-h-screen">
        {children}
      </div>
    </div>
  );
};

const DashBoardLayout = ({ children }) => {
  return (
    <DashboardProvider>
      <DashboardShell>{children}</DashboardShell>
    </DashboardProvider>
  );
};

export default DashBoardLayout;
