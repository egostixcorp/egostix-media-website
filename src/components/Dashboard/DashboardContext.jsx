"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import { logoutAction } from "@/actions/auth";
import { addTaskAction, moveTaskAction, deleteTaskAction } from "@/actions/kanban";
import { deleteFileAction } from "@/actions/files";
import { requestUpgradeAction, approveUpgradeAction, declineUpgradeAction } from "@/actions/upgrades";
import { addLeadAction, toggleLeadStatusAction } from "@/actions/leads";
import { updateClientAction, createClientAccountAction } from "@/actions/clients";

const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};

export const DashboardProvider = ({ children }) => {
  const [role, setRole] = useState("owner");
  const [selectedClientSlug, setSelectedClientSlug] = useState("egostix-internal");
  const [activeTab, setActiveTab] = useState("overview");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [customProjects, setCustomProjects] = useState([]);

  const [clients, setClients] = useState([]);
  const [kanbanTasks, setKanbanTasks] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [serviceUpgrades, setServiceUpgrades] = useState([]);
  const [leads, setLeads] = useState([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Bootstrap session and data from Supabase
  const refreshSession = useCallback(async () => {
    setIsLoadingData(true);
    try {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        setIsLoggedIn(false);
        setCurrentUser(null);
        setIsLoadingData(false);
        return;
      }

      setIsLoggedIn(true);
      setCurrentUser(session.user);

      // Fetch user profile from Supabase
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .maybeSingle();

      if (profile) {
        if (profile.role) setRole(profile.role);
        if (profile.client_slug) setSelectedClientSlug(profile.client_slug);
      } else {
        // Default role based on email if profile not inserted yet
        const userEmail = session.user.email?.toLowerCase() || "";
        if (
          userEmail.includes("owner") ||
          userEmail.includes("egostix.com")
        ) {
          setRole("owner");
        } else if (userEmail.includes("staff") || userEmail.includes("engineer")) {
          setRole("staff");
        } else {
          setRole("client");
        }
      }

      // Fetch database records (RLS isolates client data automatically)
      const [
        { data: clientsRes },
        { data: profilesRes },
        { data: tasksRes },
        { data: filesRes },
        { data: upgradesRes },
        { data: leadsRes },
        { data: projectsRes }
      ] = await Promise.all([
        supabase.from("clients").select("*"),
        supabase.from("profiles").select("*"),
        supabase.from("kanban_tasks").select("*"),
        supabase.from("uploaded_files").select("*"),
        supabase.from("service_upgrades").select("*"),
        supabase.from("leads").select("*"),
        supabase.from("custom_projects").select("*")
      ]);

      const clientMap = new Map();

      // 1. Process existing clients in clients table
      if (clientsRes) {
        clientsRes.forEach((c) => {
          clientMap.set(c.slug, {
            slug: c.slug,
            name: c.name,
            shortName: c.short_name || c.name,
            logo: c.logo_url || "/egostix-media-trans.png",
            ownerName: c.owner_name,
            ownerEmail: c.owner_email,
            status: c.status || "Active",
            gaPropertyId: c.ga_property_id,
            activeServices: c.active_services || [],
            onboardingCompleted: c.onboarding_completed || false,
            metrics: {
              traffic: c.metric_traffic || "0",
              trafficChange: c.metric_traffic_chg || "+0%",
              leads: c.metric_leads || "0",
              leadsChange: c.metric_leads_chg || "+0%",
              conversionRate: c.metric_conversion || "0.0%",
              conversionChange: c.metric_conv_chg || "+0%",
              aiChatResponseTime: c.metric_ai_latency || "0.0s",
              activeChats: c.metric_active_chats || "0"
            },
            config: c.config || {}
          });
        });
      }

      // 2. Auto-heal: Match profiles with role === 'client' and synthesize missing tenant entries
      if (profilesRes) {
        const clientProfiles = profilesRes.filter((p) => p.role === "client");
        for (const prof of clientProfiles) {
          const expectedSlug =
            prof.client_slug ||
            (prof.company_name
              ? prof.company_name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-")
              : prof.email
              ? prof.email.split("@")[0].toLowerCase().replace(/[^a-z0-9]+/g, "-")
              : `client-${prof.id.slice(0, 6)}`);

          // Check if already mapped by slug or email
          const existingClient =
            clientMap.get(expectedSlug) ||
            Array.from(clientMap.values()).find((c) => c.ownerEmail === prof.email);

          if (!existingClient) {
            const synthesizedClient = {
              slug: expectedSlug,
              name: prof.company_name || prof.name || prof.full_name || "Client Portal",
              shortName: (prof.company_name || prof.name || "Client").split(" ")[0],
              logo: prof.avatar_url || "/egostix-media-trans.png",
              ownerName: prof.full_name || prof.name || "Client Owner",
              ownerEmail: prof.email || "",
              status: "Active",
              activeServices: ["AI-Powered Business Website"],
              onboardingCompleted: prof.onboarding_completed || false,
              metrics: {
                traffic: "0",
                trafficChange: "+0%",
                leads: "0",
                leadsChange: "+0%",
                conversionRate: "0.0%",
                conversionChange: "+0%",
                aiChatResponseTime: "0.0s",
                activeChats: "0"
              },
              config: {}
            };

            clientMap.set(expectedSlug, synthesizedClient);

            // Auto-heal database row asynchronously
            supabase.from("clients").upsert({
              slug: expectedSlug,
              name: synthesizedClient.name,
              short_name: synthesizedClient.shortName,
              owner_name: synthesizedClient.ownerName,
              owner_email: synthesizedClient.ownerEmail,
              status: "Active",
              active_services: synthesizedClient.activeServices,
              created_at: new Date().toISOString()
            }).then(({ error }) => {
              if (error) console.warn("Auto-heal client record upsert warning:", error.message);
            });
          }
        }
      }

      setClients(Array.from(clientMap.values()));

      if (tasksRes) {
        setKanbanTasks(
          tasksRes.map((t) => ({
            id: t.id,
            clientSlug: t.client_slug,
            title: t.title,
            description: t.description,
            status: t.status,
            priority: t.priority,
            dueDate: t.due_date
          }))
        );
      } else {
        setKanbanTasks([]);
      }

      if (filesRes) {
        setUploadedFiles(
          filesRes.map((f) => ({
            id: f.id,
            clientSlug: f.client_slug,
            name: f.name,
            size: f.size ? `${(f.size / (1024 * 1024)).toFixed(1)} MB` : "Unknown",
            type: f.type,
            storagePath: f.storage_path,
            uploadedBy: f.uploaded_by || "User",
            uploadedAt: f.created_at ? f.created_at.split("T")[0] : "",
            status: f.status || "Uploaded"
          }))
        );
      } else {
        setUploadedFiles([]);
      }

      if (upgradesRes) {
        setServiceUpgrades(
          upgradesRes.map((u) => ({
            id: u.id,
            clientSlug: u.client_slug,
            serviceName: u.service_name,
            description: u.description,
            requestedAt: u.requested_at ? u.requested_at.split("T")[0] : "",
            status: u.status
          }))
        );
      } else {
        setServiceUpgrades([]);
      }

      if (leadsRes) {
        setLeads(
          leadsRes.map((l) => ({
            id: l.id,
            clientSlug: l.client_slug,
            name: l.name,
            email: l.email,
            phone: l.phone,
            query: l.query,
            date: l.created_at ? l.created_at.replace("T", " ").slice(0, 16) : "",
            status: l.status,
            chatLog: l.chat_log || []
          }))
        );
      } else {
        setLeads([]);
      }

      if (projectsRes) {
        setCustomProjects(projectsRes);
      } else {
        setCustomProjects([]);
      }
    } catch (err) {
      console.error("Error refreshing Supabase dashboard session:", err);
    } finally {
      setIsLoadingData(false);
    }
  }, []);

  useEffect(() => {
    refreshSession();

    const supabase = createClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setIsLoggedIn(true);
        setCurrentUser(session.user);
      } else {
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [refreshSession]);

  const updateClientDetails = async (slug, updatedFields) => {
    // Optimistic state update
    setClients((prev) =>
      prev.map((client) =>
        client.slug === slug ? { ...client, ...updatedFields } : client
      )
    );
    // Server action sync
    await updateClientAction(slug, {
      name: updatedFields.name,
      short_name: updatedFields.shortName,
      owner_name: updatedFields.ownerName,
      owner_email: updatedFields.ownerEmail,
      ga_property_id: updatedFields.gaPropertyId,
      active_services: updatedFields.activeServices,
      config: updatedFields.config
    });
  };

  const createClientAccount = async (clientData) => {
    const res = await createClientAccountAction(clientData);
    if (res.success) {
      await refreshSession();
    }
    return res;
  };

  const addKanbanTask = async (task) => {
    const targetSlug = task.clientSlug || selectedClientSlug;
    const newTaskObj = {
      id: `temp-${Date.now()}`,
      clientSlug: targetSlug,
      title: task.title || "New Task",
      description: task.description || "",
      status: "backlog",
      priority: task.priority || "medium",
      dueDate: task.dueDate || null
    };
    setKanbanTasks((prev) => [...prev, newTaskObj]);

    const res = await addTaskAction({
      client_slug: targetSlug,
      title: task.title,
      description: task.description,
      priority: task.priority,
      due_date: task.dueDate
    });

    if (res.success && res.task) {
      setKanbanTasks((prev) =>
        prev.map((t) => (t.id === newTaskObj.id ? { ...t, id: res.task.id } : t))
      );
    }
  };

  const moveKanbanTask = async (taskId, newStatus) => {
    setKanbanTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
    );
    await moveTaskAction(taskId, newStatus);
  };

  const deleteKanbanTask = async (taskId) => {
    setKanbanTasks((prev) => prev.filter((task) => task.id !== taskId));
    await deleteTaskAction(taskId);
  };

  const deleteFile = async (id, storagePath) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
    await deleteFileAction(id, storagePath || "");
  };

  const requestUpgrade = async (serviceName, description) => {
    const tempUpgrade = {
      id: `temp-${Date.now()}`,
      clientSlug: selectedClientSlug,
      serviceName,
      description,
      requestedAt: new Date().toISOString().split("T")[0],
      status: "pending"
    };
    setServiceUpgrades((prev) => [...prev, tempUpgrade]);
    await requestUpgradeAction(selectedClientSlug, serviceName, description);
  };

  const approveUpgrade = async (upgradeId) => {
    setServiceUpgrades((prev) =>
      prev.map((u) => (u.id === upgradeId ? { ...u, status: "approved" } : u))
    );
    await approveUpgradeAction(upgradeId);
  };

  const declineUpgrade = async (upgradeId) => {
    setServiceUpgrades((prev) =>
      prev.map((u) => (u.id === upgradeId ? { ...u, status: "declined" } : u))
    );
    await declineUpgradeAction(upgradeId);
  };

  const addLead = async (lead) => {
    const tempLead = {
      id: `temp-${Date.now()}`,
      clientSlug: selectedClientSlug,
      date: new Date().toISOString().replace("T", " ").slice(0, 16),
      status: "hot",
      chatLog: [],
      ...lead
    };
    setLeads((prev) => [tempLead, ...prev]);
    await addLeadAction({
      client_slug: selectedClientSlug,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      query: lead.query
    });
  };

  const toggleLeadStatus = async (leadId, nextStatus) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, status: nextStatus } : lead))
    );
    await toggleLeadStatusAction(leadId, nextStatus);
  };

  const logout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      await logoutAction();
    } catch (e) {
      console.error("Error signing out:", e);
    } finally {
      setIsLoggedIn(false);
      setCurrentUser(null);
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }
  };

  const activeClient = clients.find((c) => c.slug === selectedClientSlug) || clients[0] || null;

  useEffect(() => {
    setActiveTab("overview");
  }, [role, selectedClientSlug]);

  return (
    <DashboardContext.Provider
      value={{
        role,
        setRole,
        selectedClientSlug,
        setSelectedClientSlug,
        activeTab,
        setActiveTab,
        clients,
        activeClient,
        kanbanTasks,
        uploadedFiles,
        serviceUpgrades,
        leads,
        addKanbanTask,
        moveKanbanTask,
        deleteKanbanTask,
        deleteFile,
        requestUpgrade,
        approveUpgrade,
        declineUpgrade,
        addLead,
        toggleLeadStatus,
        isLoggedIn,
        currentUser,
        refreshSession,
        logout,
        customProjects,
        updateClientDetails,
        createClientAccount,
        isLoadingData
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
