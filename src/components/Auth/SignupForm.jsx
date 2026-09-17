"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signupAction } from "@/actions/auth";
import {
  Lock,
  Mail,
  User,
  Building2,
  ArrowRight,
  ArrowLeft,
  Loader2,
  AlertCircle
} from "lucide-react";
import Image from "next/image";

const SignupForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    companyName: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name || !formData.email || !formData.password || !formData.companyName) {
      setError("All fields are required to register your client account.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await signupAction(
        formData.name,
        formData.email,
        formData.password,
        formData.companyName
      );

      if (!res.success) {
        setError(res.error || "Failed to create account.");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      setError(err?.message || "An unexpected error occurred during signup.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-neutral-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl border border-neutral-200 shadow-md p-8 space-y-6">
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
            Register Client Portal
          </h2>
          <p className="text-xs text-slate-500 font-inter max-w-xs leading-normal">
            Create an account for your organization to access custom business tools, files, and analytics.
          </p>
        </div>

        {/* View Switcher Pills */}
        <div className="flex bg-neutral-100 p-1 rounded-md border border-neutral-200">
          <Link
            href="/login"
            className="flex-1 py-1.5 text-xs font-mono font-medium rounded text-center transition-all text-slate-500 hover:text-slate-900"
          >
            Login Portal
          </Link>
          <Link
            href="/signup"
            className="flex-1 py-1.5 text-xs font-mono font-medium rounded text-center transition-all bg-white text-slate-950 shadow-xs"
          >
            Register Client
          </Link>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-xs font-inter p-3 rounded flex items-start gap-2.5">
            <AlertCircle className="size-4 shrink-0 text-red-500 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="block text-[10px] font-mono font-bold uppercase text-slate-600">
              Full Name *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="Enter your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full rounded border border-neutral-300 bg-white pl-9 pr-3 py-2 text-xs font-inter text-slate-900 focus:border-blue-700 focus:outline-none min-h-[42px]"
              />
              <User className="absolute left-3 top-3 size-4 text-slate-400" />
            </div>
          </div>

          {/* Company / Brand Name */}
          <div className="space-y-1">
            <label className="block text-[10px] font-mono font-bold uppercase text-slate-600">
              Company / Brand Name *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="e.g. Acme Corporation"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full rounded border border-neutral-300 bg-white pl-9 pr-3 py-2 text-xs font-inter text-slate-900 focus:border-blue-700 focus:outline-none min-h-[42px]"
              />
              <Building2 className="absolute left-3 top-3 size-4 text-slate-400" />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="block text-[10px] font-mono font-bold uppercase text-slate-600">
              Work Email Address *
            </label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="name@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full rounded border border-neutral-300 bg-white pl-9 pr-3 py-2 text-xs font-inter text-slate-900 focus:border-blue-700 focus:outline-none min-h-[42px]"
              />
              <Mail className="absolute left-3 top-3 size-4 text-slate-400" />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="block text-[10px] font-mono font-bold uppercase text-slate-600">
              System Password *
            </label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full rounded border border-neutral-300 bg-white pl-9 pr-3 py-2 text-xs font-inter text-slate-900 focus:border-blue-700 focus:outline-none min-h-[42px]"
              />
              <Lock className="absolute left-3 top-3 size-4 text-slate-400" />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded bg-blue-700 px-4 py-2.5 font-mono text-xs font-semibold text-white hover:bg-blue-800 disabled:opacity-50 transition shadow-xs flex items-center justify-center gap-1.5 min-h-[44px]"
          >
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Creating Account...</span>
              </>
            ) : (
              <>
                <span>Register and Log In</span>
                <ArrowRight className="size-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Bottom Link */}
        <div className="text-center pt-2 text-xs font-inter text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-700 font-semibold font-mono hover:underline">
            Sign in to your console
          </Link>
        </div>
      </div>

      {/* Bottom-left back to home navigation */}
      <Link
        href="/"
        className="fixed bottom-6 left-6 flex items-center gap-2 text-xs font-mono font-semibold text-slate-700 hover:text-blue-700 bg-white border border-neutral-200 shadow-sm px-3.5 py-2.5 rounded-lg transition-all hover:border-blue-300 hover:shadow-md z-50"
      >
        <ArrowLeft className="size-4 text-blue-700" />
        <span>Back to Home</span>
      </Link>
    </div>
  );
};

export default SignupForm;
