import { ContactForm } from '@/types/contact';
import { sendInquiryEmail } from '@/lib/email/sendInquiryEmail';
import { validateContact } from '@/lib/validation/contact';
import { NextResponse } from 'next/server';
import { transformContact } from '@/lib/transformer/contact';


export async function POST(req : Request) {
  try {
    const body : unknown = await req.json();

    // TODO: Add middleware functions here
    
    const validation = validateContact(body);

    if (!validation.valid) {
      return NextResponse.json({ success: false, message: validation.message }, { status: 400 });
    }
    const normalized = transformContact(body as ContactForm)

    // TODO: Save to database here

    await sendInquiryEmail(normalized)
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ success: false, error: "Unable to process your request" }, { status: 500 });
  }
}