"use client";

import React from "react";
import ClientSettingsTab from "@/components/Dashboard/tabs/ClientSettings/ClientSettingsTab";

export default function ClientSettingsPage() {
  return (
    <div className="flex-1 p-8 overflow-y-auto max-w-7xl w-full mx-auto">
      <ClientSettingsTab />
    </div>
  );
}
