import React from "react";
import LoginForm from "@/components/Auth/LoginForm";

export const metadata = {
  title: "Login — Egostix Media Console",
  description: "Log in to access your Egostix Media dashboard, qualify leads, and manage custom system operations.",
};

export default function LoginPage() {
  return <LoginForm />;
}
