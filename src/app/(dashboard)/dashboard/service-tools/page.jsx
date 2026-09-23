import React from "react";
import ServiceToolsTab from "@/components/Dashboard/tabs/Services/ServiceToolsTab";

export const metadata = {
  title: "AI Internal Tools Console | Egostix Dashboard",
  description: "Internal software operations, ERP queries, database latencies, and tool usage.",
};

export default function ServiceToolsPage() {
  return (
    <div className="flex-1 p-8 overflow-y-auto max-w-7xl w-full mx-auto">
      <ServiceToolsTab />
    </div>
  );
}
