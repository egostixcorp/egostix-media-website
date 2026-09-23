import React from "react";
import SystemSettingsTab from "@/components/Dashboard/tabs/Settings/SystemSettingsTab";

export const metadata = {
  title: "System Settings & Integrations | Egostix Dashboard",
  description: "System infrastructure configuration, API credentials, and environment diagnostics.",
};

export default function SettingsPage() {
  return (
    <div className="flex-1 p-8 overflow-y-auto max-w-7xl w-full mx-auto">
      <SystemSettingsTab />
    </div>
  );
}
