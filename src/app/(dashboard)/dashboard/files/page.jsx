"use client";

import React from "react";
import FilesTab from "@/components/Dashboard/tabs/Files/FilesTab";

export default function FilesPage() {
  return (
    <div className="flex-1 p-8 overflow-y-auto max-w-7xl w-full mx-auto">
      <FilesTab />
    </div>
  );
}
