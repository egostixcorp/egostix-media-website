"use client";

import React from "react";
import ServiceAutomationTab from "@/components/Dashboard/tabs/Services/ServiceAutomationTab";

export default function ServiceAutomationPage() {
  return (
    <div className="flex-1 p-8 overflow-y-auto max-w-7xl w-full mx-auto">
      <ServiceAutomationTab />
    </div>
  );
}
