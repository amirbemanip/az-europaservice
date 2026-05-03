import { NextResponse } from 'next/server';
import { leadFormSchema } from '@/lib/validations';
import type { LeadFormData } from '@/lib/validations';

// Simple in-memory rate limiter (per-IP). For serverless or multi-instance
// deployments this should be replaced with a shared store (Redis).
type RateEntry = { count: number; firstTs: number };
const RATE_MAP: Map<string, RateEntry> = new Map();
const RATE_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT = 5; // allow 5 submissions per window per IP

async function sendEmailIfConfigured(data: LeadFormData) {
  const resendKey = process.env.RESEND_API_KEY;
  const resendFrom = process.env.RESEND_FROM ?? 'no-reply@az-europaservice.de';
  const resendTo = process.env.RESEND_TO ?? 'info@az-europaservice.de';

  if (!resendKey) {
    console.warn('RESEND_API_KEY is not configured. Lead email will not be sent.');
    return null;
  }

  const subject = `Neue Lead-Anfrage von ${data.name}`;
  const html = `
    <h1>Neue Lead-Anfrage</h1>
    <p><strong>Stadt:</strong> ${data.city}</p>
    <p><strong>Service:</strong> ${data.service}</p>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>E-Mail:</strong> ${data.email}</p>
    <p><strong>Telefon:</strong> ${data.phone || 'Nicht angegeben'}</p>
    <p><strong>Nachricht:</strong> ${data.message || 'Keine Nachricht angegeben'}</p>
  `;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: resendFrom,
      to: [resendTo],
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
    // Rate limit check
    try {
      const forwarded = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || req.headers.get('x-realip');
      const ip = forwarded ? forwarded.split(',')[0].trim() : 'unknown';
      const now = Date.now();
      const entry = RATE_MAP.get(ip);
      if (!entry) {
        RATE_MAP.set(ip, { count: 1, firstTs: now });
      } else {
        if (now - entry.firstTs > RATE_WINDOW_MS) {
          RATE_MAP.set(ip, { count: 1, firstTs: now });
        } else {
          if (entry.count >= RATE_LIMIT) {
            return NextResponse.json({ message: 'Zu viele Anfragen, bitte später erneut versuchen.' }, { status: 429 });
          }
          entry.count += 1;
          RATE_MAP.set(ip, entry);
        }
      }
    } catch (e) {
      // If rate limiter check fails for some reason, continue processing.
    }

    const body = await req.json();
    const result = leadFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: 'Ungültige Daten', errors: result.error.flatten() },
        { status: 400 }
      );
    }

    const leadData = result.data;

    console.log('--- NEW LEAD RECEIVED ---');
    console.log(JSON.stringify(leadData, null, 2));

    try {
      await sendEmailIfConfigured(leadData);
    } catch (error) {
      console.error('Lead email error:', error);
      return NextResponse.json(
        { message: 'Lead empfangen, aber Email-Versand fehlgeschlagen.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ message: 'Anfrage erfolgreich gesendet' }, { status: 200 });
  } catch (error) {
    console.error('Lead processing error:', error);
    return NextResponse.json(
      { message: 'Interner Serverfehler' },
      { status: 500 }
    );
  }
}
