"use client";

import React from "react";
import { useDashboard } from "@/components/Dashboard/DashboardContext";
import Auth from "@/components/Dashboard/Auth";
import AnalysisTab from "@/components/Dashboard/tabs/Analysis/AnalysisTab";

const DashboardPage = () => {
  const { isLoggedIn } = useDashboard();

  // Route to auth screen if not signed in
  if (!isLoggedIn) {
    return <Auth />;
  }

  return (
    <div className="flex-1 p-8 overflow-y-auto max-w-7xl w-full mx-auto">
      <AnalysisTab />
    </div>
  );
};

export default DashboardPage;
