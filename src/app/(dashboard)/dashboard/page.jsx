import React from "react";
import AnalysisTab from "@/components/Dashboard/tabs/Analysis/AnalysisTab";

export const metadata = {
  title: "Dashboard Overview | Egostix Media",
  description: "Real-time system telemetry, active client operations, and service performance.",
};

export default function DashboardPage() {
  return (
    <div className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
      <AnalysisTab />
    </div>
  );
}
