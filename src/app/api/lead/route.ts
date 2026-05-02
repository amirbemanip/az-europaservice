import { NextResponse } from 'next/server';
import { leadFormSchema } from '@/lib/validations';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Server-side validation using Zod
    const result = leadFormSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { message: 'Ungültige Daten', errors: result.error.flatten() },
        { status: 400 }
      );
    }

    const { cityId, serviceId, name, phone, details } = result.data;

    // TODO: Connect to CRM, DB, or Email Service (e.g., SendGrid, Resend)
    // For now, we simulate a delay and log it
    console.log('--- NEW LEAD RECEIVED ---');
    console.log(`City: ${cityId}`);
    console.log(`Service: ${serviceId}`);
    console.log(`Name: ${name}`);
    console.log(`Phone: ${phone}`);
    console.log(`Details: ${details}`);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ message: 'Anfrage erfolgreich gesendet' }, { status: 200 });
  } catch (error) {
    console.error('Lead processing error:', error);
    return NextResponse.json(
      { message: 'Interner Serverfehler' },
      { status: 500 }
    );
  }
}
