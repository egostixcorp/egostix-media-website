-- ==========================================
-- Egostix Media Portal — Supabase Schema & RLS
-- ==========================================

-- 1. Profiles Table (Extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id           UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name         TEXT NOT NULL,
  role         TEXT NOT NULL DEFAULT 'client', -- 'owner' | 'staff' | 'client'
  client_slug  TEXT,                            -- NULL for owner/staff
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Clients Table (Tenants)
CREATE TABLE IF NOT EXISTS public.clients (
  slug               TEXT PRIMARY KEY,
  name               TEXT NOT NULL,
  short_name         TEXT,
  logo_url           TEXT,
  owner_name         TEXT,
  owner_email        TEXT,
  status             TEXT DEFAULT 'Active',
  ga_property_id     TEXT,
  active_services    TEXT[] DEFAULT '{}',
  metric_traffic     TEXT DEFAULT '0',
  metric_traffic_chg TEXT DEFAULT '+0%',
  metric_leads       TEXT DEFAULT '0',
  metric_leads_chg   TEXT DEFAULT '+0%',
  metric_conversion  TEXT DEFAULT '0.0%',
  metric_conv_chg    TEXT DEFAULT '+0%',
  metric_ai_latency  TEXT DEFAULT '0.0s',
  metric_active_chats TEXT DEFAULT '0',
  config             JSONB DEFAULT '{}',
  created_at         TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Kanban Tasks
CREATE TABLE IF NOT EXISTS public.kanban_tasks (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_slug TEXT REFERENCES public.clients(slug) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  description TEXT,
  status      TEXT NOT NULL DEFAULT 'backlog', -- 'backlog' | 'in-progress' | 'review' | 'deployed'
  priority    TEXT NOT NULL DEFAULT 'medium',  -- 'low' | 'medium' | 'high'
  due_date    DATE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Uploaded Files Metadata
CREATE TABLE IF NOT EXISTS public.uploaded_files (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_slug  TEXT REFERENCES public.clients(slug) ON DELETE CASCADE,
  name         TEXT NOT NULL,
  size         BIGINT,
  type         TEXT,
  storage_path TEXT NOT NULL,
  uploaded_by  UUID REFERENCES auth.users(id),
  status       TEXT DEFAULT 'Uploaded',
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Service Upgrades
CREATE TABLE IF NOT EXISTS public.service_upgrades (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_slug   TEXT REFERENCES public.clients(slug) ON DELETE CASCADE,
  service_name  TEXT NOT NULL,
  description   TEXT,
  status        TEXT DEFAULT 'pending', -- 'pending' | 'approved' | 'declined'
  requested_at  TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at   TIMESTAMPTZ
);

-- 6. Leads (CRM)
CREATE TABLE IF NOT EXISTS public.leads (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_slug TEXT REFERENCES public.clients(slug) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  email       TEXT,
  phone       TEXT,
  query       TEXT,
  status      TEXT DEFAULT 'hot',   -- 'hot' | 'warm' | 'responded' | 'closed'
  chat_log    JSONB DEFAULT '[]',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- 7. Analytics Snapshots
CREATE TABLE IF NOT EXISTS public.analytics_snapshots (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_slug    TEXT REFERENCES public.clients(slug) ON DELETE CASCADE,
  active_now     INT DEFAULT 0,
  avg_ctr        TEXT,
  page_views     JSONB DEFAULT '[]',
  top_queries    JSONB DEFAULT '[]',
  locations      JSONB DEFAULT '[]',
  snapshotted_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Custom Projects
CREATE TABLE IF NOT EXISTS public.custom_projects (
  slug         TEXT PRIMARY KEY,
  title        TEXT NOT NULL,
  subtitle     TEXT,
  category     TEXT DEFAULT 'real-world',
  client       TEXT,
  service      TEXT,
  year         TEXT,
  summary      TEXT,
  image_url    TEXT,
  accent_color TEXT DEFAULT 'blue',
  tags         TEXT[] DEFAULT '{}',
  metrics      JSONB DEFAULT '[]',
  challenge    TEXT[],
  solution     TEXT[],
  results      TEXT[],
  mockups      TEXT[] DEFAULT '{}',
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- ==========================================
-- Helper Security Functions & RLS Policies
-- ==========================================

CREATE OR REPLACE FUNCTION get_my_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_my_client_slug()
RETURNS TEXT AS $$
  SELECT client_slug FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;

-- Enable RLS on all tables
ALTER TABLE public.profiles          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kanban_tasks      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.uploaded_files    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_upgrades   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_projects   ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "profiles_own" ON public.profiles FOR ALL USING (id = auth.uid());
CREATE POLICY "profiles_admin_read" ON public.profiles FOR SELECT USING (get_my_role() IN ('owner', 'staff'));

-- Clients Policies
CREATE POLICY "clients_admin" ON public.clients FOR ALL USING (get_my_role() IN ('owner', 'staff'));
CREATE POLICY "clients_own" ON public.clients FOR SELECT USING (slug = get_my_client_slug());

-- Relational Tables Policies
CREATE POLICY "tasks_admin"    ON public.kanban_tasks    FOR ALL USING (get_my_role() IN ('owner', 'staff'));
CREATE POLICY "tasks_client"   ON public.kanban_tasks    FOR SELECT USING (client_slug = get_my_client_slug());
CREATE POLICY "files_admin"    ON public.uploaded_files  FOR ALL USING (get_my_role() IN ('owner', 'staff'));
CREATE POLICY "files_client"   ON public.uploaded_files  FOR ALL USING (client_slug = get_my_client_slug());
CREATE POLICY "upgrades_admin" ON public.service_upgrades FOR ALL USING (get_my_role() IN ('owner', 'staff'));
CREATE POLICY "upgrades_client" ON public.service_upgrades FOR ALL USING (client_slug = get_my_client_slug());
CREATE POLICY "leads_admin"    ON public.leads           FOR ALL USING (get_my_role() IN ('owner', 'staff'));
CREATE POLICY "leads_client"   ON public.leads           FOR SELECT USING (client_slug = get_my_client_slug());
CREATE POLICY "analytics_admin" ON public.analytics_snapshots FOR ALL USING (get_my_role() IN ('owner', 'staff'));
CREATE POLICY "analytics_client" ON public.analytics_snapshots FOR SELECT USING (client_slug = get_my_client_slug());

-- Custom Projects Policies
CREATE POLICY "projects_read"  ON public.custom_projects FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "projects_write" ON public.custom_projects FOR ALL USING (get_my_role() IN ('owner', 'staff'));
