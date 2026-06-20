import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { projects } from "@/data/work";

export async function generateMetadata({ params }) {
  const project = projects.find((p) => p.slug === params.projectSlug);
  if (!project) {
    return {
      title: "Project Not Found | Egostix Media",
    };
  }

  return {
    title: `${project.title} - Case Study | Egostix Media`,
    description: project.summary,
  };
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    projectSlug: p.slug,
  }));
}

// Custom vector browser mockups that require no external image assets and scale perfectly
const MockupShell = ({ type, project, title }) => {
  const colorMap = {
    blue: { bg: "bg-blue-600", text: "text-blue-600", border: "border-blue-500/20", lightBg: "bg-blue-50" },
    slate: { bg: "bg-slate-600", text: "text-slate-600", border: "border-slate-500/20", lightBg: "bg-slate-100" },
    purple: { bg: "bg-purple-600", text: "text-purple-600", border: "border-purple-500/20", lightBg: "bg-purple-50" },
    emerald: { bg: "bg-emerald-600", text: "text-emerald-600", border: "border-emerald-500/20", lightBg: "bg-emerald-50" }
  };
  
  const colors = colorMap[project.accentColor] || colorMap.blue;
  const slug = project.slug;

  if (type === "desktop") {
    // DESKTOP: Renders different dashboards depending on project slug
    let desktopContent = null;
    
    if (slug === "apex-realty-platform") {
      desktopContent = (
        <div className="flex-1 flex flex-col gap-2 pt-1.5">
          <div className="flex gap-2">
            <div className="flex-1 bg-neutral-900 border border-neutral-850 p-1.5 rounded space-y-1">
              <span className="text-[6px] text-neutral-500 uppercase">Malibu Villa</span>
              <div className="font-semibold text-neutral-200">$4.2M</div>
            </div>
            <div className="flex-1 bg-neutral-900 border border-neutral-850 p-1.5 rounded space-y-1">
              <span className="text-[6px] text-neutral-500 uppercase">Ocean Edge</span>
              <div className="font-semibold text-neutral-200">$6.5M</div>
            </div>
            <div className="flex-1 bg-neutral-900 border border-neutral-850 p-1.5 rounded space-y-1">
              <span className="text-[6px] text-neutral-500 uppercase">Active Leads</span>
              <div className={`font-semibold ${colors.text}`}>148</div>
            </div>
          </div>
          <div className="flex-1 bg-neutral-900/60 rounded border border-neutral-850 p-2 flex flex-col justify-between text-[7px]">
            <div className="flex justify-between border-b border-neutral-850 pb-1 text-[6px] text-neutral-500">
              <span>VISITOR</span>
              <span>INTEREST</span>
              <span>ACTION</span>
            </div>
            <div className="flex justify-between">
              <span>Alice K.</span>
              <span>Malibu, $5M+</span>
              <span className="text-emerald-500">AI Booked</span>
            </div>
            <div className="flex justify-between">
              <span>Marcus P.</span>
              <span>Penthouse</span>
              <span className="text-neutral-550">Pending</span>
            </div>
          </div>
        </div>
      );
    } else if (slug === "pulse-ops-erp") {
      desktopContent = (
        <div className="flex-1 flex flex-col gap-2 pt-1.5">
          <div className="flex gap-2">
            <div className="flex-1 bg-neutral-900 border border-neutral-850 p-1.5 rounded space-y-1">
              <span className="text-[6px] text-neutral-500 uppercase">ACTIVE TRUCKS</span>
              <div className="font-semibold text-green-500">24 / 24</div>
            </div>
            <div className="flex-1 bg-neutral-900 border border-neutral-850 p-1.5 rounded space-y-1">
              <span className="text-[6px] text-neutral-500 uppercase">FUEL SAVED</span>
              <div className={`font-semibold ${colors.text}`}>18.4%</div>
            </div>
            <div className="flex-1 bg-neutral-900 border border-neutral-850 p-1.5 rounded space-y-1">
              <span className="text-[6px] text-neutral-500 uppercase">DISPATCH QUEUE</span>
              <div className="font-semibold text-neutral-200">0 pending</div>
            </div>
          </div>
          <div className="flex-1 bg-neutral-900/60 rounded border border-neutral-850 p-2 flex flex-col justify-between text-[7px]">
            <div className="flex justify-between border-b border-neutral-850 pb-1 text-[6px] text-neutral-500">
              <span>VEHICLE</span>
              <span>ROUTE STATUS</span>
              <span>ETA</span>
            </div>
            <div className="flex justify-between">
              <span>Truck_A8</span>
              <span className="text-green-500">Bay Area Hub</span>
              <span>12:45 PM</span>
            </div>
            <div className="flex justify-between">
              <span>Truck_C3</span>
              <span className="text-yellow-500">Warehouse 2</span>
              <span>1:15 PM</span>
            </div>
          </div>
        </div>
      );
    } else if (slug === "chronos-support-engine") {
      desktopContent = (
        <div className="flex-1 flex flex-col gap-2 pt-1.5">
          <div className="flex gap-2">
            <div className="flex-1 bg-neutral-900 border border-neutral-850 p-1.5 rounded space-y-1">
              <span className="text-[6px] text-neutral-500 uppercase">DEFLECTED</span>
              <div className="font-semibold text-green-500">70.2%</div>
            </div>
            <div className="flex-1 bg-neutral-900 border border-neutral-850 p-1.5 rounded space-y-1">
              <span className="text-[6px] text-neutral-500 uppercase">AVG REPLY</span>
              <div className="font-semibold text-neutral-250">2.8s</div>
            </div>
            <div className="flex-1 bg-neutral-900 border border-neutral-850 p-1.5 rounded space-y-1">
              <span className="text-[6px] text-neutral-500 uppercase">EHR SYNC</span>
              <div className={`font-semibold ${colors.text}`}>100%</div>
            </div>
          </div>
          <div className="flex-1 bg-neutral-900/60 rounded border border-neutral-850 p-2 flex flex-col justify-between text-[7px]">
            <div className="flex justify-between border-b border-neutral-850 pb-1 text-[6px] text-neutral-500">
              <span>PATIENT CHANNEL</span>
              <span>STATUS</span>
              <span>EHR UPDATE</span>
            </div>
            <div className="flex justify-between">
              <span>+1 (555) 0824</span>
              <span className="text-emerald-500">Booked Tuesday</span>
              <span>Success</span>
            </div>
            <div className="flex justify-between">
              <span>+1 (555) 9931</span>
              <span className="text-emerald-500">Rescheduled</span>
              <span>Success</span>
            </div>
          </div>
        </div>
      );
    } else if (slug === "synth-academy") {
      desktopContent = (
        <div className="flex-1 flex flex-col gap-2 pt-1.5">
          <div className="flex gap-2">
            <div className="flex-1 bg-neutral-900 border border-neutral-850 p-1.5 rounded space-y-1">
              <span className="text-[6px] text-neutral-500 uppercase">MEMBERS</span>
              <div className="font-semibold text-neutral-200">1,824</div>
            </div>
            <div className="flex-1 bg-neutral-900 border border-neutral-850 p-1.5 rounded space-y-1">
              <span className="text-[6px] text-neutral-500 uppercase">PLATFORM FEE</span>
              <div className={`font-semibold ${colors.text}`}>-55% saved</div>
            </div>
            <div className="flex-1 bg-neutral-900 border border-neutral-850 p-1.5 rounded space-y-1">
              <span className="text-[6px] text-neutral-500 uppercase">RETENTION</span>
              <div className="font-semibold text-green-500">85%</div>
            </div>
          </div>
          <div className="flex-1 bg-neutral-900/60 rounded border border-neutral-850 p-2 flex flex-col justify-between text-[7px]">
            <div className="flex justify-between border-b border-neutral-850 pb-1 text-[6px] text-neutral-500">
              <span>MODULE NAME</span>
              <span>MEDIA COMPRESSION</span>
              <span>TRANSCRIPTION</span>
            </div>
            <div className="flex justify-between">
              <span>01_Node_Basics</span>
              <span className="text-green-500">Complete</span>
              <span className="text-green-500">Complete</span>
            </div>
            <div className="flex justify-between">
              <span>02_Edge_Hooks</span>
              <span className="text-green-500">Complete</span>
              <span className="text-green-500">Complete</span>
            </div>
          </div>
        </div>
      );
    } else if (slug === "omniflow-agent") {
      desktopContent = (
        <div className="flex-1 flex flex-col gap-2 pt-1.5">
          <div className="flex gap-2">
            <div className="flex-1 bg-neutral-900 border border-neutral-850 p-1.5 rounded space-y-1">
              <span className="text-[6px] text-neutral-500 uppercase">ROUTER</span>
              <div className="font-semibold text-neutral-200">Online</div>
            </div>
            <div className="flex-1 bg-neutral-900 border border-neutral-850 p-1.5 rounded space-y-1">
              <span className="text-[6px] text-neutral-500 uppercase">SUB-AGENTS</span>
              <div className={`font-semibold ${colors.text}`}>3 Active</div>
            </div>
            <div className="flex-1 bg-neutral-900 border border-neutral-850 p-1.5 rounded space-y-1">
              <span className="text-[6px] text-neutral-500 uppercase">TIME VALUE</span>
              <div className="font-semibold text-green-500">&lt; 45s</div>
            </div>
          </div>
          <div className="flex-1 bg-neutral-900/60 rounded border border-neutral-850 p-1.5 flex flex-col justify-between text-[6.5px]">
            <div className="text-[6px] text-neutral-500 uppercase">Active Multi-Agent Orchestration Flow</div>
            <div className="flex items-center gap-1">
              <span className="text-blue-400 font-bold">[Query]</span>
              <span>→ Route Agent →</span>
              <span className="text-emerald-400 font-bold">[Vector Search]</span>
            </div>
            <div className="flex items-center gap-1">
              <span>Synthesizer Bot →</span>
              <span className="text-purple-400 font-bold">[Slack Hook Response Draft]</span>
            </div>
          </div>
        </div>
      );
    } else if (slug === "coreadmin-crm") {
      desktopContent = (
        <div className="flex-1 flex flex-col gap-2 pt-1.5">
          <div className="flex gap-2">
            <div className="flex-1 bg-neutral-900 border border-neutral-850 p-1.5 rounded space-y-1">
              <span className="text-[6px] text-neutral-500 uppercase">INCOMING</span>
              <div className="font-semibold text-neutral-200">$48,200</div>
            </div>
            <div className="flex-1 bg-neutral-900 border border-neutral-850 p-1.5 rounded space-y-1">
              <span className="text-[6px] text-neutral-500 uppercase">CLOSED WON</span>
              <div className="font-semibold text-green-500">$248,500</div>
            </div>
            <div className="flex-1 bg-neutral-900 border border-neutral-850 p-1.5 rounded space-y-1">
              <span className="text-[6px] text-neutral-500 uppercase">RESPONSE DELAY</span>
              <div className={`font-semibold ${colors.text}`}>&lt; 100ms</div>
            </div>
          </div>
          <div className="flex-1 bg-neutral-900/60 rounded border border-neutral-850 p-1.5 flex justify-between gap-1 text-[6.5px]">
            <div className="flex-1 bg-neutral-950 p-1 rounded border border-neutral-800 flex flex-col gap-1">
              <span className="text-[5px] text-slate-500">PROPOSAL (3)</span>
              <div className="bg-neutral-900 p-0.5 rounded text-white border-l border-blue-500">Alpha Corp</div>
              <div className="bg-neutral-900 p-0.5 rounded text-white border-l border-blue-500">Beta Inc</div>
            </div>
            <div className="flex-1 bg-neutral-950 p-1 rounded border border-neutral-800 flex flex-col gap-1">
              <span className="text-[5px] text-slate-500">NEGOTIATE (1)</span>
              <div className="bg-neutral-900 p-0.5 rounded text-white border-l border-yellow-500">Gamma LLC</div>
            </div>
          </div>
        </div>
      );
    } else {
      desktopContent = (
        <div className="flex-1 flex flex-col gap-2 pt-1.5">
          <div className="flex gap-2">
            <div className="flex-1 bg-neutral-900 border border-neutral-850 p-1.5 rounded space-y-1">
              <span className="text-[6px] text-neutral-500 uppercase">PERFORMANCE</span>
              <div className="font-semibold text-green-500">99 / 100</div>
            </div>
            <div className="flex-1 bg-neutral-900 border border-neutral-850 p-1.5 rounded space-y-1">
              <span className="text-[6px] text-neutral-500 uppercase">TTFB SPEED</span>
              <div className="font-semibold text-neutral-200">12ms</div>
            </div>
            <div className="flex-1 bg-neutral-900 border border-neutral-850 p-1.5 rounded space-y-1">
              <span className="text-[6px] text-neutral-500 uppercase">INDEXED PAGES</span>
              <div className={`font-semibold ${colors.text}`}>+300% generated</div>
            </div>
          </div>
          <div className="flex-1 bg-neutral-900/60 rounded border border-neutral-850 p-2 flex items-center justify-between text-[8px]">
            <div className="space-y-0.5">
              <span className="text-[6px] text-neutral-500">SEO SCORE CRITICALS</span>
              <div className="font-bold text-neutral-200">Fast Edge Loading</div>
            </div>
            <div className="flex items-center justify-center size-10 rounded-full border border-green-500/20 bg-green-500/5 font-bold text-green-500 text-[10px]">
              100
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full rounded-lg border border-neutral-200 bg-neutral-900 shadow-sm overflow-hidden flex flex-col font-mono text-[10px] transition group-hover:border-blue-500/50">
        {/* Browser Top Bar */}
        <div className="bg-neutral-800 px-3 py-2 flex items-center justify-between border-b border-neutral-700">
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500/80" />
            <span className="w-2 h-2 rounded-full bg-yellow-500/80" />
            <span className="w-2 h-2 rounded-full bg-green-500/80" />
          </div>
          <div className="bg-neutral-900 text-neutral-400 px-4 py-0.5 rounded text-[8px] w-1/2 text-center truncate">
            https://system.{project.slug}.com/dashboard
          </div>
          <div className="w-8" />
        </div>
        {/* Browser Core Viewport */}
        <div className="bg-neutral-950 p-4 h-[180px] flex flex-col justify-between text-neutral-400">
          {/* Header */}
          <div className="flex justify-between items-center border-b border-neutral-850 pb-2">
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-sm ${colors.bg}`} />
              <span className="font-bold text-neutral-200 text-[9px]">{title}</span>
            </div>
            <div className="flex gap-2 text-[7px] text-neutral-500">
              <span>Overview</span>
              <span>Settings</span>
            </div>
          </div>
          {desktopContent}
        </div>
      </div>
    );
  }

  if (type === "mobile") {
    // MOBILE: Renders custom message flows based on project context
    let mobileBubbles = null;

    if (slug === "apex-realty-platform") {
      mobileBubbles = (
        <div className="flex-1 my-2 flex flex-col justify-end space-y-1.5 overflow-hidden">
          <div className="bg-neutral-900 border border-neutral-850 p-1.5 rounded max-w-[85%] self-start text-[6px] text-neutral-300 leading-tight">
            I am your Apex assistant. Looking to buy, sell, or rent?
          </div>
          <div className={`p-1.5 rounded max-w-[85%] self-end text-[6px] text-white leading-tight ${colors.bg}`}>
            Buying in Malibu. Budget is $5M+.
          </div>
          <div className="bg-neutral-900 border border-neutral-850 p-1.5 rounded max-w-[85%] self-start text-[6px] text-neutral-300 leading-tight">
            Found 3 matching villas! Click to schedule an onboarding call.
          </div>
        </div>
      );
    } else if (slug === "pulse-ops-erp") {
      mobileBubbles = (
        <div className="flex-1 my-2 flex flex-col justify-end space-y-1.5 overflow-hidden">
          <div className="bg-neutral-900 border border-neutral-850 p-1.5 rounded max-w-[85%] self-start text-[6px] text-neutral-300 leading-tight">
            Task Assigned: Dispatch #1084 Route coordinates ready.
          </div>
          <div className={`p-1.5 rounded max-w-[85%] self-end text-[6px] text-white leading-tight ${colors.bg}`}>
            Route received. Truck en route to Bay Area Hub.
          </div>
          <div className="bg-neutral-900 border border-neutral-850 p-1.5 rounded max-w-[85%] self-start text-[6px] text-neutral-300 leading-tight">
            Status: Active. In-transit tracking enabled.
          </div>
        </div>
      );
    } else if (slug === "chronos-support-engine") {
      mobileBubbles = (
        <div className="flex-1 my-2 flex flex-col justify-end space-y-1.5 overflow-hidden">
          <div className="bg-neutral-900 border border-neutral-850 p-1.5 rounded max-w-[85%] self-start text-[6px] text-neutral-300 leading-tight">
            Hi Sarah! Your wellness session is on Monday at 10 AM. Reschedule?
          </div>
          <div className={`p-1.5 rounded max-w-[85%] self-end text-[6px] text-white leading-tight ${colors.bg}`}>
            Yes, please move it to Wednesday afternoon.
          </div>
          <div className="bg-neutral-900 border border-neutral-850 p-1.5 rounded max-w-[85%] self-start text-[6px] text-neutral-300 leading-tight">
            Confirmed Wednesday at 2 PM. EHR updated.
          </div>
        </div>
      );
    } else if (slug === "synth-academy") {
      mobileBubbles = (
        <div className="flex-1 my-2 flex flex-col justify-end space-y-1.5 overflow-hidden">
          <div className="bg-neutral-900 border border-neutral-850 p-1.5 rounded max-w-[85%] self-start text-[6px] text-neutral-300 leading-tight">
            User_Art: The lesson on API webhooks saved me weeks of coding!
          </div>
          <div className={`p-1.5 rounded max-w-[85%] self-end text-[6px] text-white leading-tight ${colors.bg}`}>
            Admin_Synth: Awesome! Template zip is in module 3 assets.
          </div>
          <div className="bg-neutral-900 border border-neutral-850 p-1.5 rounded max-w-[85%] self-start text-[6px] text-neutral-300 leading-tight">
            AI Moderation: Thread marked as resolved.
          </div>
        </div>
      );
    } else if (slug === "omniflow-agent") {
      mobileBubbles = (
        <div className="flex-1 my-2 flex flex-col justify-end space-y-1.5 overflow-hidden">
          <div className="bg-neutral-900 border border-neutral-850 p-1.5 rounded max-w-[85%] self-start text-[6px] text-neutral-300 leading-tight">
            User: Technical issue with database gateway.
          </div>
          <div className={`p-1.5 rounded max-w-[85%] self-end text-[6px] text-white leading-tight ${colors.bg}`}>
            OmniFlow Bot: Matching documents... Cosmic-DB docs matched.
          </div>
          <div className="bg-neutral-900 border border-neutral-850 p-1.5 rounded max-w-[85%] self-start text-[6px] text-neutral-300 leading-tight">
            OmniFlow Bot: Draft reply: "v2.4 contains the API patch."
          </div>
        </div>
      );
    } else if (slug === "coreadmin-crm") {
      mobileBubbles = (
        <div className="flex-1 my-2 flex flex-col justify-end space-y-1.5 overflow-hidden">
          <div className="bg-neutral-900 border border-neutral-850 p-1.5 rounded max-w-[85%] self-start text-[6px] text-neutral-300 leading-tight">
            Lead trigger: Alpha Corp requested price quote sheet.
          </div>
          <div className={`p-1.5 rounded max-w-[85%] self-end text-[6px] text-white leading-tight ${colors.bg}`}>
            Assigned task to Sales Team Alpha. Setting status.
          </div>
          <div className="bg-neutral-900 border border-neutral-850 p-1.5 rounded max-w-[85%] self-start text-[6px] text-neutral-300 leading-tight">
            Status: Task scheduled. Call set for 3 PM.
          </div>
        </div>
      );
    } else {
      mobileBubbles = (
        <div className="flex-1 my-2 flex flex-col justify-end space-y-1.5 overflow-hidden">
          <div className="bg-neutral-900 border border-neutral-850 p-1.5 rounded max-w-[85%] self-start text-[6px] text-neutral-300 leading-tight">
            Active Middleware: Detecting visitor location.
          </div>
          <div className={`p-1.5 rounded max-w-[85%] self-end text-[6px] text-white leading-tight ${colors.bg}`}>
            IP match: Berlin, Germany. Trigger localization.
          </div>
          <div className="bg-neutral-900 border border-neutral-850 p-1.5 rounded max-w-[85%] self-start text-[6px] text-neutral-300 leading-tight">
            Copy translated: "Moderne Schnittstellen für Skalierung."
          </div>
        </div>
      );
    }

    return (
      <div className="w-[160px] mx-auto rounded-xl border-4 border-neutral-800 bg-neutral-950 p-3 shadow-md h-[210px] flex flex-col justify-between font-mono text-[8px] text-neutral-400 relative transition group-hover:border-blue-500/50">
        {/* Device Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-2 bg-neutral-800 rounded-b" />
        
        {/* Mobile Header */}
        <div className="flex justify-between items-center border-b border-neutral-850 pb-1.5 mt-1">
          <div className="font-bold text-neutral-200">{title}</div>
          <span className="text-[6px] text-neutral-500">12:00</span>
        </div>
        {mobileBubbles}
        {/* Navigation Bar */}
        <div className="border-t border-neutral-900 pt-1.5 flex justify-between text-neutral-600 text-[5px]">
          <span>Home</span>
          <span className={colors.text}>Active</span>
          <span>Logs</span>
        </div>
      </div>
    );
  }

  // ANALYTICS / SQL VIEW: Renders custom query logs based on slug
  let sqlText = null;

  if (slug === "apex-realty-platform") {
    sqlText = (
      <>
        <div className="text-slate-500">{`# Fetch properties by budget filters`}</div>
        <div>
          <span className="text-blue-400">SELECT</span> villa_name, price, city
        </div>
        <div>
          <span className="text-blue-400">FROM</span> property_listings <span className="text-blue-400">WHERE</span> price &gt;= <span className="text-emerald-400">5000000</span>;
        </div>
        <div className="text-slate-500 mt-2 border-t border-slate-900 pt-1 text-[7px] leading-normal font-sans">
          {`01_malibu_crest | $5,800,000 | Malibu`}
          <br />
          {`02_beverly_edge  | $7,200,000 | Beverly Hills`}
        </div>
      </>
    );
  } else if (slug === "pulse-ops-erp") {
    sqlText = (
      <>
        <div className="text-slate-500">{`# Track fleet GPS and route loads`}</div>
        <div>
          <span className="text-blue-400">SELECT</span> truck_id, route_status, fuel_gal
        </div>
        <div>
          <span className="text-blue-400">FROM</span> dispatcher_active <span className="text-blue-400">WHERE</span> loading = <span className="text-emerald-400">false</span>;
        </div>
        <div className="text-slate-500 mt-2 border-t border-slate-900 pt-1 text-[7px] leading-normal font-sans">
          {`Truck_A8 | en_route | 45.2 gal`}
          <br />
          {`Truck_C3 | en_route | 38.9 gal`}
        </div>
      </>
    );
  } else if (slug === "chronos-support-engine") {
    sqlText = (
      <>
        <div className="text-slate-500">{`# Audit clinic scheduling sync records`}</div>
        <div>
          <span className="text-blue-400">SELECT</span> appointment_id, ehr_status, time
        </div>
        <div>
          <span className="text-blue-400">FROM</span> scheduler_logs <span className="text-blue-400">WHERE</span> synced = <span className="text-emerald-400">true</span>;
        </div>
        <div className="text-slate-500 mt-2 border-t border-slate-900 pt-1 text-[7px] leading-normal font-sans">
          {`APP_984 | SYNCED_TO_EHR | Mon 10:00 AM`}
          <br />
          {`APP_989 | SYNCED_TO_EHR | Wed 02:00 PM`}
        </div>
      </>
    );
  } else if (slug === "synth-academy") {
    sqlText = (
      <>
        <div className="text-slate-500">{`# Check active Stripe subscription webhooks`}</div>
        <div>
          <span className="text-blue-400">SELECT</span> email, subscription_tier, paid
        </div>
        <div>
          <span className="text-blue-400">FROM</span> subscriber_invoices <span className="text-blue-400">WHERE</span> status = <span className="text-emerald-400">'paid'</span>;
        </div>
        <div className="text-slate-500 mt-2 border-t border-slate-900 pt-1 text-[7px] leading-normal font-sans">
          {`art_student@domain.com | premium | true`}
          <br />
          {`code_maker@domain.com  | premium | true`}
        </div>
      </>
    );
  } else if (slug === "omniflow-agent") {
    sqlText = (
      <>
        <div className="text-slate-500">{`# Query vector embeddings documentation matches`}</div>
        <div>
          <span className="text-blue-400">SELECT</span> doc_path, similarity_rank
        </div>
        <div>
          <span className="text-blue-400">FROM</span> knowledge_base <span className="text-blue-400">WHERE</span> distance &lt; <span className="text-emerald-400">0.15</span>;
        </div>
        <div className="text-slate-500 mt-2 border-t border-slate-900 pt-1 text-[7px] leading-normal font-sans">
          {`/docs/v2/gateway.md | Rank 1 (0.982)`}
          <br />
          {`/docs/v2/errors.md  | Rank 2 (0.841)`}
        </div>
      </>
    );
  } else if (slug === "coreadmin-crm") {
    sqlText = (
      <>
        <div className="text-slate-500">{`# Calculate closed deals revenue metrics`}</div>
        <div>
          <span className="text-blue-400">SELECT</span> SUM(deal_value), target_percent
        </div>
        <div>
          <span className="text-blue-400">FROM</span> crm_closed_deals <span className="text-blue-400">WHERE</span> month = <span className="text-emerald-400">'June'</span>;
        </div>
        <div className="text-slate-500 mt-2 border-t border-slate-900 pt-1 text-[7px] leading-normal font-sans">
          {`$248,500 | 104.5% target achieved`}
          <br />
          {`Pending verification pipeline`}
        </div>
      </>
    );
  } else {
    sqlText = (
      <>
        <div className="text-slate-500">{`# Edge node caching audit telemetry`}</div>
        <div>
          <span className="text-blue-400">SELECT</span> page_url, cache_status, delay_ms
        </div>
        <div>
          <span className="text-blue-400">FROM</span> edge_logs <span className="text-blue-400">WHERE</span> country = <span className="text-emerald-400">'DE'</span>;
        </div>
        <div className="text-slate-500 mt-2 border-t border-slate-900 pt-1 text-[7px] leading-normal font-sans">
          {`/de/about   | CACHE_HIT  | 12ms`}
          <br />
          {`/de/service | CACHE_HIT  | 14ms`}
        </div>
      </>
    );
  }

  return (
    <div className="w-full rounded-lg border border-slate-800 bg-slate-950 p-4 h-[180px] font-mono text-[8px] text-slate-400 flex flex-col justify-between shadow-sm transition group-hover:border-blue-500/50">
      <div className="flex items-center justify-between border-b border-slate-900 pb-2">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse" />
          <span className="text-slate-500 uppercase tracking-widest text-[6px] font-bold">SQL / Data Connection</span>
        </div>
        <span className="text-slate-600">db_terminal</span>
      </div>
      
      {/* Code / Table snippet */}
      <div className="flex-1 my-2 font-mono space-y-1 text-slate-300 overflow-hidden leading-normal">
        {sqlText}
      </div>
      
      <div className="flex justify-between text-[6px] text-slate-600 border-t border-slate-900 pt-1.5">
        <span>Status: Synchronized</span>
        <span className="text-emerald-500">OK (12ms)</span>
      </div>
    </div>
  );
};

const ProjectCaseStudy = ({ params }) => {
  const { projectSlug } = params;
  const projectIndex = projects.findIndex((p) => p.slug === projectSlug);
  const project = projects[projectIndex];

  if (!project) {
    notFound();
  }

  // Find the next project for the footer link
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <main className="w-full px-6 py-24">
      <div className="mx-auto max-w-4xl space-y-16">
        {/* Back Link */}
        <div className="pt-6">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 font-mono text-xs font-medium text-neutral-500 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Portfolio
          </Link>
        </div>

        {/* Hero Header */}
        <header className="space-y-6">
          <div className="space-y-2">
            <span className="inline-block rounded bg-blue-50 border border-blue-200 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-blue-700">
              {project.service}
            </span>
            <div className="flex items-center gap-4 text-xs font-mono text-neutral-500 pt-1">
              <span className="uppercase text-[10px] font-semibold text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded">
                {project.category === "real-world" ? "Client Project" : "Skill Showcase"}
              </span>
              <span>Client: {project.client}</span>
              <span>•</span>
              <span>Year: {project.year}</span>
            </div>
          </div>

          <h1 className="font-mono text-3xl tracking-tight text-neutral-900 tablet:text-5xl leading-tight">
            {project.title}
          </h1>
          <p className="font-inter text-base tablet:text-lg text-neutral-600 leading-relaxed font-light">
            {project.subtitle}
          </p>
        </header>

        {/* Hero Image */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 shadow-sm">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        {/* Metrics Grid */}
        <section className="bg-neutral-50 rounded-lg border border-neutral-200 p-6 md:p-8">
          <div className="text-center md:text-left mb-6">
            <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500">
              Key Metrics & Impact
            </h3>
          </div>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200">
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className={`pt-6 sm:pt-0 sm:px-6 text-center ${
                  idx === 0 ? "sm:pl-0" : ""
                }`}
              >
                <div className="font-mono text-3xl tablet:text-4xl font-extrabold text-blue-600">
                  {metric.value}
                </div>
                <div className="mt-2 text-xs font-inter text-neutral-600 font-medium">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Case Study Content */}
        <section className="space-y-12 font-inter text-neutral-700">
          {/* Challenge Section */}
          <div className="grid gap-6 md:grid-cols-[200px_1fr]">
            <h2 className="font-mono text-xs uppercase tracking-wider text-neutral-900 pt-1">
              01. The Challenge
            </h2>
            <div className="space-y-4">
              {project.challenge.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-sm tablet:text-base leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <hr className="border-neutral-200" />

          {/* Solution Section */}
          <div className="grid gap-6 md:grid-cols-[200px_1fr]">
            <h2 className="font-mono text-xs uppercase tracking-wider text-neutral-900 pt-1">
              02. The Solution
            </h2>
            <div className="space-y-4">
              {project.solution.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-sm tablet:text-base leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <hr className="border-neutral-200" />

          {/* Results Section */}
          <div className="grid gap-6 md:grid-cols-[200px_1fr]">
            <h2 className="font-mono text-xs uppercase tracking-wider text-neutral-900 pt-1">
              03. Outcomes
            </h2>
            <div className="space-y-4">
              {project.results.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-sm tablet:text-base leading-relaxed flex items-start gap-3"
                >
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-blue-600"
                  />
                  <span>{paragraph}</span>
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* MULTIPLE SYSTEM MOCKUPS LAYOUT (Consistent for all case studies) */}
        <section className="space-y-10 border-t border-neutral-200 pt-12">
          <div className="space-y-3">
            <h2 className="font-mono text-2xl tracking-tight text-neutral-900">
              System Architecture & Interface Mockups
            </h2>
            <p className="text-sm font-inter text-neutral-600 max-w-3xl leading-relaxed">
              A comprehensive visual tour of the specialized custom control dashboards, operational analytics panels, 
              and client-facing interfaces designed for this system.
            </p>
          </div>

          <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
            {project.mockups?.map((mockup, index) => (
              <div key={index} className="group flex flex-col justify-between bg-neutral-50/50 border border-neutral-200 rounded-lg p-5 hover:bg-neutral-50 transition-all">
                {/* Image Mockup or CSS Drawn Vector Mockup Component */}
                <div className="relative flex-1 flex items-center justify-center bg-neutral-900/5 rounded border border-neutral-200/40 mb-4 h-[230px] overflow-hidden">
                  {mockup.image ? (
                    <Image
                      src={mockup.image}
                      alt={mockup.title}
                      fill
                      sizes="(max-w-768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full p-4 flex items-center justify-center">
                      <MockupShell type={mockup.type} project={project} title={mockup.title} />
                    </div>
                  )}
                </div>
                
                {/* Short, Important Copy Annotation */}
                <div className="space-y-2">
                  <span className="inline-block text-[9px] font-mono uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-100 rounded px-2 py-0.5">
                    {mockup.badge}
                  </span>
                  <h4 className="font-mono text-sm font-bold text-neutral-900">
                    {mockup.title}
                  </h4>
                  <p className="text-xs font-inter text-neutral-600 leading-relaxed">
                    {mockup.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technologies Used Bar */}
        <section className="border-t border-b border-neutral-200 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="font-mono text-xs uppercase tracking-wider text-neutral-500">
              Stack & Integrations:
            </span>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-neutral-100 border border-neutral-200 px-3 py-1 font-mono text-xs text-neutral-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Next Project & CTA */}
        <section className="pt-10 flex flex-col sm:flex-row items-stretch gap-6">
          {/* Next Case Study Link */}
          <Link
            href={`/work/${nextProject.slug}`}
            className="flex-1 rounded-lg border border-neutral-200 p-6 hover:border-blue-500 transition-all group flex flex-col justify-between bg-white text-left"
          >
            <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400 group-hover:text-blue-600 transition-colors">
              Next Case Study →
            </span>
            <div className="mt-2 space-y-1">
              <h4 className="font-mono text-lg font-bold text-neutral-900 group-hover:text-blue-600 transition-colors">
                {nextProject.title}
              </h4>
              <p className="text-xs font-inter text-neutral-500 line-clamp-2">
                {nextProject.summary}
              </p>
            </div>
          </Link>

          {/* Let's Talk CTA */}
          <div className="flex-1 rounded-lg border border-blue-200 bg-blue-50/50 p-6 flex flex-col justify-between">
            <div className="space-y-1">
              <h4 className="font-mono text-lg font-bold text-blue-900">
                Have a similar challenge?
              </h4>
              <p className="text-xs font-inter text-neutral-600 leading-relaxed">
                Let's scope a custom business system built specifically for your operations. We can build it in weeks.
              </p>
            </div>
            <Link
              href="/contact"
              className="mt-4 inline-flex items-center justify-center rounded bg-blue-600 px-4 py-2.5 text-center font-mono text-xs font-bold text-white transition hover:bg-blue-700"
            >
              Start Your Project
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProjectCaseStudy;
