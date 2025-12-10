import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

// Get emails from env and split into array
const notificationEmails = process.env.NOTIFICATION_EMAILS?.split(',') || [];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, company } = body;

    // Validate required fields
    if (!name || !email || !company) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, and company are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Check if notification emails are configured
    if (notificationEmails.length === 0) {
      console.error('NOTIFICATION_EMAILS environment variable is not set');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Sanitize inputs to prevent XSS by escaping HTML entities
    const escapeHtml = (str: string) => {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    const result = await resend.emails.send({
      from: 'hello@caltechlongevity.com',
      to: notificationEmails,
      subject: '💸 👀 [Action Required] Caltech Longevity New Sponsor Inquiry',
      html: `
        <h2>New Sponsor Inquiry Received</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Company:</strong> ${escapeHtml(company)}</p>
      `
    });

    console.log(result);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
  }
} 