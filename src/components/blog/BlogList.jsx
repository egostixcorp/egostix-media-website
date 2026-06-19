"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import NextImage from "next/image";

const ALL = "all";

function normalizeLabel(value) {
  if (typeof value !== "string") return "";
  return value
    .trim()
    .split("-")
    .map((word) => {
      const lower = word.toLowerCase();
      if (lower === "ai") return "AI";
      if (lower === "smb" || lower === "smbs") return "SMBs";
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

export default function BlogList({ posts = [] }) {
  const [activeFilter, setActiveFilter] = useState(ALL);

  const availableFilters = useMemo(() => {
    const counts = new Map();

    posts.forEach((post) => {
      // Categories
      if (post.category) {
        const cat =
          typeof post.category === "string"
            ? post.category.trim()
            : post.category;
        counts.set(cat, (counts.get(cat) || 0) + 1);
      }
      // Tags
      if (Array.isArray(post.tags)) {
        post.tags.forEach((tag) => {
          const t = typeof tag === "string" ? tag.trim() : tag;
          counts.set(t, (counts.get(t) || 0) + 1);
        });
      }
    });

    return Array.from(counts.entries())
      .sort((a, b) => {
        if (b[1] !== a[1]) {
          return b[1] - a[1];
        }
        return a[0] < b[0] ? -1 : a[0] > b[0] ? 1 : 0;
      })
      .slice(0, 6)
      .map(([value, count]) => ({ value, count }));
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (activeFilter === ALL) return posts;

    return posts.filter((post) => {
      const cat =
        typeof post.category === "string"
          ? post.category.trim()
          : post.category;
      const tags = Array.isArray(post.tags)
        ? post.tags.map((t) => (typeof t === "string" ? t.trim() : t))
        : [];
      return cat === activeFilter || tags.includes(activeFilter);
    });
  }, [activeFilter, posts]);

  const filters = [{ value: ALL, count: posts.length }, ...availableFilters];

  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-4 border-y border-neutral-200 py-5 tablet:flex-row tablet:items-center tablet:justify-between">
        <p className="font-mono text-xs uppercase tracking-normal text-slate-700 font-medium">
          Filter posts
        </p>

        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.value;

            return (
              <button
                key={filter.value}
                type="button"
                onClick={() => {
                  console.log("Blog filter changed to:", filter.value);
                  setActiveFilter(filter.value);
                }}
                className={
                  isActive
                    ? "rounded border border-blue-700 bg-blue-700 px-3 py-2 font-mono text-xs text-white transition duration-150"
                    : "rounded border border-neutral-300 bg-white px-3 py-2 font-mono text-xs text-slate-700 transition duration-150 hover:border-blue-700 hover:text-blue-700"
                }
              >
                {filter.value === ALL ? "All" : normalizeLabel(filter.value)}
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
                    <div className="flex flex-wrap gap-2 pt-2">
                      {category ? (
                        <span className="rounded border border-blue-100 bg-blue-50/50 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-blue-700 uppercase tracking-wider">
                          {normalizeLabel(category)}
                        </span>
                      ) : null}
                      {tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="rounded border border-neutral-200 bg-neutral-50 px-2 py-0.5 font-mono text-[10px] text-slate-700"
                        >
                          #{normalizeLabel(tag).replace(/\s+/g, "")}
                        </span>
                      ))}
                    </div>
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
