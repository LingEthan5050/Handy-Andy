import type { ContactForm, ContactInquiry } from "@/types/contact";

function collapseWhitespace(text: string): string {
  return text.trim().replace(/\s+/g, " ");
}

function titleCase(text: string): string {
  return text
    .toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function transformContact(form: ContactForm): ContactInquiry {
  return {
    name: titleCase(collapseWhitespace(form.name)),

    email: form.email
      .trim()
      .toLowerCase(),

    phone: form.phone
      ? form.phone.replace(/\D/g, "")
      : "",

    inquiry: form.inquiry.trim(),

    message: form.message.trim(),
  };
}