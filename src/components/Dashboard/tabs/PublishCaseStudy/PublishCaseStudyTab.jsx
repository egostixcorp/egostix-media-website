"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FileCode,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  Globe,
  Lock,
  ExternalLink,
  CheckCircle2,
  RefreshCw,
  Search,
  Layers,
  Sparkles,
  Users,
  Upload,
  ArrowRight,
  AlertCircle,
  X,
  Check,
  Building2,
  Monitor,
  Smartphone,
  BarChart3,
  Image as ImageIcon,
  CloudUpload,
  Link as LinkIcon
} from "lucide-react";
import {
  getAllCaseStudiesAction,
  publishCaseStudyAction,
  deleteCaseStudyAction,
  uploadWorkImageAction,
  toggleCaseStudyVisibilityAction
} from "@/actions/work";
import { createClientAccountAction } from "@/actions/clients";
import { useDashboard } from "@/components/Dashboard/DashboardContext";

const defaultFormData = {
  slug: "",
  category: "real-world",
  title: "",
  subtitle: "",
  client: "",
  service: "AI-Powered Business Websites",
  year: new Date().getFullYear().toString(),
  summary: "",
  image: "",
  liveUrl: "",
  accentColor: "blue",
  isPrivate: false,
  tags: ["Next.js", "Tailwind CSS", "Supabase", "AI Tools"],
  metrics: [
    { value: "+40%", label: "Key Impact Metric 1" },
    { value: "65%", label: "Key Impact Metric 2" },
    { value: "3x", label: "Key Impact Metric 3" }
  ],
  challenge: [
    "Paragraph 1: Describe the key operational challenge or pain point faced by the client.",
    "Paragraph 2: Expand on how legacy or manual processes were causing inefficiency."
  ],
  solution: [
    "Paragraph 1: Describe the high-performance system architecture and Next.js engineering approach.",
    "Paragraph 2: Detail how AI automation, webhooks, or custom tools solved the problem."
  ],
  results: [
    "Outcome 1: Measurable time or revenue improvement.",
    "Outcome 2: Operational efficiency or user adoption metric."
  ],
  journey: [
    {
      phase: "Phase 01 — Web Foundation",
      title: "Custom Business Website & CMS",
      description: "High-converting brand web presence with localized SEO and fast response times."
    },
    {
      phase: "Phase 02 — Automation Scale",
      title: "CRM & Lead Sync Engine",
      description: "Automated customer acquisition pipeline with direct CRM integration."
    }
  ],
  mockups: [
    {
      title: "Desktop Dashboard & Core App Workspace",
      description: "Desktop view featuring high-throughput web application UI.",
      type: "desktop",
      badge: "Desktop View",
      image: ""
    },
    {
      title: "Desktop Workspace Panel & Controls",
      description: "Desktop workspace displaying custom workflow controls.",
      type: "desktop",
      badge: "Desktop View",
      image: ""
    },
    {
      title: "Desktop System Analytics & Reporting",
      description: "Desktop admin analytics and system monitoring metrics.",
      type: "analytics",
      badge: "Analytics Panel",
      image: ""
    },
    {
      title: "Mobile Viewport & Chat Drawer",
      description: "Mobile viewport displaying real-time customer chat drawer.",
      type: "mobile",
      badge: "Mobile View",
      image: ""
    },
    {
      title: "Mobile App Workflow Interface",
      description: "Mobile user view showing responsive mobile UI.",
      type: "mobile",
      badge: "Mobile View",
      image: ""
    },
    {
      title: "Mobile Account & Settings Screen",
      description: "Mobile user dashboard and settings drawer.",
      type: "mobile",
      badge: "Mobile View",
      image: ""
    }
  ]
};

// Reusable Image Upload Dropzone Component (Supports Drag & Drop, File Picker, & Direct URL Input)
function ImageUploader({ label, value, onChange, slug, imageType = "cover" }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [mode, setMode] = useState("dropzone"); // "dropzone" | "url"
  const fileInputRef = useRef(null);

  const handleUploadFile = async (file) => {
    if (!file) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("slug", slug || "temp-project");
    formData.append("imageType", imageType);

    const res = await uploadWorkImageAction(formData);
    setIsUploading(false);

    if (res.success && res.url) {
      onChange(res.url);
    } else {
      alert(res.error || "Failed to upload image file.");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUploadFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className="space-y-2 font-inter">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-mono font-semibold text-slate-700">
          {label}
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setMode(mode === "dropzone" ? "url" : "dropzone")}
            className="text-[10px] font-mono text-blue-600 hover:underline flex items-center gap-1"
          >
            {mode === "dropzone" ? <LinkIcon className="size-3" /> : <CloudUpload className="size-3" />}
            <span>{mode === "dropzone" ? "Switch to URL input" : "Switch to Drag & Drop"}</span>
          </button>
        </div>
      </div>

      {mode === "url" ? (
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="/work/synth-academy/cover.png or https://..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 px-3 py-2 rounded-lg border border-neutral-300 text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-600"
          />
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 ${
            isDragging
              ? "border-blue-600 bg-blue-50/80"
              : value
              ? "border-emerald-300 bg-emerald-50/20"
              : "border-neutral-300 hover:border-blue-500 bg-neutral-50/50"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleUploadFile(e.target.files[0]);
              }
            }}
          />

          {isUploading ? (
            <div className="py-2 flex items-center gap-2 text-xs font-mono text-blue-600">
              <RefreshCw className="size-4 animate-spin" />
              <span>Uploading image file...</span>
            </div>
          ) : value ? (
            <div className="w-full flex items-center justify-between gap-4 p-1">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative size-12 rounded-lg border border-neutral-200 overflow-hidden bg-neutral-900 shrink-0">
                  <Image
                    src={value}
                    alt="Preview"
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 text-left">
                  <p className="text-xs font-mono font-bold text-slate-800 truncate">
                    {value.split("/").pop()}
                  </p>
                  <p className="text-[10px] font-mono text-emerald-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="size-3" /> Uploaded & Linked
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onChange("");
                }}
                className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 transition"
              >
                Change / Remove
              </button>
            </div>
          ) : (
            <div className="py-3 space-y-1">
              <CloudUpload className="size-8 text-blue-600 mx-auto" />
              <p className="text-xs font-mono font-semibold text-slate-700">
                Drag & Drop Image File Here, or <span className="text-blue-600 underline">Browse</span>
              </p>
              <p className="text-[10px] text-slate-500 font-inter">
                Supports PNG, JPG, WebP (Saved to /public/work/{slug || "<slug>"})
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function PublishCaseStudyTab() {
  const { refreshSession } = useDashboard();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  // Modal States
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [previewProject, setPreviewProject] = useState(null);
  const [editingSlug, setEditingSlug] = useState(null);

  // Form State
  const [formData, setFormData] = useState(defaultFormData);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  // Client Page Upload Form State
  const [clientForm, setClientForm] = useState({
    name: "",
    shortName: "",
    ownerName: "",
    ownerEmail: "",
    password: "",
    activeServices: ["AI-Powered Business Website"]
  });
  const [isSavingClient, setIsSavingClient] = useState(false);
  const [clientStatusMsg, setClientStatusMsg] = useState(null);

  // Fetch all case studies
  const loadCaseStudies = useCallback(async () => {
    setLoading(true);
    const res = await getAllCaseStudiesAction();
    if (res.success && res.projects) {
      setProjects(res.projects);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadCaseStudies();
  }, [loadCaseStudies]);

  // Handle Title to Slug auto generation
  const handleTitleChange = (val) => {
    setFormData((prev) => {
      const updated = { ...prev, title: val };
      if (!editingSlug) {
        updated.slug = val
          .toLowerCase()
          .trim()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-+|-+$/g, "");
      }
      return updated;
    });
  };

  // Toggle Visibility directly from card
  const handleToggleVisibility = async (slug, nextIsPrivate) => {
    const res = await toggleCaseStudyVisibilityAction(slug, nextIsPrivate);
    if (res.success) {
      loadCaseStudies();
    } else {
      alert(res.error || "Failed to update visibility.");
    }
  };

  // Open Modal for New Project
  const handleOpenCreate = () => {
    setEditingSlug(null);
    setFormData(defaultFormData);
    setStatusMessage(null);
    setIsPublishModalOpen(true);
  };

  // Open Modal for Editing existing
  const handleOpenEdit = (project) => {
    setEditingSlug(project.slug);
    setFormData({
      ...project,
      isPrivate: Boolean(project.isPrivate),
      tags: project.tags || [],
      metrics: project.metrics || [],
      challenge: project.challenge || [],
      solution: project.solution || [],
      results: project.results || [],
      journey: project.journey || [],
      mockups: project.mockups || []
    });
    setStatusMessage(null);
    setIsPublishModalOpen(true);
  };

  // Handle Form Submit
  const handleSubmitCaseStudy = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMessage(null);

    const res = await publishCaseStudyAction(formData);
    setIsSaving(false);

    if (res.success) {
      setStatusMessage({ type: "success", text: `Case study "${formData.title}" published successfully!` });
      setTimeout(() => {
        setIsPublishModalOpen(false);
        loadCaseStudies();
      }, 1200);
    } else {
      setStatusMessage({ type: "error", text: res.error || "Failed to publish case study." });
    }
  };

  // Delete Case Study
  const handleDelete = async (slug, title) => {
    if (confirm(`Are you sure you want to delete case study "${title}"?`)) {
      setLoading(true);
      const res = await deleteCaseStudyAction(slug);
      if (res.success) {
        loadCaseStudies();
      } else {
        alert(res.error || "Failed to delete case study.");
        setLoading(false);
      }
    }
  };

  // Submit Client Account Upload
  const handleSubmitClientPage = async (e) => {
    e.preventDefault();
    setIsSavingClient(true);
    setClientStatusMsg(null);

    const res = await createClientAccountAction(clientForm);
    setIsSavingClient(false);

    if (res.success) {
      setClientStatusMsg({ type: "success", text: `Client page "${clientForm.name}" created and provisioned!` });
      await refreshSession();
      setTimeout(() => {
        setIsClientModalOpen(false);
        setClientForm({
          name: "",
          shortName: "",
          ownerName: "",
          ownerEmail: "",
          password: "",
          activeServices: ["AI-Powered Business Website"]
        });
      }, 1200);
    } else {
      setClientStatusMsg({ type: "error", text: res.error || "Failed to create client account." });
    }
  };

  // Filter projects by search and category
  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.slug.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat =
      filterCategory === "all" || p.category === filterCategory;

    return matchesSearch && matchesCat;
  });

  const realWorldCount = projects.filter((p) => p.category === "real-world").length;
  const skillCount = projects.filter((p) => p.category === "skill-display").length;

  return (
    <div className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl w-full mx-auto space-y-8 font-inter">
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-200 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
              <FileCode className="size-5" />
            </span>
            <h1 className="text-2xl font-mono font-bold text-slate-900 tracking-tight">
              Publish Case Studies & Study Pages
            </h1>
          </div>
          <p className="text-xs text-slate-500 font-inter max-w-2xl">
            Create, edit, and publish high-converting client case study pages. Supports Public/Private visibility status, drag & drop image uploads, interactive metric builders, and client portal provisioning.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setIsClientModalOpen(true)}
            className="px-4 py-2 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-50 text-slate-800 text-xs font-mono font-semibold flex items-center gap-2 transition shadow-xs"
          >
            <Upload className="size-4 text-blue-600" />
            <span>Upload Client Page</span>
          </button>

          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-bold flex items-center gap-2 transition shadow-sm"
          >
            <Plus className="size-4" />
            <span>Publish Case Study</span>
          </button>
        </div>
      </div>

      {/* Metrics & Analytics Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl border border-neutral-200 bg-white shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-slate-500">
              Published Study Pages
            </span>
            <span className="p-1.5 rounded-md bg-blue-50 text-blue-600">
              <Layers className="size-4" />
            </span>
          </div>
          <div className="text-3xl font-mono font-extrabold text-slate-900">
            {projects.length}
          </div>
          <p className="text-[11px] text-slate-500">Active portfolio entries</p>
        </div>

        <div className="p-5 rounded-xl border border-neutral-200 bg-white shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-slate-500">
              Client Deliveries
            </span>
            <span className="p-1.5 rounded-md bg-emerald-50 text-emerald-600">
              <Building2 className="size-4" />
            </span>
          </div>
          <div className="text-3xl font-mono font-extrabold text-emerald-600">
            {realWorldCount}
          </div>
          <p className="text-[11px] text-slate-500">Real-world production case studies</p>
        </div>

        <div className="p-5 rounded-xl border border-neutral-200 bg-white shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-slate-500">
              Skill Prototypes
            </span>
            <span className="p-1.5 rounded-md bg-purple-50 text-purple-600">
              <Sparkles className="size-4" />
            </span>
          </div>
          <div className="text-3xl font-mono font-extrabold text-purple-600">
            {skillCount}
          </div>
          <p className="text-[11px] text-slate-500">Egostix Labs demonstration builds</p>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-neutral-50/80 p-3 rounded-xl border border-neutral-200">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 size-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, client, or slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-neutral-300 bg-white text-xs text-slate-900 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center bg-white p-1 rounded-lg border border-neutral-200">
            <button
              onClick={() => setFilterCategory("all")}
              className={`px-3 py-1 rounded text-xs font-mono font-medium transition ${
                filterCategory === "all"
                  ? "bg-blue-50 text-blue-700 font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All ({projects.length})
            </button>
            <button
              onClick={() => setFilterCategory("real-world")}
              className={`px-3 py-1 rounded text-xs font-mono font-medium transition ${
                filterCategory === "real-world"
                  ? "bg-blue-50 text-blue-700 font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Client Work ({realWorldCount})
            </button>
            <button
              onClick={() => setFilterCategory("skill-display")}
              className={`px-3 py-1 rounded text-xs font-mono font-medium transition ${
                filterCategory === "skill-display"
                  ? "bg-blue-50 text-blue-700 font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Prototypes ({skillCount})
            </button>
          </div>

          <button
            onClick={loadCaseStudies}
            className="p-2 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-100 text-slate-700 transition"
            title="Refresh List"
          >
            <RefreshCw className={`size-4 ${loading ? "animate-spin text-blue-600" : ""}`} />
          </button>
        </div>
      </div>

      {/* Case Studies Grid List */}
      {loading ? (
        <div className="py-16 text-center space-y-3">
          <RefreshCw className="size-8 text-blue-600 animate-spin mx-auto" />
          <p className="text-xs font-mono text-slate-500">Loading published case study pages...</p>
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="p-12 text-center bg-white rounded-xl border border-neutral-200 space-y-4">
          <FileCode className="size-12 text-slate-300 mx-auto" />
          <div>
            <h3 className="text-base font-mono font-bold text-slate-800">No case studies found</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mt-1">
              No published case studies match your current search query or category filter.
            </p>
          </div>
          <button
            onClick={handleOpenCreate}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-mono font-bold inline-flex items-center gap-2"
          >
            <Plus className="size-4" />
            <span>Create First Case Study</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.slug}
              className="bg-white rounded-xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div className="p-6 space-y-4">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                        {project.service}
                      </span>
                      <span className="text-[10px] font-mono font-semibold uppercase text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {project.category === "real-world" ? "Client Work" : "Prototype"}
                      </span>
                    </div>
                    <h3 className="text-lg font-mono font-bold text-slate-900 leading-snug pt-1">
                      {project.title}
                    </h3>
                  </div>

                  <span className="text-xs font-mono font-bold text-slate-400 bg-neutral-100 px-2.5 py-1 rounded">
                    {project.year}
                  </span>
                </div>

                <p className="text-xs font-inter text-slate-600 line-clamp-2 leading-relaxed">
                  {project.subtitle || project.summary}
                </p>

                {/* Metrics Badges */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 bg-neutral-50 p-3 rounded-lg border border-neutral-150 text-center">
                    {project.metrics.slice(0, 3).map((metric, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <div className="font-mono text-sm font-bold text-blue-700">
                          {metric.value}
                        </div>
                        <div className="text-[9px] font-inter text-slate-500 truncate">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Info Metadata */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-mono text-slate-500 pt-1">
                  <span>Client: <strong className="text-slate-800">{project.client}</strong></span>
                  <span>Slug: <code className="bg-neutral-100 text-slate-700 px-1.5 py-0.5 rounded text-[11px]">{project.slug}</code></span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="bg-neutral-50 px-6 py-3 border-t border-neutral-200 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/work/${project.slug}`}
                    target="_blank"
                    className="px-3 py-1.5 rounded-lg border border-neutral-300 bg-white hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 text-slate-700 text-xs font-mono font-semibold flex items-center gap-1.5 transition"
                  >
                    <ExternalLink className="size-3.5 text-blue-600" />
                    <span>Review Live</span>
                  </Link>

                  <button
                    onClick={() => setPreviewProject(project)}
                    className="px-3 py-1.5 rounded-lg border border-neutral-300 bg-white hover:bg-slate-100 text-slate-700 text-xs font-mono font-medium flex items-center gap-1.5 transition"
                  >
                    <Eye className="size-3.5 text-slate-500" />
                    <span>Quick Preview</span>
                  </button>
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Public / Private Visibility Toggle Button */}
                  <button
                    onClick={() => handleToggleVisibility(project.slug, !project.isPrivate)}
                    className={`px-2.5 py-1.5 rounded-lg border text-xs font-mono font-semibold flex items-center gap-1.5 transition ${
                      project.isPrivate
                        ? "bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100"
                        : "bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100"
                    }`}
                    title={project.isPrivate ? "Private Draft (Hidden on website). Click to make Public." : "Public Live (Visible on website). Click to make Private."}
                  >
                    {project.isPrivate ? (
                      <>
                        <EyeOff className="size-3.5 text-amber-600" />
                        <span>Private</span>
                      </>
                    ) : (
                      <>
                        <Globe className="size-3.5 text-emerald-600" />
                        <span>Public</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleOpenEdit(project)}
                    className="p-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-blue-50 hover:border-blue-300 text-slate-700 hover:text-blue-700 transition"
                    title="Edit Case Study"
                  >
                    <Edit className="size-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.slug, project.title)}
                    className="p-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-red-50 hover:border-red-300 text-slate-700 hover:text-red-700 transition"
                    title="Delete Case Study"
                  >
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PUBLISH / EDIT CASE STUDY MODAL */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-blue-100 text-blue-700">
                  <FileCode className="size-5" />
                </span>
                <div>
                  <h2 className="text-base font-mono font-bold text-slate-900">
                    {editingSlug ? `Edit Case Study: ${formData.title}` : "Publish New Study Page"}
                  </h2>
                  <p className="text-xs text-slate-500 font-inter">
                    Configure case study metadata, public/private visibility status, image assets, metrics, and storyline.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsPublishModalOpen(false)}
                className="p-2 rounded-lg hover:bg-neutral-200 text-slate-500 transition"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Modal Form Content */}
            <form onSubmit={handleSubmitCaseStudy} className="flex-1 overflow-y-auto p-6 space-y-6">
              {statusMessage && (
                <div
                  className={`p-4 rounded-xl border text-xs font-mono flex items-center gap-3 ${
                    statusMessage.type === "success"
                      ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                      : "bg-red-50 border-red-200 text-red-800"
                  }`}
                >
                  {statusMessage.type === "success" ? (
                    <CheckCircle2 className="size-5 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="size-5 text-red-600 shrink-0" />
                  )}
                  <span>{statusMessage.text}</span>
                </div>
              )}

              {/* Section 1: Basic Identifiers */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 border-b border-neutral-200 pb-2">
                  01. Project Identifiers & Visibility
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                      Project Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Apex Realty Platform"
                      value={formData.title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs font-inter text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                      URL Slug *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., apex-realty-platform"
                      value={formData.slug}
                      disabled={!!editingSlug}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, slug: e.target.value }))
                      }
                      className="w-full px-3 py-2 rounded-lg border border-neutral-300 bg-neutral-50 text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-600 disabled:opacity-60"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                      Client Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Apex Luxury Group"
                      value={formData.client}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, client: e.target.value }))
                      }
                      className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs font-inter text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                      Year *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="2026"
                      value={formData.year}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, year: e.target.value }))
                      }
                      className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, category: e.target.value }))
                      }
                      className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs font-inter text-slate-900 focus:outline-none focus:border-blue-600 bg-white"
                    >
                      <option value="real-world">Client Work (Real-World Delivery)</option>
                      <option value="skill-display">Skill Showcase (Lab Prototype)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                      Visibility Status
                    </label>
                    <select
                      value={formData.isPrivate ? "private" : "public"}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, isPrivate: e.target.value === "private" }))
                      }
                      className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs font-mono font-semibold text-slate-900 focus:outline-none focus:border-blue-600 bg-white"
                    >
                      <option value="public">🌐 Public (Visible on Website & Portfolio)</option>
                      <option value="private">🔒 Private (Draft - Dashboard Only)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                      Service Module
                    </label>
                    <select
                      value={formData.service}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, service: e.target.value }))
                      }
                      className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs font-inter text-slate-900 focus:outline-none focus:border-blue-600 bg-white"
                    >
                      <option value="AI-Powered Business Websites">AI-Powered Business Websites</option>
                      <option value="AI Internal Tools for SMBs">AI Internal Tools for SMBs</option>
                      <option value="AI Workflow Automation">AI Workflow Automation</option>
                      <option value="Creator Infrastructure">Creator Infrastructure</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                    Subtitle / Tagline *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="High-level summary line highlighting business value..."
                    value={formData.subtitle}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, subtitle: e.target.value }))
                    }
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs font-inter text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-700 mb-1 flex items-center gap-1.5">
                    <Globe className="size-3.5 text-blue-600" />
                    <span>Live Website Preview Link (URL)</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://yourmaker.in or https://susmitanursery.com"
                    value={formData.liveUrl || ""}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, liveUrl: e.target.value }))
                    }
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-600 bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                    Executive Summary Paragraph *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Detailed executive summary explaining client scope, technical achievements, and business value..."
                    value={formData.summary}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, summary: e.target.value }))
                    }
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs font-inter text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Section 2: Cover & Hero Image Upload Options */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 border-b border-neutral-200 pb-2">
                  02. Cover Image & Asset Upload Options
                </h3>

                <ImageUploader
                  label="Cover / Hero Image (Main Showcase Image)"
                  value={formData.image}
                  onChange={(newUrl) => setFormData((prev) => ({ ...prev, image: newUrl }))}
                  slug={formData.slug}
                  imageType="cover"
                />
              </div>

              {/* Section 3: Key Impact Metrics */}
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    03. Key Impact Metrics (3 items)
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        metrics: [...prev.metrics, { value: "+100%", label: "New Metric" }]
                      }))
                    }
                    className="text-xs font-mono text-blue-600 font-semibold flex items-center gap-1 hover:underline"
                  >
                    <Plus className="size-3.5" />
                    <span>Add Metric</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {formData.metrics.map((metric, idx) => (
                    <div key={idx} className="p-3 rounded-lg border border-neutral-200 bg-neutral-50 space-y-2 relative">
                      <button
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            metrics: prev.metrics.filter((_, i) => i !== idx)
                          }))
                        }
                        className="absolute right-2 top-2 text-slate-400 hover:text-red-600 transition"
                      >
                        <X className="size-3.5" />
                      </button>

                      <div>
                        <label className="block text-[10px] font-mono text-slate-500">Metric Value</label>
                        <input
                          type="text"
                          value={metric.value}
                          onChange={(e) => {
                            const newMetrics = [...formData.metrics];
                            newMetrics[idx].value = e.target.value;
                            setFormData((prev) => ({ ...prev, metrics: newMetrics }));
                          }}
                          className="w-full px-2 py-1 rounded border border-neutral-300 text-xs font-mono font-bold text-blue-700 bg-white"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-mono text-slate-500">Metric Label</label>
                        <input
                          type="text"
                          value={metric.label}
                          onChange={(e) => {
                            const newMetrics = [...formData.metrics];
                            newMetrics[idx].label = e.target.value;
                            setFormData((prev) => ({ ...prev, metrics: newMetrics }));
                          }}
                          className="w-full px-2 py-1 rounded border border-neutral-300 text-xs font-inter text-slate-800 bg-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 4: System Interface & Mobile Mockups */}
              <div className="space-y-6">
                <div className="border-b border-neutral-200 pb-2">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    04. System Interface & Mobile Mockup Uploads
                  </h3>
                  <p className="text-[11px] font-inter text-slate-500 mt-0.5">
                    Provide desktop/laptop system screenshots and mobile application mockups for public showcase.
                  </p>
                </div>

                {/* 04-A: Desktop / Laptop System Mockups */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-blue-50/70 p-2.5 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-2">
                      <Monitor className="size-4 text-blue-600" />
                      <h4 className="text-xs font-mono font-bold text-blue-900 uppercase">
                        04-A. Desktop & Laptop System Mockups (Top Showcase)
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          mockups: [
                            ...prev.mockups,
                            {
                              title: "Desktop Interface View",
                              description: "Description of desktop dashboard...",
                              type: "desktop",
                              badge: "Desktop View",
                              image: ""
                            }
                          ]
                        }))
                      }
                      className="text-[11px] font-mono text-blue-600 font-semibold flex items-center gap-1 hover:underline"
                    >
                      <Plus className="size-3.5" />
                      <span>Add Desktop Mockup Slot</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {formData.mockups.map((mockup, idx) => {
                      if (mockup.type === "mobile") return null;
                      return (
                        <div key={idx} className="p-4 rounded-xl border border-neutral-200 bg-neutral-50 space-y-3 relative">
                          <button
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                mockups: prev.mockups.filter((_, i) => i !== idx)
                              }))
                            }
                            className="absolute right-2 top-2 text-slate-400 hover:text-red-600 transition"
                            title="Remove Mockup"
                          >
                            <X className="size-3.5" />
                          </button>

                          <div>
                            <label className="block text-[10px] font-mono text-slate-500">Desktop View Title</label>
                            <input
                              type="text"
                              value={mockup.title}
                              onChange={(e) => {
                                const newMockups = [...formData.mockups];
                                newMockups[idx].title = e.target.value;
                                setFormData((prev) => ({ ...prev, mockups: newMockups }));
                              }}
                              className="w-full px-2 py-1 rounded border border-neutral-300 text-xs font-mono font-bold text-slate-800 bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono text-slate-500">Description</label>
                            <input
                              type="text"
                              value={mockup.description || ""}
                              onChange={(e) => {
                                const newMockups = [...formData.mockups];
                                newMockups[idx].description = e.target.value;
                                setFormData((prev) => ({ ...prev, mockups: newMockups }));
                              }}
                              placeholder="Description of desktop dashboard view..."
                              className="w-full px-2 py-1 rounded border border-neutral-300 text-xs font-inter text-slate-800 bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono text-slate-500">View Type</label>
                            <select
                              value={mockup.type}
                              onChange={(e) => {
                                const newMockups = [...formData.mockups];
                                newMockups[idx].type = e.target.value;
                                setFormData((prev) => ({ ...prev, mockups: newMockups }));
                              }}
                              className="w-full px-2 py-1 rounded border border-neutral-300 text-xs font-inter text-slate-800 bg-white"
                            >
                              <option value="desktop">Desktop Browser View</option>
                              <option value="analytics">Analytics & Admin Panel</option>
                              <option value="mobile">Move to Mobile Section</option>
                            </select>
                          </div>

                          <ImageUploader
                            label="Desktop Mockup Image File"
                            value={mockup.image || ""}
                            onChange={(newUrl) => {
                              const newMockups = [...formData.mockups];
                              newMockups[idx].image = newUrl;
                              setFormData((prev) => ({ ...prev, mockups: newMockups }));
                            }}
                            slug={formData.slug}
                            imageType={`mockup-desktop-${idx + 1}`}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 04-B: Mobile Interface Mockups */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between bg-purple-50/70 p-2.5 rounded-lg border border-purple-100">
                    <div className="flex items-center gap-2">
                      <Smartphone className="size-4 text-purple-600" />
                      <h4 className="text-xs font-mono font-bold text-purple-900 uppercase">
                        04-B. Mobile Interface Mockups (Bottom Showcase)
                      </h4>
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          mockups: [
                            ...prev.mockups,
                            {
                              title: "Mobile Interface View",
                              description: "Description of mobile UI view...",
                              type: "mobile",
                              badge: "Mobile View",
                              image: ""
                            }
                          ]
                        }))
                      }
                      className="text-[11px] font-mono text-purple-600 font-semibold flex items-center gap-1 hover:underline"
                    >
                      <Plus className="size-3.5" />
                      <span>Add Mobile Mockup Slot</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {formData.mockups.map((mockup, idx) => {
                      if (mockup.type !== "mobile") return null;
                      return (
                        <div key={idx} className="p-4 rounded-xl border border-neutral-200 bg-neutral-50 space-y-3 relative">
                          <button
                            type="button"
                            onClick={() =>
                              setFormData((prev) => ({
                                ...prev,
                                mockups: prev.mockups.filter((_, i) => i !== idx)
                              }))
                            }
                            className="absolute right-2 top-2 text-slate-400 hover:text-red-600 transition"
                            title="Remove Mockup"
                          >
                            <X className="size-3.5" />
                          </button>

                          <div>
                            <label className="block text-[10px] font-mono text-slate-500">Mobile View Title</label>
                            <input
                              type="text"
                              value={mockup.title}
                              onChange={(e) => {
                                const newMockups = [...formData.mockups];
                                newMockups[idx].title = e.target.value;
                                setFormData((prev) => ({ ...prev, mockups: newMockups }));
                              }}
                              className="w-full px-2 py-1 rounded border border-neutral-300 text-xs font-mono font-bold text-slate-800 bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono text-slate-500">Description</label>
                            <input
                              type="text"
                              value={mockup.description || ""}
                              onChange={(e) => {
                                const newMockups = [...formData.mockups];
                                newMockups[idx].description = e.target.value;
                                setFormData((prev) => ({ ...prev, mockups: newMockups }));
                              }}
                              placeholder="Description of mobile view..."
                              className="w-full px-2 py-1 rounded border border-neutral-300 text-xs font-inter text-slate-800 bg-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono text-slate-500">View Type</label>
                            <select
                              value={mockup.type}
                              onChange={(e) => {
                                const newMockups = [...formData.mockups];
                                newMockups[idx].type = e.target.value;
                                setFormData((prev) => ({ ...prev, mockups: newMockups }));
                              }}
                              className="w-full px-2 py-1 rounded border border-neutral-300 text-xs font-inter text-slate-800 bg-white"
                            >
                              <option value="mobile">Mobile View</option>
                              <option value="desktop">Move to Desktop Section</option>
                            </select>
                          </div>

                          <ImageUploader
                            label="Mobile Mockup Image File"
                            value={mockup.image || ""}
                            onChange={(newUrl) => {
                              const newMockups = [...formData.mockups];
                              newMockups[idx].image = newUrl;
                              setFormData((prev) => ({ ...prev, mockups: newMockups }));
                            }}
                            slug={formData.slug}
                            imageType={`mockup-mobile-${idx + 1}`}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Section 5: Storyline (Challenge, Solution, Outcomes) */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 border-b border-neutral-200 pb-2">
                  05. Detailed Storyline & Case Study Content
                </h3>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                    The Challenge (Paragraphs separated by blank lines)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.challenge.join("\n\n")}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        challenge: e.target.value.split(/\n\n+/).map((s) => s.trim()).filter(Boolean)
                      }))
                    }
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs font-inter text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                    The Solution (Paragraphs separated by blank lines)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.solution.join("\n\n")}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        solution: e.target.value.split(/\n\n+/).map((s) => s.trim()).filter(Boolean)
                      }))
                    }
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs font-inter text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                    Outcomes & Measurable Impact (One item per line)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.results.join("\n")}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        results: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean)
                      }))
                    }
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs font-inter text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              {/* Section 6: Tech Stack Tags */}
              <div className="space-y-2">
                <label className="block text-xs font-mono font-semibold text-slate-700">
                  Technologies Used (Comma-separated tags)
                </label>
                <input
                  type="text"
                  value={formData.tags.join(", ")}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      tags: e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
                    }))
                  }
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-600"
                  placeholder="Next.js, Tailwind CSS, Supabase, AI Tools"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 border-t border-neutral-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsPublishModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-100 text-slate-700 text-xs font-mono font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono font-bold flex items-center gap-2 transition disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <RefreshCw className="size-4 animate-spin" />
                      <span>Publishing...</span>
                    </>
                  ) : (
                    <>
                      <Check className="size-4" />
                      <span>{editingSlug ? "Save Changes" : "Publish Study Page"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* UPLOAD CLIENT PAGE MODAL */}
      {isClientModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-neutral-200 shadow-2xl max-w-lg w-full flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-lg bg-blue-100 text-blue-700">
                  <Upload className="size-5" />
                </span>
                <div>
                  <h2 className="text-base font-mono font-bold text-slate-900">
                    Upload & Provision Client Page
                  </h2>
                  <p className="text-xs text-slate-500 font-inter">
                    Provision a dedicated client tenant portal with active service modules.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsClientModalOpen(false)}
                className="p-2 rounded-lg hover:bg-neutral-200 text-slate-500 transition"
              >
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitClientPage} className="p-6 space-y-4">
              {clientStatusMsg && (
                <div
                  className={`p-3 rounded-xl border text-xs font-mono flex items-center gap-2 ${
                    clientStatusMsg.type === "success"
                      ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                      : "bg-red-50 border-red-200 text-red-800"
                  }`}
                >
                  {clientStatusMsg.type === "success" ? (
                    <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                  ) : (
                    <AlertCircle className="size-4 text-red-600 shrink-0" />
                  )}
                  <span>{clientStatusMsg.text}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                  Client Business Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Susmita Nursery"
                  value={clientForm.name}
                  onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs font-inter text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                  Short Code / Short Name
                </label>
                <input
                  type="text"
                  placeholder="e.g., Susmita"
                  value={clientForm.shortName}
                  onChange={(e) => setClientForm({ ...clientForm, shortName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs font-inter text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                    Client Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Susmita Roy"
                    value={clientForm.ownerName}
                    onChange={(e) => setClientForm({ ...clientForm, ownerName: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs font-inter text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                    Client Owner Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="client@company.com"
                    value={clientForm.ownerEmail}
                    onChange={(e) => setClientForm({ ...clientForm, ownerEmail: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs font-inter text-slate-900 focus:outline-none focus:border-blue-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">
                  Initial Portal Password (Optional)
                </label>
                <input
                  type="password"
                  placeholder="Leave blank or enter initial password"
                  value={clientForm.password}
                  onChange={(e) => setClientForm({ ...clientForm, password: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-neutral-300 text-xs font-mono text-slate-900 focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsClientModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-neutral-300 text-xs font-mono font-semibold text-slate-700 hover:bg-neutral-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingClient}
                  className="px-5 py-2 rounded-lg bg-blue-600 text-white text-xs font-mono font-bold flex items-center gap-2 hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSavingClient ? (
                    <>
                      <RefreshCw className="size-4 animate-spin" />
                      <span>Uploading...</span>
                    </>
                  ) : (
                    <>
                      <Upload className="size-4" />
                      <span>Provision Client Portal</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QUICK PREVIEW DRAWER */}
      {previewProject && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex justify-end">
          <div className="bg-white w-full max-w-2xl h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="p-6 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                  {previewProject.service}
                </span>
                <h2 className="text-xl font-mono font-bold text-slate-900 mt-1">
                  {previewProject.title}
                </h2>
              </div>
              <button
                onClick={() => setPreviewProject(null)}
                className="p-2 rounded-lg hover:bg-neutral-200 text-slate-500"
              >
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div>
                <h4 className="text-xs font-mono font-bold uppercase text-slate-400 mb-1">
                  Subtitle
                </h4>
                <p className="text-sm font-inter text-slate-800 leading-relaxed">
                  {previewProject.subtitle}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-mono font-bold uppercase text-slate-400 mb-1">
                  Executive Summary
                </h4>
                <p className="text-xs font-inter text-slate-600 leading-relaxed bg-neutral-50 p-3 rounded-lg border border-neutral-200">
                  {previewProject.summary}
                </p>
              </div>

              {previewProject.metrics && (
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase text-slate-400 mb-2">
                    Key Outcomes
                  </h4>
                  <div className="grid grid-cols-3 gap-3">
                    {previewProject.metrics.map((m, idx) => (
                      <div key={idx} className="p-3 bg-blue-50 rounded-lg border border-blue-150 text-center">
                        <div className="font-mono text-xl font-extrabold text-blue-700">{m.value}</div>
                        <div className="text-[10px] text-slate-600">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {previewProject.results && (
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase text-slate-400 mb-2">
                    Delivered Results
                  </h4>
                  <ul className="space-y-2">
                    {previewProject.results.map((res, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="size-4 text-blue-600 shrink-0 mt-0.5" />
                        <span>{res}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between">
              <Link
                href={`/work/${previewProject.slug}`}
                target="_blank"
                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-mono font-bold flex items-center gap-2 hover:bg-blue-700"
              >
                <span>Open Full Page</span>
                <ExternalLink className="size-4" />
              </Link>

              <button
                onClick={() => setPreviewProject(null)}
                className="px-4 py-2 rounded-lg border border-neutral-300 text-xs font-mono font-semibold text-slate-700 hover:bg-neutral-100"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
