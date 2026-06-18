"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import NextImage from "next/image";

const UNIVERSAL = "universal";

function normalizeLabel(value) {
  return value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function BlogList({ posts }) {
  const [activeCategory, setActiveCategory] = useState(UNIVERSAL);

  const categories = useMemo(() => {
    const categoryCounts = new Map();

    posts.forEach((post) => {
      if (post.category) {
        categoryCounts.set(
          post.category,
          (categoryCounts.get(post.category) || 0) + 1,
        );
      }
    });

    return Array.from(categoryCounts.entries())
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .slice(0, 5)
      .map(([value, count]) => ({ value, count }));
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (activeCategory === UNIVERSAL) return posts;

    return posts.filter((post) => post.category === activeCategory);
  }, [activeCategory, posts]);

  const filters = [{ value: UNIVERSAL, count: posts.length }, ...categories];

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 border-y border-neutral-200 py-5 tablet:flex-row tablet:items-center tablet:justify-between">
        <p className="font-mono text-xs uppercase tracking-normal text-neutral-600">
          Top categories
        </p>

        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const isActive = activeCategory === filter.value;

            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => setActiveCategory(filter.value)}
                className={
                  isActive
                    ? "rounded border border-blue-600 bg-blue-600 px-3 py-2 font-mono text-xs text-white transition"
                    : "rounded border border-neutral-300 bg-white px-3 py-2 font-mono text-xs text-neutral-700 transition hover:border-blue-600 hover:text-blue-700"
                  }
              >
                {filter.value === UNIVERSAL
                  ? "Universal"
                  : normalizeLabel(filter.value)}
                <span className="ml-2 opacity-70">{filter.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      <ul className="grid gap-6 tablet:grid-cols-2">
        {filteredPosts.map(
          ({
            slug,
            title,
            description,
            date,
            tags,
            category,
            coverImage,
            coverAlt,
          }) => (
            <li key={slug}>
              <Link
                href={`/blog/${slug}`}
                className="group flex h-full flex-col overflow-hidden rounded border border-neutral-300 bg-white transition hover:border-blue-600"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                  <NextImage
                    src={coverImage || "/egostix-media-trans.png"}
                    alt={coverAlt || title}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-6 p-6">
                  <div className="space-y-3 border-b border-neutral-200 pb-5">
                    <p className="font-mono text-xs text-neutral-600">{date}</p>
                    {/* <div className="flex flex-wrap gap-2">
                      {category ? (
                        <span className="rounded border border-blue-200 bg-blue-50 px-2 py-1 text-[11px] text-blue-700">
                          {normalizeLabel(category)}
                        </span>
                      ) : null}
                      {tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-neutral-200 px-2 py-1 text-[11px] text-neutral-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div> */}
                  </div>

                  <div className="space-y-3">
                    <h2 className="font-mono text-xl text-neutral-950 transition group-hover:text-blue-700 tablet:text-2xl">
                      {title}
                    </h2>
                    <p className="text-sm leading-relaxed text-neutral-700">
                      {description}
                    </p>
                  </div>
                </div>
              </Link>
            </li>
          ),
        )}
      </ul>
    </section>
  );
}
