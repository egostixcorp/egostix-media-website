"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const InteractiveInquiryButton = ({
  href = "/contact",
  label = "Send an Inquiry",
  className = "",
  onClick,
}) => {
  const content = (
    <span className="relative flex items-center justify-center gap-2">
      <span>{label}</span>
      <ArrowRight className="size-3.5 transition-transform duration-300 ease-out group-hover:translate-x-1" />
    </span>
  );

  const baseClasses =
    "group relative inline-flex items-center justify-center overflow-hidden rounded bg-blue-600 px-4 py-2.5 font-mono text-xs font-semibold text-white shadow-sm transition-all duration-300 hover:bg-blue-700 hover:shadow-md hover:scale-[1.02] active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500/40";

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`${baseClasses} ${className}`}
      >
        {content}
      </button>
    );
  }

  return (
    <Link href={href} className={`${baseClasses} ${className}`}>
      {content}
    </Link>
  );
};

export default InteractiveInquiryButton;
