"use client";

import React, { useState } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    systemType: "websites",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submit behavior
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", systemType: "websites", message: "" });
    }, 1000);
  };

  return (
    <section id="contact" className="w-full border-t border-neutral-200 px-6 py-24 bg-white" aria-labelledby="contact-heading">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-12 md:grid-cols-[0.8fr_1fr] md:items-start">
          
          {/* Coordinates Column */}
          <div className="space-y-6">
            <p className="text-xs font-mono uppercase tracking-normal text-blue-700">
              Coordinates
            </p>
            <h2 id="contact-heading" className="text-2xl font-mono tracking-tight tablet:text-3xl laptop:text-4xl text-slate-900">
              Let&apos;s engineer your operational infrastructure.
            </h2>
            <p className="text-sm font-inter leading-relaxed text-slate-700 tablet:text-base">
              Every system starts with a discovery query. Get in touch to outline your workflow inefficiencies and map out a prototype.
            </p>

            <div className="font-mono text-sm space-y-3 pt-4 border-t border-neutral-200">
              <div>
                <p className="text-xs uppercase text-slate-500 font-semibold">Email</p>
                <a href="mailto:contact@egostix.com" className="text-blue-700 hover:underline">
                  contact@egostix.com
                </a>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-500 font-semibold">Phone</p>
                <a href="tel:+917319274817" className="text-blue-700 hover:underline">
                  +91 73192 74817
                </a>
              </div>
              <div>
                <p className="text-xs uppercase text-slate-500 font-semibold">Studio Location</p>
                <p className="text-slate-700">Badkulla, West Bengal, India</p>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="rounded border border-neutral-300 bg-neutral-50 p-6 tablet:p-8">
            {status === "success" ? (
              <div className="space-y-4 text-center py-8">
                <h3 className="font-mono text-lg font-semibold text-green-700">Query Logged</h3>
                <p className="text-sm font-inter text-slate-700">
                  Our system has recorded your coordinates. An engineer will follow up via email within 24 hours.
                </p>
                <button
                  onClick={() => setStatus("")}
                  className="rounded border border-blue-700 bg-blue-700 px-4 py-2 font-mono text-xs text-white hover:bg-blue-800 transition"
                >
                  Log another query
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1">
                  <label htmlFor="name" className="block font-mono text-xs font-semibold text-slate-900">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full rounded border border-neutral-300 bg-white p-3 font-inter text-sm text-slate-900 focus:border-blue-700 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="block font-mono text-xs font-semibold text-slate-900">
                    Work Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@company.com"
                    className="w-full rounded border border-neutral-300 bg-white p-3 font-inter text-sm text-slate-900 focus:border-blue-700 focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="systemType" className="block font-mono text-xs font-semibold text-slate-900">
                    Required Infrastructure
                  </label>
                  <select
                    id="systemType"
                    value={formData.systemType}
                    onChange={(e) => setFormData({ ...formData, systemType: e.target.value })}
                    className="w-full rounded border border-neutral-300 bg-white p-3 font-inter text-sm text-slate-900 focus:border-blue-700 focus:outline-none"
                  >
                    <option value="websites">AI Business Website</option>
                    <option value="tools">AI Internal Dashboard / Admin Panel</option>
                    <option value="creator">Creator Infrastructure</option>
                    <option value="automation">WhatsApp & Workflow Automation</option>
                    <option value="other">Other Software Engineering</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="message" className="block font-mono text-xs font-semibold text-slate-900">
                    Operational Scope
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your workflows, goals, or system constraints"
                    className="w-full rounded border border-neutral-300 bg-white p-3 font-inter text-sm text-slate-900 focus:border-blue-700 focus:outline-none resize-y"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full rounded bg-blue-700 px-4 py-3 font-mono text-xs font-semibold text-white transition hover:bg-blue-800 disabled:opacity-50"
                >
                  {status === "submitting" ? "Logging..." : "Contact us to begin"}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
