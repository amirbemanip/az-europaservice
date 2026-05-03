import * as z from 'zod';

export const leadFormSchema = z.object({
  city: z.string().min(1, 'Bitte wählen Sie eine Stadt aus.'),
  service: z.string().min(1, 'Bitte wählen Sie eine Dienstleistung aus.'),
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein.'),
  name: z.string().min(2, 'Name muss mindestens 2 Zeichen lang sein.'),
  phone: z.string().optional(),
  message: z.string().optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein.'),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;
export type NewsletterData = z.infer<typeof newsletterSchema>;
