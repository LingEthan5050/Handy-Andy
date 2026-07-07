// The raw untouched user's ContactForm
export interface ContactForm {
    inquiry: string;
    name: string;
    email: string;
    phone: string;
    message: string;
}

// The cleaned version of ContactForm
export interface ContactInquiry {
    inquiry: string;
    name: string;
    email: string;
    phone: string;
    message: string;
}