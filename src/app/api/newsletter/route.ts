import { NextResponse } from 'next/server';
import { newsletterSchema } from '@/lib/validations';

async function sendNewsletterNotification(email: string) {
  const resendKey = process.env.RESEND_API_KEY;
  const resendFrom = process.env.RESEND_FROM ?? 'no-reply@az-europaservice.de';
  const newsletterRecipient = process.env.NEWSLETTER_TO ?? process.env.RESEND_TO ?? 'info@az-europaservice.de';

  if (!resendKey) {
    console.warn('RESEND_API_KEY is not configured. Newsletter subscription email will not be sent.');
    return null;
  }

  const subject = `Neue Newsletter-Anmeldung`;
  const html = `
    <h1>Neue Newsletter-Anmeldung</h1>
    <p><strong>E-Mail:</strong> ${email}</p>
    <p>Absender: ${newsletterRecipient}</p>
  `;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: resendFrom,
      to: [newsletterRecipient],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const payload = await response.text();
    throw new Error(`Mail service responded with ${response.status}: ${payload}`);
  }

  return response;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = newsletterSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: 'Ungültige E-Mail-Adresse', errors: result.error.flatten() },
        { status: 400 }
      );
    }

    const { email } = result.data;
    console.log('--- NEWSLETTER SUBSCRIPTION ---');
    console.log(`Email: ${email}`);

    try {
      await sendNewsletterNotification(email);
    } catch (error) {
      console.error('Newsletter email error:', error);
      return NextResponse.json(
        { message: 'Anmeldung erhalten, aber Benachrichtigung konnte nicht gesendet werden.' },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { message: 'Newsletter-Anmeldung erfolgreich erhalten.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter processing error:', error);
    return NextResponse.json(
      { message: 'Interner Serverfehler' },
      { status: 500 }
    );
  }
}
