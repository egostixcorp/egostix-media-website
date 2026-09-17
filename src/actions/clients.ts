'use server';

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function updateClientAction(
  slug: string,
  fields: Partial<{
    name: string;
    short_name: string;
    owner_name: string;
    owner_email: string;
    ga_property_id: string;
    config: Record<string, any>;
  }>
) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase
      .from('clients')
      .update(fields)
      .eq('slug', slug);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath('/dashboard');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to update client details.' };
  }
}
