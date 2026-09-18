import React from "react";
import SystemSettingsTab from "@/components/Dashboard/tabs/Settings/SystemSettingsTab";

export default function SettingsPage() {
  return (
    <div className="flex-1 p-8 overflow-y-auto max-w-7xl w-full mx-auto">
      <SystemSettingsTab />
    </div>
  );
}
