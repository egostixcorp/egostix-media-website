"use client";

import React, { useState } from "react";
import { useDashboard } from "@/components/Dashboard/DashboardContext";
import { Layers, Database, Navigation } from "lucide-react";

const ServiceToolsTab = () => {
  const { activeClient } = useDashboard();
  const [dbEngine, setDbEngine] = useState("PostgreSQL");

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="bg-white rounded-lg border border-neutral-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1">
          <h3 className="text-lg font-mono text-slate-900 font-semibold flex items-center gap-2">
            <Layers className="size-5 text-blue-700" />
            AI Internal Tools & PulseOps ERP Console
          </h3>
          <p className="text-xs text-slate-600 max-w-2xl font-inter">
            Enterprise resource management, PostgreSQL database operational stats, and fleet analytics for {activeClient?.name}.
          </p>
        </div>
        <span className="text-xs font-mono font-bold bg-purple-100 text-purple-700 px-3 py-1 rounded">
          ERP Cluster Active
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-4">
          <h4 className="text-xs font-mono font-bold text-slate-900 uppercase border-b pb-2 flex items-center gap-2">
            <Database className="size-4 text-blue-700" />
            Database Ops Infrastructure
          </h4>
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-[10px] font-mono text-slate-500 uppercase font-bold mb-1">
                Database Engine
              </label>
              <select
                value={dbEngine}
                onChange={(e) => setDbEngine(e.target.value)}
                className="w-full rounded border border-neutral-300 px-3 py-2 font-mono bg-white"
              >
                <option value="PostgreSQL">PostgreSQL AWS Aurora (Primary)</option>
                <option value="MongoDB">MongoDB Atlas Cluster</option>
              </select>
            </div>
            <div className="p-3 bg-neutral-50 rounded border border-neutral-200 font-mono text-[11px] text-slate-700 space-y-1">
              <p>Connection Pool: 24 / 100 Active</p>
              <p>Read Latency: 4ms</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm space-y-4">
          <h4 className="text-xs font-mono font-bold text-slate-900 uppercase border-b pb-2 flex items-center gap-2">
            <Navigation className="size-4 text-blue-700" />
            GPS Fleet Analytics Routing Node
          </h4>
          <div className="space-y-3 text-xs font-mono">
            <div className="flex justify-between">
              <span>Active GPS Trackers</span>
              <span className="font-bold text-blue-700">18 Vehicles</span>
            </div>
            <div className="flex justify-between">
              <span>Route Optimization Engine</span>
              <span className="font-bold text-green-600">Online</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceToolsTab;
