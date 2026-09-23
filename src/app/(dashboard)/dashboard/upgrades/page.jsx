import React from "react";
import UpgradesTab from "@/components/Dashboard/tabs/Upgrades/UpgradesTab";

export const metadata = {
  title: "Service Upgrades & Expansion | Egostix Dashboard",
  description: "Request and configure AI tools, workflow automations, and custom modules.",
};

export default function UpgradesPage() {
  return (
    <div className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
      <UpgradesTab />
    </div>
  );
}
