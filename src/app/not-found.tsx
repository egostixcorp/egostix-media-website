import React from "react";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import CustomCursor from "@/components/global/CustomCursor";
import NotFoundContent from "@/components/sections/NotFoundContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 Page Not Found — Egostix Media",
  description:
    "The requested page or node could not be found on Egostix Media. Explore our AI services, work case studies, or return to home.",
};

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 flex flex-col justify-between">
      <CustomCursor />
      <Header />
      <main className="flex-1 pt-16">
        <NotFoundContent />
      </main>
      <Footer />
    </div>
  );
}
