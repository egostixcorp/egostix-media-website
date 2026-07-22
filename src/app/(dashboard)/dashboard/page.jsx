"use client";

import React from "react";
import { useDashboard } from "@/components/Dashboard/DashboardContext";
import ClientView from "@/components/Dashboard/Views/ClientView";
import StaffView from "@/components/Dashboard/Views/StaffView";
import OwnerView from "@/components/Dashboard/Views/OwnerView";
import Auth from "@/components/Dashboard/Auth";

const DashboardPage = () => {
  const { role, isLoggedIn } = useDashboard();

  // Route to auth screen if not signed in
  if (!isLoggedIn) {
    return <Auth />;
  }

  // Render view based on active role simulation
  if (role === "client") {
    return <ClientView />;
  }
  if (role === "staff") {
    return <StaffView />;
  }
  if (role === "owner") {
    return <OwnerView />;
  }

  // Fallback
  return <ClientView />;
};

export default DashboardPage;
