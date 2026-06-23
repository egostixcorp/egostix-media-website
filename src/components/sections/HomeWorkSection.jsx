import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/work";

const HomeWorkSection = () => {
  // Select the featured projects to represent each service vertical
  const featuredSlugs = ["apex-realty-platform", "pulse-ops-erp", "synth-academy"];
  const featuredProjects = featuredSlugs
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter(Boolean);

  return (
    <section
      id="work"
      className="w-full border-t border-neutral-200 px-6 py-24 bg-white"
      aria-labelledby="work-heading"
    >
      <div className="mx-auto ">
        {/* Section Header */}
        <div className="space-y-4">
          <p className="text-xs font-mono uppercase tracking-normal text-blue-700">
            Case Studies
          </p>
          <h2
            id="work-heading"
            className="text-2xl font-mono tracking-tight tablet:text-3xl laptop:text-4xl text-slate-900"
          >
            Systems we have shipped.
          </h2>
          <p className="text-sm max-w-3xl font-inter leading-relaxed text-slate-700 tablet:text-base">
            Explore our work translating business constraints, operations, and intelligence into high-impact, custom software systems.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <article
              key={project.slug}
              className="group flex flex-col justify-between overflow-hidden rounded border border-neutral-300 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-700 hover:shadow-md"
            >
              <div>
                {/* Image Container */}
                <div className="relative aspect-[3/2] w-full overflow-hidden bg-neutral-50 border-b border-neutral-200">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-w-768px) 100vw, (max-w-1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                  <div className="absolute left-4 top-4 rounded bg-neutral-950/85 px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider text-white backdrop-blur-sm">
                    {project.service}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-5">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
                      <span>{project.client}</span>
                      <span>{project.year}</span>
                    </div>
                    <h3 className="text-lg font-mono tracking-tight text-slate-900 group-hover:text-blue-700 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs tablet:text-sm font-inter text-slate-600 leading-relaxed line-clamp-3">
                      {project.summary}
                    </p>
                  </div>

                  {/* Metrics Banner */}
                  <div className="grid grid-cols-3 gap-1.5 border-y border-neutral-200 py-3 text-center">
                    {project.metrics.map((metric, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <div className="font-mono text-sm font-bold text-slate-900">
                          {metric.value}
                        </div>
                        <div className="text-[9px] font-inter text-slate-500 leading-tight">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-neutral-50 border border-neutral-200 px-2 py-0.5 font-mono text-[9px] text-neutral-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Link */}
              <div className="border-t border-neutral-100 p-6 pt-4">
                <Link
                  href={`/work/${project.slug}`}
                  className="inline-flex items-center gap-2 font-mono text-xs font-bold text-blue-700 hover:text-blue-800 transition-colors group/link"
                >
                  View Case Study
                  <ArrowRight
                    size={14}
                    className="transition-transform duration-200 group-hover/link:translate-x-1"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 flex justify-center">
          <Link
            href="/work"
            className="inline-flex items-center gap-2 rounded border border-neutral-300 bg-white px-6 py-3 font-mono text-sm text-slate-900 transition hover:border-blue-700 hover:text-blue-700"
          >
            Explore all projects
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeWorkSection;
