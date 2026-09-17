'use server';

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function addTaskAction(task: {
  client_slug: string;
  title: string;
  description?: string;
  priority?: string;
  due_date?: string;
}) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { data, error } = await supabase
      .from('kanban_tasks')
      .insert({
        client_slug: task.client_slug,
        title: task.title,
        description: task.description || '',
        priority: task.priority || 'medium',
        status: 'backlog',
        due_date: task.due_date || null,
      })
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath('/dashboard');
    return { success: true, task: data };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to add task.' };
  }
}

export async function moveTaskAction(id: string, status: string) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { error } = await supabase
      .from('kanban_tasks')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath('/dashboard');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to move task.' };
  }
}

export async function deleteTaskAction(id: string) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const { error } = await supabase.from('kanban_tasks').delete().eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath('/dashboard');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to delete task.' };
  }
}
