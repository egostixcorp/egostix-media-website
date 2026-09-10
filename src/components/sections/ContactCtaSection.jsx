import React from "react";
import Link from "next/link";
import { Mail, ArrowRight, Building2, MapPin } from "lucide-react";
import InteractiveInquiryButton from "@/components/ui/InteractiveInquiryButton";

const ContactCtaSection = () => {
  return (
    <section className="w-full border-t border-neutral-200 bg-white py-20 px-6 font-inter">
      <div className="mx-auto max-w-6xl rounded-2xl border border-neutral-300 bg-neutral-50/80 p-8 tablet:p-12 shadow-sm">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
          {/* Left Column: Headline, Summary & Company Information */}
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-mono uppercase tracking-normal text-blue-600 font-semibold">
                Get In Touch
              </p>
              <h2 className="text-2xl tablet:text-4xl font-mono tracking-tight text-slate-900 leading-tight">
                Ready to engineer your operational infrastructure?
              </h2>
              <p className="text-sm tablet:text-base font-inter text-slate-600 leading-relaxed">
                Connect with our engineering team to outline your workflow bottlenecks, scope custom tools, and map out a fixed-timeline prototype.
              </p>
            </div>

            {/* Key Company Details Row */}
            <div className="grid gap-4 sm:grid-cols-2 pt-4 border-t border-neutral-200/80 text-xs font-mono text-slate-700">
              <div className="flex items-center gap-2.5">
                <Building2 className="size-4 shrink-0 text-blue-600" />
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Entity</span>
                  <span className="font-semibold text-slate-900">Egostix Media</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="size-4 shrink-0 text-blue-600" />
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Direct Email</span>
                  <a
                    href="mailto:contact@egostix.com"
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    contact@egostix.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Subtle Button & SLA Note */}
          <div className="flex flex-col items-start md:items-end justify-center gap-4 space-y-2 border-t md:border-t-0 md:border-l border-neutral-200 pt-6 md:pt-0 md:pl-8">
            <InteractiveInquiryButton
              href="/contact"
              label="Go to Contact Page"
              className="w-full sm:w-auto px-6 py-3 text-sm"
            />
            <p className="text-[11px] font-mono text-slate-500 text-left md:text-right">
              Typical response SLA: Within 24 hours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCtaSection;
