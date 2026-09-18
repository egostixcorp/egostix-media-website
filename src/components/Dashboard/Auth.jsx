"use client";

import React, { useState, useEffect } from "react";
import { useDashboard } from "./DashboardContext";
import { loginAction, signupAction } from "@/actions/auth";
import {
  Lock,
  Mail,
  User,
  Building2,
  ArrowRight,
  Loader2,
} from "lucide-react";
import Image from "next/image";

const Auth = () => {
  const { refreshSession } = useDashboard();
  const [isLoginView, setIsLoginView] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (isLoginView) {
        if (!formData.email || !formData.password) {
          setError("Please enter both email and password.");
          setIsLoading(false);
          return;
        }
        const res = await loginAction(formData.email, formData.password);
        if (!res.success) {
          setError(res.error || "Failed to sign in. Please check your credentials.");
        } else if (refreshSession) {
          await refreshSession();
        }
      } else {
        if (
          !formData.name ||
          !formData.email ||
          !formData.password ||
          !formData.companyName
        ) {
          setError("All fields are required to register.");
          setIsLoading(false);
          return;
        }
        const res = await signupAction(
          formData.name,
          formData.email,
          formData.password,
          formData.companyName
        );
        if (!res.success) {
          setError(res.error || "Failed to register account.");
        } else if (refreshSession) {
          await refreshSession();
        }
      }
    } catch (err) {
      setError(err?.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
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
            disabled={isLoading}
            className="w-full rounded bg-blue-700 px-4 py-2.5 font-mono text-xs font-semibold text-white hover:bg-blue-800 disabled:opacity-50 transition shadow-sm flex items-center justify-center gap-1.5"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <span>{isLoginView ? "Sign In to Console" : "Register and Log In"}</span>
                <ArrowRight className="size-3.5" />
              </>
            )}
          </button>
        </form>
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
