"use client";

import React, { useState } from "react";
import { useDashboard } from "@/components/Dashboard/DashboardContext";
import { Layers, Database, Navigation } from "lucide-react";

const ServiceToolsTab = () => {
  const { activeClient } = useDashboard();
  const [dbEngine, setDbEngine] = useState("PostgreSQL");

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-lg border border-neutral-200 dark:border-slate-800 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1">
          <h3 className="text-lg font-mono text-slate-900 dark:text-slate-100 font-semibold flex items-center gap-2">
            <Layers className="size-5 text-blue-700 dark:text-blue-400" />
            AI Internal Tools & Enterprise Operations Console
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl font-inter">
            Custom business systems, relational/cloud database operations, and logistics telemetry for {activeClient?.name}.
          </p>
        </div>
        <span className="text-xs font-mono font-bold bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-900/50 px-3 py-1 rounded">
          Operational Cluster Active
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-neutral-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <h4 className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 uppercase border-b border-neutral-150 dark:border-slate-800 pb-2 flex items-center gap-2">
            <Database className="size-4 text-blue-700 dark:text-blue-400" />
            Database Operations & Architecture
          </h4>
          <div className="space-y-3 text-xs">
            <div>
              <label className="block text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase font-bold mb-1">
                Active Database Engine
              </label>
              <select
                value={dbEngine}
                onChange={(e) => setDbEngine(e.target.value)}
                className="w-full rounded border border-neutral-300 dark:border-slate-700 px-3 py-2 font-mono bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:border-blue-700 focus:outline-none"
              >
                <option value="PostgreSQL">PostgreSQL Cloud (Primary)</option>
                <option value="MySQL">MySQL Enterprise Cluster</option>
                <option value="MongoDB">MongoDB Atlas Cluster</option>
                <option value="Custom SQL">Custom Relational / Cloud DB</option>
              </select>
            </div>
            <div className="p-3 bg-neutral-50 dark:bg-slate-800/60 rounded border border-neutral-200 dark:border-slate-700 font-mono text-[11px] text-slate-700 dark:text-slate-300 space-y-1">
              <p>Active Engine: {dbEngine}</p>
              <p>Connection Pool: 24 / 100 Active (Read Latency: 2.8ms)</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-lg border border-neutral-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <h4 className="text-xs font-mono font-bold text-slate-900 dark:text-slate-100 uppercase border-b border-neutral-150 dark:border-slate-800 pb-2 flex items-center gap-2">
            <Navigation className="size-4 text-blue-700 dark:text-blue-400" />
            Fleet & Logistics Analytics Routing Node
          </h4>
          <div className="space-y-3 text-xs font-mono">
            <div className="flex justify-between text-slate-700 dark:text-slate-300">
              <span>Active GPS / Telemetry Trackers</span>
              <span className="font-bold text-blue-700 dark:text-blue-400">18 Connected Nodes</span>
            </div>
            <div className="flex justify-between text-slate-700 dark:text-slate-300">
              <span>Route Optimization Engine</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">Online (Real-Time)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceToolsTab;
