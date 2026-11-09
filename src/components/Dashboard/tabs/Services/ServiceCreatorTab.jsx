"use client";

import React, { useState } from "react";
import { useDashboard } from "@/components/Dashboard/DashboardContext";
import { Briefcase, CreditCard, Video } from "lucide-react";

const ServiceCreatorTab = () => {
  const { activeClient } = useDashboard();
  const [billingGateway, setBillingGateway] = useState("Stripe");
  const [cdnProvider, setCdnProvider] = useState("Mux CDN");

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-neutral-200 dark:border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1">
          <h3 className="text-lg font-mono text-slate-900 dark:text-slate-100 font-semibold flex items-center gap-2">
            <Briefcase className="size-5 text-blue-700 dark:text-blue-400" />
            Creator Infrastructure & Video Streaming CDN
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl font-inter">
            Membership billing, payment gateways, and adaptive video streaming infrastructure for {activeClient?.name}.
          </p>
        </div>
        <span className="text-xs font-mono font-bold bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-900/50 px-3 py-1 rounded">
          CDN Streaming Online
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-neutral-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-neutral-150 dark:border-slate-800 pb-2">
            <h4 className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 uppercase flex items-center gap-2">
              <CreditCard className="size-4 text-blue-700 dark:text-blue-400" />
              Membership Billing Gateway
            </h4>
            <select
              value={billingGateway}
              onChange={(e) => setBillingGateway(e.target.value)}
              className="rounded border border-neutral-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 py-1 text-[10px] font-mono text-slate-900 dark:text-slate-100 focus:border-blue-700 focus:outline-none"
            >
              <option value="Stripe">Stripe Connect</option>
              <option value="LemonSqueezy">Lemon Squeezy</option>
              <option value="Razorpay">Razorpay</option>
              <option value="Custom Gateway">Custom Payment API</option>
            </select>
          </div>
          <div className="space-y-2 text-xs font-mono text-slate-700 dark:text-slate-300">
            <p>Active Gateway: {billingGateway}</p>
            <p>Monthly Recurring Revenue (MRR): $14,250</p>
            <p>Webhook Status: 100% Delivery Success</p>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-lg border border-neutral-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-neutral-150 dark:border-slate-800 pb-2">
            <h4 className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 uppercase flex items-center gap-2">
              <Video className="size-4 text-blue-700 dark:text-blue-400" />
              Adaptive Video Streaming CDN
            </h4>
            <select
              value={cdnProvider}
              onChange={(e) => setCdnProvider(e.target.value)}
              className="rounded border border-neutral-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-2 py-1 text-[10px] font-mono text-slate-900 dark:text-slate-100 focus:border-blue-700 focus:outline-none"
            >
              <option value="Mux CDN">Mux Video CDN</option>
              <option value="Cloudflare Stream">Cloudflare Stream</option>
              <option value="AWS CloudFront">AWS CloudFront OTT</option>
              <option value="Vimeo OTT">Vimeo Enterprise</option>
            </select>
          </div>
          <div className="space-y-2 text-xs font-mono text-slate-700 dark:text-slate-300">
            <p>Active CDN Node: {cdnProvider}</p>
            <p>Encoding Engine: H.264 / HEVC 4K Adaptive Bitrate</p>
            <p>Bandwidth Used This Month: 1.4 TB (Edge Cached)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCreatorTab;
