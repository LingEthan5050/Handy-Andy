import { ContactForm } from "@/types/contact";

interface ValidationResult {
    valid: boolean,
    message?: string
}

const VALID_INQUIRIES = [
  "General Inquiry",
  "Getting an Estimate",
  "Update on Current Renovation",
  "Contractor Inquiry",
  "Job Application",
  "Billing Question",
];

export function validateContact(body : unknown ) : ValidationResult {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return {
      valid: false,
      message: "Invalid request body.",
    };
  }

  const form = body as ContactForm

  // Name
  if (!form.name?.trim()) {
    return {
      valid: false,
      message: "Name is required.",
    };
  }

  if (form.name.length > 100) {
    return {
      valid: false,
      message: "Name is too long.",
    };
  }

  // Email
  if (!form.email?.trim()) {
    return {
      valid: false,
      message: "Email is required.",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(form.email)) {
    return {
      valid: false,
      message: "Please provide a valid email address.",
    };
  }

  // Phone (optional)
  if (form.phone?.trim()) {
    const phoneRegex = /^(\+?1[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;

    if (!phoneRegex.test(form.phone)) {
      return {
        valid: false,
        message: "Please provide a valid phone number.",
      };
    }
  }

  // Inquiry
  if (!VALID_INQUIRIES.includes(form.inquiry)) {
    return {
      valid: false,
      message: "Invalid inquiry type.",
    };
  }

  // Message
  if (!form.message?.trim()) {
    return {
      valid: false,
      message: "Message is required.",
    };
  }

  if (form.message.length > 2000) {
    return {
      valid: false,
      message: "Message is too long.",
    };
  }

  return {
    valid: true,
  };
}