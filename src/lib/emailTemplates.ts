export interface ContactEmailData {
  name: string;
  email: string;
  org?: string;
  systemType: string;
  message: string;
}

const serviceNames: Record<string, string> = {
  websites: "AI-Powered Business Website",
  tools: "AI Internal Tool & ERP",
  creator: "Creator Infrastructure",
  automation: "Workflow Automation",
  other: "Custom Engineering",
};

export function getServiceName(systemType: string): string {
  return serviceNames[systemType] || "Custom Digital System";
}

/**
 * High-clarity lead alert email sent to Egostix Media owners & staff.
 */
export function generateAgencyNotificationHtml(data: ContactEmailData): string {
  const serviceName = getServiceName(data.systemType);
  const dateStr = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background: #0f172a; color: #ffffff; padding: 24px; text-align: left; border-bottom: 3px solid #2563eb; }
    .badge { display: inline-block; background: #2563eb; color: #ffffff; font-family: sans-serif; font-size: 11px; font-weight: 700; text-transform: uppercase; padding: 4px 10px; border-radius: 4px; margin-top: 8px; letter-spacing: 0.5px; }
    .body { padding: 24px; font-size: 14px; line-height: 1.6; }
    .field { margin-bottom: 16px; border-bottom: 1px solid #f1f5f9; padding-bottom: 12px; }
    .field-label { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px; }
    .field-value { font-size: 15px; font-weight: 600; color: #0f172a; margin-top: 4px; }
    .message-box { background: #f8fafc; border: 1px solid #e2e8f0; border-left: 4px solid #2563eb; padding: 16px; border-radius: 6px; font-size: 14px; color: #334155; white-space: pre-wrap; margin-top: 6px; }
    .cta-button { display: inline-block; background: #2563eb; color: #ffffff !important; font-weight: 600; font-size: 13px; text-decoration: none; padding: 10px 18px; border-radius: 6px; margin-top: 16px; }
    .footer { background: #f8fafc; padding: 16px 24px; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div style="font-size: 11px; color: #94a3b8; letter-spacing: 1px; text-transform: uppercase; font-weight: 600;">EGOSTIX MEDIA — INBOUND LEAD</div>
      <h2 style="margin: 6px 0 0 0; font-size: 20px;">New Inquiry Received</h2>
      <div class="badge">${serviceName}</div>
    </div>
    <div class="body">
      <div class="field">
        <div class="field-label">Lead Name</div>
        <div class="field-value">${data.name}</div>
      </div>
      <div class="field">
        <div class="field-label">Email Address</div>
        <div class="field-value"><a href="mailto:${data.email}" style="color: #2563eb; text-decoration: none;">${data.email}</a></div>
      </div>
      <div class="field">
        <div class="field-label">Organization / Company</div>
        <div class="field-value">${data.org || "Not Specified"}</div>
      </div>
      <div class="field" style="border-bottom: none;">
        <div class="field-label">Project Details & Requirements</div>
        <div class="message-box">${data.message}</div>
      </div>
      <a href="mailto:${data.email}?subject=Re:%20Inquiry%20with%20Egostix%20Media" class="cta-button">Reply Directly to Lead</a>
    </div>
    <div class="footer">
      Received on ${dateStr} | Egostix Media Lead CRM Gateway
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * Warm, professional auto-responder confirmation email sent to prospective clients.
 */
export function generateClientConfirmationHtml(data: ContactEmailData): string {
  const serviceName = getServiceName(data.systemType);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; color: #0f172a; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background: #2563eb; color: #ffffff; padding: 28px 24px; text-align: left; }
    .body { padding: 28px 24px; font-size: 15px; line-height: 1.6; color: #334155; }
    .highlight-box { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px; margin: 20px 0; font-size: 14px; color: #1e40af; }
    .footer { background: #f8fafc; padding: 20px 24px; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div style="font-size: 12px; color: #dbeafe; letter-spacing: 1px; font-weight: 700; text-transform: uppercase;">EGOSTIX MEDIA</div>
      <h1 style="margin: 8px 0 0 0; font-size: 22px;">We've Received Your Inquiry</h1>
    </div>
    <div class="body">
      <p style="font-size: 16px; font-weight: 600; color: #0f172a; margin-top: 0;">Hi ${data.name},</p>
      <p>Thank you for reaching out to <strong>Egostix Media</strong>. We've successfully received your request regarding <strong>${serviceName}</strong>.</p>
      
      <div class="highlight-box">
        <strong>What happens next?</strong> Our team is currently reviewing your project details. We will reach out to you within <strong>24 hours</strong> to discuss your goals and map out next steps.
      </div>

      <p style="margin-top: 20px; font-weight: 600; color: #0f172a;">Summary of your message:</p>
      <div style="font-style: italic; background: #f8fafc; padding: 14px; border-radius: 6px; border: 1px solid #e2e8f0; font-size: 14px; color: #475569;">"${data.message}"</div>

      <p style="margin-top: 24px;">If you have any extra details, documents, or links to share in the meantime, simply reply to this email.</p>

      <p style="margin-top: 28px; font-weight: 600; color: #0f172a;">
        Best regards,<br>
        <span style="color: #2563eb;">The Egostix Media Team</span>
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
}
