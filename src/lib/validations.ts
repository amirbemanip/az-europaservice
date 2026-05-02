import * as z from 'zod';

export const leadFormSchema = z.object({
  cityId: z.string().min(1, 'Bitte wählen Sie eine Stadt aus.'),
  serviceId: z.string().min(1, 'Bitte wählen Sie eine Dienstleistung aus.'),
  name: z.string().min(2, 'Name muss mindestens 2 Zeichen lang sein.'),
  phone: z.string().min(6, 'Bitte geben Sie eine gültige Telefonnummer ein.'),
  details: z.string().optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;
