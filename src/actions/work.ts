'use server';

import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export interface MetricItem {
  value: string;
  label: string;
}

export interface MockupItem {
  title: string;
  description: string;
  type: 'desktop' | 'mobile' | 'analytics';
  badge: string;
  image?: string;
}

export interface JourneyItem {
  phase: string;
  title: string;
  description: string;
}

export interface CaseStudyData {
  slug: string;
  category: 'real-world' | 'skill-display';
  title: string;
  subtitle: string;
  client: string;
  service: string;
  year: string;
  summary: string;
  image: string;
  accentColor: string;
  tags: string[];
  metrics: MetricItem[];
  challenge: string[];
  solution: string[];
  results: string[];
  journey?: JourneyItem[];
  mockups: MockupItem[];
  isPrivate?: boolean;
}

const workDir = path.join(process.cwd(), 'contents', 'work');

export async function getAllCaseStudiesAction(): Promise<{
  success: boolean;
  projects: CaseStudyData[];
  error?: string;
}> {
  try {
    const projects: CaseStudyData[] = [];

    // 1. Read local JSON files from contents/work
    if (fs.existsSync(workDir)) {
      const files = fs.readdirSync(workDir).filter((file) => file.endsWith('.json'));
      for (const file of files) {
        try {
          const filePath = path.join(workDir, file);
          const rawData = fs.readFileSync(filePath, 'utf-8');
          const parsed = JSON.parse(rawData) as CaseStudyData;
          projects.push(parsed);
        } catch (err) {
          console.warn(`Failed to parse case study JSON file ${file}:`, err);
        }
      }
    }

    // 2. Try fetching additional custom_projects from Supabase if table exists
    try {
      const cookieStore = await cookies();
      const supabase = createClient(cookieStore);
      const { data: dbProjects, error: dbErr } = await supabase
        .from('custom_projects')
        .select('*');

      if (!dbErr && dbProjects && Array.isArray(dbProjects)) {
        dbProjects.forEach((row) => {
          if (row.slug && !projects.some((p) => p.slug === row.slug)) {
            projects.push({
              slug: row.slug,
              category: row.category || 'real-world',
              title: row.title || 'Untitled Case Study',
              subtitle: row.subtitle || '',
              client: row.client || 'Client',
              service: row.service || 'AI-Powered Business Websites',
              year: row.year || String(new Date().getFullYear()),
              summary: row.summary || '',
              image: row.image || '/egostix-media-trans.png',
              accentColor: row.accent_color || 'blue',
              tags: row.tags || [],
              metrics: row.metrics || [],
              challenge: row.challenge || [],
              solution: row.solution || [],
              results: row.results || [],
              journey: row.journey || [],
              mockups: row.mockups || [],
              isPrivate: row.is_private || false
            });
          }
        });
      }
    } catch (e) {
      // Supabase is optional; fail gracefully if unavailable
    }

    // Sort latest year first
    projects.sort((a, b) => Number(b.year) - Number(a.year));

    return { success: true, projects };
  } catch (err: any) {
    console.error('Error fetching case studies:', err);
    return { success: false, projects: [], error: err?.message || 'Failed to load case studies.' };
  }
}

export async function uploadWorkImageAction(formData: FormData): Promise<{
  success: boolean;
  url?: string;
  error?: string;
}> {
  try {
    const file = formData.get('file') as File;
    const rawSlug = (formData.get('slug') as string) || 'temp-project';
    const slug = rawSlug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');
    const imageType = ((formData.get('imageType') as string) || 'cover').toLowerCase().trim();

    if (!file) {
      return { success: false, error: 'No image file provided.' };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = path.extname(file.name) || '.png';
    const filename = `${imageType}${ext}`;

    const targetDir = path.join(process.cwd(), 'public', 'work', slug);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const targetPath = path.join(targetDir, filename);
    fs.writeFileSync(targetPath, buffer);

    const publicUrl = `/work/${slug}/${filename}`;
    return { success: true, url: publicUrl };
  } catch (err: any) {
    console.error('Error uploading work image:', err);
    return { success: false, error: err?.message || 'Failed to save image.' };
  }
}

export async function toggleCaseStudyVisibilityAction(
  slug: string,
  isPrivate: boolean
): Promise<{
  success: boolean;
  isPrivate?: boolean;
  error?: string;
}> {
  try {
    if (!slug) {
      return { success: false, error: 'Slug is required to toggle visibility.' };
    }

    const filePath = path.join(workDir, `${slug}.json`);
    if (!fs.existsSync(filePath)) {
      return { success: false, error: `Case study ${slug} not found.` };
    }

    const rawData = fs.readFileSync(filePath, 'utf-8');
    const project = JSON.parse(rawData) as CaseStudyData;
    project.isPrivate = isPrivate;

    fs.writeFileSync(filePath, JSON.stringify(project, null, 2), 'utf-8');

    // Sync with Supabase if present
    try {
      const cookieStore = await cookies();
      const supabase = createClient(cookieStore);
      await supabase
        .from('custom_projects')
        .update({ is_private: isPrivate })
        .eq('slug', slug);
    } catch (e) {}

    revalidatePath('/work');
    revalidatePath(`/work/${slug}`);
    revalidatePath('/dashboard');
    revalidatePath('/dashboard/publish-case-study');

    return { success: true, isPrivate };
  } catch (err: any) {
    console.error('Error toggling case study visibility:', err);
    return { success: false, error: err?.message || 'Failed to toggle visibility.' };
  }
}

export async function publishCaseStudyAction(data: CaseStudyData): Promise<{
  success: boolean;
  slug?: string;
  error?: string;
}> {
  try {
    if (!data.slug || !data.title) {
      return { success: false, error: 'Slug and title are required.' };
    }

    // Clean slug format
    const cleanSlug = data.slug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const formattedData: CaseStudyData = {
      ...data,
      slug: cleanSlug,
      category: data.category || 'real-world',
      service: data.service || 'AI-Powered Business Websites',
      year: data.year || String(new Date().getFullYear()),
      accentColor: data.accentColor || 'blue',
      image: data.image || `/work/${cleanSlug}/cover.png`,
      tags: Array.isArray(data.tags) ? data.tags : [],
      metrics: Array.isArray(data.metrics) ? data.metrics : [],
      challenge: Array.isArray(data.challenge) ? data.challenge : [],
      solution: Array.isArray(data.solution) ? data.solution : [],
      results: Array.isArray(data.results) ? data.results : [],
      journey: Array.isArray(data.journey) ? data.journey : [],
      mockups: Array.isArray(data.mockups) ? data.mockups : [],
      isPrivate: Boolean(data.isPrivate)
    };

    // 1. Write JSON to disk inside contents/work/
    if (!fs.existsSync(workDir)) {
      fs.mkdirSync(workDir, { recursive: true });
    }

    const filePath = path.join(workDir, `${cleanSlug}.json`);
    fs.writeFileSync(filePath, JSON.stringify(formattedData, null, 2), 'utf-8');

    // 2. Optionally sync into Supabase custom_projects table
    try {
      const cookieStore = await cookies();
      const supabase = createClient(cookieStore);
      await supabase.from('custom_projects').upsert({
        slug: cleanSlug,
        category: formattedData.category,
        title: formattedData.title,
        subtitle: formattedData.subtitle,
        client: formattedData.client,
        service: formattedData.service,
        year: formattedData.year,
        summary: formattedData.summary,
        image: formattedData.image,
        accent_color: formattedData.accentColor,
        tags: formattedData.tags,
        metrics: formattedData.metrics,
        challenge: formattedData.challenge,
        solution: formattedData.solution,
        results: formattedData.results,
        journey: formattedData.journey,
        mockups: formattedData.mockups,
        is_private: formattedData.isPrivate,
        updated_at: new Date().toISOString()
      });
    } catch (e) {
      // Optional Supabase sync failure non-blocking
    }

    revalidatePath('/work');
    revalidatePath(`/work/${cleanSlug}`);
    revalidatePath('/dashboard');
    revalidatePath('/dashboard/publish-case-study');

    return { success: true, slug: cleanSlug };
  } catch (err: any) {
    console.error('Error publishing case study:', err);
    return { success: false, error: err?.message || 'Failed to save case study page.' };
  }
}

export async function deleteCaseStudyAction(slug: string): Promise<{
  success: boolean;
  error?: string;
}> {
  try {
    if (!slug) {
      return { success: false, error: 'Case study slug is required for deletion.' };
    }

    // Delete local JSON file
    const filePath = path.join(workDir, `${slug}.json`);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // Delete from Supabase custom_projects if connected
    try {
      const cookieStore = await cookies();
      const supabase = createClient(cookieStore);
      await supabase.from('custom_projects').delete().eq('slug', slug);
    } catch (e) {
      // Ignore optional Supabase delete failure
    }

    revalidatePath('/work');
    revalidatePath('/dashboard');
    revalidatePath('/dashboard/publish-case-study');

    return { success: true };
  } catch (err: any) {
    console.error('Error deleting case study:', err);
    return { success: false, error: err?.message || 'Failed to delete case study.' };
  }
}
