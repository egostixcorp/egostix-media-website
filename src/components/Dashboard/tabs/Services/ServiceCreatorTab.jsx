"use client";

import React from "react";
import { useDashboard } from "@/components/Dashboard/DashboardContext";
import { Briefcase, CreditCard, Video } from "lucide-react";

const ServiceCreatorTab = () => {
  const { activeClient } = useDashboard();

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="bg-white rounded-lg border border-neutral-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1">
          <h3 className="text-lg font-mono text-slate-900 font-semibold flex items-center gap-2">
            <Briefcase className="size-5 text-blue-700" />
            Creator Infrastructure, Stripe & Mux Video CDN
          </h3>
          <p className="text-xs text-slate-600 max-w-2xl font-inter">
            Membership billing, Stripe Connect payouts, and adaptive video streaming infrastructure for {activeClient?.name}.
          </p>
        </div>
        <span className="text-xs font-mono font-bold bg-blue-100 text-blue-700 px-3 py-1 rounded">
          CDN Streaming Online
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-4">
          <h4 className="text-xs font-mono font-bold text-slate-900 uppercase border-b pb-2 flex items-center gap-2">
            <CreditCard className="size-4 text-blue-700" />
            Stripe Subscription Billing Engine
          </h4>
          <div className="space-y-2 text-xs font-mono text-slate-700">
            <p>Stripe Webhooks: Active</p>
            <p>Monthly Recurring Revenue (MRR): $14,250</p>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-4">
          <h4 className="text-xs font-mono font-bold text-slate-900 uppercase border-b pb-2 flex items-center gap-2">
            <Video className="size-4 text-blue-700" />
            Mux Video CDN Edge Delivery
          </h4>
          <div className="space-y-2 text-xs font-mono text-slate-700">
            <p>Encoding Engine: H.264 / HEVC 4K</p>
            <p>Bandwidth Used This Month: 1.4 TB</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCreatorTab;
