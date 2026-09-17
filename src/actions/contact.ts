'use server';

import { Resend } from "resend";
import {
  ContactEmailData,
  generateAgencyNotificationHtml,
  generateClientConfirmationHtml,
  getServiceName
} from "@/lib/emailTemplates";
import { addLeadAction } from "./leads";

const resendApiKey = process.env.RESEND_API_KEY;

export async function sendContactAction(data: ContactEmailData) {
  try {
    if (!data.name || !data.email || !data.message) {
      return { success: false, error: "Name, email, and message are required." };
    }

    const serviceName = getServiceName(data.systemType);

    // 1. Send Agency Lead Notification & Client Confirmation Emails
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);

      const agencyHtml = generateAgencyNotificationHtml(data);
      const clientHtml = generateClientConfirmationHtml(data);

      // Inbound Lead Alert to Egostix Media Owners/Staff
      await resend.emails.send({
        from: "Egostix Media <inquiry@media.egostix.com>",
        to: ["contact@egostix.com"],
        replyTo: data.email,
        subject: `[New Lead] ${data.name}${data.org ? ` (${data.org})` : ''} — ${serviceName}`,
        html: agencyHtml,
      });

      // Warm Auto-responder Confirmation to Client
      await resend.emails.send({
        from: "Egostix Media <inquiry@media.egostix.com>",
        to: [data.email],
        subject: `We've received your message — Egostix Media`,
        html: clientHtml,
      });
    } else {
      console.warn("RESEND_API_KEY is missing in environment variables. Email notification skipped.");
    }

    // 2. Log Lead in Supabase Database (for Egostix CRM & Dashboard)
    await addLeadAction({
      client_slug: "egostix-internal",
      name: data.name,
      email: data.email,
      phone: data.org || "",
      query: `[${serviceName}] ${data.message}`,
    });

    return { success: true };
  } catch (err: any) {
    console.error("Error sending contact email:", err);
    return {
      success: false,
      error: err?.message || "Failed to send your message. Please try again or email us directly at contact@egostix.com."
    };
  }
}
