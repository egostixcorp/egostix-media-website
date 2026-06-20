"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, LayoutGrid, List } from "lucide-react";

const WorkSection = ({ projects }) => {
  const [viewMode, setViewMode] = useState("grid"); // "grid" or "list"

  const realWorldProjects = projects.filter((p) => p.category === "real-world");
  const skillProjects = projects.filter((p) => p.category === "skill-display");

  // Render a project card in Grid Layout
  const renderGridCard = (project) => (
    <article
      key={project.slug}
      className="group flex flex-col justify-between overflow-hidden rounded-lg border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-md"
    >
      <div>
        {/* Image Container */}
        <div className="relative aspect-[3/2] w-full overflow-hidden bg-neutral-50 border-b border-neutral-200">
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(max-w-768px) 100vw, 50vw"
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
            <h3 className="text-xl font-mono tracking-tight text-neutral-900 group-hover:text-blue-600 transition-colors">
              {project.title}
            </h3>
            <p className="text-xs tablet:text-sm font-inter text-neutral-600 leading-relaxed line-clamp-3">
              {project.summary}
            </p>
          </div>

          {/* Metrics Banner */}
          <div className="grid grid-cols-3 gap-1.5 border-y border-neutral-105 py-3 text-center">
            {project.metrics.map((metric, idx) => (
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

          {/* Tech Tags */}
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
        </div>
      </div>

      {/* Footer link */}
      <div className="border-t border-neutral-100 p-6 pt-4">
        <Link
          href={`/work/${project.slug}`}
          className="inline-flex items-center gap-2 font-mono text-xs font-bold text-blue-600 hover:text-blue-750 transition-colors group/link"
        >
          View Case Study
          <ArrowRight
            size={14}
            className="transition-transform duration-200 group-hover/link:translate-x-1"
          />
        </Link>
      </div>
    </article>
  );

  // Render a project card in List Layout
  const renderListCard = (project) => (
    <article
      key={project.slug}
      className="group grid grid-cols-1 md:grid-cols-[280px_1fr] overflow-hidden rounded-lg border border-neutral-200 bg-white transition-all duration-300 hover:border-blue-500 hover:shadow-md"
    >
      {/* Left side Image */}
      <div className="relative aspect-[3/2] md:aspect-auto w-full min-h-[180px] overflow-hidden bg-neutral-50 border-b md:border-b-0 md:border-r border-neutral-200">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-w-768px) 100vw, 25vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 rounded bg-neutral-950/85 px-2 py-0.5 text-[8px] font-mono uppercase tracking-wider text-white backdrop-blur-sm">
          {project.service}
        </div>
      </div>

      {/* Right side content */}
      <div className="p-6 flex flex-col justify-between gap-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
            <span>{project.client} • {project.year}</span>
            <span className="uppercase text-[9px] bg-neutral-105 font-semibold px-2 py-0.5 rounded text-neutral-600">
              {project.category === "real-world" ? "Client Work" : "Showcase Prototype"}
            </span>
          </div>
          <h3 className="text-xl font-mono tracking-tight text-neutral-900 group-hover:text-blue-600 transition-colors">
            {project.title}
          </h3>
          <p className="text-xs tablet:text-sm font-inter text-neutral-600 leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Metrics, Tags & Link in horizontal row */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-[auto_1fr_auto] items-center border-t border-neutral-105 pt-4">
          {/* Compact Metrics */}
          <div className="flex items-center gap-4">
            {project.metrics.slice(0, 2).map((metric, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="font-mono text-sm font-extrabold text-neutral-950">
                  {metric.value}
                </div>
                <div className="text-[8px] font-inter text-neutral-500">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Tech Tags */}
          <div className="flex flex-wrap gap-1 justify-start sm:justify-center">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded bg-neutral-50 border border-neutral-200 px-2 py-0.5 font-mono text-[9px] text-neutral-600"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action Link */}
          <div>
            <Link
              href={`/work/${project.slug}`}
              className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-blue-600 hover:text-blue-750 transition-colors group/link"
            >
              Case Study
              <ArrowRight
                size={14}
                className="transition-transform duration-200 group-hover/link:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );

  return (
    <div className="space-y-16">
      {/* Header Section with Toggle */}
      <section className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pt-10 border-b border-neutral-200 pb-8">
        <div className="space-y-4 max-w-3xl">
          <p className="text-xs font-mono uppercase tracking-normal text-blue-600">
            Portfolio
          </p>
          <h1 className="text-3xl font-mono tracking-tight tablet:text-4xl laptop:text-6xl text-neutral-900">
            Systems we have built.
          </h1>
          <p className="text-sm font-inter text-neutral-600 leading-relaxed tablet:text-base">
            Explore how we translate operations, workflows, and interfaces into custom, high-impact business systems. 
            Our work spans client deliveries and skill showcase prototypes.
          </p>
        </div>

        {/* Grid / List Layout Switcher */}
        <div className="flex items-center bg-neutral-100 p-1 rounded-md border border-neutral-200 self-start shrink-0">
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-medium transition-all ${
              viewMode === "grid"
                ? "bg-white text-neutral-950 shadow-sm"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
            aria-label="Grid View"
          >
            <LayoutGrid size={14} />
            Grid
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono font-medium transition-all ${
              viewMode === "list"
                ? "bg-white text-neutral-950 shadow-sm"
                : "text-neutral-500 hover:text-neutral-900"
            }`}
            aria-label="List View"
          >
            <List size={14} />
            List
          </button>
        </div>
      </section>

      {/* Section 1: Real-World Deliveries */}
      <section className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-mono text-neutral-950 tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
            Client Deliveries
          </h2>
          <p className="text-xs sm:text-sm font-inter text-neutral-500">
            Fully deployed systems engineered to scale customer acquisition, internal tools, and operational workflows for clients.
          </p>
        </div>

        <div
          className={
            viewMode === "grid"
              ? "grid gap-8 md:grid-cols-2"
              : "flex flex-col gap-6"
          }
        >
          {realWorldProjects.map((project) =>
            viewMode === "grid"
              ? renderGridCard(project)
              : renderListCard(project)
          )}
        </div>
      </section>

      {/* Section 2: Skill Showcase Prototypes */}
      <section className="space-y-8 pt-8 border-t border-neutral-200">
        <div className="space-y-2">
          <h2 className="text-2xl font-mono text-neutral-950 tracking-tight flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-400" />
            Skill Showcase Prototypes
          </h2>
          <p className="text-xs sm:text-sm font-inter text-neutral-500">
            Advanced demonstration architectures and internal proof-of-concepts built to showcase our capabilities across our 4 services.
          </p>
        </div>

        <div
          className={
            viewMode === "grid"
              ? "grid gap-8 md:grid-cols-2"
              : "flex flex-col gap-6"
          }
        >
          {skillProjects.map((project) =>
            viewMode === "grid"
              ? renderGridCard(project)
              : renderListCard(project)
          )}
        </div>
      </section>
    </div>
  );
};

export default WorkSection;
