'use server';

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function addLeadAction(lead: {
  client_slug: string;
  name: string;
  email?: string;
  phone?: string;
  query?: string;
}) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from('leads')
      .insert({
        client_slug: lead.client_slug,
        name: lead.name,
        email: lead.email || '',
        phone: lead.phone || '',
        query: lead.query || '',
        status: 'hot',
        chat_log: [],
      })
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath('/dashboard');
    return { success: true, lead: data };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to add lead.' };
  }
}

export async function toggleLeadStatusAction(id: string, status: string) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase
      .from('leads')
      .update({ status })
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath('/dashboard');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to update lead status.' };
  }
}
