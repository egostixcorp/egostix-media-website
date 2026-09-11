"use client";

import React from "react";
import ServiceCreatorTab from "@/components/Dashboard/tabs/Services/ServiceCreatorTab";

export default function ServiceCreatorPage() {
  return (
    <div className="flex-1 p-8 overflow-y-auto max-w-7xl w-full mx-auto">
      <ServiceCreatorTab />
    </div>
  );
}
