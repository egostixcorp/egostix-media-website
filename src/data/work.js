import fs from "fs";
import path from "path";

export const getAllProjects = () => {
  const dirPath = path.join(process.cwd(), "contents", "work");
  try {
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath).filter((file) => file.endsWith(".json"));
      const list = files.map((file) => {
        const filePath = path.join(dirPath, file);
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
      });
      return list.sort((a, b) => Number(b.year) - Number(a.year));
    }
  } catch (error) {
    console.error("Error loading case studies dynamically:", error);
  }
  return [];
};

export const getProjects = () => {
  const all = getAllProjects();
  return all.filter((p) => !p.isPrivate);
};

export const getProjectBySlug = (slug) => {
  const all = getAllProjects();
  const found = all.find((p) => p.slug === slug);
  if (!found || found.isPrivate) return null;
  return found;
};

export const projects = getProjects();
