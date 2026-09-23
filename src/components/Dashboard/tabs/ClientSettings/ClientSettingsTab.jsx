"use client";

import React, { useState, useEffect } from "react";
import { useDashboard } from "@/components/Dashboard/DashboardContext";
import { sendClientInviteAction } from "@/actions/clients";
import {
  Users,
  CheckCircle2,
  Shield,
  UserCheck,
  Mail,
  Send,
  Loader2,
  AlertCircle,
  Plus,
  Key,
  Layers,
  Building2,
  Sparkles,
  Check,
  RefreshCw
} from "lucide-react";

const AVAILABLE_SERVICES = [
  { id: "AI-Powered Business Website", category: "Websites", label: "AI-Powered Business Website" },
  { id: "SEO Pipeline", category: "Websites", label: "SEO Pipeline" },
  { id: "CRM Sync (HubSpot)", category: "Websites", label: "CRM Sync (HubSpot)" },
  
  { id: "AI Internal Tools (PulseOps ERP)", category: "Internal Tools", label: "AI Internal Tools (PulseOps ERP)" },
  { id: "Database Ops (PostgreSQL)", category: "Internal Tools", label: "Database Ops (PostgreSQL)" },
  { id: "GPS Fleet Analytics Routing", category: "Internal Tools", label: "GPS Fleet Analytics Routing" },

  { id: "AI Workflow Automation", category: "Automation", label: "AI Workflow Automation" },
  { id: "WhatsApp API Integration", category: "Automation", label: "WhatsApp API Integration" },
  { id: "EHR Database Synchronization", category: "Automation", label: "EHR Database Synchronization" },

  { id: "Creator Infrastructure", category: "Creator", label: "Creator Infrastructure" },
  { id: "Stripe Membership Billing", category: "Creator", label: "Stripe Membership Billing" },
  { id: "Mux Video Streaming CDN", category: "Creator", label: "Mux Video Streaming CDN" }
];

const ClientSettingsTab = () => {
  const { clients, activeClient, updateClientDetails, createClientAccount, setSelectedClientSlug } = useDashboard();

  const [activeTabSection, setActiveTabSection] = useState("provision");

  // Active Client Editing State
  const [clientForm, setClientForm] = useState({
    name: activeClient?.name || "",
    ownerName: activeClient?.ownerName || "",
    ownerEmail: activeClient?.ownerEmail || "",
    gaPropertyId: activeClient?.gaPropertyId || "",
    activeServices: activeClient?.activeServices || []
  });

  // Create New Client Credentials State
  const [newClient, setNewClient] = useState({
    name: "",
    shortName: "",
    ownerName: "",
    ownerEmail: "",
    password: "",
    gaPropertyId: "",
    activeServices: []
  });

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isSendingInvite, setIsSendingInvite] = useState(false);
  const [inviteSuccess, setInviteSuccess] = useState(false);
  const [inviteError, setInviteError] = useState("");

  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);
  const [createError, setCreateError] = useState("");

  useEffect(() => {
    if (activeClient) {
      setClientForm({
        name: activeClient.name || "",
        ownerName: activeClient.ownerName || "",
        ownerEmail: activeClient.ownerEmail || "",
        gaPropertyId: activeClient.gaPropertyId || activeClient.config?.gpmId || "",
        activeServices: activeClient.activeServices || []
      });
    }
  }, [activeClient]);

  const generateRandomPassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let pwd = "";
    for (let i = 0; i < 12; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewClient((prev) => ({ ...prev, password: pwd }));
  };

  const handleServiceToggle = (serviceId) => {
    setClientForm((prev) => {
      const exists = prev.activeServices.includes(serviceId);
      const updated = exists
        ? prev.activeServices.filter((s) => s !== serviceId)
        : [...prev.activeServices, serviceId];
      return { ...prev, activeServices: updated };
    });
  };

  const handleNewServiceToggle = (serviceId) => {
    setNewClient((prev) => {
      const exists = prev.activeServices.includes(serviceId);
      const updated = exists
        ? prev.activeServices.filter((s) => s !== serviceId)
        : [...prev.activeServices, serviceId];
      return { ...prev, activeServices: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!activeClient) return;

    await updateClientDetails(activeClient.slug, clientForm);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    setIsCreatingAccount(true);
    setCreateError("");
    setCreateSuccess(false);

    try {
      const res = await createClientAccount(newClient);
      if (res.success) {
        setCreateSuccess(true);
        if (res.slug) {
          setSelectedClientSlug(res.slug);
        }
        setNewClient({
          name: "",
          shortName: "",
          ownerName: "",
          ownerEmail: "",
          password: "",
          gaPropertyId: "",
          activeServices: []
        });
        setTimeout(() => setCreateSuccess(false), 4000);
      } else {
        setCreateError(res.error || "Failed to create client account.");
      }
    } catch (err) {
      setCreateError(err?.message || "Error creating client credentials.");
    } finally {
      setIsCreatingAccount(false);
    }
  };

  const handleSendInvite = async () => {
    if (!clientForm.ownerEmail) {
      setInviteError("Please enter a valid owner email address.");
      return;
    }

    setIsSendingInvite(true);
    setInviteError("");
    setInviteSuccess(false);

    try {
      const res = await sendClientInviteAction(
        activeClient?.slug || "egostix-internal",
        clientForm.name || "Client Portal",
        clientForm.ownerEmail,
        clientForm.ownerName
      );

      if (res.success) {
        setInviteSuccess(true);
        setTimeout(() => setInviteSuccess(false), 4000);
      } else {
        setInviteError(res.error || "Failed to send invite email.");
      }
    } catch (err) {
      setInviteError("An unexpected error occurred while sending email.");
    } finally {
      setIsSendingInvite(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Context Banner */}
      <div className="bg-white rounded-xl border border-neutral-200 p-4 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 sm:gap-6 shadow-sm">
        <div className="space-y-1 sm:space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="p-1.5 sm:p-2 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 shrink-0">
              <Users className="size-4 sm:size-5" />
            </span>
            <h3 className="text-lg sm:text-xl font-mono text-slate-900 font-bold">
              Client Profile & Credentials Manager
            </h3>
          </div>
          <p className="text-xs text-slate-600 max-w-2xl font-inter leading-relaxed">
            Provision internal client credentials, assign service subscriptions, configure Google Analytics/GPM property IDs, and manage client databases.
          </p>
        </div>

        {/* Action Toggle Navigation */}
        <div className="flex items-center bg-neutral-100 p-1 rounded-xl border border-neutral-200 shrink-0 self-start md:self-auto">
          <button
            onClick={() => setActiveTabSection("provision")}
            className={`px-3.5 py-2 rounded-lg text-xs font-mono font-semibold transition ${
              activeTabSection === "provision"
                ? "bg-white text-blue-700 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Provision & Services
          </button>
          <button
            onClick={() => setActiveTabSection("create")}
            className={`px-3.5 py-2 rounded-lg text-xs font-mono font-semibold transition inline-flex items-center gap-1.5 ${
              activeTabSection === "create"
                ? "bg-white text-blue-700 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Plus className="size-3.5 text-blue-700" />
            New Client Account
          </button>
          <button
            onClick={() => setActiveTabSection("database")}
            className={`px-3.5 py-2 rounded-lg text-xs font-mono font-semibold transition ${
              activeTabSection === "database"
                ? "bg-white text-blue-700 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Clients Database ({clients.length})
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 text-green-800 text-xs font-mono shadow-xs">
          <CheckCircle2 className="size-5 text-green-600 shrink-0" />
          <span>Client parameters, GPM Property ID & active services updated successfully!</span>
        </div>
      )}

      {inviteSuccess && (
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3 text-emerald-800 text-xs font-mono shadow-xs">
          <CheckCircle2 className="size-5 text-emerald-600 shrink-0" />
          <span>Login & registration invite email sent successfully to <strong>{clientForm.ownerEmail}</strong>!</span>
        </div>
      )}

      {inviteError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 text-red-800 text-xs font-mono shadow-xs">
          <AlertCircle className="size-5 text-red-500 shrink-0" />
          <span>{inviteError}</span>
        </div>
      )}

      {/* SECTION 1: PROVISIONING & ACTIVE CLIENT SERVICES */}
      {activeTabSection === "provision" && (
        <div className="bg-white rounded-xl border border-neutral-200 p-4 sm:p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-4">
            <div className="space-y-1">
              <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <UserCheck className="size-4 text-blue-700" />
                Active Editing Context: <span className="text-blue-700">{activeClient?.name || "Client Portal"}</span>
              </h4>
              <p className="text-[11px] font-inter text-slate-500">
                Update client credentials, Google Analytics (GPM) Property ID, and provisioned services.
              </p>
            </div>

            <button
              type="button"
              onClick={handleSendInvite}
              disabled={isSendingInvite}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 font-mono text-xs font-semibold transition disabled:opacity-50 min-h-[38px]"
            >
              {isSendingInvite ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  <span>Sending Invite...</span>
                </>
              ) : (
                <>
                  <Send className="size-3.5" />
                  <span>Dispatch Access Email</span>
                </>
              )}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 text-xs font-inter">
            {/* Basic Client Credentials & Info */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
                  Client Organization Name *
                </label>
                <input
                  type="text"
                  required
                  value={clientForm.name}
                  onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                  className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-xs font-inter focus:border-blue-700 focus:outline-none min-h-[44px]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
                  Representative Name *
                </label>
                <input
                  type="text"
                  required
                  value={clientForm.ownerName}
                  onChange={(e) => setClientForm({ ...clientForm, ownerName: e.target.value })}
                  className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-xs font-inter focus:border-blue-700 focus:outline-none min-h-[44px]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
                  Account Owner Email *
                </label>
                <input
                  type="email"
                  required
                  value={clientForm.ownerEmail}
                  onChange={(e) => setClientForm({ ...clientForm, ownerEmail: e.target.value })}
                  className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-xs font-inter focus:border-blue-700 focus:outline-none min-h-[44px]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
                  Google Property / GPM ID
                </label>
                <input
                  type="text"
                  placeholder="e.g. G-8R8XK08XKZ or 432890123"
                  value={clientForm.gaPropertyId}
                  onChange={(e) => setClientForm({ ...clientForm, gaPropertyId: e.target.value })}
                  className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-xs font-mono text-slate-900 focus:border-blue-700 focus:outline-none min-h-[44px]"
                />
              </div>
            </div>

            {/* Service Provisioning Grid */}
            <div className="space-y-3 pt-4 border-t border-neutral-100">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-mono uppercase text-slate-900 font-bold flex items-center gap-2">
                  <Layers className="size-4 text-blue-700" />
                  Provisioned Service Modules & Subscriptions ({clientForm.activeServices.length} Active)
                </label>
                <span className="text-[10px] font-mono text-slate-500">
                  Select services to enable in sidebar
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {AVAILABLE_SERVICES.map((service) => {
                  const isChecked = clientForm.activeServices.includes(service.id);

                  return (
                    <label
                      key={service.id}
                      onClick={() => handleServiceToggle(service.id)}
                      className={`p-3.5 rounded-xl border cursor-pointer transition flex items-start gap-3 select-none ${
                        isChecked
                          ? "border-blue-600 bg-blue-50/50 ring-1 ring-blue-600/30"
                          : "border-neutral-200 bg-white hover:border-neutral-300 hover:bg-neutral-50/50"
                      }`}
                    >
                      <div
                        className={`size-4 rounded border mt-0.5 flex items-center justify-center transition shrink-0 ${
                          isChecked
                            ? "border-blue-700 bg-blue-700 text-white"
                            : "border-neutral-300 bg-white"
                        }`}
                      >
                        {isChecked && <Check className="size-3 stroke-[3]" />}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-mono font-semibold text-slate-900 leading-tight">
                          {service.label}
                        </p>
                        <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wide">
                          Category: {service.category}
                        </span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-neutral-100">
              <button
                type="submit"
                className="py-3 px-6 rounded-lg bg-blue-700 hover:bg-blue-800 active:scale-[0.98] text-white font-mono font-semibold text-xs transition shadow-sm inline-flex items-center gap-2 min-h-[44px]"
              >
                <CheckCircle2 className="size-4" />
                <span>Save Client & Provision Services</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SECTION 2: CREATE INTERNAL CLIENT & CREDENTIALS */}
      {activeTabSection === "create" && (
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-6">
          <div className="border-b border-neutral-100 pb-4">
            <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Plus className="size-4 text-blue-700" />
              Create Internal Client Credentials & Account
            </h4>
            <p className="text-xs font-inter text-slate-500 mt-1">
              Create a new client tenant record, generate secure login credentials, and dispatch invitation email.
            </p>
          </div>

          {createSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3 text-emerald-800 text-xs font-mono shadow-xs">
              <CheckCircle2 className="size-5 text-emerald-600 shrink-0" />
              <span>New client account created successfully! Credentials email dispatched.</span>
            </div>
          )}

          {createError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3 text-red-800 text-xs font-mono shadow-xs">
              <AlertCircle className="size-5 text-red-500 shrink-0" />
              <span>{createError}</span>
            </div>
          )}

          <form onSubmit={handleCreateAccount} className="space-y-6 text-xs font-inter max-w-2xl">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
                  Client Organization Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Dynamics Ltd"
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-xs font-inter focus:border-blue-700 focus:outline-none min-h-[44px]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
                  Short Identifier Slug
                </label>
                <input
                  type="text"
                  placeholder="e.g. apex-dynamics"
                  value={newClient.shortName}
                  onChange={(e) => setNewClient({ ...newClient, shortName: e.target.value })}
                  className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-xs font-inter focus:border-blue-700 focus:outline-none min-h-[44px]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
                  Owner / Representative Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins"
                  value={newClient.ownerName}
                  onChange={(e) => setNewClient({ ...newClient, ownerName: e.target.value })}
                  className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-xs font-inter focus:border-blue-700 focus:outline-none min-h-[44px]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
                  Account Owner Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="sarah@apexdynamics.com"
                  value={newClient.ownerEmail}
                  onChange={(e) => setNewClient({ ...newClient, ownerEmail: e.target.value })}
                  className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-xs font-inter focus:border-blue-700 focus:outline-none min-h-[44px]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
                  Google Property / GPM ID
                </label>
                <input
                  type="text"
                  placeholder="e.g. G-8R8XK08XKZ"
                  value={newClient.gaPropertyId}
                  onChange={(e) => setNewClient({ ...newClient, gaPropertyId: e.target.value })}
                  className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-xs font-mono text-slate-900 focus:border-blue-700 focus:outline-none min-h-[44px]"
                />
              </div>
            </div>

            {/* Password Generator */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
                  Access Password Credential
                </label>
                <button
                  type="button"
                  onClick={generateRandomPassword}
                  className="text-[10px] font-mono text-blue-700 hover:underline flex items-center gap-1 font-semibold"
                >
                  <RefreshCw className="size-3" />
                  Auto-Generate Password
                </button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Enter or generate secure password"
                  value={newClient.password}
                  onChange={(e) => setNewClient({ ...newClient, password: e.target.value })}
                  className="w-full rounded-lg border border-neutral-300 pl-9 pr-3.5 py-2.5 text-xs font-mono focus:border-blue-700 focus:outline-none min-h-[44px]"
                />
                <Key className="absolute left-3 top-3 size-4 text-slate-400" />
              </div>
            </div>

            {/* Initial Service Subscriptions */}
            <div className="space-y-3 pt-3 border-t border-neutral-100">
              <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
                Assign Initial Service Modules
              </label>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {AVAILABLE_SERVICES.map((service) => {
                  const isChecked = newClient.activeServices.includes(service.id);
                  return (
                    <label
                      key={service.id}
                      onClick={() => handleNewServiceToggle(service.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition flex items-center gap-2.5 select-none ${
                        isChecked
                          ? "border-blue-600 bg-blue-50/50"
                          : "border-neutral-200 bg-white hover:border-neutral-300"
                      }`}
                    >
                      <div
                        className={`size-4 rounded border flex items-center justify-center transition shrink-0 ${
                          isChecked
                            ? "border-blue-700 bg-blue-700 text-white"
                            : "border-neutral-300 bg-white"
                        }`}
                      >
                        {isChecked && <Check className="size-3 stroke-[3]" />}
                      </div>
                      <span className="text-xs font-mono font-medium text-slate-800">
                        {service.label}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isCreatingAccount}
                className="py-3 px-6 rounded-lg bg-blue-700 hover:bg-blue-800 active:scale-[0.98] text-white font-mono font-semibold text-xs transition shadow-sm inline-flex items-center gap-2 min-h-[44px]"
              >
                {isCreatingAccount ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    <span>Creating Client Account...</span>
                  </>
                ) : (
                  <>
                    <Plus className="size-4" />
                    <span>Create Account & Send Email Credentials</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SECTION 3: CLIENTS DATABASE & PROFILES */}
      {activeTabSection === "database" && (
        <div className="bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-neutral-100 pb-4">
            <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Building2 className="size-4 text-blue-700" />
              Registered Client Database & Tenant Accounts ({clients.length})
            </h4>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-inter">
              <thead>
                <tr className="border-b border-neutral-200 bg-neutral-50/60 font-mono text-[10px] text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4">Organization</th>
                  <th className="py-3 px-4">Owner Contact</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Services Count</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {clients.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500 font-mono">
                      No client tenant records found in database.
                    </td>
                  </tr>
                ) : (
                  clients.map((client) => {
                    const isSelected = activeClient?.slug === client.slug;

                    return (
                      <tr key={client.slug} className="hover:bg-neutral-50/60 transition">
                        <td className="py-3 px-4 font-mono font-bold text-slate-900">
                          {client.name}
                          <span className="block text-[10px] font-normal text-slate-500">
                            Slug: {client.slug}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-inter text-slate-700">
                          {client.ownerName || "Unassigned"}
                          <span className="block text-[10px] font-mono text-slate-500">
                            {client.ownerEmail || "No Email"}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                            {client.status || "Active"}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-blue-700 font-semibold">
                          {client.activeServices?.length || 0} Modules
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => {
                              setSelectedClientSlug(client.slug);
                              setActiveTabSection("provision");
                            }}
                            className={`text-xs font-mono font-bold px-3 py-1.5 rounded transition ${
                              isSelected
                                ? "bg-blue-700 text-white"
                                : "bg-neutral-100 text-slate-700 hover:bg-neutral-200"
                            }`}
                          >
                            {isSelected ? "Editing Active" : "Select Client"}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientSettingsTab;
