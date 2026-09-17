"use client";

import React from "react";
import AnalysisTab from "@/components/Dashboard/tabs/Analysis/AnalysisTab";

const DashboardPage = () => {
  return (
    <div className="flex-1 p-8 overflow-y-auto max-w-7xl w-full mx-auto">
      <AnalysisTab />
    </div>
  );
};

export default DashboardPage;
