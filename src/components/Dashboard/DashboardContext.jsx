"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const DashboardContext = createContext();

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};

export const DashboardProvider = ({ children }) => {
  // Simulator State
  const [role, setRole] = useState("owner"); // Default simulated role to owner so they start in the admin internal console
  const [selectedClientSlug, setSelectedClientSlug] = useState("egostix-internal");
  const [activeTab, setActiveTab] = useState("overview");

  // Auth Simulator State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [customProjects, setCustomProjects] = useState([]);



  // Database of clients and their active systems/metrics
  const [clients, setClients] = useState([
    {
      slug: "egostix-internal",
      name: "Egostix Media (Internal Agency)",
      shortName: "Egostix Media",
      logo: "/egostix-media-trans.png",
      ownerName: "Titas (Owner)",
      ownerEmail: "contact@egostix.com",
      status: "Internal",
      activeServices: [],
      metrics: {
        traffic: "45,200",
        trafficChange: "+12.4%",
        leads: "142",
        leadsChange: "+18%",
        conversionRate: "6.2%",
        conversionChange: "+1.2%",
        aiChatResponseTime: "1.2s",
        activeChats: "5"
      }
    },
    {
      slug: "apex-realty-platform",
      name: "Apex Luxury Real Estate Group",
      shortName: "Apex Realty",
      logo: "/apex-realty.jpg",
      ownerName: "Sarah Jenkins",
      ownerEmail: "sarah@apexrealty.com",
      status: "Active",
      activeServices: [
        "AI-Powered Business Website",
        "SEO Pipeline",
        "CRM Sync (HubSpot)"
      ],
      metrics: {
        traffic: "12,480",
        trafficChange: "+18%",
        leads: "294",
        leadsChange: "+24%",
        conversionRate: "4.8%",
        conversionChange: "+0.8%",
        aiChatResponseTime: "2.8s",
        activeChats: "14"
      }
    },
    {
      slug: "pulse-ops-erp",
      name: "Pulse Logistics & Distribution",
      shortName: "Pulse Logistics",
      logo: "/pulse-ops.jpg",
      ownerName: "David Chen",
      ownerEmail: "dchen@pulselogistics.com",
      status: "Active",
      activeServices: [
        "AI Internal Tools (PulseOps ERP)",
        "Database Ops (PostgreSQL)",
        "GPS Fleet Analytics Routing"
      ],
      metrics: {
        traffic: "1,850",
        trafficChange: "+2%",
        leads: "74",
        leadsChange: "+15%",
        conversionRate: "12.4%",
        conversionChange: "+2.1%",
        aiChatResponseTime: "1.5s",
        activeChats: "2"
      }
    },
    {
      slug: "chronos-support-engine",
      name: "Chronos Health & Wellness",
      shortName: "Chronos Health",
      logo: "/chronos-automation.jpg",
      ownerName: "Dr. Amanda Ross",
      ownerEmail: "dr.ross@chronoshealth.com",
      status: "Active",
      activeServices: [
        "AI Workflow Automation",
        "WhatsApp API Integration",
        "EHR Database Synchronization"
      ],
      metrics: {
        traffic: "8,920",
        trafficChange: "+12%",
        leads: "512",
        leadsChange: "+38%",
        conversionRate: "8.2%",
        conversionChange: "+1.9%",
        aiChatResponseTime: "2.1s",
        activeChats: "28"
      }
    },
    {
      slug: "synth-academy",
      name: "Synth Academy & Labs",
      shortName: "Synth Academy",
      logo: "/synth-academy.jpg",
      ownerName: "Marcus Vance",
      ownerEmail: "marcus@synthlabs.io",
      status: "Active",
      activeServices: [
        "Creator Infrastructure",
        "Stripe Membership Billing",
        "Mux Video Streaming CDN"
      ],
      metrics: {
        traffic: "45,210",
        trafficChange: "+42%",
        leads: "1,240",
        leadsChange: "+56%",
        conversionRate: "6.1%",
        conversionChange: "+1.2%",
        aiChatResponseTime: "1.9s",
        activeChats: "54"
      }
    }
  ]);

  // Kanban tasks
  const [kanbanTasks, setKanbanTasks] = useState([
    // Apex Realty
    {
      id: "t-1",
      clientSlug: "apex-realty-platform",
      title: "Integrate HubSpot Webhook",
      description: "Setup automated CRM payload sync whenever a luxury lead schedules a viewing via AI Concierge.",
      status: "deployed",
      priority: "high",
      dueDate: "2026-06-15"
    },
    {
      id: "t-2",
      clientSlug: "apex-realty-platform",
      title: "Optimize Conversational Prompts",
      description: "Fine-tune AI concierge instructions to emphasize the new penthouses at 5th Avenue and gather budget filters.",
      status: "review",
      priority: "medium",
      dueDate: "2026-06-25"
    },
    {
      id: "t-3",
      clientSlug: "apex-realty-platform",
      title: "Configure Dynamic SEO Routing",
      description: "Set up server-side metadata generation for listing detail pages to boost organic local search queries.",
      status: "in-progress",
      priority: "high",
      dueDate: "2026-06-28"
    },
    {
      id: "t-4",
      clientSlug: "apex-realty-platform",
      title: "Design Custom Lead Insights Board",
      description: "Build an internal analytics screen for broker reviews displaying conversation histories and scheduling metrics.",
      status: "backlog",
      priority: "low",
      dueDate: "2026-07-10"
    },
    // Pulse Logistics
    {
      id: "t-5",
      clientSlug: "pulse-ops-erp",
      title: "Optimize Dispatch Route Matrix",
      description: "Refactor route calculations to accommodate multi-stop distribution orders using Google Maps API.",
      status: "deployed",
      priority: "high",
      dueDate: "2026-06-10"
    },
    {
      id: "t-6",
      clientSlug: "pulse-ops-erp",
      title: "Warehouse Inventory Stock Trigger",
      description: "Write automatic trigger hooks to dispatch supplier purchase emails when SKU levels drop below 15%.",
      status: "in-progress",
      priority: "high",
      dueDate: "2026-06-30"
    },
    {
      id: "t-7",
      clientSlug: "pulse-ops-erp",
      title: "Driver Companion Mobile Fixes",
      description: "Resolve coordinate display glitch on signature capture component for Android tablets.",
      status: "review",
      priority: "medium",
      dueDate: "2026-06-24"
    },
    // Chronos Health
    {
      id: "t-8",
      clientSlug: "chronos-support-engine",
      title: "WhatsApp API Client Onboarding",
      description: "Secure WhatsApp verified sender token and map incoming payload callbacks to EHR router.",
      status: "deployed",
      priority: "high",
      dueDate: "2026-05-20"
    },
    {
      id: "t-9",
      clientSlug: "chronos-support-engine",
      title: "Build Follow-up Appointment Loops",
      description: "Schedule automated feedback requests 48 hours post-treatment with patient compliance checks.",
      status: "in-progress",
      priority: "medium",
      dueDate: "2026-07-02"
    },
    // Synth Academy
    {
      id: "t-10",
      clientSlug: "synth-academy",
      title: "Deploy Course Portal Video Player",
      description: "Hook up Mux streaming token layers to secure lessons behind active subscription paywalls.",
      status: "deployed",
      priority: "high",
      dueDate: "2026-06-05"
    },
    {
      id: "t-11",
      clientSlug: "synth-academy",
      title: "Automate Transcription Pipeline",
      description: "Write serverless worker that transcribes lessons and generates outlines when videos finish rendering.",
      status: "in-progress",
      priority: "medium",
      dueDate: "2026-07-05"
    }
  ]);

  // Uploaded Files (contracts, policies, brand assets)
  const [uploadedFiles, setUploadedFiles] = useState([
    {
      id: "f-1",
      clientSlug: "apex-realty-platform",
      name: "Apex_Realty_Service_Agreement.pdf",
      size: "2.4 MB",
      type: "PDF Document",
      uploadedBy: "Sarah Jenkins (Client)",
      uploadedAt: "2026-01-12",
      status: "Verified"
    },
    {
      id: "f-2",
      clientSlug: "apex-realty-platform",
      name: "brand_assets_vector_logo.svg",
      size: "450 KB",
      type: "SVG Vector",
      uploadedBy: "Sarah Jenkins (Client)",
      uploadedAt: "2026-02-18",
      status: "Verified"
    },
    {
      id: "f-3",
      clientSlug: "apex-realty-platform",
      name: "egostix_media_context.md",
      size: "13 KB",
      type: "Markdown File",
      uploadedBy: "Titas (Staff)",
      uploadedAt: "2026-06-22",
      status: "Synced"
    },
    {
      id: "f-4",
      clientSlug: "pulse-ops-erp",
      name: "pulse_logistics_database_schema.sql",
      size: "82 KB",
      type: "SQL Script",
      uploadedBy: "David Chen (Client)",
      uploadedAt: "2026-04-05",
      status: "Verified"
    },
    {
      id: "f-5",
      clientSlug: "chronos-support-engine",
      name: "clinic_workflow_rules.docx",
      size: "1.2 MB",
      type: "Word Document",
      uploadedBy: "Dr. Amanda Ross (Client)",
      uploadedAt: "2026-05-14",
      status: "Verified"
    }
  ]);

  // Requested upgrades
  const [serviceUpgrades, setServiceUpgrades] = useState([
    {
      id: "u-1",
      clientSlug: "apex-realty-platform",
      serviceName: "AI Internal Tool Dashboard",
      description: "Need a comprehensive CRM dashboard with AI scoring metrics for property brokers.",
      requestedAt: "2026-06-20",
      status: "pending"
    },
    {
      id: "u-2",
      clientSlug: "chronos-support-engine",
      serviceName: "WhatsApp Automation Extension",
      description: "Scale WhatsApp notifications to include automated patient prescription confirmations.",
      requestedAt: "2026-06-18",
      status: "approved"
    }
  ]);

  // Leads captured by AI on client systems
  const [leads, setLeads] = useState([
    {
      id: "l-1",
      clientSlug: "apex-realty-platform",
      name: "Robert Henderson",
      email: "r.henderson@globalventure.com",
      phone: "+1 (555) 019-2834",
      query: "Interested in the 5th Avenue Penthouse. Budget $4.2M.",
      date: "2026-06-22 14:32",
      status: "hot",
      chatLog: [
        { sender: "customer", text: "Hi, I am looking at your listings on 5th Avenue. Are there penthouses available?" },
        { sender: "ai", text: "Hello! Yes, we have two premium penthouses available on 5th Avenue. Penthouse A is a 4-bedroom with a wrap-around terrace priced at $4.2M, and Penthouse B is a 3-bedroom priced at $3.8M. Would you like to check the floorplans?" },
        { sender: "customer", text: "Yes, Penthouse A fits my budget. I'd like to schedule a private viewing." },
        { sender: "ai", text: "Excellent choice. I can schedule a private broker tour for you. Are you available this Thursday afternoon or Saturday morning?" },
        { sender: "customer", text: "Saturday morning works best. Let's do 10:00 AM." },
        { sender: "ai", text: "Perfect. I have registered Saturday at 10:00 AM. I am logging this inquiry and sending the floorplans to r.henderson@globalventure.com. Our senior broker will follow up shortly to confirm." }
      ]
    },
    {
      id: "l-2",
      clientSlug: "apex-realty-platform",
      name: "Elena Rostova",
      email: "elena.rostova@techcorp.io",
      phone: "+44 20 7946 0958",
      query: "Relocating. Budget $1.8M. Wants modern apartment close to financial center.",
      date: "2026-06-21 09:15",
      status: "warm",
      chatLog: [
        { sender: "customer", text: "Looking for an apartment close to the financial district. Budget is under 2 million." },
        { sender: "ai", text: "Welcome! We have beautiful listings in the Plaza District and Financial Center starting at $1.5M. They feature automated layouts and high-speed workspaces. Would you like me to send you the curated list?" },
        { sender: "customer", text: "Yes please, send them to elena.rostova@techcorp.io" },
        { sender: "ai", text: "I have queued the listings. You should receive them in a few seconds. I will also notify our district agent to coordinate." }
      ]
    },
    {
      id: "l-3",
      clientSlug: "chronos-support-engine",
      name: "Thomas Miller",
      email: "tmiller99@gmail.com",
      phone: "+91 98300 12345",
      query: "Rescheduled acupuncture session for Wednesday.",
      date: "2026-06-22 17:05",
      status: "responded",
      chatLog: [
        { sender: "customer", text: "Can I move my appointment tomorrow to Wednesday?" },
        { sender: "ai", text: "Let me check the database for your record. You have an acupuncture session booked for tomorrow at 2:00 PM. On Wednesday, we have slots at 11:00 AM and 4:30 PM. Which one would you prefer?" },
        { sender: "customer", text: "Wednesday at 4:30 PM works. Thank you." },
        { sender: "ai", text: "Done! Your acupuncture appointment has been moved to Wednesday, June 24th at 4:30 PM. I have updated the electronic database. A confirmation text has been dispatched." }
      ]
    }
  ]);

  // Load session storage states on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUser = sessionStorage.getItem("egostix_session_user");
      const savedRole = sessionStorage.getItem("egostix_session_role");
      const savedSlug = sessionStorage.getItem("egostix_session_slug");
      if (savedUser && savedRole) {
        setCurrentUser(JSON.parse(savedUser));
        setRole(savedRole);
        if (savedSlug) setSelectedClientSlug(savedSlug);
        setIsLoggedIn(true);
      }

      const savedClients = sessionStorage.getItem("egostix_session_clients");
      if (savedClients) {
        const parsed = JSON.parse(savedClients);
        if (!parsed.some(c => c.slug === "egostix-internal")) {
          parsed.unshift({
            slug: "egostix-internal",
            name: "Egostix Media (Internal Agency)",
            shortName: "Egostix Media",
            logo: "/egostix-media-trans.png",
            ownerName: "Titas (Owner)",
            ownerEmail: "contact@egostix.com",
            status: "Internal",
            activeServices: [],
            metrics: {
              traffic: "45,200",
              trafficChange: "+12.4%",
              leads: "142",
              leadsChange: "+18%",
              conversionRate: "6.2%",
              conversionChange: "+1.2%",
              aiChatResponseTime: "1.2s",
              activeChats: "5"
            }
          });
        }
        setClients(parsed);
      }

      const savedCustomProjects = sessionStorage.getItem("egostix_session_custom_projects");
      if (savedCustomProjects) {
        setCustomProjects(JSON.parse(savedCustomProjects));
      }
    }
  }, []);

  // Save clients to sessionStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("egostix_session_clients", JSON.stringify(clients));
    }
  }, [clients]);

  // Save custom projects to sessionStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("egostix_session_custom_projects", JSON.stringify(customProjects));
    }
  }, [customProjects]);

  const updateClientDetails = (slug, updatedFields) => {
    setClients((prev) =>
      prev.map((client) =>
        client.slug === slug ? { ...client, ...updatedFields } : client
      )
    );
  };

  const publishProject = (newProj) => {
    const slug = newProj.title.toLowerCase().trim()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");

    const project = {
      slug,
      category: newProj.category || "real-world",
      title: newProj.title,
      subtitle: newProj.subtitle || `${newProj.title} custom system.`,
      client: newProj.client || "Egostix Internal Project",
      service: newProj.service || "AI-Powered Business Websites",
      year: newProj.year || new Date().getFullYear().toString(),
      summary: newProj.summary,
      image: "/egostix-media-trans.png", // fallback logo/image
      accentColor: "blue",
      tags: newProj.tags ? newProj.tags.split(",").map(t => t.trim()) : ["AI", "Web System"],
      metrics: [
        { value: newProj.metric1Value || "+10%", label: newProj.metric1Label || "Performance Boost" },
        { value: newProj.metric2Value || "99.9%", label: newProj.metric2Label || "System Uptime" },
        { value: newProj.metric3Value || "Instant", label: newProj.metric3Label || "Response Time" }
      ],
      challenge: [
        newProj.challenge || "The client required an automated workspace platform to streamline operations and eliminate manual coordination delays."
      ],
      solution: [
        newProj.solution || "We engineered an intelligent hub integrating responsive dashboards, custom database pipelines, and real-time alerts."
      ],
      results: [
        newProj.results || "The deployment resulted in significantly reduced latency, higher tracking accuracy, and reduced administrative load."
      ],
      mockups: []
    };

    setCustomProjects((prev) => [project, ...prev]);
  };

  // Handle updates dynamically to persist state change inside user session
  const addKanbanTask = (task) => {
    const newTask = {
      id: `t-${Date.now()}`,
      clientSlug: selectedClientSlug,
      status: "backlog",
      priority: "medium",
      dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
      ...task
    };
    setKanbanTasks((prev) => [...prev, newTask]);
  };

  const moveKanbanTask = (taskId, newStatus) => {
    setKanbanTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
    );
  };

  const deleteKanbanTask = (taskId) => {
    setKanbanTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const uploadFile = (name, size, type) => {
    const newFile = {
      id: `f-${Date.now()}`,
      clientSlug: selectedClientSlug,
      name,
      size,
      type,
      uploadedBy: role === "client" ? "Sarah Jenkins (Client)" : `Titas (${role === "staff" ? "Staff" : "Owner"})`,
      uploadedAt: new Date().toISOString().split("T")[0],
      status: role === "client" ? "Uploaded" : "Synced"
    };
    setUploadedFiles((prev) => [...prev, newFile]);
  };

  const deleteFile = (id) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const requestUpgrade = (serviceName, description) => {
    const newUpgrade = {
      id: `u-${Date.now()}`,
      clientSlug: selectedClientSlug,
      serviceName,
      description,
      requestedAt: new Date().toISOString().split("T")[0],
      status: "pending"
    };
    setServiceUpgrades((prev) => [...prev, newUpgrade]);
  };

  const approveUpgrade = (upgradeId) => {
    const upgrade = serviceUpgrades.find((u) => u.id === upgradeId);
    if (!upgrade) return;

    // Approve the request
    setServiceUpgrades((prev) =>
      prev.map((u) => (u.id === upgradeId ? { ...u, status: "approved" } : u))
    );

    // Add service to client's active services
    setClients((prev) =>
      prev.map((client) => {
        if (client.slug === upgrade.clientSlug) {
          if (!client.activeServices.includes(upgrade.serviceName)) {
            return {
              ...client,
              activeServices: [...client.activeServices, upgrade.serviceName]
            };
          }
        }
        return client;
      })
    );
  };

  const declineUpgrade = (upgradeId) => {
    setServiceUpgrades((prev) =>
      prev.map((u) => (u.id === upgradeId ? { ...u, status: "declined" } : u))
    );
  };

  const addLead = (lead) => {
    const newLead = {
      id: `l-${Date.now()}`,
      clientSlug: selectedClientSlug,
      date: new Date().toISOString().replace("T", " ").slice(0, 16),
      status: "hot",
      chatLog: [],
      ...lead
    };
    setLeads((prev) => [newLead, ...prev]);
  };

  const toggleLeadStatus = (leadId, nextStatus) => {
    setLeads((prev) =>
      prev.map((lead) => (lead.id === leadId ? { ...lead, status: nextStatus } : lead))
    );
  };

  const activeClient = clients.find((c) => c.slug === selectedClientSlug) || clients[0];

  // Auth helper methods
  const login = (email, password) => {
    let simulatedRole = "client";
    let slug = "apex-realty-platform";
    let name = "Sarah Jenkins";

    if (email.includes("owner@egostix.com")) {
      simulatedRole = "owner";
      name = "Arun & Titas";
    } else if (email.includes("staff@egostix.com") || email.includes("engineer@egostix.com")) {
      simulatedRole = "staff";
      name = "Titas";
    } else if (email.includes("david@pulse.com") || email.includes("pulse")) {
      simulatedRole = "client";
      slug = "pulse-ops-erp";
      name = "David Chen";
    } else if (email.includes("ross@chronos.com") || email.includes("chronos")) {
      simulatedRole = "client";
      slug = "chronos-support-engine";
      name = "Dr. Amanda Ross";
    } else if (email.includes("marcus@synth.com") || email.includes("synth")) {
      simulatedRole = "client";
      slug = "synth-academy";
      name = "Marcus Vance";
    }

    setRole(simulatedRole);
    setSelectedClientSlug(slug);
    setCurrentUser({ email, name });
    setIsLoggedIn(true);

    if (typeof window !== "undefined") {
      sessionStorage.setItem("egostix_session_user", JSON.stringify({ email, name }));
      sessionStorage.setItem("egostix_session_role", simulatedRole);
      sessionStorage.setItem("egostix_session_slug", slug);
    }
    return true;
  };

  const signup = (name, email, password, companyName) => {
    const slug = companyName.toLowerCase().replace(/\s+/g, "-");
    const newClient = {
      slug,
      name: companyName,
      shortName: companyName.split(" ")[0],
      logo: "/egostix-media-trans.png",
      ownerName: name,
      ownerEmail: email,
      status: "Active",
      activeServices: ["AI-Powered Business Website"],
      metrics: {
        traffic: "0",
        trafficChange: "+0%",
        leads: "0",
        leadsChange: "+0%",
        conversionRate: "0.0%",
        conversionChange: "+0%",
        aiChatResponseTime: "0.0s",
        activeChats: "0"
      }
    };

    setClients((prev) => [...prev, newClient]);
    setRole("client");
    setSelectedClientSlug(slug);
    setCurrentUser({ email, name });
    setIsLoggedIn(true);

    if (typeof window !== "undefined") {
      sessionStorage.setItem("egostix_session_user", JSON.stringify({ email, name }));
      sessionStorage.setItem("egostix_session_role", "client");
      sessionStorage.setItem("egostix_session_slug", slug);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("egostix_session_user");
      sessionStorage.removeItem("egostix_session_role");
      sessionStorage.removeItem("egostix_session_slug");
    }
  };

  // Auto route tab context and adjust client context when switching roles
  useEffect(() => {
    setActiveTab("overview");
    if (role === "client" && selectedClientSlug === "egostix-internal") {
      setSelectedClientSlug("apex-realty-platform");
    }
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
        uploadFile,
        deleteFile,
        requestUpgrade,
        approveUpgrade,
        declineUpgrade,
        addLead,
        toggleLeadStatus,
        isLoggedIn,
        currentUser,
        login,
        signup,
        logout,
        customProjects,
        updateClientDetails,
        publishProject
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
