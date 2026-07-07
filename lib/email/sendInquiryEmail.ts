
import type { ContactForm } from "@/types/contact";
import { transporter } from "./transporter";
import { buildInquiryEmail } from "./templates";

export async function sendInquiryEmail(form: ContactForm) {
  const { subject, html } = buildInquiryEmail(form);

  await transporter.sendMail({
    from: `"HandyANDY Website" <${process.env.EMAIL_USERNAME}>`,
    to: process.env.RECEIVER_EMAIL,
    subject,
    html,
  });
}