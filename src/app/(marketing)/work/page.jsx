import React from "react";
import Link from "next/link";
import WorkSection from "@/components/sections/WorkSection";
import { projects } from "@/data/work";

export const metadata = {
  title: "Our Work | Egostix Media",
  description: "Explore our portfolio of AI-powered systems, custom internal tools, workflow automations, and creator infrastructure.",
};

const WorkPage = () => {
  return (
    <main className="w-full px-6 py-24">
      <div className="mx-auto max-w-6xl space-y-16">
        {/* Render the Interactive Client Component */}
        <WorkSection projects={projects} />

        {/* Bottom Call to Action (Shared Server-side Component) */}
        <section className="border-t border-neutral-200 pt-12">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div className="space-y-3">
              <h2 className="text-2xl font-mono tracking-tight tablet:text-3xl">
                Ready to build your system?
              </h2>
              <p className="max-w-3xl text-sm font-inter text-neutral-600 leading-relaxed">
                Let's discuss how we can automate your operations, launch your custom creator platform, 
                or build internal intelligence tooling. We deliver functional prototypes in weeks.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded bg-blue-600 px-6 py-3 text-sm font-mono text-white transition hover:bg-blue-700"
            >
              Start a project
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};

export default WorkPage;
