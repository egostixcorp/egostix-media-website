'use server';

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function loginAction(email: string, password: string) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath('/dashboard');
    return { success: true, user: data.user };
  } catch (err: any) {
    return { success: false, error: err?.message || 'An unexpected error occurred during login.' };
  }
}

export async function signupAction(name: string, email: string, password: string, companyName: string) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    // 1. SignUp user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, company_name: companyName },
      },
    });

    if (authError || !authData.user) {
      return { success: false, error: authError?.message || 'Failed to create account.' };
    }

    const isEgostixTeam = email.toLowerCase().endsWith('@egostix.com');
    const assignedRole = isEgostixTeam
      ? (email.toLowerCase().includes('staff') || email.toLowerCase().includes('engineer') ? 'staff' : 'owner')
      : 'client';

    const slug = isEgostixTeam ? null : companyName.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');

    // 2. Insert profile
    const { error: profileError } = await supabase.from('profiles').insert({
      id: authData.user.id,
      name,
      role: assignedRole,
      client_slug: slug,
    });

    if (profileError) {
      console.error('Error creating profile:', profileError);
    }

    // 3. Insert client record for clients
    if (!isEgostixTeam && slug) {
      const { error: clientError } = await supabase.from('clients').insert({
        slug,
        name: companyName,
        short_name: companyName.split(' ')[0] || companyName,
        owner_name: name,
        owner_email: email,
        status: 'Active',
        active_services: ['AI-Powered Business Website'],
      });

      if (clientError) {
        console.error('Error creating client record:', clientError);
      }
    }

    revalidatePath('/dashboard');
    return { success: true, user: authData.user };
  } catch (err: any) {
    return { success: false, error: err?.message || 'An unexpected error occurred during signup.' };
  }
}

export async function logoutAction() {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    revalidatePath('/dashboard');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to log out.' };
  }
}
