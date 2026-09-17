"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Check, Send, Loader2, AlertCircle, Sparkles, MailCheck } from "lucide-react";
import InteractiveInquiryButton from "@/components/ui/InteractiveInquiryButton";
import { sendContactAction } from "@/actions/contact";

const serviceOptions = [
  { id: "websites", label: "AI Business Website", tag: "Websites & Concierge" },
  { id: "tools", label: "AI Internal Tool", tag: "Dashboards & ERP" },
  { id: "creator", label: "Creator Infrastructure", tag: "Stripe & Digital Products" },
  { id: "automation", label: "Workflow Automation", tag: "WhatsApp & CRM Integrations" },
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
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (initialSystem && serviceOptions.some((opt) => opt.id === initialSystem)) {
      setFormData((prev) => ({ ...prev, systemType: initialSystem }));
    }
  }, [initialSystem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await sendContactAction(formData);

      if (res.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          org: "",
          systemType: "websites",
          message: "",
        });
      } else {
        setStatus("error");
        setErrorMsg(res.error || "Failed to send message. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg("An unexpected network error occurred.");
    }
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
      {/* Left Column: Studio Contact & Location Info */}
      <div className="flex flex-col justify-between rounded-xl border border-neutral-300 bg-neutral-50 p-6 tablet:p-8 space-y-8 h-full">
        <div className="space-y-6">
          <div className="space-y-3">
            <p className="text-xs font-mono uppercase tracking-normal text-blue-600 flex items-center gap-1.5 font-bold">
              <Sparkles className="size-3.5 text-blue-600" />
              <span>Get In Touch</span>
            </p>
            <h2 className="text-2xl font-mono tracking-tight tablet:text-3xl laptop:text-4xl text-slate-900 leading-tight">
              Let&apos;s build your next project together.
            </h2>
            <p className="text-sm font-inter leading-relaxed text-slate-700">
              Get in touch with our team to discuss your project requirements, custom software, or workflow automation needs.
            </p>
          </div>

          <div className="font-mono text-sm space-y-4 pt-6 border-t border-neutral-200">
            <div>
              <p className="text-xs uppercase text-slate-400 font-semibold mb-1">
                Direct Email
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
                Studio Phone
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
            <strong className="font-mono text-slate-800 font-medium">Response Time:</strong> We typically respond to all project inquiries within 24 hours.
          </p>
        </div>
      </div>

      {/* Right Column: Clean Interactive Contact Form */}
      <div className="rounded-xl border border-neutral-300 bg-white p-6 tablet:p-8 flex flex-col justify-between h-full shadow-sm">
        {status === "success" ? (
          <div className="space-y-6 text-center my-auto py-12 animate-in fade-in duration-300">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-sm">
              <MailCheck className="size-7" />
            </div>
            <div className="space-y-2">
              <h3 className="font-mono text-xl font-bold text-slate-900">
                Thank You! Your Message Has Been Sent
              </h3>
            </div>
            <p className="text-sm font-inter text-slate-600 max-w-md mx-auto leading-relaxed">
              We&apos;ve received your inquiry and sent a confirmation copy to your work email address. Our team will review your details and reach out within 24 hours.
            </p>
            <button
              onClick={() => setStatus("")}
              className="mt-4 inline-flex items-center justify-center rounded bg-blue-700 px-6 py-3 font-mono text-xs font-semibold text-white hover:bg-blue-800 transition shadow-xs"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 flex flex-col justify-between h-full">
            <div className="space-y-5">
              {errorMsg && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-inter p-3.5 rounded-lg flex items-start gap-2.5">
                  <AlertCircle className="size-4 shrink-0 text-red-500 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

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
                    placeholder="e.g. Alex Morgan"
                    className="w-full rounded-lg border border-neutral-300 bg-white p-3 font-inter text-sm text-slate-900 focus:border-blue-700 focus:outline-none min-h-[44px]"
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
                    placeholder="e.g. Acme Corp"
                    className="w-full rounded-lg border border-neutral-300 bg-white p-3 font-inter text-sm text-slate-900 focus:border-blue-700 focus:outline-none min-h-[44px]"
                  />
                </div>
              </div>

              {/* Work Email Input */}
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block font-mono text-xs font-semibold text-slate-900"
                >
                  Work Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="name@company.com"
                  className="w-full rounded-lg border border-neutral-300 bg-white p-3 font-inter text-sm text-slate-900 focus:border-blue-700 focus:outline-none min-h-[44px]"
                />
              </div>

              {/* Service Selection Cards */}
              <div className="space-y-2 pt-1">
                <label className="block font-mono text-xs font-semibold text-slate-900">
                  Service Category *
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
                        className={`group flex items-center justify-between rounded-lg border px-3.5 py-2.5 text-left transition-all duration-150 ${
                          isSelected
                            ? "border-blue-700 bg-blue-700 text-white shadow-xs"
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
                              ? "border-white bg-white text-blue-700"
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

              {/* Project Details / Scope Textarea */}
              <div className="space-y-1.5">
                <label
                  htmlFor="message"
                  className="block font-mono text-xs font-semibold text-slate-900"
                >
                  Project Details & Requirements *
                </label>
                <textarea
                  id="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell us about your project, goals, requirements, or timelines"
                  className="w-full rounded-lg border border-neutral-300 bg-white p-3 font-inter text-sm text-slate-900 focus:border-blue-700 focus:outline-none resize-y min-h-[110px]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-3.5 font-mono text-xs font-bold text-white transition hover:bg-blue-800 disabled:opacity-50 shadow-xs mt-4 min-h-[48px]"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  <span>Sending message...</span>
                </>
              ) : (
                <>
                  <span>Submit Inquiry</span>
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
