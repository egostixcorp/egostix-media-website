import React from "react";
import ClientSettingsTab from "@/components/Dashboard/tabs/ClientSettings/ClientSettingsTab";

export const metadata = {
  title: "Client Profile Manager | Egostix Dashboard",
  description: "Configure client organization settings, active service tiers, and integrations.",
};

export default function ClientSettingsPage() {
  return (
    <div className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
      <ClientSettingsTab />
    </div>
  );
}
