"use client";

import React from "react";
import ServiceToolsTab from "@/components/Dashboard/tabs/Services/ServiceToolsTab";

export default function ServiceToolsPage() {
  return (
    <div className="flex-1 p-8 overflow-y-auto max-w-7xl w-full mx-auto">
      <ServiceToolsTab />
    </div>
  );
}
