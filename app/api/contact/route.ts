import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, phone, message, inquiryType } = await req.json();

    const emojiMap: Record<string, string> = {
      'Getting an Estimate':         '📐',
      'Update on Current Renovation': '🚧',
      'General Inquiry':              '💬',
      'Contractor Inquiry':           '🧰',
      'Job Application':              '👷',
      'Billing Question':             '💳',
    };
    const emoji = emojiMap[inquiryType] ?? '📩';

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"HandyAndy Website" <${process.env.EMAIL_USERNAME}>`,
      to:   process.env.RECEIVER_EMAIL,
      subject: `${emoji} New Inquiry: ${inquiryType} | From: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; padding: 24px; max-width: 600px;
                    margin: auto; border: 1px solid #eee; border-radius: 10px;">

          <div style="background:#1a1a1a; padding:20px 24px; border-radius:8px 8px 0 0;
                      margin:-24px -24px 24px;">
            <h2 style="color:#c65b37; margin:0 0 4px; font-size:20px;">New Website Inquiry</h2>
            <p  style="color:#aaa; margin:0; font-size:13px;">HandyANDY Home Repair</p>
          </div>

          <table style="width:100%; border-collapse:collapse; margin-bottom:20px;">
            ${[
              ['Inquiry Type', inquiryType],
              ['Name',         name],
              ['Email',        `<a href="mailto:${email}" style="color:#c65b37;">${email}</a>`],
              ['Phone',        phone || 'N/A'],
            ].map(([label, value]) => `
              <tr style="border-bottom:1px solid #f0f0f0;">
                <td style="padding:10px 8px; font-weight:600; font-size:13px; width:130px; color:#555;">
                  ${label}
                </td>
                <td style="padding:10px 8px; font-size:13px;">${value}</td>
              </tr>
            `).join('')}
          </table>

          <p style="font-weight:600; margin-bottom:8px; font-size:13px; color:#555;">Message</p>
          <div style="background:#f9f9f9; padding:16px; border-radius:6px; border:1px solid #e8e8e8;
                      font-size:14px; line-height:1.6;">
            ${message.replace(/\n/g, '<br>')}
          </div>

          <p style="margin-top:24px; font-size:11px; color:#aaa; border-top:1px solid #f0f0f0;
                    padding-top:16px;">
            Sent from the HandyANDY website contact form.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
