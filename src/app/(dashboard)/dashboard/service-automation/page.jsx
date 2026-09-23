import React from "react";
import ServiceAutomationTab from "@/components/Dashboard/tabs/Services/ServiceAutomationTab";

export const metadata = {
  title: "Workflow Automation Console | Egostix Dashboard",
  description: "Automated webhook executions, integration logs, and failure recovery telemetry.",
};

export default function ServiceAutomationPage() {
  return (
    <div className="flex-1 p-8 overflow-y-auto max-w-7xl w-full mx-auto">
      <ServiceAutomationTab />
    </div>
  );
}
