import fs from "fs";
import path from "path";

const getProjects = () => {
  const dirPath = path.join(process.cwd(), "contents", "work");
  try {
    if (fs.existsSync(dirPath)) {
      const files = fs.readdirSync(dirPath).filter((file) => file.endsWith(".json"));
      const list = files.map((file) => {
        const filePath = path.join(dirPath, file);
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
      });
      // Sort projects by year descending (latest first)
      return list.sort((a, b) => Number(b.year) - Number(a.year));
    }
  } catch (error) {
    console.error("Error loading case studies dynamically:", error);
  }
  return [];
};

export const projects = getProjects();
