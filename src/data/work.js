export const projects = [
  // --- REAL WORLD DELIVERIES ---
  {
    slug: "apex-realty-platform",
    category: "real-world",
    title: "Apex Realty Platform",
    subtitle: "AI-first lead generation and customer acquisition web system for luxury real estate.",
    client: "Apex Luxury Real Estate Group",
    service: "AI-Powered Business Websites",
    year: "2025",
    summary: "A high-performance lead generation web system for a luxury real estate brokerage. Integrates a custom AI assistant that conducts initial client onboarding, schedules property viewings, and syncs directly with their CRM.",
    image: "/apex-realty.jpg",
    accentColor: "blue",
    tags: ["Next.js", "Tailwind CSS", "OpenAI API", "HubSpot CRM", "Dynamic SEO"],
    metrics: [
      { value: "+40%", label: "Property Viewings Scheduled" },
      { value: "65%", label: "Faster Response Times" },
      { value: "+2.4x", label: "Lead-to-Booking Rate" }
    ],
    challenge: [
      "Apex Luxury Real Estate Group faced a persistent issue with off-hours lead acquisition. High-net-worth international clients browsing listings in different time zones were forced to wait up to 24 hours for a response from human agents.",
      "This delay resulted in a low lead-to-booking conversion rate, as potential buyers lost interest or scheduled appointments with competitors. Furthermore, human agents spent excessive time on basic qualification questions (budget, timeline, location preferences) instead of closing high-value deals."
    ],
    solution: [
      "We engineered a custom AI-Powered Business Website utilizing Next.js for server-side rendering and exceptional performance. The core of the platform is an embedded, context-aware AI Concierge trained on the agency's current listings and localized real estate guidelines.",
      "The AI agent engages visitors in natural conversation, answering detailed questions about properties, analyzing buying criteria, and automatically scheduling viewings. The entire system connects via webhooks to HubSpot CRM, instantly tagging qualified leads and scheduling live broker calls when needed."
    ],
    results: [
      "Since launching the system, Apex has seen a 40% increase in scheduled property viewings, with over half of them booked during non-business hours.",
      "Response times plummeted from a 12-hour average to less than 3 seconds. The automated qualification workflow has saved human brokers an estimated 15 hours per week, allowing them to focus entirely on prepared, high-intent buyers."
    ],
    mockups: [
      {
        title: "Properties Portal",
        description: "The desktop landing view featuring fast spatial maps, luxury property filters, and clean high-end typography.",
        type: "desktop",
        badge: "Client Facing",
        image: "/apex-realty-desktop.jpg"
      },
      {
        title: "AI Booking Assistant",
        description: "The mobile conversational drawer that assists clients, gathers budget preferences, and offers instant viewing slots.",
        type: "mobile",
        badge: "AI Onboarding",
        image: "/apex-realty-chat.jpg"
      },
      {
        title: "Lead Insights Dashboard",
        description: "Admin workspace where brokers monitor hot lead scoring, conversation logs, and view upcoming auto-scheduled appointments.",
        type: "analytics",
        badge: "Internal Ops",
        image: "/apex-realty-leads.jpg"
      }
    ]
  },
  {
    slug: "pulse-ops-erp",
    category: "real-world",
    title: "PulseOps ERP",
    subtitle: "Custom operational software and intelligent dashboard optimizing SMB supply chains.",
    client: "Pulse Logistics & Distribution",
    service: "AI Internal Tools for SMBs",
    year: "2025",
    summary: "A custom operational dashboard and inventory intelligence platform for a regional shipping firm. Eliminates spreadsheets by automating routing, inventory tracking, and client invoicing.",
    image: "/pulse-ops.jpg",
    accentColor: "slate",
    tags: ["React", "Express.js", "PostgreSQL", "Google Maps API", "Predictive Analytics"],
    metrics: [
      { value: "25 hrs", label: "Saved Weekly Per Dispatcher" },
      { value: "99.8%", label: "Inventory Tracking Accuracy" },
      { value: "-18%", label: "Reduction in Fuel Costs" }
    ],
    challenge: [
      "Pulse Logistics relied heavily on a complex web of Excel spreadsheets, legacy databases, and manual phone calls to manage their shipping fleet and warehouse inventories.",
      "Dispatchers wasted hours daily resolving conflicts between scheduled routes and actual inventory levels. This lack of integration caused frequent shipping errors, delayed deliveries, and rising fuel expenses from inefficient route planning."
    ],
    solution: [
      "We developed PulseOps ERP, a unified internal tool tailored to their business flow. The web application aggregates real-time inventory counts and live GPS telemetry from the vehicle fleet into a single interface.",
      "An intelligent routing engine calculates optimal dispatch sequences based on destination coordinates and warehouse load. We embedded predictive analytics models that alert managers to impending supply bottlenecks before they disrupt active shipments."
    ],
    results: [
      "The implementation eliminated manual spreadsheets completely, saving dispatchers an average of 25 hours per week in pure administration.",
      "Inventory tracking errors fell to near zero, reaching a record 99.8% accuracy. Optimized logistics routes cut total vehicle fuel consumption by 18% in the first quarter of deployment alone."
    ],
    mockups: [
      {
        title: "Dispatch Command Center",
        description: "Central dashboard featuring live routing lists, fleet visual charts, and direct drag-and-drop driver assignment.",
        type: "desktop",
        badge: "Dispatcher View",
        image: "/pulse-ops-dispatch.jpg"
      },
      {
        title: "Inventory Matrix",
        description: "Grid view tracker of warehouse levels, with automatic low-stock triggers and supplier order form generation.",
        type: "analytics",
        badge: "Warehouse Ops",
        image: "/pulse-ops-inventory.jpg"
      },
      {
        title: "Driver Companion",
        description: "Mobile dispatch utility with sequential route coordinates, client signature capture, and status triggers.",
        type: "mobile",
        badge: "Field App",
        image: "/pulse-ops-driver.jpg"
      }
    ]
  },
  {
    slug: "chronos-support-engine",
    category: "real-world",
    title: "Chronos Support Engine",
    subtitle: "Conversational automation connecting customer care and appointment booking pipelines.",
    client: "Chronos Health & Wellness",
    service: "AI Workflow Automation",
    year: "2026",
    summary: "An automated patient communication and customer service pipeline across WhatsApp, email, and internal messaging, integrated directly with electronic health records (EHR).",
    image: "/chronos-automation.jpg",
    accentColor: "emerald",
    tags: ["Node.js", "WhatsApp API", "LangChain", "EHR Integrations", "Email Automations"],
    metrics: [
      { value: "70%", label: "Standard Inquiries Automated" },
      { value: "0%", label: "Missed Follow-up Bookings" },
      { value: "+18 pt", label: "NPS Score Increase" }
    ],
    challenge: [
      "Chronos Health & Wellness clinics were struggling to keep up with incoming patient communications. Receptionists were buried under phone calls and messages regarding appointment rescheduling, directions, basic medical prep questions, and post-care check-ins.",
      "This overload caused clinic phones to be constantly busy, resulting in missed appointment requests and delayed follow-up check-ins that directly affected patient care outcomes."
    ],
    solution: [
      "We engineered an AI Workflow Automation system acting as a virtual clinic assistant, operating over WhatsApp and Email. Built using LangChain and security-compliant APIs, the engine links directly with the clinic's internal EHR (Electronic Health Record) scheduling database.",
      "The system handles patient inquiries instantly, answering common clinic FAQs, facilitating self-service appointment rescheduling with instant live verification, and running automated, tailored follow-up sequences post-treatment."
    ],
    results: [
      "Over 70% of standard patient inquiries are now handled completely by the AI system without human staff intervention, freeing up receptionist desks.",
      "The clinics achieved 0% missed follow-up appointments through the automated reminders. Patient satisfaction surged, resulting in a Net Promoter Score (NPS) improvement from 64 to 82."
    ],
    mockups: [
      {
        title: "Conversational Interface",
        description: "Visual demo of the WhatsApp patient interaction scheduling an appointment and confirming medical records.",
        type: "mobile",
        badge: "Patient Chat"
      },
      {
        title: "Pipeline Control Console",
        description: "Admin monitor showing automation throughput, successful message deliveries, and queue resolution times.",
        type: "desktop",
        badge: "Automation Monitor"
      },
      {
        title: "EHR Sync logs",
        description: "Auditable connection log displaying real-time patient validation matches and database schedule write confirmations.",
        type: "analytics",
        badge: "System Sync"
      }
    ]
  },

  // --- SKILL DISPLAY SYSTEMS ---
  {
    slug: "synth-academy",
    category: "skill-display",
    title: "Synth Academy",
    subtitle: "Dedicated subscription network and AI content pipeline built for creator economies.",
    client: "Egostix Media Labs",
    service: "Creator Infrastructure",
    year: "2025",
    summary: "An all-in-one subscription network and community platform built for a prominent tech-art creator. Includes automated content workflows, membership tier management, and AI-assisted community moderation.",
    image: "/synth-academy.jpg",
    accentColor: "purple",
    tags: ["Next.js", "Stripe API", "Mux Video", "AI Moderation", "Tailwind CSS"],
    metrics: [
      { value: "-55%", label: "Platform Fee Overhead" },
      { value: "85%", label: "Yearly Member Retention" },
      { value: "3 hrs", label: "Saved per Video Upload" }
    ],
    challenge: [
      "Synth Labs, a rapidly growing community of digital art creators, was operating across multiple disconnected platforms: Patreon for subscriptions, Discord for chat, and Teachable for courses.",
      "This fragmented infrastructure led to user confusion, high subscription churn, and an average platform fee overhead of 12% across services. Content uploads were also highly manual, involving video compression, manual transcribing, and manual email notifications."
    ],
    solution: [
      "We built a bespoke, unified Creator Infrastructure app. The platform integrates custom high-quality video hosting via Mux, a rich community forum, and tier-based membership access using Stripe Billing.",
      "We implemented a customized content pipeline: when the creator uploads a video, an AI worker automatically transcribes the audio, drafts detailed lesson summaries, timestamps key sections, and queues up email newsletters and Discord announcements for approval."
    ],
    results: [
      "By consolidating hosting, courses, and billing, Synth Labs reduced third-party platform fee overheads by 55%, capturing thousands in additional monthly revenue.",
      "The unified portal improved the member experience, driving a steady 85% retention rate. The creator now saves roughly 3 hours per video upload, converting raw video to a fully polished course module in one click."
    ],
    mockups: [
      {
        title: "Member Hub & Video Room",
        description: "Dark-mode community hub displaying full-width video lessons, interactive notes, and module progression tracking.",
        type: "desktop",
        badge: "Subscriber View"
      },
      {
        title: "Creator Control Panel",
        description: "Backstage manager to drag-and-drop course layouts, configure Stripe billing tiers, and run upload jobs.",
        type: "analytics",
        badge: "Creator Admin"
      },
      {
        title: "Community Feed",
        description: "Mobile viewport of the interactive forum displaying real-time discussions, user profiles, and AI moderations.",
        type: "mobile",
        badge: "Mobile Forum"
      }
    ]
  },
  {
    slug: "omniflow-agent",
    category: "skill-display",
    title: "OmniFlow Agent",
    subtitle: "Demonstration system showing automated multi-agent support workflows for enterprise.",
    client: "Egostix Media Labs",
    service: "AI Workflow Automation",
    year: "2026",
    summary: "An advanced internal demonstration displaying multi-channel ticket parsing, vector embeddings lookup, and automated response drafting via synchronized LLM agents.",
    image: "/omniflow-agent.jpg",
    accentColor: "emerald",
    tags: ["LangChain", "VectorDB", "Node.js", "Slack API", "Multi-Agent Systems"],
    metrics: [
      { value: "92%", label: "First-contact Deflection" },
      { value: "< 45s", label: "Average Response Time" },
      { value: "24/7", label: "Automated Operational Window" }
    ],
    challenge: [
      "Customer support teams in growing SaaS operations are inundated with technical requests that often require cross-referencing knowledge bases, release notes, and API documentation.",
      "Human responses take hours and are often inconsistent. The system demonstrates how a multi-agent network can divide, research, write, and verify technical support answers directly in customer-facing tools."
    ],
    solution: [
      "We engineered OmniFlow Agent, an advanced workflow automation display. The application showcases a lead agent routing issues to specialized sub-agents (database agent, API agent, copywriter agent).",
      "The sub-agents query a vector database containing simulated platform manuals, synthesize answers, and submit draft responses to Slack or Zendesk platforms with verifiable source citations."
    ],
    results: [
      "In simulated testing loops, the system successfully resolved 92% of common technical requests without human intervention.",
      "The multi-agent research and synthesis loop completed in under 45 seconds on average, ensuring fast and accurate answers for end users."
    ],
    mockups: [
      {
        title: "Agent Orchestrator",
        description: "Visual workspace displaying active sub-agents, their memory pools, and live execution graphs as they research queries.",
        type: "desktop",
        badge: "Visual Graph"
      },
      {
        title: "Knowledge Vector Base",
        description: "Internal dataset inspector illustrating semantic vector space, matching scores, and document chunks.",
        type: "analytics",
        badge: "Database View"
      },
      {
        title: "Slack Bot Interface",
        description: "Sleek mobile viewport of the agent interface replying in Slack threads with code snippets and documentation links.",
        type: "mobile",
        badge: "Integrations View"
      }
    ]
  },
  {
    slug: "coreadmin-crm",
    category: "skill-display",
    title: "CoreAdmin CRM",
    subtitle: "Modern operations portal showcasing drag-and-drop analytics and team task pipelines.",
    client: "Egostix Media Labs",
    service: "AI Internal Tools for SMBs",
    year: "2025",
    summary: "An internal prototype application displaying visual CRM metrics, pipeline task automation, and team communication panels for operational efficiency.",
    image: "/coreadmin-crm.jpg",
    accentColor: "slate",
    tags: ["React Table", "Chart.js", "Tailwind CSS", "Next.js API", "SQL Analytics"],
    metrics: [
      { value: "100%", label: "Custom Widget Control" },
      { value: "60 FPS", label: "Interactive Visuals" },
      { value: "< 100ms", label: "Database Read Speed" }
    ],
    challenge: [
      "Off-the-shelf CRM systems are either overly generic or require costly configuration packages to fit specific operational pipelines for small businesses.",
      "Our display project shows how a business can build customized dashboards tailored to their exact internal requirements without compromising on user experience, database speed, or pricing."
    ],
    solution: [
      "We engineered CoreAdmin CRM as an operational display system. It integrates custom responsive layout builders, interactive database search matrices, and real-time socket connections for team coordination.",
      "Managers can configure dashboards by dragging charts, setting custom alert thresholds for logistics, and defining webhook triggers to third-party databases."
    ],
    results: [
      "The system demonstrates modular front-end architecture, allowing new internal widgets to be deployed in days instead of months.",
      "Boasts high-speed telemetry reads with interface response times below 100ms, proving that custom operational dashboards outpace bloated legacy systems."
    ],
    mockups: [
      {
        title: "Interactive CRM Board",
        description: "Modern spreadsheet view with inline editing, row filtering, and customized column headers.",
        type: "desktop",
        badge: "Spreadsheet View"
      },
      {
        title: "Analytics Builder",
        description: "Dashboard component letting admins design visual widgets, choose chart types, and write query parameters.",
        type: "analytics",
        badge: "Widget Creator"
      },
      {
        title: "Task Inbox",
        description: "Mobile-responsive pipeline feed displaying outstanding admin notifications, checklists, and chat threads.",
        type: "mobile",
        badge: "Notification Panel"
      }
    ]
  },
  {
    slug: "pulse-web-engine",
    category: "skill-display",
    title: "Pulse Web Engine",
    subtitle: "High-performance marketing site showcase featuring automated localization and AI copy matching.",
    client: "Egostix Media Labs",
    service: "AI-Powered Business Websites",
    year: "2025",
    summary: "A premium marketing and content engine showcase utilizing edge servers for sub-second delivery, multi-region localizations, and programmatic SEO models.",
    image: "/pulse-web-engine.jpg",
    accentColor: "blue",
    tags: ["Vercel Edge", "Next.js ISR", "i18next", "Programmatic SEO", "Tailwind CSS"],
    metrics: [
      { value: "99/100", label: "Lighthouse Performance" },
      { value: "250ms", label: "Time to First Byte" },
      { value: "+300%", label: "Indexed Landing Pages" }
    ],
    challenge: [
      "Modern marketing sites fail to capture local search markets due to static single-region structures and heavy asset weight, leading to low organic traffic.",
      "This system displays how Edge-hosted pages can generate content dynamically based on geographical client location, keeping load times under 300ms while scaling to thousands of pages."
    ],
    solution: [
      "We constructed the Pulse Web Engine, demonstrating Next.js incremental static regeneration (ISR) and localized middleware routing.",
      "The website automatically formats copy, currency, and local references depending on the visitor's IP address. It features a programmatic SEO generator that translates database schemas into search-optimized landing pages.",
      "An integrated AI editor allows marketing teams to type a prompt to generate or translate local landing page layouts instantly."
    ],
    results: [
      "Achieved a perfect 99 Lighthouse performance rating across core vitals, proving edge optimization.",
      "Demonstrates the capability to deploy thousands of search-indexed landing pages automatically, driving higher organic visibility without manual creation."
    ],
    mockups: [
      {
        title: "Geo-Localized Landing Page",
        description: "Desktop hero page detailing adaptive content cards that change copy depending on geographical location.",
        type: "desktop",
        badge: "Dynamic Layout"
      },
      {
        title: "Programmatic Manager",
        description: "Control hub showing URL routing paths, meta tag models, and active edge caching indices.",
        type: "analytics",
        badge: "Web Infrastructure"
      },
      {
        title: "Editor Tool",
        description: "Mobile viewport of the copy-writing tool allowing direct textual revisions and language translations.",
        type: "mobile",
        badge: "Content Tool"
      }
    ]
  }
];
