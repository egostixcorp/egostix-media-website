'use server';

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

const resendApiKey = process.env.RESEND_API_KEY;

export async function updateClientAction(
  slug: string,
  fields: Partial<{
    name: string;
    short_name: string;
    owner_name: string;
    owner_email: string;
    ga_property_id: string;
    active_services: string[];
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

export async function createClientAccountAction(params: {
  name: string;
  shortName?: string;
  ownerName: string;
  ownerEmail: string;
  password?: string;
  activeServices?: string[];
}) {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const slug = (params.shortName || params.name)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // 1. Create client record in `clients` table
    const { error: clientErr } = await supabase.from("clients").upsert({
      slug,
      name: params.name,
      short_name: params.shortName || params.name,
      owner_name: params.ownerName,
      owner_email: params.ownerEmail,
      active_services: params.activeServices || [],
      status: "Active",
      created_at: new Date().toISOString()
    });

    if (clientErr) {
      return { success: false, error: clientErr.message };
    }

    // 2. Dispatch credentials email if ownerEmail & password provided
    if (params.ownerEmail && resendApiKey) {
      const resend = new Resend(resendApiKey);

      const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background: #0f172a; color: #ffffff; padding: 28px 24px; text-align: left; border-bottom: 3px solid #2563eb; }
    .body { padding: 28px 24px; font-size: 15px; line-height: 1.6; color: #334155; }
    .credentials-box { background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; margin: 20px 0; }
    .cta-button { display: inline-block; background: #2563eb; color: #ffffff !important; font-weight: 600; font-size: 14px; text-decoration: none; padding: 12px 22px; border-radius: 6px; margin-top: 18px; }
    .footer { background: #f8fafc; padding: 20px 24px; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div style="font-size: 12px; color: #94a3b8; letter-spacing: 1px; font-weight: 700; text-transform: uppercase;">EGOSTIX MEDIA PORTAL</div>
      <h1 style="margin: 8px 0 0 0; font-size: 22px;">Client Portal Access & Login Credentials</h1>
    </div>
    <div class="body">
      <p style="font-size: 16px; font-weight: 600; color: #0f172a; margin-top: 0;">Hi ${params.ownerName || "Client Partner"},</p>
      <p>Your client portal account for <strong>${params.name}</strong> has been provisioned on Egostix Media.</p>

      <div class="credentials-box">
        <div style="font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase; margin-bottom: 8px;">Your Confidential Access Credentials:</div>
        <div style="font-size: 14px; margin-bottom: 4px;"><strong>Portal Organization:</strong> ${params.name} (${slug})</div>
        <div style="font-size: 14px; margin-bottom: 4px;"><strong>Login Email:</strong> ${params.ownerEmail}</div>
        ${params.password ? `<div style="font-size: 14px;"><strong>Initial Password:</strong> <code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">${params.password}</code></div>` : ''}
      </div>
      
      <p>Sign in to monitor your active service modules, track task progress, access shared operational files, and review captured lead analytics.</p>

      <div style="margin-top: 24px;">
        <a href="https://media.egostix.com/login" class="cta-button">Log In to Client Console</a>
      </div>

      <p style="margin-top: 28px; font-weight: 600; color: #0f172a;">
        Best regards,<br>
        <span style="color: #2563eb;">The Egostix Media Operations Team</span>
      </p>
    </div>
    <div class="footer">
      Egostix Media | Studio: Badkulla, Nadia, West Bengal, India - 741121<br>
      Email: contact@egostix.com | Phone: +91 73192 74817
    </div>
  </div>
</body>
</html>
      `;

      try {
        await resend.emails.send({
          from: "Egostix Media <inquiry@media.egostix.com>",
          to: [params.ownerEmail],
          subject: `Your Client Credentials & Access Details — ${params.name}`,
          html: htmlContent,
        });
      } catch (e) {
        console.error("Resend email delivery error:", e);
      }
    }

    revalidatePath('/dashboard');
    return { success: true, slug };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to create client account." };
  }
}

export async function sendClientInviteAction(
  clientSlug: string,
  clientName: string,
  ownerEmail: string,
  ownerName: string,
  customPassword?: string
) {
  try {
    if (!ownerEmail) {
      return { success: false, error: "Client owner email is required." };
    }

    if (resendApiKey) {
      const resend = new Resend(resendApiKey);

      const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background: #0f172a; color: #ffffff; padding: 28px 24px; text-align: left; border-bottom: 3px solid #2563eb; }
    .body { padding: 28px 24px; font-size: 15px; line-height: 1.6; color: #334155; }
    .credentials-box { background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 8px; padding: 16px; margin: 20px 0; }
    .cta-button { display: inline-block; background: #2563eb; color: #ffffff !important; font-weight: 600; font-size: 14px; text-decoration: none; padding: 12px 22px; border-radius: 6px; margin-top: 18px; }
    .footer { background: #f8fafc; padding: 20px 24px; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div style="font-size: 12px; color: #94a3b8; letter-spacing: 1px; font-weight: 700; text-transform: uppercase;">EGOSTIX MEDIA PORTAL</div>
      <h1 style="margin: 8px 0 0 0; font-size: 22px;">Client Access Credentials & Portal Invite</h1>
    </div>
    <div class="body">
      <p style="font-size: 16px; font-weight: 600; color: #0f172a; margin-top: 0;">Hi ${ownerName || "Team"},</p>
      <p>You have been provisioned access to the <strong>${clientName || "Egostix Client Portal"}</strong> on Egostix Media.</p>
      
      <div class="credentials-box">
        <div style="font-size: 12px; font-weight: 700; color: #475569; text-transform: uppercase; margin-bottom: 8px;">Your Login Credentials:</div>
        <div style="font-size: 14px; margin-bottom: 4px;"><strong>Portal Organization:</strong> ${clientName}</div>
        <div style="font-size: 14px; margin-bottom: 4px;"><strong>Registered Email:</strong> ${ownerEmail}</div>
        ${customPassword ? `<div style="font-size: 14px;"><strong>Access Key:</strong> <code style="background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">${customPassword}</code></div>` : ''}
      </div>

      <div style="margin-top: 24px;">
        <a href="https://media.egostix.com/login" class="cta-button">Log In to Console</a>
      </div>

      <p style="margin-top: 28px; font-weight: 600; color: #0f172a;">
        Best regards,<br>
        <span style="color: #2563eb;">The Egostix Media Operations Team</span>
      </p>
    </div>
    <div class="footer">
      Egostix Media | Studio: Badkulla, Nadia, West Bengal, India - 741121<br>
      Email: contact@egostix.com | Phone: +91 73192 74817
    </div>
  </div>
</body>
</html>
      `;

      await resend.emails.send({
        from: "Egostix Media <inquiry@media.egostix.com>",
        to: [ownerEmail],
        subject: `Your Client Portal Access & Login Details — Egostix Media`,
        html: htmlContent,
      });
    }

    return { success: true };
  } catch (err: any) {
    console.error("Error sending client invite email:", err);
    return { success: false, error: err?.message || "Failed to send invitation email." };
  }
}
