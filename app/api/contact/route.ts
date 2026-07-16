import { ContactForm } from '@/types/contact';
import { sendInquiryEmail } from '@/lib/email/sendInquiryEmail';
import { validateContact } from '@/lib/validation/contact';
import { NextResponse } from 'next/server';
import { transformContact } from '@/lib/transformer/contact';
import { createInquiry } from '@/lib/db/inquiry';
import { headers } from "next/headers";
import { contactRateLimiter } from "@/lib/rate-limit/contactRateLimiter";


export async function POST(req : Request) {
  try {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for")?.split(",")[0].trim();

    if (!ip) {
      return NextResponse.json(
        {
          success: false,
          message: "Unable to determine client identity.",
        },
        { status: 400 }
      );
    }
    const result = await contactRateLimiter.limit(ip);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Too many requests. Please try again later.",
        },
        { status: 429 }
      );
    }

    const body : unknown = await req.json();
    
    const validation = validateContact(body);

    if (!validation.valid) {
      return NextResponse.json({ success: false, message: validation.message }, { status: 400 });
    }
    const normalized = transformContact(body as ContactForm)

    await createInquiry(normalized)

    await sendInquiryEmail(normalized)
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ success: false, error: "Unable to process your request" }, { status: 500 });
  }
}