'use server';

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function requestUpgradeAction(clientSlug: string, serviceName: string, description?: string) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from('service_upgrades')
      .insert({
        client_slug: clientSlug,
        service_name: serviceName,
        description: description || '',
        status: 'pending',
      })
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath('/dashboard');
    return { success: true, upgrade: data };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to request upgrade.' };
  }
}

export async function approveUpgradeAction(upgradeId: string) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: upgrade, error: fetchErr } = await supabase
      .from('service_upgrades')
      .select('*')
      .eq('id', upgradeId)
      .single();

    if (fetchErr || !upgrade) {
      return { success: false, error: 'Upgrade request not found.' };
    }

    await supabase
      .from('service_upgrades')
      .update({ status: 'approved', reviewed_at: new Date().toISOString() })
      .eq('id', upgradeId);

    // Append service to client's active_services
    const { data: client } = await supabase
      .from('clients')
      .select('active_services')
      .eq('slug', upgrade.client_slug)
      .single();

    const activeServices = Array.isArray(client?.active_services) ? client.active_services : [];
    if (!activeServices.includes(upgrade.service_name)) {
      activeServices.push(upgrade.service_name);
      await supabase
        .from('clients')
        .update({ active_services: activeServices })
        .eq('slug', upgrade.client_slug);
    }

    revalidatePath('/dashboard');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to approve upgrade.' };
  }
}

export async function declineUpgradeAction(upgradeId: string) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase
      .from('service_upgrades')
      .update({ status: 'declined', reviewed_at: new Date().toISOString() })
      .eq('id', upgradeId);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath('/dashboard');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to decline upgrade.' };
  }
}
