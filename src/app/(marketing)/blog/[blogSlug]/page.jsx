import React from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";

import { Quote } from "@/components/Md/Quote";
import { Image } from "@/components/Md/Image";
import { Callout } from "@/components/Md/Callout";
import { Highlight } from "@/components/Md/Highlight";

const components = {
  Quote,
  Image,
  Callout,
  Highlight,
};

export async function generateMetadata({ params }) {
  const filePath = path.join(
    process.cwd(),
    "contents",
    `${params.blogSlug}.mdx`,
  );
  const fileContent = await fs.readFile(filePath, "utf-8");

  const { frontmatter } = await compileMDX({
    source: fileContent,
    options: { parseFrontmatter: true },
  });

  return {
    title: `${frontmatter.title} | Egostix Media`,
    description: frontmatter.description,
  };
}

export async function generateStaticParams() {
  const dir = path.join(process.cwd(), "contents");
  const files = (await fs.readdir(dir)).filter((filename) =>
    filename.endsWith(".mdx"),
  );

  return files.map((filename) => ({
    blogSlug: filename.replace(".mdx", ""),
  }));
}

const BlogPost = async ({ params }) => {
  const { blogSlug } = params;

  const filePath = path.join(process.cwd(), "contents", `${blogSlug}.mdx`);
  const fileContent = await fs.readFile(filePath, "utf-8");

  const { content, frontmatter } = await compileMDX({
    source: fileContent,
    options: {
      parseFrontmatter: true,
    },
    components,
  });

  return (
    <main className="w-full px-6 py-24">
      <article className="mx-auto max-w-3xl pt-10">
        <Link
          href="/blog"
          aria-label="Back to blog"
          className="mb-10 inline-flex size-10 items-center justify-center rounded border border-neutral-300 text-neutral-900 transition hover:border-blue-600 hover:text-blue-700"
        >
          <ArrowUpLeft size={18} />
        </Link>

        <header className="space-y-5 border-b border-neutral-200 pb-10">
          <p className="font-mono text-xs uppercase tracking-normal text-blue-600">
            {frontmatter.date}
          </p>
          <h1 className="font-mono text-3xl tracking-tight text-neutral-950 tablet:text-5xl">
            {frontmatter.title}
          </h1>
          <p className="text-base leading-relaxed text-neutral-700">
            {frontmatter.description}
          </p>
        </header>

        {frontmatter.coverImage ? (
          <Image
            src={frontmatter.coverImage}
            alt={frontmatter.coverAlt || frontmatter.title}
            caption={frontmatter.coverCaption}
            priority
          />
        ) : null}

        <div className="mt-10 space-y-6 text-sm leading-7 text-neutral-800 [&_h2]:mt-12 [&_h2]:font-mono [&_h2]:text-2xl [&_h2]:text-neutral-950 [&_li]:ml-5 [&_li]:list-disc [&_strong]:font-semibold [&_strong]:text-neutral-950">
          {content}
        </div>
      </article>
    </main>
  );
};

export default BlogPost;
