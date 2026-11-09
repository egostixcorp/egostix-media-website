"use client";

import React from "react";
import { useDashboard } from "@/components/Dashboard/DashboardContext";
import { Users, Shield, ArrowUpRight, CheckCircle2, UserCheck, Layers, Settings, ExternalLink } from "lucide-react";
import Link from "next/link";

const ClientsTab = () => {
  const { clients, setSelectedClientSlug, selectedClientSlug, kanbanTasks, setActiveTab } = useDashboard();

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Context Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-neutral-200 dark:border-slate-800 p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 shadow-sm">
        <div className="space-y-1 sm:space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="p-1.5 sm:p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/50 text-blue-700 dark:text-blue-400 shrink-0">
              <Users className="size-4 sm:size-5" />
            </span>
            <h3 className="text-lg sm:text-xl font-mono text-slate-900 dark:text-slate-100 font-bold">
              Egostix Media Clients Directory & Accounts
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 max-w-2xl font-inter leading-relaxed">
            Directory of all provisioned client portals created via Client Profile Manager, active service modules, and tenant databases.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 w-full md:w-auto">
          <span className="text-xs font-mono font-bold bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-900/50 px-3 py-2 rounded-lg uppercase text-center">
            Active Tenants: {clients.length}
          </span>
          <Link
            href="/dashboard/client-settings"
            className="text-xs font-mono font-semibold bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-500 text-white px-3.5 py-2.5 rounded-lg transition inline-flex items-center justify-center gap-1.5 shadow-sm min-h-[44px]"
          >
            <Settings className="size-3.5" />
            <span>Manage Profiles & Credentials</span>
          </Link>
        </div>
      </div>

      {/* Clients Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {clients.length === 0 ? (
          <div className="col-span-full bg-white dark:bg-slate-900 rounded-xl border border-neutral-200 dark:border-slate-800 p-12 text-center space-y-3 shadow-sm">
            <div className="mx-auto size-12 rounded-full bg-neutral-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500">
              <Users className="size-6" />
            </div>
            <h4 className="font-mono text-base font-bold text-slate-900 dark:text-slate-100">
              No Registered Clients
            </h4>
            <p className="text-xs font-inter text-slate-500 dark:text-slate-400 max-w-md mx-auto leading-relaxed">
              No client tenant records found in your Supabase database. Create client accounts using the Client Profile Manager.
            </p>
          </div>
        ) : (
          clients.map((client) => {
            const isSelected = selectedClientSlug === client.slug;
            const clientTasks = kanbanTasks.filter((t) => t.clientSlug === client.slug);

            return (
              <div
                key={client.slug}
                className={`bg-white dark:bg-slate-900 rounded-xl border p-6 shadow-sm flex flex-col justify-between space-y-5 transition ${
                  isSelected ? "border-blue-700 dark:border-blue-500 ring-2 ring-blue-700/20 dark:ring-blue-500/20" : "border-neutral-200 dark:border-slate-800 hover:border-neutral-300 dark:hover:border-slate-700"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="size-11 rounded-xl border border-neutral-200 dark:border-slate-700 p-1 flex items-center justify-center bg-blue-50/60 dark:bg-blue-950/40 overflow-hidden shadow-xs">
                      <span className="font-mono font-bold text-sm text-blue-700 dark:text-blue-400">
                        {client.shortName ? client.shortName.slice(0, 2).toUpperCase() : "CL"}
                      </span>
                    </div>
                    <span
                      className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                        client.slug === "egostix-internal"
                          ? "bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300"
                          : "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300"
                      }`}
                    >
                      {client.status || "Active"}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-mono font-bold text-slate-900 dark:text-slate-100 leading-snug">
                      {client.name}
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-inter mt-1">
                      Owner: <strong className="text-slate-800 dark:text-slate-200">{client.ownerName || "Unassigned"}</strong>
                    </p>
                    <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate">
                      {client.ownerEmail || "No email provisioned"}
                    </p>
                  </div>

                  {/* Active Services Badges */}
                  <div className="space-y-1.5 pt-1 border-t border-neutral-100 dark:border-slate-800">
                    <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase font-bold tracking-wider">
                      Active Services ({client.activeServices?.length || 0})
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {!client.activeServices || client.activeServices.length === 0 ? (
                        <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 italic">No services provisioned</span>
                      ) : (
                        client.activeServices.map((s, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] font-mono bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50 px-2 py-0.5 rounded-md font-semibold"
                          >
                            {s}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 font-medium">
                    Tasks: {clientTasks.length} Pipeline
                  </span>
                  <button
                    onClick={() => setSelectedClientSlug(client.slug)}
                    className={`text-xs font-mono font-bold px-3.5 py-2 rounded-lg transition ${
                      isSelected
                        ? "bg-blue-700 dark:bg-blue-600 text-white shadow-xs"
                        : "bg-neutral-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-neutral-200 dark:hover:bg-slate-700"
                    }`}
                  >
                    {isSelected ? "Active Context" : "Switch Context"}
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ClientsTab;
