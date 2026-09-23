import React from "react";
import ServiceToolsTab from "@/components/Dashboard/tabs/Services/ServiceToolsTab";

export const metadata = {
  title: "AI Internal Tools Console | Egostix Dashboard",
  description: "Internal software operations, ERP queries, database latencies, and tool usage.",
};

export default function ServiceToolsPage() {
  return (
    <div className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
      <ServiceToolsTab />
    </div>
  );
}
