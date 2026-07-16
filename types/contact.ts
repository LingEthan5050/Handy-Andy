import { InquiryType } from "@/generated/prisma/enums";

// The raw untouched user's ContactForm
export interface ContactForm {
    inquiry: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    
    reason?: string;
}

// The cleaned version of ContactForm
export interface ContactInquiry {
    inquiry: InquiryType;
    name: string;
    email: string;
    phone: string;
    message: string;
}