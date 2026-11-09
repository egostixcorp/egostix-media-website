import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";
import { getProjects } from "@/data/work";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://media.egostix.com";
  const now = new Date();

  // Static marketing routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/service`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/approach`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Unbundled Dedicated Service Landing Pages
  const serviceSlugs = [
    "ai-business-websites",
    "custom-internal-tools",
    "creator-platforms",
    "workflow-automation",
  ];

  const serviceRoutes: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // Dynamic Case Studies
  let workRoutes: MetadataRoute.Sitemap = [];
  try {
    const publicProjects = getProjects();
    workRoutes = publicProjects.map((project: { slug: string; year?: string }) => ({
      url: `${baseUrl}/work/${project.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    }));
  } catch (error) {
    console.error("Error generating work sitemap entries:", error);
  }

  // Dynamic Blog Posts
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const contentsDir = path.join(process.cwd(), "contents");
    if (fs.existsSync(contentsDir)) {
      const mdxFiles = fs
        .readdirSync(contentsDir)
        .filter((file) => file.endsWith(".mdx"));

      blogRoutes = mdxFiles.map((file) => {
        const slug = file.replace(/\.mdx$/, "");
        return {
          url: `${baseUrl}/blog/${slug}`,
          lastModified: now,
          changeFrequency: "monthly",
          priority: 0.75,
        };
      });
    }
  } catch (error) {
    console.error("Error generating blog sitemap entries:", error);
  }

  return [...staticRoutes, ...serviceRoutes, ...workRoutes, ...blogRoutes];
}

