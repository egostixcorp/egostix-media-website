import { promises as fs } from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import BlogList from "@/components/blog/BlogList";

export const metadata = {
  title: "Blog | Egostix Media",
  description:
    "Systems-minded writing on AI-native websites, automation, internal tools, and the new service era.",
};

export default async function Blog() {
  const dir = path.join(process.cwd(), "contents");
  const files = (await fs.readdir(dir)).filter((filename) =>
    filename.endsWith(".mdx"),
  );

  const posts = await Promise.all(
    files.map(async (filename) => {
      const filePath = path.join(dir, filename);
      const content = await fs.readFile(filePath, "utf8");

      const { frontmatter } = await compileMDX({
        source: content,
        options: { parseFrontmatter: true },
      });

      return {
        slug: frontmatter.slug || filename.replace(".mdx", ""),
        ...frontmatter,
      };
    }),
  );

  posts.sort((a, b) => {
    return (
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  });

  return (
    <main className="w-full px-6 py-24">
      <div className="mx-auto max-w-5xl space-y-16 pt-10">
        <section className="space-y-5">
          <p className="font-mono text-xs uppercase tracking-normal text-blue-600">
            Blog
          </p>
          <h1 className="max-w-4xl font-mono text-3xl tracking-tight text-neutral-950 tablet:text-4xl laptop:text-6xl">
            Writing on the systems businesses need in the AI service era.
          </h1>
          <p className="max-w-3xl text-sm leading-relaxed text-neutral-700 tablet:text-base">
            Practical notes from Egostix Media on websites, internal tools,
            automation, creator infrastructure, and the operating models that
            make AI useful in real businesses.
          </p>
        </section>

        <BlogList posts={posts} />
      </div>
    </main>
  );
}
