import React from "react";
import DashboardClientLayout from "@/components/Dashboard/DashboardClientLayout";

export const metadata = {
  title: "Dashboard | Egostix Media",
  description: "Egostix Media management portal, system analytics, and delivery console.",
};

export default function DashBoardLayout({ children }) {
  return <DashboardClientLayout>{children}</DashboardClientLayout>;
}
