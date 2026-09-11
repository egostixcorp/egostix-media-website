"use client";

import React from "react";
import { useDashboard } from "@/components/Dashboard/DashboardContext";
import { Users, Shield, ArrowUpRight, CheckCircle2, UserCheck, Layers } from "lucide-react";

const ClientsTab = () => {
  const { clients, setSelectedClientSlug, selectedClientSlug } = useDashboard();

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Context Banner */}
      <div className="bg-white rounded-lg border border-neutral-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1">
          <h3 className="text-lg font-mono text-slate-900 font-semibold flex items-center gap-2">
            <Users className="size-5 text-blue-700" />
            Clients Directory & Tenant Accounts
          </h3>
          <p className="text-xs text-slate-600 max-w-2xl font-inter">
            Master directory of all registered enterprise client portals, active service deployments, and contact leads.
          </p>
        </div>
        <span className="text-xs font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded">
          Active Tenants: {clients.length}
        </span>
      </div>

      {/* Clients Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clients.map((client) => {
          const isSelected = selectedClientSlug === client.slug;

          return (
            <div
              key={client.slug}
              className={`bg-white rounded-lg border p-6 shadow-sm flex flex-col justify-between space-y-4 transition ${
                isSelected ? "border-blue-700 ring-1 ring-blue-700" : "border-neutral-200 hover:border-neutral-300"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="size-10 rounded border border-neutral-200 p-1 flex items-center justify-center bg-neutral-50 overflow-hidden">
                    <span className="font-mono font-bold text-xs text-blue-700">
                      {client.shortName.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <span
                    className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                      client.status === "Internal"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {client.status}
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-mono font-bold text-slate-900 leading-snug">
                    {client.name}
                  </h4>
                  <p className="text-xs text-slate-500 font-inter mt-0.5">
                    Owner: {client.ownerName} ({client.ownerEmail})
                  </p>
                </div>

                {/* Active Services */}
                <div className="space-y-1">
                  <span className="text-[9px] font-mono text-slate-400 uppercase font-bold">
                    Active Provisioned Modules
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {client.activeServices.length === 0 ? (
                      <span className="text-[10px] font-mono text-slate-400">Internal Base Infrastructure</span>
                    ) : (
                      client.activeServices.map((s, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] font-mono bg-blue-50 text-blue-700 border border-blue-100 px-1.5 py-0.5 rounded"
                        >
                          {s}
                        </span>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-500">
                  Monthly Traffic: {client.metrics?.traffic || "N/A"}
                </span>
                <button
                  onClick={() => setSelectedClientSlug(client.slug)}
                  className={`text-xs font-mono font-bold px-3 py-1.5 rounded transition ${
                    isSelected
                      ? "bg-blue-700 text-white"
                      : "bg-neutral-100 text-slate-700 hover:bg-neutral-200"
                  }`}
                >
                  {isSelected ? "Active Context" : "Switch Context"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClientsTab;
