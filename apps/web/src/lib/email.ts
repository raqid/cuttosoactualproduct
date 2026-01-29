import { Resend } from "resend"

if (!process.env.RESEND_API_KEY) {
  console.warn("RESEND_API_KEY is not set - emails will not be sent")
}

export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

export const FROM_EMAIL = "Cuttoso Gifts <gifts@cuttoso.com>"

interface GiftEmailParams {
  recipientEmail: string
  senderName: string
  amountFormatted: string
  message?: string
  redeemUrl: string
  expiresAt: Date
}

export async function sendGiftEmail(params: GiftEmailParams): Promise<boolean> {
  if (!resend) {
    console.warn("Resend not configured - skipping email")
    return false
  }

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: params.recipientEmail,
      subject: `You've received a gift from ${params.senderName}!`,
      html: generateGiftEmailHtml(params),
    })
    return true
  } catch (err) {
    console.error("Failed to send gift email:", err)
    return false
  }
}

interface PurchaseNotificationParams {
  ownerEmail: string
  wishlistTitle: string
}

export async function sendPurchaseNotificationEmail(params: PurchaseNotificationParams): Promise<boolean> {
  if (!resend) return false
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: params.ownerEmail,
      subject: "Someone bought you a gift!",
      html: `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background-color:#f9fafb;"><table role="presentation" style="width:100%;border-collapse:collapse;"><tr><td style="padding:40px 20px;"><table role="presentation" style="max-width:600px;margin:0 auto;background-color:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);"><tr><td style="background:linear-gradient(to right,#dc2626,#ec4899);padding:40px 30px;text-align:center;"><h1 style="color:white;margin:0;font-size:28px;">Someone bought you a gift!</h1></td></tr><tr><td style="padding:40px 30px;"><p style="font-size:18px;color:#374151;margin:0 0 20px 0;">A gift from your <strong>"${params.wishlistTitle}"</strong> wishlist has been purchased!</p><p style="font-size:16px;color:#6b7280;">We won't tell you which one — it's a surprise!</p></td></tr><tr><td style="background-color:#f9fafb;padding:20px 30px;text-align:center;border-top:1px solid #e5e7eb;"><p style="margin:0;font-size:14px;color:#9ca3af;">Cuttoso - Discover Meaningful Gifts from American Makers</p></td></tr></table></td></tr></table></body></html>`,
    })
    return true
  } catch (err) {
    console.error("Failed to send purchase notification email:", err)
    return false
  }
}

interface ReferralInviteParams {
  recipientEmail: string
  senderName: string
  referralUrl: string
}

export async function sendReferralInviteEmail(params: ReferralInviteParams): Promise<boolean> {
  if (!resend) return false
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: params.recipientEmail,
      subject: `${params.senderName} invited you to Cuttoso!`,
      html: `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background-color:#f9fafb;"><table role="presentation" style="width:100%;border-collapse:collapse;"><tr><td style="padding:40px 20px;"><table role="presentation" style="max-width:600px;margin:0 auto;background-color:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 6px rgba(0,0,0,0.1);"><tr><td style="background:linear-gradient(to right,#1e40af,#7c3aed);padding:40px 30px;text-align:center;"><h1 style="color:white;margin:0;font-size:28px;">You're Invited!</h1></td></tr><tr><td style="padding:40px 30px;"><p style="font-size:18px;color:#374151;margin:0 0 20px 0;"><strong>${params.senderName}</strong> thinks you'd love Cuttoso — the best place to discover and gift products from American makers.</p><div style="text-align:center;margin:30px 0;"><a href="${params.referralUrl}" style="display:inline-block;background:linear-gradient(to right,#1e40af,#7c3aed);color:white;padding:16px 32px;text-decoration:none;border-radius:8px;font-weight:bold;font-size:16px;">Join Cuttoso</a></div></td></tr><tr><td style="background-color:#f9fafb;padding:20px 30px;text-align:center;border-top:1px solid #e5e7eb;"><p style="margin:0;font-size:14px;color:#9ca3af;">Cuttoso - Discover Meaningful Gifts from American Makers</p></td></tr></table></td></tr></table></body></html>`,
    })
    return true
  } catch (err) {
    console.error("Failed to send referral invite email:", err)
    return false
  }
}

function generateGiftEmailHtml(params: GiftEmailParams): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>You've Received a Gift!</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(to right, #dc2626, #ec4899); padding: 40px 30px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">
                You've Received a Gift!
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="font-size: 18px; color: #374151; margin: 0 0 20px 0;">
                <strong>${params.senderName}</strong> sent you <strong style="color: #dc2626;">${params.amountFormatted}</strong> in Cuttoso gift credits!
              </p>

              ${params.message ? `
              <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0; font-style: italic; color: #4b5563;">
                  "${params.message}"
                </p>
              </div>
              ` : ""}

              <p style="font-size: 16px; color: #6b7280; margin: 20px 0;">
                Redeem your gift to discover amazing products from American makers.
              </p>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${params.redeemUrl}" style="display: inline-block; background: linear-gradient(to right, #dc2626, #ec4899); color: white; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                  Redeem Your Gift
                </a>
              </div>

              <p style="font-size: 14px; color: #9ca3af; margin: 20px 0 0 0; text-align: center;">
                This gift expires on ${params.expiresAt.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 20px 30px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-size: 14px; color: #9ca3af;">
                Cuttoso - Discover Meaningful Gifts from American Makers
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}
