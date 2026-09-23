import React from "react";
import ServiceCreatorTab from "@/components/Dashboard/tabs/Services/ServiceCreatorTab";

export const metadata = {
  title: "Creator Infrastructure Console | Egostix Dashboard",
  description: "Membership billing telemetry, video CDN bandwidth, and audience analytics.",
};

export default function ServiceCreatorPage() {
  return (
    <div className="flex-1 p-8 overflow-y-auto max-w-7xl w-full mx-auto">
      <ServiceCreatorTab />
    </div>
  );
}
