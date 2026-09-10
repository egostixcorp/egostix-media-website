"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Check, Send } from "lucide-react";
import InteractiveInquiryButton from "@/components/ui/InteractiveInquiryButton";

const serviceOptions = [
  { id: "websites", label: "AI Business Website", tag: "Websites" },
  { id: "tools", label: "AI Internal Tool", tag: "Dashboards & Tools" },
  { id: "creator", label: "Creator Infrastructure", tag: "Creator Platform" },
  { id: "automation", label: "Workflow Automation", tag: "WhatsApp & Workflows" },
  { id: "other", label: "Custom Engineering", tag: "Bespoke Software" },
];

const ContactFormContent = () => {
  const searchParams = useSearchParams();
  const initialSystem = searchParams ? searchParams.get("system") : null;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    org: "",
    systemType: "websites",
    message: "",
  });
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (initialSystem && serviceOptions.some((opt) => opt.id === initialSystem)) {
      setFormData((prev) => ({ ...prev, systemType: initialSystem }));
    }
  }, [initialSystem]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setFormData({
        name: "",
        email: "",
        org: "",
        systemType: "websites",
        message: "",
      });
    }, 1000);
  };

  const handleInquiryClick = () => {
    const nameInput = document.getElementById("name");
    if (nameInput) {
      nameInput.focus();
      nameInput.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr] md:items-stretch">
      {/* Left Column: Coordinates & Contact Info (Matches Right Form Height) */}
      <div className="flex flex-col justify-between rounded-xl border border-neutral-300 bg-neutral-50 p-6 tablet:p-8 space-y-8 h-full">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-normal text-blue-600">
              Coordinates
            </p>
            <h2 className="text-2xl font-mono tracking-tight tablet:text-3xl laptop:text-4xl text-slate-900 leading-tight">
              Let&apos;s engineer your operational infrastructure.
            </h2>
            <p className="text-sm font-inter leading-relaxed text-slate-700">
              Every system starts with a discovery query. Get in touch to outline your workflow inefficiencies and map out a fixed-timeline prototype.
            </p>
          </div>

          <div className="font-mono text-sm space-y-4 pt-6 border-t border-neutral-200">
            <div>
              <p className="text-xs uppercase text-slate-400 font-semibold mb-1">
                Email
              </p>
              <a
                href="mailto:contact@egostix.com"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                contact@egostix.com
              </a>
            </div>

            <div>
              <p className="text-xs uppercase text-slate-400 font-semibold mb-1">
                Phone
              </p>
              <a
                href="tel:+917319274817"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                +91 73192 74817
              </a>
            </div>

            <div>
              <p className="text-xs uppercase text-slate-400 font-semibold mb-1">
                Studio Location
              </p>
              <p className="text-slate-700">Badkulla, Nadia, West Bengal, India - 741121</p>
              <div className="pt-2">
                <InteractiveInquiryButton
                  label="Send Direct Inquiry"
                  onClick={handleInquiryClick}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom SLA Card */}
        <div className="rounded-lg border border-neutral-200 bg-white p-4 font-inter text-xs text-slate-600 leading-relaxed mt-auto">
          <p>
            <strong className="font-mono text-slate-800 font-medium">Response SLA:</strong> We typically respond within 24 hours. Concrete constraints and clear goals help us move faster.
          </p>
        </div>
      </div>

      {/* Right Column: Contact Form */}
      <div className="rounded-xl border border-neutral-300 bg-white p-6 tablet:p-8 flex flex-col justify-between h-full">
        {status === "success" ? (
          <div className="space-y-4 text-center my-auto py-12">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-50 text-green-600 border border-green-200">
              <Check className="size-6" />
            </div>
            <h3 className="font-mono text-xl font-bold text-slate-900">
              Query Logged
            </h3>
            <p className="text-sm font-inter text-slate-600 max-w-md mx-auto leading-relaxed">
              Our system has recorded your coordinates. An engineer will review your request and follow up via email within 24 hours.
            </p>
            <button
              onClick={() => setStatus("")}
              className="mt-4 inline-flex items-center justify-center rounded bg-blue-600 px-5 py-2.5 font-mono text-xs font-semibold text-white hover:bg-blue-700 transition"
            >
              Log another query
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 flex flex-col justify-between h-full">
            <div className="space-y-5">
              {/* Name & Organization Inputs */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label
                    htmlFor="name"
                    className="block font-mono text-xs font-semibold text-slate-900"
                  >
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Enter your name"
                    className="w-full rounded border border-neutral-300 bg-white p-3 font-inter text-sm text-slate-900 focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="org"
                    className="block font-mono text-xs font-semibold text-slate-900"
                  >
                    Organization / Company
                  </label>
                  <input
                    type="text"
                    id="org"
                    value={formData.org}
                    onChange={(e) =>
                      setFormData({ ...formData, org: e.target.value })
                    }
                    placeholder="Company name"
                    className="w-full rounded border border-neutral-300 bg-white p-3 font-inter text-sm text-slate-900 focus:border-blue-600 focus:outline-none"
                  />
                </div>
              </div>

              {/* Work Email Input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block font-mono text-xs font-semibold text-slate-900"
                >
                  Work Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="you@company.com"
                  className="w-full rounded border border-neutral-300 bg-white p-3 font-inter text-sm text-slate-900 focus:border-blue-600 focus:outline-none"
                />
              </div>

              {/* Service Selection Cards (Middle-Aligned directly after Work Email) */}
              <div className="space-y-2 pt-1">
                <label className="block font-mono text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Service Selection *
                </label>
                <div className="grid gap-2 sm:grid-cols-2">
                  {serviceOptions.map((option) => {
                    const isSelected = formData.systemType === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, systemType: option.id })
                        }
                        className={`group flex items-center justify-between rounded border px-3 py-2 text-left transition-all duration-200 ${
                          isSelected
                            ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                            : "border-neutral-200 bg-neutral-50/70 text-slate-800 hover:border-blue-400 hover:bg-white"
                        }`}
                      >
                        <div className="flex flex-col min-w-0 pr-2">
                          <span className="font-mono text-xs font-semibold truncate">
                            {option.label}
                          </span>
                          <span
                            className={`font-inter text-[10px] truncate ${
                              isSelected ? "text-blue-100" : "text-slate-500"
                            }`}
                          >
                            {option.tag}
                          </span>
                        </div>
                        <div
                          className={`flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
                            isSelected
                              ? "border-white bg-white text-blue-600"
                              : "border-neutral-300 bg-white group-hover:border-blue-400"
                          }`}
                        >
                          {isSelected && <Check className="size-3 stroke-[3]" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Operational Scope Textarea */}
              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="block font-mono text-xs font-semibold text-slate-900"
                >
                  Operational Scope / Business Problem *
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Describe your current workflows, goals, constraints, or timeline"
                  className="w-full rounded border border-neutral-300 bg-white p-3 font-inter text-sm text-slate-900 focus:border-blue-600 focus:outline-none resize-y"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex w-full items-center justify-center gap-2 rounded bg-blue-600 px-5 py-3.5 font-mono text-xs font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50 mt-4"
            >
              {status === "submitting" ? (
                "Logging Query..."
              ) : (
                <>
                  Start the conversation
                  <Send className="size-3.5" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const ContactSection = () => {
  return (
    <section
      id="contact"
      className="w-full border-t border-neutral-200 px-6 py-24 bg-white"
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-6xl">
        <Suspense fallback={<div className="font-mono text-sm text-slate-500">Loading form...</div>}>
          <ContactFormContent />
        </Suspense>
      </div>
    </section>
  );
};

export default ContactSection;


