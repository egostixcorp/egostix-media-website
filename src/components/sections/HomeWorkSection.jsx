import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getProjects } from "@/data/work";

const HomeWorkSection = ({ projects: customProjects }) => {
  // Dynamically load public projects or use the provided prop
  const publicProjects = customProjects && customProjects.length > 0
    ? customProjects.filter((p) => !p.isPrivate)
    : getProjects();

  // Feature the top 3 projects
  const featuredProjects = publicProjects.slice(0, 3);

  return (
    <section
      id="work"
      className="w-full border-t border-neutral-200 px-6 py-24 bg-white"
      aria-labelledby="work-heading"
    >
      <div className="mx-auto max-w-6xl space-y-12">
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
        {featuredProjects.length > 0 ? (
          <div
            className={`grid gap-8 ${
              featuredProjects.length === 1
                ? "max-w-xl mx-auto"
                : featuredProjects.length === 2
                ? "grid-cols-1 md:grid-cols-2"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {featuredProjects.map((project) => (
              <article
                key={project.slug}
                className="group flex flex-col justify-between overflow-hidden rounded-lg border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-600 hover:shadow-md"
              >
                <div>
                  {/* Image Container */}
                  <div className="relative aspect-[16/9.5] w-full overflow-hidden bg-neutral-900 border-b border-neutral-200">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-w-768px) 100vw, 50vw"
                      className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    />
                    <div className="absolute left-3 top-3 rounded bg-neutral-950/85 px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider text-white backdrop-blur-sm z-10">
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
                      <h3 className="text-xl font-mono tracking-tight text-neutral-900 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs tablet:text-sm font-inter text-neutral-600 leading-relaxed line-clamp-3">
                        {project.summary}
                      </p>
                    </div>

                    {/* Metrics Banner */}
                    {project.metrics && project.metrics.length > 0 && (
                      <div className="grid grid-cols-3 gap-1.5 border-y border-neutral-100 py-3 text-center">
                        {project.metrics.slice(0, 3).map((metric, idx) => (
                          <div key={idx} className="space-y-0.5">
                            <div className="font-mono text-base font-bold text-neutral-900">
                              {metric.value}
                            </div>
                            <div className="text-[9px] font-inter text-neutral-500 leading-tight">
                              {metric.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tech Tags */}
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {project.tags.slice(0, 4).map((tag) => (
                          <span
                            key={tag}
                            className="rounded bg-neutral-50 border border-neutral-200 px-2 py-0.5 font-mono text-[9px] text-neutral-600"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer Link */}
                <div className="border-t border-neutral-100 p-6 pt-4">
                  <Link
                    href={`/work/${project.slug}`}
                    className="inline-flex items-center gap-2 font-mono text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors group/link"
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
        ) : (
          <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-12 text-center">
            <p className="font-mono text-sm text-neutral-600">
              New client case studies are currently being published.
            </p>
          </div>
        )}

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
