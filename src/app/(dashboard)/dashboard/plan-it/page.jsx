import React from "react";
import PlanItTab from "@/components/Dashboard/tabs/PlanIt/PlanItTab";

export const metadata = {
  title: "Plan-it Delivery Pipeline | Egostix Dashboard",
  description: "Kanban project board, milestone roadmap, and feature delivery queue.",
};

export default function PlanItPage() {
  return (
    <div className="flex-1 p-8 overflow-y-auto max-w-7xl w-full mx-auto">
      <PlanItTab />
    </div>
  );
}
