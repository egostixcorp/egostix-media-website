'use server';

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function uploadFileAction(formData: FormData) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const file = formData.get('file') as File;
    const clientSlug = formData.get('client_slug') as string;

    if (!file || !clientSlug) {
      return { success: false, error: 'File and client slug are required.' };
    }

    const fileId = crypto.randomUUID();
    const storagePath = `${clientSlug}/${fileId}/${file.name}`;

    // Upload file to Supabase Storage
    const { error: storageError } = await supabase.storage
      .from('client-files')
      .upload(storagePath, file);

    if (storageError) {
      return { success: false, error: storageError.message };
    }

    // Save metadata record in DB
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error: dbError } = await supabase
      .from('uploaded_files')
      .insert({
        client_slug: clientSlug,
        name: file.name,
        size: file.size,
        type: file.type || 'application/octet-stream',
        storage_path: storagePath,
        uploaded_by: user?.id || null,
        status: 'Uploaded',
      })
      .select()
      .single();

    if (dbError) {
      return { success: false, error: dbError.message };
    }

    revalidatePath('/dashboard');
    return { success: true, file: data };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to upload file.' };
  }
}

export async function deleteFileAction(id: string, storagePath: string) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    if (storagePath) {
      await supabase.storage.from('client-files').remove([storagePath]);
    }

    const { error } = await supabase.from('uploaded_files').delete().eq('id', id);
    if (error) {
      return { success: false, error: error.message };
    }

    revalidatePath('/dashboard');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to delete file.' };
  }
}

export async function getSignedUrlAction(storagePath: string) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase.storage
      .from('client-files')
      .createSignedUrl(storagePath, 3600); // 1 hour expiration

    if (error || !data?.signedUrl) {
      return { success: false, error: error?.message || 'Failed to generate signed download URL.' };
    }

    return { success: true, url: data.signedUrl };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Failed to get signed URL.' };
  }
}
