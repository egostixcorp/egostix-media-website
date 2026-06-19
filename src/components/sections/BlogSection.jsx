import React from "react";
import Link from "next/link";
import Image from "next/image";

const BlogSection = ({ posts = [] }) => {
  // Show only the latest 2 posts
  const recentPosts = posts.slice(0, 2);

  return (
    <section className="w-full border-t border-neutral-200 px-6 py-24 bg-white" aria-labelledby="blog-heading">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 tablet:flex-row tablet:items-end tablet:justify-between">
          <div className="space-y-4">
            <p className="text-xs font-mono uppercase tracking-normal text-blue-700">
              Writing
            </p>
            <h2 id="blog-heading" className="text-2xl font-mono tracking-tight tablet:text-3xl laptop:text-4xl text-slate-900">
              Systems-minded thoughts and insights.
            </h2>
            <p className="text-sm max-w-2xl font-inter leading-relaxed text-slate-700">
              Practical guides and essays on AI workflows, digital infrastructure, and rapid prototype execution.
            </p>
          </div>
          <div className="mt-4 tablet:mt-0">
            <Link
              href="/blog"
              className="inline-flex items-center text-xs font-mono font-semibold text-blue-700 hover:text-blue-800"
            >
              All articles <span className="ml-1">&rarr;</span>
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {recentPosts.map((post, i) => (
            <article key={i}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded border border-neutral-300 bg-white transition hover:border-blue-700"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
                  <Image
                    src={post.coverImage || "/egostix-media-trans.png"}
                    alt={post.coverAlt || post.title}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div className="border-b border-neutral-200 pb-3">
                    <p className="font-mono text-xs text-slate-500">{post.date}</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-mono text-lg font-semibold text-slate-900 transition group-hover:text-blue-700">
                      {post.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-slate-700">
                      {post.description}
                    </p>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
