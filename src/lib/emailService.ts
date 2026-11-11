import nodemailer from "nodemailer";

export interface InquiryEmailData {
  id: string;
  type: "trip_booking" | "contact_collaboration";
  fullName: string;
  email: string;
  whatsapp?: string;
  gender?: string;
  travelersCount?: number;
  cityOfOrigin?: string;
  dietPreference?: string;
  emergencyContact?: string;
  termsAccepted?: boolean;
  message?: string;
  tripTitle?: string;
  tripSlug?: string;
  collabType?: string;
  subject?: string;
  createdAt: string;
}

const PRIMARY_DESTINATION = "ashrafsiddiquitravel@gmail.com";

/**
 * Builds a luxury dark-mode responsive HTML email with WhatsApp & Email CTA buttons
 */
export function buildInquiryHtml(data: InquiryEmailData): string {
  const isTrip = data.type === "trip_booking" || Boolean(data.tripTitle && !data.collabType);
  const badgeText = isTrip ? "NEW TRIP BOOKING REQUEST" : "BRAND & COLLABORATION INQUIRY";
  const badgeColor = isTrip ? "#10b981" : "#38bdf8";
  const badgeBg = isTrip ? "rgba(16, 185, 129, 0.15)" : "rgba(56, 189, 248, 0.15)";
  const cleanWhatsapp = (data.whatsapp || "").replace(/[^\d+]/g, "");
  const formattedDate = new Date(data.createdAt || Date.now()).toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "short",
  });

  const whatsappLink = cleanWhatsapp
    ? `https://wa.me/${cleanWhatsapp.replace(/^\+/, "")}?text=${encodeURIComponent(
        `Hi ${data.fullName}, this is Ashraf Siddiqui! I received your inquiry for ${
          data.tripTitle || "travel with me"
        }. Let's discuss the details!`
      )}`
    : "";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Travel Inquiry</title>
</head>
<body style="margin: 0; padding: 0; background-color: #07090e; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #f1f5f9; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #07090e; width: 100%; padding: 32px 12px;">
    <tr>
      <td align="center">
        <!-- Container Card -->
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; background-color: #0d121c; border: 1px solid #1e293b; border-radius: 18px; overflow: hidden; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);">
          
          <!-- Top Accent Gradient Line -->
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #10b981, #06b6d4, #6366f1); font-size: 0; line-height: 0;">&nbsp;</td>
          </tr>

          <!-- Header -->
          <tr>
            <td style="padding: 32px 32px 24px 32px; border-bottom: 1px solid #1e293b;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td>
                    <span style="display: inline-block; padding: 5px 12px; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; color: ${badgeColor}; background-color: ${badgeBg}; border: 1px solid ${badgeColor}33; border-radius: 9999px; text-transform: uppercase;">
                      ● ${badgeText}
                    </span>
                    <h1 style="margin: 14px 0 4px 0; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em;">
                      ${isTrip ? (data.tripTitle || "Curated Group Expedition") : (data.subject || "Collaboration Inquiry")}
                    </h1>
                    <p style="margin: 0; font-size: 12px; color: #94a3b8; font-family: monospace;">
                      ID: ${data.id} · ${formattedDate} IST
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Traveller Overview & Quick Actions -->
          <tr>
            <td style="padding: 28px 32px; background-color: #111827; border-bottom: 1px solid #1e293b;">
              <p style="margin: 0 0 6px 0; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em;">
                Inquirer Details
              </p>
              <h2 style="margin: 0 0 4px 0; font-size: 22px; font-weight: 700; color: #ffffff;">
                ${data.fullName}
              </h2>
              <p style="margin: 0 0 20px 0; font-size: 14px; color: #cbd5e1;">
                <a href="mailto:${data.email}" style="color: #38bdf8; text-decoration: none;">${data.email}</a>
                ${cleanWhatsapp ? ` · <span style="color: #94a3b8;">${data.whatsapp}</span>` : ""}
              </p>

              <!-- Quick Action CTAs -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  ${
                    whatsappLink
                      ? `
                  <td style="padding-right: 12px;">
                    <a href="${whatsappLink}" target="_blank" style="display: inline-block; padding: 10px 20px; font-size: 13px; font-weight: 700; color: #ffffff; background-color: #059669; border-radius: 10px; text-decoration: none; box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);">
                      Chat on WhatsApp →
                    </a>
                  </td>
                  `
                      : ""
                  }
                  <td>
                    <a href="mailto:${data.email}?subject=${encodeURIComponent(
                      `Re: ${data.tripTitle || "Your Travel Inquiry"} - Ashraf Siddiqui`
                    )}" style="display: inline-block; padding: 10px 20px; font-size: 13px; font-weight: 700; color: #f1f5f9; background-color: #1e293b; border: 1px solid #334155; border-radius: 10px; text-decoration: none;">
                      Reply via Email ✉
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Data Grid Table -->
          <tr>
            <td style="padding: 28px 32px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse: separate; border-spacing: 0 10px;">
                
                ${
                  data.tripTitle
                    ? `
                <tr>
                  <td width="38%" style="padding: 10px 14px; background-color: #131b2a; border-radius: 8px 0 0 8px; font-size: 12px; font-weight: 600; color: #94a3b8; text-transform: uppercase;">
                    Trip / Circuit
                  </td>
                  <td width="62%" style="padding: 10px 14px; background-color: #131b2a; border-radius: 0 8px 8px 0; font-size: 13px; font-weight: 600; color: #ffffff;">
                    ${data.tripTitle}
                  </td>
                </tr>
                `
                    : ""
                }

                ${
                  data.collabType
                    ? `
                <tr>
                  <td width="38%" style="padding: 10px 14px; background-color: #131b2a; border-radius: 8px 0 0 8px; font-size: 12px; font-weight: 600; color: #94a3b8; text-transform: uppercase;">
                    Collaboration Type
                  </td>
                  <td width="62%" style="padding: 10px 14px; background-color: #131b2a; border-radius: 0 8px 8px 0; font-size: 13px; font-weight: 600; color: #38bdf8;">
                    ${data.collabType}
                  </td>
                </tr>
                `
                    : ""
                }

                ${
                  data.travelersCount
                    ? `
                <tr>
                  <td width="38%" style="padding: 10px 14px; background-color: #131b2a; border-radius: 8px 0 0 8px; font-size: 12px; font-weight: 600; color: #94a3b8; text-transform: uppercase;">
                    Number of Travellers
                  </td>
                  <td width="62%" style="padding: 10px 14px; background-color: #131b2a; border-radius: 0 8px 8px 0; font-size: 13px; font-weight: 600; color: #ffffff;">
                    ${data.travelersCount} Person(s)
                  </td>
                </tr>
                `
                    : ""
                }

                ${
                  data.cityOfOrigin
                    ? `
                <tr>
                  <td width="38%" style="padding: 10px 14px; background-color: #131b2a; border-radius: 8px 0 0 8px; font-size: 12px; font-weight: 600; color: #94a3b8; text-transform: uppercase;">
                    Origin City
                  </td>
                  <td width="62%" style="padding: 10px 14px; background-color: #131b2a; border-radius: 0 8px 8px 0; font-size: 13px; font-weight: 600; color: #ffffff;">
                    ${data.cityOfOrigin}
                  </td>
                </tr>
                `
                    : ""
                }

                ${
                  data.dietPreference
                    ? `
                <tr>
                  <td width="38%" style="padding: 10px 14px; background-color: #131b2a; border-radius: 8px 0 0 8px; font-size: 12px; font-weight: 600; color: #94a3b8; text-transform: uppercase;">
                    Dietary Preference
                  </td>
                  <td width="62%" style="padding: 10px 14px; background-color: #131b2a; border-radius: 0 8px 8px 0; font-size: 13px; font-weight: 600; color: #ffffff;">
                    ${data.dietPreference}
                  </td>
                </tr>
                `
                    : ""
                }

                ${
                  data.gender
                    ? `
                <tr>
                  <td width="38%" style="padding: 10px 14px; background-color: #131b2a; border-radius: 8px 0 0 8px; font-size: 12px; font-weight: 600; color: #94a3b8; text-transform: uppercase;">
                    Gender
                  </td>
                  <td width="62%" style="padding: 10px 14px; background-color: #131b2a; border-radius: 0 8px 8px 0; font-size: 13px; font-weight: 600; color: #ffffff;">
                    ${data.gender}
                  </td>
                </tr>
                `
                    : ""
                }

                ${
                  data.emergencyContact
                    ? `
                <tr>
                  <td width="38%" style="padding: 10px 14px; background-color: #131b2a; border-radius: 8px 0 0 8px; font-size: 12px; font-weight: 600; color: #94a3b8; text-transform: uppercase;">
                    Emergency Phone
                  </td>
                  <td width="62%" style="padding: 10px 14px; background-color: #131b2a; border-radius: 0 8px 8px 0; font-size: 13px; font-weight: 600; color: #ffffff;">
                    ${data.emergencyContact}
                  </td>
                </tr>
                `
                    : ""
                }

                <tr>
                  <td width="38%" style="padding: 10px 14px; background-color: #131b2a; border-radius: 8px 0 0 8px; font-size: 12px; font-weight: 600; color: #94a3b8; text-transform: uppercase;">
                    Trip Safety Guidelines
                  </td>
                  <td width="62%" style="padding: 10px 14px; background-color: #131b2a; border-radius: 0 8px 8px 0; font-size: 12px; font-weight: 600; color: #10b981;">
                    ✓ Agreed to follow trip leader instructions
                  </td>
                </tr>
              </table>

              ${
                data.message
                  ? `
              <!-- Message Quotation -->
              <div style="margin-top: 20px; padding: 18px 20px; background-color: #131b2a; border-left: 3px solid #10b981; border-radius: 0 10px 10px 0;">
                <p style="margin: 0 0 6px 0; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.08em;">
                  Traveller Notes &amp; Questions:
                </p>
                <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #f1f5f9; font-style: italic;">
                  "${data.message.replace(/\n/g, "<br/>")}"
                </p>
              </div>
              `
                  : ""
              }

              <!-- Admin Link -->
              <div style="margin-top: 32px; text-align: center;">
                <a href="https://iamashraf.in/admin" style="display: inline-block; padding: 12px 28px; font-size: 13px; font-weight: 700; color: #ffffff; background-color: #1e293b; border: 1px solid #334155; border-radius: 9999px; text-decoration: none;">
                  View & Manage in Admin CMS →
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 32px; background-color: #080c14; border-top: 1px solid #1e293b; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: 600; color: #cbd5e1;">
                Delivered automatically to <span style="color: #ffffff;">${PRIMARY_DESTINATION}</span>
              </p>
              <p style="margin: 0; font-size: 11px; color: #64748b;">
                iamashraf.in · Solo Travel & Expeditions · Jaipur, Rajasthan, India
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

/**
 * Sends notification email via configured SMTP (Gmail) or Resend API
 */
export async function sendInquiryNotification(data: InquiryEmailData): Promise<{ sent: boolean; method: string; error?: string }> {
  const recipient = PRIMARY_DESTINATION;
  const isTrip = data.type === "trip_booking" || Boolean(data.tripTitle && !data.collabType);
  const subject = isTrip
    ? `🎒 New Trip Registration: ${data.fullName} - ${data.tripTitle || "Expedition"}`
    : `📩 New Collaboration Inquiry: ${data.fullName} - ${data.collabType || data.subject || "Travel"}`;

  const html = buildInquiryHtml(data);

  // 1. Channel 1: Resend REST API (if RESEND_API_KEY is configured)
  const resendApiKey = process.env.RESEND_API_KEY;
  if (resendApiKey) {
    try {
      const fromAddress = process.env.RESEND_FROM || "Ashraf Travel <onboarding@resend.dev>";
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: fromAddress,
          to: [recipient],
          subject,
          html,
          reply_to: data.email,
        }),
      });

      if (res.ok) {
        console.log(`[EmailService] Successfully sent via Resend API to ${recipient}`);
        return { sent: true, method: "resend" };
      } else {
        const errText = await res.text();
        console.warn(`[EmailService] Resend API error:`, errText);
      }
    } catch (err: any) {
      console.warn(`[EmailService] Resend exception:`, err?.message);
    }
  }

  // 2. Channel 2: Gmail SMTP / Custom SMTP (using nodemailer)
  const gmailPass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;
  const gmailUser = process.env.GMAIL_USER || process.env.SMTP_USER || recipient;

  if (gmailPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT) || 465,
        secure: true,
        auth: {
          user: gmailUser,
          pass: gmailPass,
        },
      });

      await transporter.sendMail({
        from: `"Ashraf Travel Portal" <${gmailUser}>`,
        to: recipient,
        replyTo: data.email,
        subject,
        html,
      });

      console.log(`[EmailService] Successfully sent via Gmail SMTP to ${recipient}`);
      return { sent: true, method: "gmail_smtp" };
    } catch (err: any) {
      console.error(`[EmailService] SMTP send error:`, err);
      return { sent: false, method: "gmail_smtp", error: err?.message };
    }
  }

  // 3. Fallback when credentials are not yet configured in environment:
  // The lead is still permanently stored in enquiries.json, but alert via console
  console.info(
    `[EmailService] Notice: Email not dispatched because GMAIL_APP_PASSWORD or RESEND_API_KEY is not yet in .env.local / Vercel. Lead saved to database.`
  );
  return {
    sent: false,
    method: "none",
    error: "No SMTP or Resend credentials configured. Add GMAIL_APP_PASSWORD or RESEND_API_KEY to receive emails.",
  };
}

