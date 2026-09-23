import React from "react";
import ServiceWebsitesTab from "@/components/Dashboard/tabs/Services/ServiceWebsitesTab";

export const metadata = {
  title: "AI Business Websites Console | Egostix Dashboard",
  description: "Website performance telemetry, SEO rankings, Lighthouse scores, and CMS management.",
};

export default function ServiceWebsitesPage() {
  return (
    <div className="flex-1 p-8 overflow-y-auto max-w-7xl w-full mx-auto">
      <ServiceWebsitesTab />
    </div>
  );
}
