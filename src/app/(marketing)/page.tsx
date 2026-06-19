import React from "react";
// import { promises as fs } from "fs";
// import path from "path";
// import { compileMDX } from "next-mdx-remote/rsc";

import HeroSection from "@/components/sections/HeroSection";
import ApproachSection from "@/components/sections/ApproachSection";
import AboutSection from "@/components/sections/AboutSection";
import ServiceSection from "@/components/sections/ServiceSection";
// import BlogSection from "@/components/sections/BlogSection";
import ContactSection from "@/components/sections/ContactSection";

const Home = async () => {
  // let posts = [] as any[];
  // try {
  //   const dir = path.join(process.cwd(), "contents");
  //   const files = (await fs.readdir(dir)).filter((filename) =>
  //     filename.endsWith(".mdx")
  //   );

  //   const loadedPosts = await Promise.all(
  //     files.map(async (filename) => {
  //       const filePath = path.join(dir, filename);
  //       const content = await fs.readFile(filePath, "utf8");

  //       const { frontmatter } = await compileMDX({
  //         source: content,
  //         options: { parseFrontmatter: true },
  //       });

  //       return {
  //         slug: frontmatter.slug || filename.replace(".mdx", ""),
  //         ...frontmatter,
  //       };
  //     })
  //   );

  //   loadedPosts.sort((a, b) => {
  //     return (
  //       new Date(b.publishedAt as any).getTime() - new Date(a.publishedAt as any).getTime()
  //     );
  //   });

  //   posts = loadedPosts;
  // } catch (error) {
  //   console.error("Failed to load blog posts for home page:", error);
  // }

  return (
    <main className="flex min-h-screen w-full flex-col items-center px-2 font-inter tablet:px-[10%] laptop:px-[15%]">
      <HeroSection />
      <AboutSection />
      <ApproachSection />
      <ServiceSection />
      {/* <BlogSection posts={posts} /> */}
      <ContactSection />
    </main>
  );
};

export default Home;
