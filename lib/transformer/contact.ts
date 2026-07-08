import { InquiryType } from "@/generated/prisma/enums";
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

function transformInquiryType(value: string): InquiryType {
  switch (value.trim()) {
    case "General Inquiry":
      return InquiryType.GENERAL;

    case "Getting an Estimate":
      return InquiryType.ESTIMATE;

    case "Update on Current Renovation":
      return InquiryType.RENOVATION_UPDATE;

    case "Contractor Inquiry":
      return InquiryType.CONTRACTOR;

    case "Job Application":
      return InquiryType.JOB_APPLICATION;

    case "Billing Question":
      return InquiryType.BILLING;

    default:
      throw new Error(`Unexpected inquiry type: ${value}`);
  }
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

    inquiry: transformInquiryType(form.inquiry),

    message: form.message.trim(),
  };
}