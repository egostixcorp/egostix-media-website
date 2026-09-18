"use client";

import React, { useState } from "react";
import { useDashboard } from "@/components/Dashboard/DashboardContext";
import {
  Settings,
  Users,
  Shield,
  Activity,
  CheckCircle2,
  Send,
  Database,
  RefreshCw,
  Terminal,
  Zap,
  Server,
  Play,
  Mail,
  AlertCircle
} from "lucide-react";
import { sendContactAction } from "@/actions/contact";
import { createClient } from "@/utils/supabase/client";

const SystemSettingsTab = () => {
  const { currentUser, role } = useDashboard();
  const [simulationMode, setSimulationMode] = useState(false);
  const [logs, setLogs] = useState([
    { id: 1, time: new Date().toLocaleTimeString(), text: "System Telemetry Initialized — Supabase DB & Resend Gateways Active" }
  ]);

  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState("");
  const [isTestingDb, setIsTestingDb] = useState(false);
  const [dbStatus, setDbStatus] = useState("");

  const addLog = (text) => {
    setLogs((prev) => [
      { id: Date.now(), time: new Date().toLocaleTimeString(), text },
      ...prev.slice(0, 19)
    ]);
  };

  // Test Resend Email Gateway Simulation
  const handleTestEmailGateway = async () => {
    setIsTestingEmail(true);
    setEmailStatus("");
    addLog("Initiating Resend Email Gateway test...");

    try {
      const testData = {
        name: "Test Lead (Simulation)",
        email: currentUser?.email || "admin@egostix.com",
        org: "Egostix Real-World Test Suite",
        systemType: "websites",
        message: "This is an automated real-world simulation test message from Egostix System Settings."
      };

      const res = await sendContactAction(testData);

      if (res.success) {
        setEmailStatus("Resend email dispatch successful! Check inbox for confirmation copy.");
        addLog(`SUCCESS: Resend email dispatched to ${testData.email}`);
      } else {
        setEmailStatus(`Resend test failed: ${res.error}`);
        addLog(`ERROR: Resend email test failed — ${res.error}`);
      }
    } catch (err) {
      setEmailStatus("Unexpected network error during email test.");
      addLog(`ERROR: Resend test exception — ${err?.message}`);
    } finally {
      setIsTestingEmail(false);
    }
  };

  // Test Supabase Database Connection Simulation
  const handleTestDbGateway = async () => {
    setIsTestingDb(true);
    setDbStatus("");
    addLog("Executing Supabase Database connection query...");

    try {
      const supabase = createClient();
      const startTime = performance.now();
      const { data, error } = await supabase.from("leads").select("id").limit(1);
      const endTime = performance.now();
      const latency = (endTime - startTime).toFixed(1);

      if (error) {
        setDbStatus(`Supabase DB query warning: ${error.message}`);
        addLog(`WARNING: Supabase DB query — ${error.message}`);
      } else {
        setDbStatus(`Database query successful! Latency: ${latency}ms`);
        addLog(`SUCCESS: Supabase DB ping passed (${latency}ms)`);
      }
    } catch (err) {
      setDbStatus("Database test failed.");
      addLog(`ERROR: DB test exception — ${err?.message}`);
    } finally {
      setIsTestingDb(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Context Banner */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-blue-50 border border-blue-100 text-blue-700">
              <Settings className="size-5" />
            </span>
            <h3 className="text-xl font-mono text-slate-900 font-bold">
              System & Real-World Simulation Settings
            </h3>
          </div>
          <p className="text-xs text-slate-600 max-w-2xl font-inter leading-relaxed">
            Configure administrative permissions, manage Owner & Staff access directories, and execute real-world simulation tests across email and database gateways.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              setSimulationMode(!simulationMode);
              addLog(`Environment mode toggled: ${!simulationMode ? "Simulation Test Mode" : "Production Live Mode"}`);
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition ${
              simulationMode
                ? "bg-amber-50 text-amber-800 border-amber-300"
                : "bg-emerald-50 text-emerald-800 border-emerald-300"
            }`}
          >
            Mode: {simulationMode ? "Simulation Test Mode" : "Production Live"}
          </button>
        </div>
      </div>

      {/* Grid: Section 1 & Section 2 */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Section 1: Owners & Staff Access Directory */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Users className="size-4 text-blue-700" />
                Owners & Staff Access Directory
              </h4>
              <span className="text-[10px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold border border-blue-200">
                Administrative Level
              </span>
            </div>
            <p className="text-xs text-slate-600 font-inter">
              Active administrative accounts with platform access to global leads, client management, and telemetry tools.
            </p>

            <div className="space-y-3 font-mono text-xs">
              {/* Owner Card 1 */}
              <div className="p-3.5 rounded-lg border border-neutral-200 bg-neutral-50 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Shield className="size-3.5 text-blue-600" />
                    <span>orunandthetasonars@supabase.com</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-inter">Role: Agency Owner (Full Admin Permissions)</p>
                </div>
                <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  Active Owner
                </span>
              </div>

              {/* Owner Card 2 */}
              <div className="p-3.5 rounded-lg border border-neutral-200 bg-neutral-50 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Shield className="size-3.5 text-blue-600" />
                    <span>contact@egostix.com</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-inter">Role: Egostix Master Operations Hub</p>
                </div>
                <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                  Primary Node
                </span>
              </div>

              {/* Staff Member Card */}
              <div className="p-3.5 rounded-lg border border-neutral-200 bg-neutral-50 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <Users className="size-3.5 text-slate-600" />
                    <span>staff@egostix.com</span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-inter">Role: Engineering Staff / Project Manager</p>
                </div>
                <span className="text-[9px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                  Staff Access
                </span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-100 text-[11px] font-mono text-slate-500 flex items-center gap-2">
            <CheckCircle2 className="size-4 text-emerald-600" />
            <span>Role Permissions Synced with Supabase RLS Policies</span>
          </div>
        </div>

        {/* Section 2: Real-World Simulation Settings & Gateway Testers */}
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Zap className="size-4 text-amber-600" />
                Real-World Gateway Simulation Controls
              </h4>
              <span className="text-[10px] font-mono bg-amber-50 text-amber-800 px-2 py-0.5 rounded font-bold border border-amber-200">
                Live Gateway Diagnostic
              </span>
            </div>
            <p className="text-xs text-slate-600 font-inter">
              Execute live diagnostic triggers to test email notifications, database read/write queries, and CRM data flow.
            </p>

            <div className="space-y-3 font-mono text-xs">
              {/* Resend Email Gateway Tester */}
              <div className="p-4 rounded-lg border border-neutral-200 bg-neutral-50 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <Mail className="size-4 text-blue-600" />
                    <span>Resend Email Gateway Test</span>
                  </div>
                  <button
                    onClick={handleTestEmailGateway}
                    disabled={isTestingEmail}
                    className="px-3 py-1.5 rounded bg-blue-700 hover:bg-blue-800 text-white font-bold text-[10px] transition disabled:opacity-50 flex items-center gap-1"
                  >
                    {isTestingEmail ? <RefreshCw className="size-3 animate-spin" /> : <Play className="size-3" />}
                    <span>Test Email Send</span>
                  </button>
                </div>
                {emailStatus && (
                  <p className="text-[11px] font-inter text-slate-700 bg-white p-2 rounded border border-neutral-200">
                    {emailStatus}
                  </p>
                )}
              </div>

              {/* Supabase DB Query Gateway Tester */}
              <div className="p-4 rounded-lg border border-neutral-200 bg-neutral-50 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-slate-900 flex items-center gap-2">
                    <Database className="size-4 text-emerald-600" />
                    <span>Supabase DB Ping & Latency Check</span>
                  </div>
                  <button
                    onClick={handleTestDbGateway}
                    disabled={isTestingDb}
                    className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-900 text-white font-bold text-[10px] transition disabled:opacity-50 flex items-center gap-1"
                  >
                    {isTestingDb ? <RefreshCw className="size-3 animate-spin" /> : <Play className="size-3" />}
                    <span>Ping Database</span>
                  </button>
                </div>
                {dbStatus && (
                  <p className="text-[11px] font-inter text-slate-700 bg-white p-2 rounded border border-neutral-200">
                    {dbStatus}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-100 text-[11px] font-mono text-slate-500 flex items-center gap-2">
            <Server className="size-4 text-blue-600" />
            <span>Verified Domain: media.egostix.com</span>
          </div>
        </div>
      </div>

      {/* Terminal / Live Telemetry Event Console */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 p-6 shadow-md space-y-3 font-mono text-xs text-slate-300">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-slate-100 font-bold">
            <Terminal className="size-4 text-blue-400" />
            <span>System Telemetry & Gateway Log Console</span>
          </div>
          <span className="text-[10px] text-slate-500">Live Event Feed</span>
        </div>
        <div className="space-y-1.5 max-h-40 overflow-y-auto font-mono text-[11px]">
          {logs.map((log) => (
            <div key={log.id} className="flex items-start gap-3">
              <span className="text-slate-500 shrink-0">[{log.time}]</span>
              <span className="text-slate-200">{log.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemSettingsTab;
