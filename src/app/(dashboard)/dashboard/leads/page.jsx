"use client";

import React from "react";
import LeadsTab from "@/components/Dashboard/tabs/Leads/LeadsTab";

export default function LeadsPage() {
  return (
    <div className="flex-1 p-8 overflow-y-auto max-w-7xl w-full mx-auto">
      <LeadsTab />
    </div>
  );
}
