"use client";

import React, { useState, useRef } from "react";
import { useDashboard } from "@/components/Dashboard/DashboardContext";
import Image from "next/image";
import {
  Settings,
  FileText,
  CheckCircle2,
  Eye,
  Sparkles,
  ArrowRight,
  Monitor,
  Smartphone,
  LayoutGrid,
  Image as ImageIcon,
  UploadCloud,
  Trash2,
  Layers,
  Activity,
  ArrowLeft
} from "lucide-react";

// Reusable Drag-and-Drop Image Dropzone Component
const ImageDropzone = ({ label, value, onChange, onRemove, helpText }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      onChange(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  return (
    <div className="space-y-1.5 font-inter text-xs">
      <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
        {label}
      </label>

      {value ? (
        // Uploaded Preview Card State
        <div className="relative rounded-xl border border-neutral-200 bg-neutral-50 p-3 flex items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="size-14 rounded-lg overflow-hidden border border-neutral-300 bg-neutral-900 shrink-0 relative">
              <Image unoptimized src={value} alt="Uploaded preview" fill className="w-full h-full object-cover" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-900 truncate">
                <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                <span>Image Loaded</span>
              </div>
              <p className="text-[10px] text-slate-500 font-mono truncate">Ready for live preview sync</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onRemove}
            className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
            title="Remove Image"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      ) : (
        // Dropzone Idle State
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all duration-150 flex flex-col items-center justify-center space-y-1.5 ${
            isDragging
              ? "border-blue-500 bg-blue-50/60 ring-2 ring-blue-500/20"
              : "border-neutral-300 bg-neutral-50/40 hover:border-blue-400 hover:bg-neutral-50"
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
          />
          <UploadCloud className={`size-6 ${isDragging ? "text-blue-600" : "text-slate-400"}`} />
          <p className="text-xs font-mono font-semibold text-slate-700">
            Drag & drop image file or <span className="text-blue-700 underline">browse</span>
          </p>
          <p className="text-[10px] text-slate-400 font-inter">{helpText || "Supports PNG, JPG, WebP, SVG up to 10MB"}</p>
        </div>
      )}
    </div>
  );
};

// Vector Mockup Shell Component (Matching Marketing [projectSlug]/page.jsx)
const MockupShell = ({ type, title, accentColor = "blue" }) => {
  const colorMap = {
    blue: { bg: "bg-blue-600", text: "text-blue-600", border: "border-blue-500/20" },
    purple: { bg: "bg-purple-600", text: "text-purple-600", border: "border-purple-500/20" },
    emerald: { bg: "bg-emerald-600", text: "text-emerald-600", border: "border-emerald-500/20" },
    amber: { bg: "bg-amber-600", text: "text-amber-600", border: "border-amber-500/20" }
  };

  const colors = colorMap[accentColor] || colorMap.blue;

  if (type === "desktop") {
    return (
      <div className="w-full rounded-lg border border-slate-800 bg-slate-950 p-4 h-[180px] font-mono text-[8px] text-slate-400 flex flex-col justify-between shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-900 pb-2">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-red-500/80" />
            <span className="size-2 rounded-full bg-yellow-500/80" />
            <span className="size-2 rounded-full bg-green-500/80" />
            <span className="text-slate-400 text-[8px] font-bold ml-1">{title || "Properties Portal"}</span>
          </div>
          <span className="text-slate-600">desktop_view</span>
        </div>
        <div className="flex-1 flex flex-col gap-2 pt-2">
          <div className="flex gap-2">
            <div className="flex-1 bg-slate-900 border border-slate-800 p-2 rounded space-y-1">
              <span className="text-[6px] text-slate-500 uppercase">Malibu Villa</span>
              <div className="font-semibold text-slate-200">$4.2M</div>
            </div>
            <div className="flex-1 bg-slate-900 border border-slate-800 p-2 rounded space-y-1">
              <span className="text-[6px] text-slate-500 uppercase">Ocean Edge</span>
              <div className="font-semibold text-slate-200">$6.5M</div>
            </div>
            <div className="flex-1 bg-slate-900 border border-slate-800 p-2 rounded space-y-1">
              <span className="text-[6px] text-slate-500 uppercase">Active Leads</span>
              <div className={`font-semibold ${colors.text}`}>148</div>
            </div>
          </div>
        </div>
        <div className="flex justify-between text-[6px] text-slate-500 border-t border-slate-900 pt-1.5">
          <span>Status: Active</span>
          <span className="text-emerald-500">Live 99.9%</span>
        </div>
      </div>
    );
  }

  if (type === "mobile") {
    return (
      <div className="w-[150px] mx-auto rounded-xl border-4 border-slate-800 bg-slate-950 p-3 shadow-md h-[180px] flex flex-col justify-between font-mono text-[8px] text-slate-400 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-2 bg-slate-800 rounded-b" />
        <div className="flex justify-between items-center border-b border-slate-900 pb-1.5 mt-1">
          <div className="font-bold text-slate-200 text-[8px] truncate">{title || "Mobile Concierge"}</div>
          <span className="text-[6px] text-slate-500">9:41</span>
        </div>
        <div className="flex-1 my-2 flex flex-col justify-end space-y-1.5 overflow-hidden">
          <div className="bg-slate-900 border border-slate-800 p-1.5 rounded max-w-[85%] text-[6px] text-slate-300">
            Qualifying visitor preferences...
          </div>
          <div className={`p-1.5 rounded max-w-[85%] text-[6px] text-white self-end ${colors.bg}`}>
            Appointment scheduled for Tuesday.
          </div>
        </div>
        <div className="border-t border-slate-900 pt-1 flex justify-between text-slate-600 text-[5px]">
          <span>Home</span>
          <span className={colors.text}>Active</span>
        </div>
      </div>
    );
  }

  // Analytics Type
  return (
    <div className="w-full rounded-lg border border-slate-800 bg-slate-950 p-4 h-[180px] font-mono text-[8px] text-slate-400 flex flex-col justify-between shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-900 pb-2">
        <div className="flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-yellow-500 animate-pulse" />
          <span className="text-slate-400 uppercase tracking-widest text-[6px] font-bold">SQL / Data Connection</span>
        </div>
        <span className="text-slate-600">analytics_terminal</span>
      </div>
      <div className="flex-1 my-2 font-mono space-y-1 text-slate-300 overflow-hidden leading-normal text-[7px]">
        <div className="text-slate-500">{`# Fetch properties by budget filters`}</div>
        <div><span className="text-blue-400">SELECT</span> villa_name, price, city</div>
        <div><span className="text-blue-400">FROM</span> property_listings <span className="text-blue-400">WHERE</span> price &gt;= <span className="text-emerald-400">5000000</span>;</div>
      </div>
      <div className="flex justify-between text-[6px] text-slate-500 border-t border-slate-900 pt-1.5">
        <span>Status: Synchronized</span>
        <span className="text-emerald-500">OK (12ms)</span>
      </div>
    </div>
  );
};

const SettingsTab = () => {
  const { activeClient, publishProject } = useDashboard();

  // Test Data Form State (Notetaker AI / Apex Platform)
  const [title, setTitle] = useState("Apex Realty Platform");
  const [subtitle, setSubtitle] = useState("AI-first lead generation and customer acquisition web system for luxury real estate.");
  const [clientName, setClientName] = useState(activeClient?.name || "Apex Luxury Real Estate Group");
  const [service, setService] = useState("AI-Powered Business Websites");
  const [category, setCategory] = useState("real-world");
  const [year, setYear] = useState("2025");
  const [accentColor, setAccentColor] = useState("blue");
  const [tags, setTags] = useState("Next.js, Tailwind CSS, OpenAI API, HubSpot CRM, Dynamic SEO");

  // 2. Summary
  const [summary, setSummary] = useState(
    "A high-performance lead generation web system for a luxury real estate brokerage. Integrates a custom AI assistant that conducts initial client onboarding, schedules property viewings, and syncs directly with their CRM."
  );

  // 3. Metrics
  const [metric1Value, setMetric1Value] = useState("+40%");
  const [metric1Label, setMetric1Label] = useState("Property Viewings Scheduled");
  const [metric2Value, setMetric2Value] = useState("65%");
  const [metric2Label, setMetric2Label] = useState("Faster Response Times");
  const [metric3Value, setMetric3Value] = useState("+2.4x");
  const [metric3Label, setMetric3Label] = useState("Lead-to-Booking Rate");

  // 4. Challenges (Problem)
  const [challenge, setChallenge] = useState(
    "Apex Luxury Real Estate Group faced a persistent issue with off-hours lead acquisition. High-net-worth international clients browsing listings in different time zones were forced to wait up to 24 hours for responses from human agents.\nThis delay resulted in low conversion rates as buyers lost interest or booked with competitors."
  );

  // 5. Solution
  const [solution, setSolution] = useState(
    "We engineered a custom AI-Powered Business Website utilizing Next.js for server-side rendering and performance. The core of the platform is an embedded, context-aware AI Concierge trained on the agency's listings.\nThe AI agent engages visitors in natural conversation, answering detailed property questions and scheduling viewings via webhooks into HubSpot CRM."
  );

  // 6. Outcomes / Results
  const [results, setResults] = useState(
    "Since launching the system, Apex has seen a 40% increase in scheduled property viewings with over half booked during non-business hours.\nResponse times plummeted from a 12-hour average to less than 3 seconds.\nThe automated workflow saves brokers 15 hours per week."
  );

  // 7. Mockup Images & Details (1 Hero + 3 Mockup Cards)
  const [heroImage, setHeroImage] = useState("/work/apex-realty/apex-realty.jpg");
  
  const [mockup1Title, setMockup1Title] = useState("Properties Portal");
  const [mockup1Desc, setMockup1Desc] = useState("The desktop landing view featuring fast spatial maps, luxury property filters, and clean high-end typography.");
  const [mockup1Badge, setMockup1Badge] = useState("Client Facing");
  const [mockup1Image, setMockup1Image] = useState("/work/apex-realty/apex-realty-desktop.jpg");

  const [mockup2Title, setMockup2Title] = useState("AI Booking Assistant");
  const [mockup2Desc, setMockup2Desc] = useState("The mobile conversational drawer that assists clients, gathers budget preferences, and offers instant viewing slots.");
  const [mockup2Badge, setMockup2Badge] = useState("AI Onboarding");
  const [mockup2Image, setMockup2Image] = useState("/work/apex-realty/apex-realty-chat.jpg");

  const [mockup3Title, setMockup3Title] = useState("Lead Insights Dashboard");
  const [mockup3Desc, setMockup3Desc] = useState("Admin workspace where brokers monitor hot lead scoring, conversation logs, and view upcoming appointments.");
  const [mockup3Badge, setMockup3Badge] = useState("Internal Ops");
  const [mockup3Image, setMockup3Image] = useState("/work/apex-realty/apex-realty-leads.jpg");

  // Preview Mode State ("card", "desktop", "mobile")
  const [previewMode, setPreviewMode] = useState("desktop");
  const [publishSuccess, setPublishSuccess] = useState(false);

  // Handle Form Submission
  const handlePublish = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const generatedSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newCaseStudy = {
      slug: generatedSlug,
      category,
      title,
      subtitle,
      client: clientName,
      service,
      year,
      summary,
      image: heroImage || "/work/apex-realty/apex-realty.jpg",
      accentColor,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      metrics: [
        { value: metric1Value || "+40%", label: metric1Label || "Viewings" },
        { value: metric2Value || "65%", label: metric2Label || "Faster Response" },
        { value: metric3Value || "+2.4x", label: metric3Label || "Booking Rate" }
      ],
      challenge: challenge ? challenge.split("\n").filter(Boolean) : [],
      solution: solution ? solution.split("\n").filter(Boolean) : [],
      results: results ? results.split("\n").filter(Boolean) : [],
      mockups: [
        {
          title: mockup1Title || "Properties Portal",
          description: mockup1Desc || "Desktop landing view.",
          type: "desktop",
          badge: mockup1Badge || "Client Facing",
          image: mockup1Image || "/work/apex-realty/apex-realty-desktop.jpg"
        },
        {
          title: mockup2Title || "AI Booking Assistant",
          description: mockup2Desc || "Mobile assistant view.",
          type: "mobile",
          badge: mockup2Badge || "AI Onboarding",
          image: mockup2Image || "/work/apex-realty/apex-realty-chat.jpg"
        },
        {
          title: mockup3Title || "Lead Insights Dashboard",
          description: mockup3Desc || "Analytics dashboard view.",
          type: "analytics",
          badge: mockup3Badge || "Internal Ops",
          image: mockup3Image || "/work/apex-realty/apex-realty-leads.jpg"
        }
      ]
    };

    publishProject(newCaseStudy);
    setPublishSuccess(true);
    setTimeout(() => setPublishSuccess(false), 4500);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="bg-white rounded-xl border border-neutral-200 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-blue-50 border border-blue-100 text-blue-700">
              <Settings className="size-5" />
            </span>
            <h3 className="text-xl font-mono text-slate-900 font-bold">
              Publish Case Study & 8-Section Live Preview
            </h3>
          </div>
          <p className="text-xs text-slate-600 max-w-2xl font-inter leading-relaxed">
            Specify project content, upload 1 Main Hero + 3 Mockup images, and preview the exact 8-section layout copied from `/work/[projectSlug]`.
          </p>
        </div>
      </div>

      {publishSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3 text-green-800 text-xs font-mono shadow-xs">
          <CheckCircle2 className="size-5 text-green-600 shrink-0" />
          <span>Case Study published successfully! Synced with live `/work` showcase catalog.</span>
        </div>
      )}

      {/* Main Layout Grid */}
      <div className="grid gap-8 lg:grid-cols-12 items-start">
        
        {/* LEFT COLUMN: Input Form for All 8 Sections */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-neutral-200 p-6 shadow-sm space-y-6">
          <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider border-b border-neutral-100 pb-3 flex items-center gap-2">
            <FileText className="size-4 text-blue-700" />
            Case Study Content Specification
          </h4>

          <form onSubmit={handlePublish} className="space-y-5 text-xs font-inter">
            {/* Title & Subtitle */}
            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
                  Case Study Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-xs font-inter focus:border-blue-700 focus:outline-none min-h-[44px]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
                  Subheading / Tagline
                </label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-xs font-inter focus:border-blue-700 focus:outline-none min-h-[44px]"
                />
              </div>
            </div>

            {/* Service & Category & Accent Color */}
            <div className="grid gap-3 sm:grid-cols-3">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
                  Service Category
                </label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-xs font-mono bg-white focus:border-blue-700 focus:outline-none min-h-[44px]"
                >
                  <option value="AI-Powered Business Websites">AI Business Websites</option>
                  <option value="AI Internal Tools">AI Internal Tools</option>
                  <option value="Workflow Automation">Workflow Automation</option>
                  <option value="Creator Infrastructure">Creator Infrastructure</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
                  Portfolio Type
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-xs font-mono bg-white focus:border-blue-700 focus:outline-none min-h-[44px]"
                >
                  <option value="real-world">Client Delivery</option>
                  <option value="skill-display">Showcase Prototype</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
                  Year
                </label>
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-xs font-mono bg-white focus:border-blue-700 focus:outline-none min-h-[44px]"
                />
              </div>
            </div>

            {/* Client Name & Tech Tags */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
                Client Organization Name *
              </label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-xs font-inter focus:border-blue-700 focus:outline-none min-h-[44px]"
              />
            </div>

            {/* 8. Tech Stack Tags */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
                8. Tech Stack & Integrations Tags (Comma Separated)
              </label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-xs font-mono focus:border-blue-700 focus:outline-none min-h-[44px]"
              />
            </div>

            {/* 2. Executive Summary */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
                2. Executive Summary Description *
              </label>
              <textarea
                rows={3}
                required
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full rounded-lg border border-neutral-300 px-3.5 py-2.5 text-xs font-inter focus:border-blue-700 focus:outline-none"
              />
            </div>

            {/* 3. KPI Metrics */}
            <div className="space-y-2 border-t border-neutral-100 pt-4">
              <span className="text-[11px] font-mono uppercase text-slate-700 font-bold block">
                3. Key Metrics & Impact Grid (3 Indicators)
              </span>
              <div className="grid gap-2 sm:grid-cols-3">
                <div className="space-y-1">
                  <input
                    type="text"
                    value={metric1Value}
                    onChange={(e) => setMetric1Value(e.target.value)}
                    className="w-full rounded border border-neutral-300 px-2.5 py-1.5 font-mono text-xs"
                  />
                  <input
                    type="text"
                    value={metric1Label}
                    onChange={(e) => setMetric1Label(e.target.value)}
                    className="w-full rounded border border-neutral-300 px-2.5 py-1.5 font-inter text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <input
                    type="text"
                    value={metric2Value}
                    onChange={(e) => setMetric2Value(e.target.value)}
                    className="w-full rounded border border-neutral-300 px-2.5 py-1.5 font-mono text-xs"
                  />
                  <input
                    type="text"
                    value={metric2Label}
                    onChange={(e) => setMetric2Label(e.target.value)}
                    className="w-full rounded border border-neutral-300 px-2.5 py-1.5 font-inter text-xs"
                  />
                </div>

                <div className="space-y-1">
                  <input
                    type="text"
                    value={metric3Value}
                    onChange={(e) => setMetric3Value(e.target.value)}
                    className="w-full rounded border border-neutral-300 px-2.5 py-1.5 font-mono text-xs"
                  />
                  <input
                    type="text"
                    value={metric3Label}
                    onChange={(e) => setMetric3Label(e.target.value)}
                    className="w-full rounded border border-neutral-300 px-2.5 py-1.5 font-inter text-xs"
                  />
                </div>
              </div>
            </div>

            {/* 4, 5, 6: Challenge, Solution, Outcomes */}
            <div className="space-y-3 border-t border-neutral-100 pt-4">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
                  4. 01. The Challenge (Problem Statement)
                </label>
                <textarea
                  rows={2}
                  value={challenge}
                  onChange={(e) => setChallenge(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-xs font-inter focus:border-blue-700 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
                  5. 02. The Engineered Solution
                </label>
                <textarea
                  rows={2}
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-xs font-inter focus:border-blue-700 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono uppercase text-slate-700 font-bold">
                  6. 03. Outcomes / Measured Results
                </label>
                <textarea
                  rows={2}
                  value={results}
                  onChange={(e) => setResults(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-xs font-inter focus:border-blue-700 focus:outline-none"
                />
              </div>
            </div>

            {/* 7. 4 DRAG-AND-DROP FILE UPLOAD DROPZONES */}
            <div className="space-y-4 border-t border-neutral-100 pt-5">
              <div className="flex items-center gap-2">
                <UploadCloud className="size-4 text-blue-700" />
                <span className="text-xs font-mono font-bold uppercase text-slate-900 tracking-wider">
                  Image Asset Uploaders (1 Main Hero + 3 Mockup Cards)
                </span>
              </div>

              {/* 1. Main Hero Image Dropzone */}
              <ImageDropzone
                label="1. One Main Hero Image *"
                value={heroImage}
                onChange={(val) => setHeroImage(val)}
                onRemove={() => setHeroImage("")}
                helpText="Main project hero header & card thumbnail image"
              />

              {/* 2. Mockup 1 Dropzone */}
              <div className="space-y-2 pt-2 border-t border-neutral-100">
                <div className="grid gap-2 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Card 1 Title"
                    value={mockup1Title}
                    onChange={(e) => setMockup1Title(e.target.value)}
                    className="rounded border border-neutral-300 px-3 py-1.5 text-xs font-mono"
                  />
                  <input
                    type="text"
                    placeholder="Card 1 Badge (e.g. Client Facing)"
                    value={mockup1Badge}
                    onChange={(e) => setMockup1Badge(e.target.value)}
                    className="rounded border border-neutral-300 px-3 py-1.5 text-xs font-mono"
                  />
                </div>
                <ImageDropzone
                  label="Card 1 Mockup Image"
                  value={mockup1Image}
                  onChange={(val) => setMockup1Image(val)}
                  onRemove={() => setMockup1Image("")}
                  helpText="Desktop view or first feature mockup"
                />
              </div>

              {/* 3. Mockup 2 Dropzone */}
              <div className="space-y-2 pt-2 border-t border-neutral-100">
                <div className="grid gap-2 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Card 2 Title"
                    value={mockup2Title}
                    onChange={(e) => setMockup2Title(e.target.value)}
                    className="rounded border border-neutral-300 px-3 py-1.5 text-xs font-mono"
                  />
                  <input
                    type="text"
                    placeholder="Card 2 Badge (e.g. AI Onboarding)"
                    value={mockup2Badge}
                    onChange={(e) => setMockup2Badge(e.target.value)}
                    className="rounded border border-neutral-300 px-3 py-1.5 text-xs font-mono"
                  />
                </div>
                <ImageDropzone
                  label="Card 2 Mockup Image"
                  value={mockup2Image}
                  onChange={(val) => setMockup2Image(val)}
                  onRemove={() => setMockup2Image("")}
                  helpText="Mobile conversational assistant mockup"
                />
              </div>

              {/* 4. Mockup 3 Dropzone */}
              <div className="space-y-2 pt-2 border-t border-neutral-100">
                <div className="grid gap-2 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="Card 3 Title"
                    value={mockup3Title}
                    onChange={(e) => setMockup3Title(e.target.value)}
                    className="rounded border border-neutral-300 px-3 py-1.5 text-xs font-mono"
                  />
                  <input
                    type="text"
                    placeholder="Card 3 Badge (e.g. Internal Ops)"
                    value={mockup3Badge}
                    onChange={(e) => setMockup3Badge(e.target.value)}
                    className="rounded border border-neutral-300 px-3 py-1.5 text-xs font-mono"
                  />
                </div>
                <ImageDropzone
                  label="Card 3 Mockup Image"
                  value={mockup3Image}
                  onChange={(val) => setMockup3Image(val)}
                  onRemove={() => setMockup3Image("")}
                  helpText="Analytics / Notetaker inspector mockup"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="py-3.5 px-8 rounded-lg bg-blue-700 hover:bg-blue-800 active:scale-[0.98] text-white font-mono font-bold text-xs transition shadow-sm min-h-[44px] flex items-center gap-2"
              >
                <Sparkles className="size-4" />
                <span>Publish Case Study to /work Showcase</span>
              </button>
            </div>
          </form>
        </div>

        {/* RIGHT COLUMN: White Theme Live Responsive Preview (Copied 1:1 from /work/[projectSlug]) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between border-b border-neutral-200 pb-3">
            <h4 className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Eye className="size-4 text-blue-700" />
              Live Responsive Preview (Copied 1:1 from /work/[projectSlug])
            </h4>

            {/* Viewport Mode Switcher Tabs */}
            <div className="flex items-center bg-neutral-100 p-1 rounded-lg border border-neutral-200">
              <button
                type="button"
                onClick={() => setPreviewMode("card")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition ${
                  previewMode === "card"
                    ? "bg-white text-slate-900 font-bold shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <LayoutGrid className="size-3.5" />
                <span>Card</span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewMode("desktop")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition ${
                  previewMode === "desktop"
                    ? "bg-white text-slate-900 font-bold shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Monitor className="size-3.5" />
                <span>Desktop</span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewMode("mobile")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono transition ${
                  previewMode === "mobile"
                    ? "bg-white text-slate-900 font-bold shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Smartphone className="size-3.5" />
                <span>Mobile</span>
              </button>
            </div>
          </div>

          {/* PREVIEW VIEW 1: Portfolio Grid Card View (/work) */}
          {previewMode === "card" && (
            <div className="bg-neutral-50 p-6 rounded-xl border border-neutral-200">
              <article className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-sm flex flex-col justify-between space-y-4 p-5 max-w-md mx-auto">
                <div className="space-y-4">
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-neutral-100 border border-neutral-200">
                    {heroImage ? (
                      <Image unoptimized src={heroImage} alt={title} fill className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-50 text-neutral-400 p-4 text-center">
                        <ImageIcon className="size-6 text-neutral-400 mb-1" />
                        <span className="text-xs font-mono font-bold text-neutral-700">{title}</span>
                      </div>
                    )}
                    <span className="absolute top-2.5 left-2.5 bg-neutral-950/85 text-white font-mono text-[9px] uppercase px-2 py-0.5 rounded">
                      {service}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
                      <span>{clientName}</span>
                      <span>{year}</span>
                    </div>
                    <h3 className="text-lg font-mono font-bold text-slate-900 leading-snug">
                      {title || "Project Title"}
                    </h3>
                    <p className="text-xs font-inter text-slate-600 leading-relaxed line-clamp-3">
                      {summary}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-1 border-y border-neutral-100 py-3 text-center">
                    <div className="space-y-0.5">
                      <div className="font-mono text-xs font-bold text-slate-900">{metric1Value}</div>
                      <div className="text-[8px] font-inter text-slate-500">{metric1Label}</div>
                    </div>
                    <div className="space-y-0.5">
                      <div className="font-mono text-xs font-bold text-slate-900">{metric2Value}</div>
                      <div className="text-[8px] font-inter text-slate-500">{metric2Label}</div>
                    </div>
                    <div className="space-y-0.5">
                      <div className="font-mono text-xs font-bold text-slate-900">{metric3Value}</div>
                      <div className="text-[8px] font-inter text-slate-500">{metric3Label}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {tags.split(",").map((tag, idx) => (
                      <span key={idx} className="rounded bg-neutral-50 border border-neutral-200 px-2 py-0.5 font-mono text-[9px] text-slate-600">
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between font-mono text-xs text-blue-700 font-bold">
                  <span>View Case Study</span>
                  <ArrowRight className="size-4" />
                </div>
              </article>
            </div>
          )}

          {/* PREVIEW VIEW 2: Desktop Full Landing View (EXACT LAYOUT FROM /work/[projectSlug]) */}
          {previewMode === "desktop" && (
            <div className="bg-white text-slate-900 rounded-xl p-8 shadow-sm border border-neutral-200 space-y-12 max-w-4xl mx-auto">
              
              {/* SECTION 1: HERO HEADER */}
              <header className="space-y-5 border-b border-neutral-200 pb-6">
                <div className="space-y-2">
                  <span className="inline-block rounded bg-blue-50 border border-blue-200 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-blue-700">
                    {service}
                  </span>
                  <div className="flex items-center gap-4 text-xs font-mono text-neutral-500 pt-1">
                    <span className="uppercase text-[10px] font-semibold text-neutral-700 bg-neutral-100 px-2 py-0.5 rounded">
                      {category === "real-world" ? "Client Project" : "Skill Showcase"}
                    </span>
                    <span>Client: {clientName}</span>
                    <span>•</span>
                    <span>Year: {year}</span>
                  </div>
                </div>

                <h1 className="font-mono text-3xl tracking-tight text-neutral-900 leading-tight font-bold">
                  {title || "Project Title"}
                </h1>
                <p className="font-inter text-base text-neutral-600 leading-relaxed font-light">
                  {subtitle || summary}
                </p>
              </header>

              {/* SECTION 2: ONE MAIN HERO IMAGE */}
              <section className="space-y-2">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg border border-neutral-200 bg-neutral-100 shadow-xs">
                  {heroImage ? (
                    <Image unoptimized src={heroImage} alt={title} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-50 text-neutral-400 p-6 text-center space-y-2">
                      <ImageIcon className="size-8 text-neutral-400" />
                      <span className="text-xs font-mono font-bold text-slate-700">Main Hero Image Placeholder</span>
                    </div>
                  )}
                </div>
              </section>

              {/* SECTION 3 & 4: SUMMARY & KEY METRICS & IMPACT GRID */}
              <section className="bg-neutral-50 rounded-xl border border-neutral-200 p-6 md:p-8 space-y-6">
                <div className="text-left">
                  <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-500 font-bold">
                    Key Metrics & Impact
                  </h3>
                </div>

                <div className="grid gap-6 grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200">
                  <div className="pt-4 sm:pt-0 sm:px-4 text-center sm:pl-0">
                    <div className="font-mono text-3xl font-extrabold text-blue-600">
                      {metric1Value}
                    </div>
                    <div className="mt-2 text-xs font-inter text-neutral-600 font-medium">
                      {metric1Label}
                    </div>
                  </div>

                  <div className="pt-4 sm:pt-0 sm:px-4 text-center">
                    <div className="font-mono text-3xl font-extrabold text-blue-600">
                      {metric2Value}
                    </div>
                    <div className="mt-2 text-xs font-inter text-neutral-600 font-medium">
                      {metric2Label}
                    </div>
                  </div>

                  <div className="pt-4 sm:pt-0 sm:px-4 text-center">
                    <div className="font-mono text-3xl font-extrabold text-blue-600">
                      {metric3Value}
                    </div>
                    <div className="mt-2 text-xs font-inter text-neutral-600 font-medium">
                      {metric3Label}
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 5, 6, 7: CHALLENGE, SOLUTION, OUTCOMES */}
              <section className="space-y-10 font-inter text-neutral-700">
                {/* 01. The Challenge */}
                <div className="grid gap-6 md:grid-cols-[160px_1fr]">
                  <h2 className="font-mono text-xs uppercase tracking-wider text-neutral-900 pt-1 font-bold">
                    01. The Challenge
                  </h2>
                  <div className="space-y-3 text-xs leading-relaxed">
                    {challenge.split("\n").map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                </div>

                <hr className="border-neutral-200" />

                {/* 02. The Solution */}
                <div className="grid gap-6 md:grid-cols-[160px_1fr]">
                  <h2 className="font-mono text-xs uppercase tracking-wider text-neutral-900 pt-1 font-bold">
                    02. The Solution
                  </h2>
                  <div className="space-y-3 text-xs leading-relaxed">
                    {solution.split("\n").map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                </div>

                <hr className="border-neutral-200" />

                {/* 03. Outcomes */}
                <div className="grid gap-6 md:grid-cols-[160px_1fr]">
                  <h2 className="font-mono text-xs uppercase tracking-wider text-neutral-900 pt-1 font-bold">
                    03. Outcomes
                  </h2>
                  <div className="space-y-3 text-xs leading-relaxed">
                    {results.split("\n").map((p, idx) => (
                      <p key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-blue-600" />
                        <span>{p}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </section>

              {/* SECTION 8: SYSTEM ARCHITECTURE & 3 MOCKUPS IN A ROW */}
              <section className="space-y-8 border-t border-neutral-200 pt-10">
                <div className="space-y-2">
                  <h2 className="font-mono text-xl tracking-tight text-neutral-900 font-bold">
                    System Architecture & Interface Mockups
                  </h2>
                  <p className="text-xs font-inter text-neutral-600 leading-relaxed">
                    A comprehensive visual tour of specialized control dashboards and client-facing interfaces.
                  </p>
                </div>

                {/* 3 Mockups Row */}
                <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                  {/* Card 1 */}
                  <div className="bg-neutral-50/70 border border-neutral-200 rounded-xl p-4 flex flex-col justify-between space-y-3">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-neutral-900/5 border border-neutral-200/60">
                      {mockup1Image ? (
                        <Image unoptimized src={mockup1Image} alt={mockup1Title} fill className="object-cover" />
                      ) : (
                        <MockupShell type="desktop" title={mockup1Title} accentColor={accentColor} />
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <span className="inline-block text-[9px] font-mono uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-100 rounded px-2 py-0.5">
                        {mockup1Badge || "Desktop View"}
                      </span>
                      <h4 className="font-mono text-xs font-bold text-neutral-900">
                        {mockup1Title || "Properties Portal"}
                      </h4>
                      <p className="text-[11px] font-inter text-neutral-600 leading-relaxed">
                        {mockup1Desc || "Desktop portal view."}
                      </p>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-neutral-50/70 border border-neutral-200 rounded-xl p-4 flex flex-col justify-between space-y-3">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-neutral-900/5 border border-neutral-200/60">
                      {mockup2Image ? (
                        <Image unoptimized src={mockup2Image} alt={mockup2Title} fill className="object-cover" />
                      ) : (
                        <MockupShell type="mobile" title={mockup2Title} accentColor={accentColor} />
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <span className="inline-block text-[9px] font-mono uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-100 rounded px-2 py-0.5">
                        {mockup2Badge || "Mobile View"}
                      </span>
                      <h4 className="font-mono text-xs font-bold text-neutral-900">
                        {mockup2Title || "AI Booking Assistant"}
                      </h4>
                      <p className="text-[11px] font-inter text-neutral-600 leading-relaxed">
                        {mockup2Desc || "Mobile assistant view."}
                      </p>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-neutral-50/70 border border-neutral-200 rounded-xl p-4 flex flex-col justify-between space-y-3">
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-neutral-900/5 border border-neutral-200/60">
                      {mockup3Image ? (
                        <Image unoptimized src={mockup3Image} alt={mockup3Title} fill className="object-cover" />
                      ) : (
                        <MockupShell type="analytics" title={mockup3Title} accentColor={accentColor} />
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <span className="inline-block text-[9px] font-mono uppercase tracking-wider text-blue-600 bg-blue-50 border border-blue-100 rounded px-2 py-0.5">
                        {mockup3Badge || "Analytics View"}
                      </span>
                      <h4 className="font-mono text-xs font-bold text-neutral-900">
                        {mockup3Title || "Lead Insights Dashboard"}
                      </h4>
                      <p className="text-[11px] font-inter text-neutral-600 leading-relaxed">
                        {mockup3Desc || "Analytics dashboard inspector."}
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* SECTION 9: TECHNOLOGIES USED BAR */}
              <section className="border-t border-b border-neutral-200 py-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <span className="font-mono text-xs uppercase tracking-wider text-neutral-500 font-bold">
                    Stack & Integrations:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.split(",").map((tag, idx) => (
                      <span
                        key={idx}
                        className="rounded bg-neutral-100 border border-neutral-200 px-2.5 py-0.5 font-mono text-[11px] text-neutral-700"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* PREVIEW VIEW 3: Mobile Viewport View (375px Device Frame) */}
          {previewMode === "mobile" && (
            <div className="bg-neutral-100 p-6 rounded-xl border border-neutral-200 flex justify-center items-center">
              <div className="w-[340px] bg-white text-slate-900 rounded-[2rem] p-4 border-4 border-slate-300 shadow-xl space-y-4 font-inter text-xs">
                {/* Mobile Status Bar */}
                <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 px-2">
                  <span>9:41</span>
                  <span className="size-2 rounded-full bg-blue-600" />
                  <span>5G</span>
                </div>

                <div className="space-y-2 border-b border-neutral-200 pb-3">
                  <span className="text-[9px] font-mono text-blue-700 uppercase font-bold block">{service}</span>
                  <h3 className="text-sm font-mono font-bold text-slate-900">{title}</h3>
                  <p className="text-[10px] text-slate-600 font-inter line-clamp-3">{summary}</p>
                </div>

                {/* Mobile Hero Image */}
                <div className="space-y-1.5">
                  <span className="text-[9px] font-mono text-slate-500 uppercase">Main Hero Header</span>
                  <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-neutral-100 border border-neutral-200">
                    {heroImage ? (
                      <Image unoptimized src={heroImage} alt={title} fill className="object-cover" />
                    ) : (
                      <MockupShell type="desktop" title={title} accentColor={accentColor} />
                    )}
                  </div>
                </div>

                {/* Mobile Card 2 Mockup */}
                <div className="space-y-1.5">
                  <span className="text-[9px] font-mono text-slate-500 uppercase">Card 2 Mobile View</span>
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-neutral-100 border border-neutral-200">
                    {mockup2Image ? (
                      <Image unoptimized src={mockup2Image} alt={mockup2Title} fill className="object-cover" />
                    ) : (
                      <MockupShell type="mobile" title={mockup2Title} accentColor={accentColor} />
                    )}
                  </div>
                </div>

                <div className="bg-neutral-50 rounded-lg p-3 text-center space-y-1 border border-neutral-200 font-mono">
                  <span className="text-xs font-bold text-blue-700">{metric1Value}</span>
                  <p className="text-[9px] font-inter text-slate-600">{metric1Label}</p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default SettingsTab;
