import React from "react";
import ClientsTab from "@/components/Dashboard/tabs/Clients/ClientsTab";

export const metadata = {
  title: "Clients Directory | Egostix Dashboard",
  description: "Directory of client organizations, assigned services, and active deployments.",
};

export default function ClientsPage() {
  return (
    <div className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
      <ClientsTab />
    </div>
  );
}
