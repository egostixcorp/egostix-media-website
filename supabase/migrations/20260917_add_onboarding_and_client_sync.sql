-- ==========================================
-- Migration: Add Onboarding & Client Directory Synchronization
-- Created: 2026-09-17
-- ==========================================

-- 1. Add onboarding_completed flag to profiles and clients tables
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false;

ALTER TABLE public.clients
  ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN DEFAULT false;

-- 2. Update RLS policies on public.clients to prevent signup insertion failures
DROP POLICY IF EXISTS "clients_admin" ON public.clients;
DROP POLICY IF EXISTS "clients_own" ON public.clients;

-- Allow owners and staff full access
CREATE POLICY "clients_admin_all" ON public.clients
  FOR ALL USING (get_my_role() IN ('owner', 'staff'));

-- Allow clients to read their own client record
CREATE POLICY "clients_own_read" ON public.clients
  FOR SELECT USING (slug = get_my_client_slug());

-- Allow authenticated users to insert their client record during registration or onboarding
CREATE POLICY "clients_auth_insert" ON public.clients
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow clients to update their own client record during onboarding
CREATE POLICY "clients_own_update" ON public.clients
  FOR UPDATE USING (slug = get_my_client_slug());
