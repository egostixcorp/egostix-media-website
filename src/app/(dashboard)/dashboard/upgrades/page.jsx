"use client";

import React from "react";
import UpgradesTab from "@/components/Dashboard/tabs/Upgrades/UpgradesTab";

export default function UpgradesPage() {
  return (
    <div className="flex-1 p-8 overflow-y-auto max-w-7xl w-full mx-auto">
      <UpgradesTab />
    </div>
  );
}
