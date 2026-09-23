import React from "react";
import PublishCaseStudyTab from "@/components/Dashboard/tabs/PublishCaseStudy/PublishCaseStudyTab";

export const metadata = {
  title: "Publish Case Study | Egostix Dashboard",
  description: "Author, format, and publish live client case studies to the /work showcase.",
};

export default function PublishCaseStudyPage() {
  return (
    <div className="flex-1 overflow-y-auto max-w-7xl w-full mx-auto">
      <PublishCaseStudyTab />
    </div>
  );
}

