"use client";

import React, { useState, useEffect } from "react";
import { useDashboard } from "./DashboardContext";
import {
  Lock,
  Mail,
  User,
  Building2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import Image from "next/image";

const Auth = () => {
  const { login, signup } = useDashboard();
  const [isLoginView, setIsLoginView] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    companyName: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const initialTab = sessionStorage.getItem("egostix_auth_tab");
      if (initialTab === "signup") {
        setIsLoginView(false);
      } else {
        setIsLoginView(true);
      }
      sessionStorage.removeItem("egostix_auth_tab");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (isLoginView) {
      if (!formData.email || !formData.password) {
        setError("Please enter both email and password.");
        return;
      }
      login(formData.email, formData.password);
    } else {
      if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.companyName
      ) {
        setError("All fields are required to register.");
        return;
      }
      signup(
        formData.name,
        formData.email,
        formData.password,
        formData.companyName,
      );
    }
  };

  // Helper helper to login automatically with demo credentials
  const handleQuickLogin = (email) => {
    login(email, "password123");
  };

  return (
    <div className="w-full min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-6">
      {/* Container */}
      <div className="w-full max-w-md bg-white rounded-lg border border-neutral-200 shadow-md p-8 space-y-6">
        {/* Logo and Header */}
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="h-12 w-32 relative overflow-hidden flex items-center justify-center">
            <Image
              src="/egostix-media-trans.png"
              alt="Egostix Logo"
              width={140}
              height={42}
              className="object-contain"
            />
          </div>
          <h2 className="text-xl font-mono tracking-tight font-bold text-slate-900 mt-2">
            Operations & Analytics Portal
          </h2>
          <p className="text-xs text-slate-500 font-inter max-w-xs leading-normal">
            Qualify demand, review transcripts, sync files, and manage
            development pipelines.
          </p>
        </div>

        {/* View Switcher Pills */}
        <div className="flex bg-neutral-100 p-1 rounded-md border border-neutral-200">
          <button
            onClick={() => {
              setIsLoginView(true);
              setError("");
            }}
            className={`flex-1 py-1.5 text-xs font-mono font-medium rounded transition-all ${
              isLoginView
                ? "bg-white text-slate-950 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Login Portal
          </button>
          <button
            onClick={() => {
              setIsLoginView(false);
              setError("");
            }}
            className={`flex-1 py-1.5 text-xs font-mono font-medium rounded transition-all ${
              !isLoginView
                ? "bg-white text-slate-950 shadow-sm"
                : "text-slate-500 hover:text-slate-900"
            }`}
          >
            Register Client
          </button>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-inter p-3 rounded flex items-start gap-2.5">
            <AlertCircle className="size-4 shrink-0 text-red-500 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLoginView && (
            <>
              {/* Full Name */}
              <div className="space-y-1">
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-600">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full rounded border border-neutral-300 bg-white pl-9 pr-3 py-2 text-xs font-inter text-slate-900 focus:border-blue-700 focus:outline-none"
                  />
                  <User className="absolute left-3 top-2.5 size-4 text-slate-400" />
                </div>
              </div>

              {/* Company / Brand Name */}
              <div className="space-y-1">
                <label className="block text-[10px] font-mono font-bold uppercase text-slate-600">
                  Company / Brand Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    placeholder="e.g. Acme Corporation"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    className="w-full rounded border border-neutral-300 bg-white pl-9 pr-3 py-2 text-xs font-inter text-slate-900 focus:border-blue-700 focus:outline-none"
                  />
                  <Building2 className="absolute left-3 top-2.5 size-4 text-slate-400" />
                </div>
              </div>
            </>
          )}

          {/* Email */}
          <div className="space-y-1">
            <label className="block text-[10px] font-mono font-bold uppercase text-slate-600">
              Work Email Address
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full rounded border border-neutral-300 bg-white pl-9 pr-3 py-2 text-xs font-inter text-slate-900 focus:border-blue-700 focus:outline-none"
              />
              <Mail className="absolute left-3 top-2.5 size-4 text-slate-400" />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <label className="block text-[10px] font-mono font-bold uppercase text-slate-600">
                System Password
              </label>
            </div>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full rounded border border-neutral-300 bg-white pl-9 pr-3 py-2 text-xs font-inter text-slate-900 focus:border-blue-700 focus:outline-none"
              />
              <Lock className="absolute left-3 top-2.5 size-4 text-slate-400" />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full rounded bg-blue-700 px-4 py-2.5 font-mono text-xs font-semibold text-white hover:bg-blue-800 transition shadow-sm flex items-center justify-center gap-1.5"
          >
            {isLoginView ? "Sign In to Console" : "Register and Log In"}
            <ArrowRight className="size-3.5" />
          </button>
        </form>

        {/* Quick Demo Selector for fast evaluation */}
        {isLoginView && (
          <div className="border-t border-neutral-200 pt-5 space-y-3">
            <div className="flex items-center gap-1.5 text-[10px] font-mono font-bold uppercase text-slate-400">
              <ShieldCheck className="size-4 text-slate-400" />
              <span>One-Click Demo Credentials</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
              <button
                onClick={() => handleQuickLogin("owner@egostix.com")}
                className="rounded border border-neutral-200 hover:border-blue-600 px-2 py-1.5 bg-neutral-50 text-slate-700 text-left hover:text-blue-700 transition"
              >
                <div className="font-bold text-[9px] uppercase text-blue-700">
                  Owner Access
                </div>
                owner@egostix.com
              </button>
              <button
                onClick={() => handleQuickLogin("staff@egostix.com")}
                className="rounded border border-neutral-200 hover:border-blue-600 px-2 py-1.5 bg-neutral-50 text-slate-700 text-left hover:text-blue-700 transition"
              >
                <div className="font-bold text-[9px] uppercase text-blue-700">
                  Staff Node
                </div>
                staff@egostix.com
              </button>
              <button
                onClick={() => handleQuickLogin("sarah@apex.com")}
                className="rounded border border-neutral-200 hover:border-blue-600 px-2 py-1.5 bg-neutral-50 text-slate-700 text-left hover:text-blue-700 transition"
              >
                <div className="font-bold text-[9px] uppercase text-blue-700">
                  Apex Realty (Client)
                </div>
                sarah@apex.com
              </button>
              <button
                onClick={() => handleQuickLogin("david@pulse.com")}
                className="rounded border border-neutral-200 hover:border-blue-600 px-2 py-1.5 bg-neutral-50 text-slate-700 text-left hover:text-blue-700 transition"
              >
                <div className="font-bold text-[9px] uppercase text-blue-700">
                  Pulse Ops (Client)
                </div>
                david@pulse.com
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Simple icon replacement helper for file scope validation
const AlertCircle = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

export default Auth;
