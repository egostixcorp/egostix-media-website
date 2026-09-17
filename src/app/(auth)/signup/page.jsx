import React from "react";
import SignupForm from "@/components/Auth/SignupForm";

export const metadata = {
  title: "Register Client — Egostix Media",
  description: "Register a new client organization account to access your custom AI workspace and system tools.",
};

export default function SignupPage() {
  return <SignupForm />;
}
