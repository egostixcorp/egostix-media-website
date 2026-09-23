import React from "react";
import AnalysisTab from "@/components/Dashboard/tabs/Analysis/AnalysisTab";

export const metadata = {
  title: "System Analysis | Egostix Dashboard",
  description: "Live traffic monitoring, search engine performance, and operational analytics.",
};

export default function AnalysisPage() {
  return (
    <div className="flex-1 p-8 overflow-y-auto max-w-7xl w-full mx-auto">
      <AnalysisTab />
    </div>
  );
}
