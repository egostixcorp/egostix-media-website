# Supabase Real-World Migration Plan
### Egostix Media Portal — From Demo/Simulation to Production

> **Status**: Draft — Ready for implementation  
> **Scope**: Authentication, Database, Storage, Server Actions, RLS Policies  
> **Target Stack**: Supabase Auth + PostgreSQL + Supabase Storage + Next.js Server Actions  

---

## Overview

The current portal is built entirely on **client-side simulation**: all users, roles, clients, kanban tasks, leads, files, and upgrade requests live inside a React context (`DashboardContext.jsx`) backed by `sessionStorage`. This works for demos but has zero persistence, no real access control, and no multi-user isolation.

This plan replaces every simulated layer with a Supabase-backed production system — Supabase Auth for login/signup/session management, PostgreSQL tables for all relational data, Row-Level Security for tenant data isolation, Supabase Storage for real file uploads, and Next.js Server Actions for all mutations.

The **marketing Header** is also updated to detect a real Supabase session instead of checking `sessionStorage`.

---

## Current Architecture Audit

### What Is Simulated Today

| Layer | Current Demo Implementation | Location |
|---|---|---|
| **Authentication** | `login()` / `signup()` write to `sessionStorage` | `DashboardContext.jsx:601–684` |
| **Session detection (Header)** | `sessionStorage.getItem("egostix_session_user")` | `Header.jsx:30–31` |
| **Role system** | String comparison against hardcoded email patterns | `DashboardContext.jsx:606–624` |
| **Clients database** | Hardcoded array of 5 client objects in state | `DashboardContext.jsx:29–151` |
| **Kanban tasks** | In-memory array, lost on page reload | `DashboardContext.jsx:154–258` |
| **File uploads** | Simulated metadata only, no actual files stored | `DashboardContext.jsx:261–312`, `FilesTab.jsx` |
| **Service upgrades** | In-memory array | `DashboardContext.jsx:314–332` |
| **Leads (CRM)** | Hardcoded leads with mock chat logs | `DashboardContext.jsx:334–386` |
| **Analytics data** | Hardcoded JS object per client slug | `AnalysisTab.jsx:9–127` |
| **Client settings save** | Calls `updateClientDetails()` → mutates local state only | `ClientSettingsTab.jsx:32` |
| **Service settings (SettingsTab)** | Large in-component state, no persistence | `SettingsTab.jsx` |
| **Quick demo login buttons** | Hardcoded email shortcuts | `Auth.jsx:234–278` |
| **New signup creates local client** | `signup()` pushes to local `clients` state | `DashboardContext.jsx:639–673` |

---

## Supabase Database Schema

### Tables to Create

```sql
-- 1. User profiles (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id           UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name         TEXT NOT NULL,
  role         TEXT NOT NULL DEFAULT 'client', -- 'owner' | 'staff' | 'client'
  client_slug  TEXT,                            -- NULL for owner/staff
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Clients / Tenants
CREATE TABLE public.clients (
  slug              TEXT PRIMARY KEY,
  name              TEXT NOT NULL,
  short_name        TEXT,
  logo_url          TEXT,
  owner_name        TEXT,
  owner_email       TEXT,
  status            TEXT DEFAULT 'Active',
  ga_property_id    TEXT,
  active_services   TEXT[] DEFAULT '{}',
  -- Metrics (updated via analytics API or manually)
  metric_traffic    TEXT DEFAULT '0',
  metric_traffic_chg TEXT DEFAULT '+0%',
  metric_leads      TEXT DEFAULT '0',
  metric_leads_chg  TEXT DEFAULT '+0%',
  metric_conversion TEXT DEFAULT '0.0%',
  metric_conv_chg   TEXT DEFAULT '+0%',
  metric_ai_latency TEXT DEFAULT '0.0s',
  metric_active_chats TEXT DEFAULT '0',
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Kanban Tasks
CREATE TABLE public.kanban_tasks (
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

-- 4. Uploaded Files (metadata; actual bytes in Supabase Storage)
CREATE TABLE public.uploaded_files (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_slug  TEXT REFERENCES public.clients(slug) ON DELETE CASCADE,
  name         TEXT NOT NULL,
  size         BIGINT,               -- bytes
  type         TEXT,                 -- MIME type
  storage_path TEXT NOT NULL,        -- Supabase Storage bucket path
  uploaded_by  UUID REFERENCES auth.users(id),
  status       TEXT DEFAULT 'Uploaded', -- 'Uploaded' | 'Verified' | 'Synced'
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Service Upgrade Requests
CREATE TABLE public.service_upgrades (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_slug   TEXT REFERENCES public.clients(slug) ON DELETE CASCADE,
  service_name  TEXT NOT NULL,
  description   TEXT,
  status        TEXT DEFAULT 'pending', -- 'pending' | 'approved' | 'declined'
  requested_at  TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at   TIMESTAMPTZ
);

-- 6. Leads (CRM)
CREATE TABLE public.leads (
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

-- 7. Analytics snapshots (optional; per the Google Analytics integration plan)
CREATE TABLE public.analytics_snapshots (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_slug  TEXT REFERENCES public.clients(slug) ON DELETE CASCADE,
  active_now   INT DEFAULT 0,
  avg_ctr      TEXT,
  page_views   JSONB DEFAULT '[]',   -- [{day, views}]
  top_queries  JSONB DEFAULT '[]',   -- [{query, clicks, impressions, ctr, position}]
  locations    JSONB DEFAULT '[]',   -- [{city, country, users}]
  snapshotted_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Custom projects (published via Service Creator)
CREATE TABLE public.custom_projects (
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
```

---

## Row-Level Security (RLS) Policies

> **Critical**: All tables must enable RLS and have the correct policies before going live.

```sql
-- Enable RLS on all tables
ALTER TABLE public.profiles        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clients         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kanban_tasks    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.uploaded_files  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_upgrades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_snapshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_projects ENABLE ROW LEVEL SECURITY;

-- Helper: get the current user's role
CREATE OR REPLACE FUNCTION get_my_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;

-- Helper: get the current user's assigned client slug
CREATE OR REPLACE FUNCTION get_my_client_slug()
RETURNS TEXT AS $$
  SELECT client_slug FROM public.profiles WHERE id = auth.uid();
$$ LANGUAGE sql SECURITY DEFINER;

-- profiles: users can read/update their own profile; owner/staff can read all
CREATE POLICY "profiles_own" ON public.profiles
  FOR ALL USING (id = auth.uid());
CREATE POLICY "profiles_admin_read" ON public.profiles
  FOR SELECT USING (get_my_role() IN ('owner', 'staff'));

-- clients: owner/staff can see all; client sees only their own
CREATE POLICY "clients_admin" ON public.clients
  FOR ALL USING (get_my_role() IN ('owner', 'staff'));
CREATE POLICY "clients_own" ON public.clients
  FOR SELECT USING (slug = get_my_client_slug());

-- kanban_tasks, uploaded_files, service_upgrades, leads, analytics_snapshots:
--   owner/staff can see all; client sees only their client_slug rows
CREATE POLICY "tasks_admin"   ON public.kanban_tasks    FOR ALL USING (get_my_role() IN ('owner', 'staff'));
CREATE POLICY "tasks_client"  ON public.kanban_tasks    FOR SELECT USING (client_slug = get_my_client_slug());
CREATE POLICY "files_admin"   ON public.uploaded_files  FOR ALL USING (get_my_role() IN ('owner', 'staff'));
CREATE POLICY "files_client"  ON public.uploaded_files  FOR ALL USING (client_slug = get_my_client_slug());
CREATE POLICY "upgrades_admin" ON public.service_upgrades FOR ALL USING (get_my_role() IN ('owner', 'staff'));
CREATE POLICY "upgrades_client" ON public.service_upgrades FOR ALL USING (client_slug = get_my_client_slug());
CREATE POLICY "leads_admin"   ON public.leads           FOR ALL USING (get_my_role() IN ('owner', 'staff'));
CREATE POLICY "leads_client"  ON public.leads           FOR SELECT USING (client_slug = get_my_client_slug());
CREATE POLICY "analytics_admin" ON public.analytics_snapshots FOR ALL USING (get_my_role() IN ('owner', 'staff'));
CREATE POLICY "analytics_client" ON public.analytics_snapshots FOR SELECT USING (client_slug = get_my_client_slug());

-- custom_projects: read for all authenticated; write for owner/staff
CREATE POLICY "projects_read"  ON public.custom_projects FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "projects_write" ON public.custom_projects FOR ALL USING (get_my_role() IN ('owner', 'staff'));
```

---

## Supabase Storage Setup

Create a **private bucket** called `client-files`:

```sql
-- In Supabase Dashboard → Storage → Create Bucket
-- Name: client-files
-- Public: false (private, signed URLs only)
```

Storage RLS path convention:
```
client-files/{client_slug}/{file_uuid}/{filename}
```

Policies for `client-files`:
- **Owner/Staff**: Full access to all paths.
- **Client**: Can upload and download only under their own `client_slug` folder.

---

## Environment Variables

Add to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key   # Server-side only
```

---

## New File Structure

```
src/
├── lib/
│   ├── supabase/
│   │   ├── client.ts         ← createBrowserClient (for "use client" components)
│   │   ├── server.ts         ← createServerClient (for Server Actions / Route Handlers)
│   │   └── admin.ts          ← createClient(SERVICE_ROLE_KEY) — server only
│   └── utils.ts              ← existing cn() helper
│
├── actions/
│   ├── auth.ts               ← login, signup, logout Server Actions
│   ├── clients.ts            ← getClients, updateClient Server Actions
│   ├── kanban.ts             ← addTask, moveTask, deleteTask
│   ├── files.ts              ← uploadFile, deleteFile, getSignedUrl
│   ├── upgrades.ts           ← requestUpgrade, approveUpgrade, declineUpgrade
│   ├── leads.ts              ← getLeads, addLead, toggleLeadStatus
│   └── analytics.ts          ← getAnalyticsSnapshot (+ GA4 API integration)
│
└── components/
    └── Dashboard/
        └── DashboardContext.jsx  ← Refactored: replaces local state with Supabase queries
```

---

## Phase-by-Phase Migration Steps

---

### Phase 1 — Supabase Client Setup

**Files to create:**

#### `src/lib/supabase/client.ts` (Browser Client)
```typescript
import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

#### `src/lib/supabase/server.ts` (Server Client for Actions)
```typescript
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export function createClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (name) => cookieStore.get(name)?.value } }
  );
}
```

**Install required packages:**
```bash
npm install @supabase/supabase-js @supabase/ssr
```

---

### Phase 2 — Authentication Migration

**Replace:** `DashboardContext.jsx` → `login()`, `signup()`, `logout()` and the `Auth.jsx` quick-login buttons.

#### `src/actions/auth.ts`
```typescript
'use server';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function loginAction(email: string, password: string) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) return { error: error.message };
  revalidatePath('/dashboard');
  return { user: data.user };
}

export async function signupAction(name: string, email: string, password: string, companyName: string) {
  const supabase = createClient();
  // 1. Create auth user
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return { error: error.message };

  // 2. Insert profile
  await supabase.from('profiles').insert({
    id: data.user!.id,
    name,
    role: 'client',
    client_slug: companyName.toLowerCase().replace(/\s+/g, '-')
  });

  // 3. Insert client record
  const slug = companyName.toLowerCase().replace(/\s+/g, '-');
  await supabase.from('clients').insert({
    slug,
    name: companyName,
    short_name: companyName.split(' ')[0],
    owner_name: name,
    owner_email: email,
    status: 'Active',
    active_services: ['AI-Powered Business Website'],
  });

  revalidatePath('/dashboard');
  return { success: true };
}

export async function logoutAction() {
  const supabase = createClient();
  await supabase.auth.signOut();
  revalidatePath('/dashboard');
}
```

**Update `Auth.jsx`:**
- Call `loginAction()` / `signupAction()` instead of `login()` / `signup()` from context.
- Remove all quick-login demo buttons (or retain with real seeded test credentials for internal testing only).
- Show `error` returned from server action in the error state UI.
- Show loading spinner on the submit button during async action.

**Update `DashboardContext.jsx`:**
- Remove `login()`, `signup()`, `logout()`, all sessionStorage auth writes.
- Add a `useEffect` that calls `supabase.auth.getSession()` on mount to set `isLoggedIn` and `currentUser`.
- Subscribe to `supabase.auth.onAuthStateChange()` to reactively update auth state.

---

### Phase 3 — Header Session Detection

**Current (marketing `Header.jsx`):**
```javascript
// Line 30-31 — demo session check
const savedUser = sessionStorage.getItem("egostix_session_user");
setIsLoggedIn(!!savedUser);
```

**Replace with Supabase:**
```javascript
// Header.jsx
import { createClient } from '@/lib/supabase/client';

useEffect(() => {
  const supabase = createClient();
  supabase.auth.getSession().then(({ data: { session } }) => {
    setIsLoggedIn(!!session);
  });
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    setIsLoggedIn(!!session);
  });
  return () => subscription.unsubscribe();
}, []);
```

---

### Phase 4 — DashboardContext Refactor

**Strategy**: Keep the context as the central data hub but replace all hardcoded in-memory state with async Supabase fetches. The context should:

1. Fetch `currentUser` and `role` from Supabase Auth + `profiles` table on mount.
2. Fetch `clients` list from `public.clients` on mount (filtered by RLS automatically).
3. Expose all data as state + expose Server Action wrappers as context methods.

**Key context state changes:**

| Old State | New Source |
|---|---|
| `clients` (hardcoded array) | `supabase.from('clients').select('*')` |
| `kanbanTasks` | `supabase.from('kanban_tasks').select('*')` |
| `uploadedFiles` | `supabase.from('uploaded_files').select('*')` |
| `serviceUpgrades` | `supabase.from('service_upgrades').select('*')` |
| `leads` | `supabase.from('leads').select('*')` |
| `customProjects` | `supabase.from('custom_projects').select('*')` |
| `role` (string comparison) | `profiles.role` from DB |
| `selectedClientSlug` | `profiles.client_slug` from DB (for client role) |

**Context loading pattern:**
```javascript
useEffect(() => {
  const supabase = createClient();
  async function bootstrap() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { setIsLoggedIn(false); return; }

    setIsLoggedIn(true);
    setCurrentUser(session.user);

    // Get profile → role + client_slug
    const { data: profile } = await supabase
      .from('profiles').select('*').eq('id', session.user.id).single();
    setRole(profile.role);
    if (profile.client_slug) setSelectedClientSlug(profile.client_slug);

    // Fetch all relational data (RLS handles tenant filtering)
    const [{ data: clientsData }, { data: tasks }, { data: files },
           { data: upgrades }, { data: leadsData }] = await Promise.all([
      supabase.from('clients').select('*'),
      supabase.from('kanban_tasks').select('*'),
      supabase.from('uploaded_files').select('*'),
      supabase.from('service_upgrades').select('*'),
      supabase.from('leads').select('*'),
    ]);

    setClients(clientsData ?? []);
    setKanbanTasks(tasks ?? []);
    setUploadedFiles(files ?? []);
    setServiceUpgrades(upgrades ?? []);
    setLeads(leadsData ?? []);
  }
  bootstrap();
}, []);
```

---

### Phase 5 — Mutation Server Actions

Each context mutation method becomes a Server Action call + optimistic state update.

#### `src/actions/kanban.ts`
```typescript
'use server';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addTaskAction(task: { client_slug: string; title: string; description?: string; priority?: string; due_date?: string }) {
  const supabase = createClient();
  const { data, error } = await supabase.from('kanban_tasks').insert(task).select().single();
  if (error) return { error: error.message };
  revalidatePath('/dashboard');
  return { task: data };
}

export async function moveTaskAction(id: string, status: string) {
  const supabase = createClient();
  await supabase.from('kanban_tasks').update({ status, updated_at: new Date().toISOString() }).eq('id', id);
  revalidatePath('/dashboard');
}

export async function deleteTaskAction(id: string) {
  const supabase = createClient();
  await supabase.from('kanban_tasks').delete().eq('id', id);
  revalidatePath('/dashboard');
}
```

#### `src/actions/files.ts`
```typescript
'use server';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function uploadFileAction(formData: FormData) {
  const supabase = createClient();
  const file = formData.get('file') as File;
  const clientSlug = formData.get('client_slug') as string;

  const fileId = crypto.randomUUID();
  const path = `${clientSlug}/${fileId}/${file.name}`;

  // Upload to Supabase Storage
  const { error: storageErr } = await supabase.storage
    .from('client-files').upload(path, file);
  if (storageErr) return { error: storageErr.message };

  // Save metadata to DB
  const { data, error } = await supabase.from('uploaded_files').insert({
    client_slug: clientSlug,
    name: file.name,
    size: file.size,
    type: file.type,
    storage_path: path,
  }).select().single();

  if (error) return { error: error.message };
  revalidatePath('/dashboard');
  return { file: data };
}

export async function deleteFileAction(id: string, storagePath: string) {
  const supabase = createClient();
  await supabase.storage.from('client-files').remove([storagePath]);
  await supabase.from('uploaded_files').delete().eq('id', id);
  revalidatePath('/dashboard');
}

export async function getSignedUrlAction(storagePath: string) {
  const supabase = createClient();
  const { data } = await supabase.storage
    .from('client-files').createSignedUrl(storagePath, 3600); // 1hr
  return data?.signedUrl ?? null;
}
```

#### `src/actions/upgrades.ts`
```typescript
'use server';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function requestUpgradeAction(clientSlug: string, serviceName: string, description: string) {
  const supabase = createClient();
  await supabase.from('service_upgrades').insert({ client_slug: clientSlug, service_name: serviceName, description });
  revalidatePath('/dashboard');
}

export async function approveUpgradeAction(upgradeId: string) {
  const supabase = createClient();
  const { data: upgrade } = await supabase.from('service_upgrades').select('*').eq('id', upgradeId).single();
  if (!upgrade) return;

  await supabase.from('service_upgrades').update({ status: 'approved', reviewed_at: new Date().toISOString() }).eq('id', upgradeId);

  // Append service to client's active_services
  const { data: client } = await supabase.from('clients').select('active_services').eq('slug', upgrade.client_slug).single();
  const updated = [...(client?.active_services ?? [])];
  if (!updated.includes(upgrade.service_name)) updated.push(upgrade.service_name);
  await supabase.from('clients').update({ active_services: updated }).eq('slug', upgrade.client_slug);

  revalidatePath('/dashboard');
}

export async function declineUpgradeAction(upgradeId: string) {
  const supabase = createClient();
  await supabase.from('service_upgrades').update({ status: 'declined', reviewed_at: new Date().toISOString() }).eq('id', upgradeId);
  revalidatePath('/dashboard');
}
```

#### `src/actions/leads.ts`
```typescript
'use server';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function addLeadAction(lead: { client_slug: string; name: string; email?: string; phone?: string; query?: string }) {
  const supabase = createClient();
  const { data, error } = await supabase.from('leads').insert({ ...lead, chat_log: [] }).select().single();
  if (error) return { error: error.message };
  revalidatePath('/dashboard');
  return { lead: data };
}

export async function toggleLeadStatusAction(id: string, status: string) {
  const supabase = createClient();
  await supabase.from('leads').update({ status }).eq('id', id);
  revalidatePath('/dashboard');
}
```

#### `src/actions/clients.ts`
```typescript
'use server';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateClientAction(slug: string, fields: Partial<{ name: string; owner_name: string; owner_email: string }>) {
  const supabase = createClient();
  await supabase.from('clients').update(fields).eq('slug', slug);
  revalidatePath('/dashboard');
}
```

---

### Phase 6 — FilesTab Real Upload UI

**Current:** A mock form that collects a filename string and simulated file size, then calls `uploadFile(name, size, type)` which writes to local state only.

**New:** The dropzone captures a real `File` object, passes it via `FormData` to the `uploadFileAction()` Server Action, which uploads to Supabase Storage and writes metadata to `uploaded_files`.

**Changes to `FilesTab.jsx`:**
1. Replace `<input type="text">` for filename with a real `<input type="file">` attached to the dropzone's `onClick`.
2. Build a `FormData` with the `File` object + `client_slug`.
3. Call `uploadFileAction(formData)` and optimistically update local file list.
4. Remove "Simulated File Size" input field entirely.
5. Wire the **Download** button to call `getSignedUrlAction(file.storage_path)` and open the returned URL.

---

### Phase 7 — AnalysisTab Live Data

**Current:** Hardcoded `analyticsData` JS object keyed by `client_slug`.

**New strategy (two-phase):**
1. **Phase 7a**: Fetch from `analytics_snapshots` table (populated manually or via cron). Replace hardcoded object with a `useEffect` that calls `supabase.from('analytics_snapshots').select('*').eq('client_slug', clientKey).order('snapshotted_at', { ascending: false }).limit(1)`.
2. **Phase 7b** (matches existing `google_analytics_integration_plan.md`): Add an API route `src/app/api/analytics/[clientSlug]/route.ts` that calls the GA4 Data API and writes/returns fresh snapshot data.

---

### Phase 8 — SettingsTab & ClientSettingsTab Persistence

**SettingsTab** currently builds a full "website config" in local state (theme, colors, fonts, service sections) with no backend persistence. This needs a `client_config JSONB` column on `clients` or a dedicated `client_configs` table.

**Migration:**
1. Add `config JSONB DEFAULT '{}'` column to `public.clients`.
2. On form submit in `SettingsTab`, call `updateClientAction(slug, { config: formData })`.
3. On mount, load `activeClient.config` from context into local form state.

**ClientSettingsTab** already has `updateClientDetails()` in context — wire it to `updateClientAction()` Server Action instead.

---

### Phase 9 — Remove Demo Code

After all phases are complete, remove all demo/simulation artifacts:

- [ ] Delete all quick-demo login buttons from `Auth.jsx` (lines 234–278).
- [ ] Delete `sessionStorage` read/write in `DashboardContext.jsx` (lines 389–448).
- [ ] Delete the hardcoded `clients`, `kanbanTasks`, `uploadedFiles`, `serviceUpgrades`, `leads` arrays from `DashboardContext.jsx`.
- [ ] Delete the hardcoded `analyticsData` object from `AnalysisTab.jsx` (lines 9–127).
- [ ] Remove `login()` / `signup()` / `logout()` simulation methods from context.
- [ ] Delete the role-resolution by email string matching (`DashboardContext.jsx:606–624`).
- [ ] Remove `egostix_session_*` sessionStorage keys from `Header.jsx`.

---

## Data Seeding for Production Launch

Before go-live, seed the following via Supabase Dashboard SQL editor or a seed script:

1. **Create Supabase Auth users** for each real team member (owner, staff) and real client contacts.
2. **Insert their `profiles` rows** with correct `role` and `client_slug`.
3. **Insert the `clients` rows** for Apex Realty, Pulse Ops, Chronos Health, Synth Academy (using their real data).
4. **Migrate existing demo kanban tasks**, leads, and upgrade requests to the DB tables.

---

## Verification Checklist

| Item | Test |
|---|---|
| **Login** | Real Supabase Auth credentials create a session cookie |
| **Session persistence** | Refresh page → still logged in (no sessionStorage dependency) |
| **Header auth state** | Header shows "Dashboard" button when logged in via Supabase session |
| **Role-based routing** | Owner sees all clients; client only sees their own data |
| **RLS isolation** | Logged-in client cannot query another client's files/leads via Supabase SDK |
| **File upload** | Real file uploads to `client-files` bucket; metadata in DB |
| **File download** | Signed URL generated; file downloads correctly |
| **Kanban mutation** | Task added/moved/deleted persists after page reload |
| **Lead status toggle** | Status change persists in DB |
| **Upgrade approve/decline** | Status updates in DB; approved service appears in client's active_services |
| **Client settings save** | `owner_name`, `owner_email` changes persist to `clients` table |
| **Logout** | Session cleared; Header reverts to Login/Sign Up; dashboard shows Auth screen |
| **TypeScript** | `npx tsc --noEmit` exits with 0 errors |

---

## Notes & Decisions

> [!IMPORTANT]
> The `SUPABASE_SERVICE_ROLE_KEY` must **never** be exposed to the client. It is only used in Server Actions or Route Handlers.

> [!NOTE]
> The Google Analytics integration plan (`plans/google_analytics_integration_plan.md`) feeds into Phase 7b of this migration. The `gaPropertyId` field on `clients` is already modeled in the schema above.

> [!TIP]
> For real-time Kanban board updates (e.g., staff sees task moved by owner in real-time), use `supabase.channel('kanban').on('postgres_changes', ...)` subscription in the PlanIt tab after the migration is stable.

> [!WARNING]
> The three large role views (`ClientView.jsx`, `OwnerView.jsx`, `StaffView.jsx`) are each >75KB. These should be audited during migration for any additional hardcoded data or sessionStorage references not captured above.
