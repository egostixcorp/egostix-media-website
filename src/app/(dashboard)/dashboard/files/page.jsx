import React from "react";
import FilesTab from "@/components/Dashboard/tabs/Files/FilesTab";

export const metadata = {
  title: "Shared Files & Deliverables | Egostix Dashboard",
  description: "Client file repository, project specifications, and downloadable assets.",
};

export default function FilesPage() {
  return (
    <div className="flex-1 p-4 sm:p-6 md:p-8 max-w-7xl w-full mx-auto">
      <FilesTab />
    </div>
  );
}
