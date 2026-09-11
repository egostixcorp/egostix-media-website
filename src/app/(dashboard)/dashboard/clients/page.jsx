"use client";

import React from "react";
import ClientsTab from "@/components/Dashboard/tabs/Clients/ClientsTab";

export default function ClientsPage() {
  return (
    <div className="flex-1 p-8 overflow-y-auto max-w-7xl w-full mx-auto">
      <ClientsTab />
    </div>
  );
}
