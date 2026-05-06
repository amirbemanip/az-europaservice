"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Briefcase, Mail, ArrowRight, ArrowLeft, CheckCircle2, Loader2, Lock, Clock } from 'lucide-react';
import { z } from 'zod';

export function SmartLeadForm({ 
  locale, 
  dict,
  initialCity = '',
  initialService = ''
}: { 
  locale: string; 
  dict: any;
  initialCity?: string;
  initialService?: string;
}) {
  const [step, setStep] = useState(initialCity && initialService ? 3 : initialCity ? 2 : 1);
  const [formData, setFormData] = useState({ 
    city: initialCity || '', 
    service: initialService || '', 
    email: '', 
    name: '', 
    phone: '', 
    message: '' 
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submissionError, setSubmissionError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isRTL = locale === 'fa' || locale === 'ar';

  const formSchema = z.object({
    city: z.string().min(1, dict.form.validation.city),
    service: z.string().min(1, dict.form.validation.service),
    email: z.string().email(dict.form.validation.email),
    name: z.string().min(2, dict.form.validation.name),
    phone: z.string().optional(),
    message: z.string().optional(),
  });

  const stepMeta = [
    { icon: MapPin, title: dict.form.steps.location.title, subtitle: dict.form.steps.location.subtitle },
    { icon: Briefcase, title: dict.form.steps.service.title, subtitle: dict.form.steps.service.subtitle },
    { icon: Mail, title: dict.form.steps.contact.title, subtitle: dict.form.steps.contact.subtitle },
  ];

  const cities = dict.form.cities;
  const services = dict.form.services;

  const handleNext = () => {
    let stepErrors: Record<string, string> = {};
    if (step === 1 && !formData.city) stepErrors = { city: dict.form.validation.city };
    if (step === 2 && !formData.service) stepErrors = { service: dict.form.validation.service };
    if (Object.keys(stepErrors).length > 0) { setErrors(stepErrors); return; }
    setErrors({});
    setStep(s => s + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = formSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue: z.ZodIssue) => {
        if (issue.path[0]) fieldErrors[issue.path[0].toString()] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setSubmissionError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      });

      const payload = await response.json().catch(() => null);

      if (!response.ok) {
        if (payload?.errors) {
          const fieldErrors: Record<string, string> = {};
          if (payload.errors.fieldErrors) {
            Object.assign(fieldErrors, payload.errors.fieldErrors);
          }
          setErrors(fieldErrors);
        }

        throw new Error(payload?.message || 'Fehler beim Senden der Anfrage.');
      }

      if (typeof window !== 'undefined' && (window as any).dataLayer) {
        (window as any).dataLayer.push({
          event: 'lead_form_success',
          city: formData.city,
          service: formData.service,
        });
      }

      setStep(4);
    } catch (error: any) {
      setSubmissionError(error?.message || 'Fehler beim Senden der Anfrage.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`w-full bg-white rounded-[6px] shadow-[0_24px_80px_rgba(0,0,0,0.12)] border border-[#e0e3e5] overflow-hidden relative ${isRTL ? 'text-right' : 'text-left'}`}>

      {/* ── STEP INDICATOR ── */}
      <div className="bg-[#f7f9fb] border-b border-[#e0e3e5] px-6 py-4">
        <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          {stepMeta.map((s, i) => {
            const StepIcon = s.icon;
            const isActive = step === i + 1;
            const isDone = step > i + 1;
            return (
              <React.Fragment key={i}>
                {i > 0 && (
                  <div className={`flex-1 h-px transition-colors duration-500 ${isDone ? 'bg-[#fed01b]' : 'bg-[#e0e3e5]'}`} />
                )}
                <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-400 text-xs font-bold ${
                    isDone ? 'bg-[#fed01b] text-[#0a0a0a]' :
                    isActive ? 'bg-[#0a0a0a] text-white' :
                    'bg-[#e0e3e5] text-[#76777d]'
                  }`}>
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : <StepIcon className="w-3.5 h-3.5" />}
                  </div>
                  <span className={`hidden sm:block text-[11px] font-semibold tracking-[0.04em] transition-colors whitespace-nowrap ${
                    isActive ? 'text-[#0a0a0a]' : 'text-[#76777d]'
                  }`}>{s.title}</span>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ── PROGRESS BAR ── */}
      <div className="h-[3px] bg-[#e0e3e5]">
        <motion.div
          className="h-full bg-[#fed01b]"
          initial={{ width: '0%' }}
          animate={{ width: `${(Math.min(step, 3) / 3) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>

      {/* ── FORM BODY ── */}
      <div className="p-6 sm:p-8">
        <AnimatePresence mode="wait">

          {/* ── STEP 1: LOCATION ── */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
              <h3 className="text-xl font-bold text-[#0a0a0a] mb-1">{dict.form.steps.location.subtitle}</h3>
              <p className="text-sm text-[#76777d] mb-6">{dict.form.steps.location.desc}</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {cities.map((city: string) => (
                  <button
                    key={city}
                    onClick={() => { setFormData({...formData, city}); setErrors({}); }}
                    className={`px-4 py-3.5 rounded-[4px] text-[13px] font-semibold transition-all duration-250 border ${isRTL ? 'text-right' : 'text-left'} ${
                      formData.city === city
                      ? 'border-[#0a0a0a] bg-[#0a0a0a] text-white shadow-[0_4px_12px_rgba(19,27,46,0.2)]'
                      : 'border-[#e0e3e5] bg-white text-[#45464d] hover:border-[#0a0a0a]/40 hover:bg-[#f7f9fb]'
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>

              {errors.city && <p className={`text-red-600 text-xs mt-3 font-semibold flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}><span>⚠</span> {errors.city}</p>}

              <button onClick={handleNext} className={`mt-6 w-full py-3.5 bg-[#0a0a0a] text-white text-[12px] font-bold tracking-[0.06em] uppercase rounded-[4px] hover:bg-[#1e293b] transition-colors flex items-center justify-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                {dict.form.buttons.next}
                <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
              </button>
            </motion.div>
          )}

          {/* ── STEP 2: SERVICE ── */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
              <h3 className="text-xl font-bold text-[#0a0a0a] mb-1">{dict.form.steps.service.subtitle}</h3>
              <p className="text-sm text-[#76777d] mb-6">{dict.form.steps.service.desc}</p>

              <div className="grid grid-cols-2 gap-2.5">
                {services.map((service: string) => (
                  <button
                    key={service}
                    onClick={() => { setFormData({...formData, service}); setErrors({}); }}
                    className={`px-4 py-3.5 rounded-[4px] text-[13px] font-semibold transition-all duration-250 border ${isRTL ? 'text-right' : 'text-left'} ${
                      formData.service === service
                      ? 'border-[#0a0a0a] bg-[#0a0a0a] text-white shadow-[0_4px_12px_rgba(19,27,46,0.2)]'
                      : 'border-[#e0e3e5] bg-white text-[#45464d] hover:border-[#0a0a0a]/40 hover:bg-[#f7f9fb]'
                    }`}
                  >
                    {service}
                  </button>
                ))}
              </div>

              {errors.service && <p className={`text-red-600 text-xs mt-3 font-semibold flex items-center gap-1 ${isRTL ? 'flex-row-reverse' : ''}`}><span>⚠</span> {errors.service}</p>}

              <div className={`flex gap-3 mt-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <button onClick={() => setStep(1)} className={`flex items-center gap-1.5 px-5 py-3.5 text-[12px] font-bold tracking-[0.04em] text-[#76777d] hover:text-[#0a0a0a] border border-[#e0e3e5] rounded-[4px] transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <ArrowLeft className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                  {dict.form.buttons.prev}
                </button>
                <button onClick={handleNext} className={`flex-1 py-3.5 bg-[#0a0a0a] text-white text-[12px] font-bold tracking-[0.06em] uppercase rounded-[4px] hover:bg-[#1e293b] transition-colors flex items-center justify-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  {dict.form.buttons.next}
                  <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                </button>
              </div>
            </motion.div>
          )}

          {/* ── STEP 3: CONTACT ── */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
              <h3 className="text-xl font-bold text-[#0a0a0a] mb-1">{dict.form.steps.contact.subtitle}</h3>
              <p className="text-sm text-[#76777d] mb-6">{dict.form.steps.contact.desc}</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold tracking-[0.06em] uppercase text-[#76777d] mb-1.5">{dict.form.fields.name}</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className={`w-full px-4 py-3 rounded-[4px] border border-[#e0e3e5] bg-[#f7f9fb] text-[14px] text-[#0a0a0a] placeholder:text-[#b0b0b0] focus:outline-none focus:border-[#0a0a0a] focus:bg-white focus:shadow-[0_0_0_3px_rgba(19,27,46,0.06)] transition-all ${isRTL ? 'text-right' : 'text-left'}`}
                      placeholder={dict.form.fields.name_placeholder}
                    />
                    {errors.name && <p className="text-red-600 text-[11px] mt-1.5 font-semibold">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold tracking-[0.06em] uppercase text-[#76777d] mb-1.5">{dict.form.fields.phone}</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className={`w-full px-4 py-3 rounded-[4px] border border-[#e0e3e5] bg-[#f7f9fb] text-[14px] text-[#0a0a0a] placeholder:text-[#b0b0b0] focus:outline-none focus:border-[#0a0a0a] focus:bg-white focus:shadow-[0_0_0_3px_rgba(19,27,46,0.06)] transition-all ${isRTL ? 'text-right' : 'text-left'}`}
                      placeholder={dict.form.fields.phone_placeholder}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold tracking-[0.06em] uppercase text-[#76777d] mb-1.5">{dict.form.fields.email}</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className={`w-full px-4 py-3 rounded-[4px] border border-[#e0e3e5] bg-[#f7f9fb] text-[14px] text-[#0a0a0a] placeholder:text-[#b0b0b0] focus:outline-none focus:border-[#0a0a0a] focus:bg-white focus:shadow-[0_0_0_3px_rgba(19,27,46,0.06)] transition-all ${isRTL ? 'text-right' : 'text-left'}`}
                    placeholder={dict.form.fields.email_placeholder}
                  />
                  {errors.email && <p className="text-red-600 text-[11px] mt-1.5 font-semibold">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-[11px] font-bold tracking-[0.06em] uppercase text-[#76777d] mb-1.5">{dict.form.fields.message}</label>
                  <textarea
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-[4px] border border-[#e0e3e5] bg-[#f7f9fb] text-[14px] text-[#0a0a0a] placeholder:text-[#b0b0b0] focus:outline-none focus:border-[#0a0a0a] focus:bg-white focus:shadow-[0_0_0_3px_rgba(19,27,46,0.06)] transition-all resize-none ${isRTL ? 'text-right' : 'text-left'}`}
                    placeholder={dict.form.fields.message_placeholder}
                  />
                </div>

                <div className={`flex gap-3 pt-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <button type="button" onClick={() => setStep(2)} className={`flex items-center gap-1.5 px-5 py-3.5 text-[12px] font-bold tracking-[0.04em] text-[#76777d] hover:text-[#0a0a0a] border border-[#e0e3e5] rounded-[4px] transition-colors ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <ArrowLeft className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                    {dict.form.buttons.prev}
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`flex-1 py-3.5 bg-[#fed01b] text-[#0a0a0a] text-[12px] font-bold tracking-[0.06em] uppercase rounded-[4px] hover:bg-[#eec200] hover:shadow-[0_8px_24px_rgba(254,208,27,0.3)] transition-all flex items-center justify-center gap-2 disabled:opacity-60 ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {dict.form.buttons.submitting}
                      </>
                    ) : (
                      <>
                        {dict.form.buttons.submit}
                        <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                      </>
                    )}
                  </button>
                </div>

                {/* Trust bar */}
                <div className={`flex flex-wrap items-center justify-center gap-5 pt-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex items-center gap-1.5 text-[10px] text-[#b0b0b0] font-medium ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Lock className="w-3 h-3" />
                    {dict.form.trust.ssl}
                  </div>
                  <div className={`flex items-center gap-1.5 text-[10px] text-[#b0b0b0] font-medium ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <CheckCircle2 className="w-3 h-3" />
                    {dict.form.trust.gdpr}
                  </div>
                  <div className={`flex items-center gap-1.5 text-[10px] text-[#b0b0b0] font-medium ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <Clock className="w-3 h-3" />
                    {dict.form.trust.response}
                  </div>
                </div>
              </form>
            </motion.div>
          )}

          {/* ── STEP 4: SUCCESS ── */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, ease: 'easeOut' }} className="text-center py-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-5 border border-green-100"
              >
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              </motion.div>
              <h3 className="text-2xl font-black text-[#0a0a0a] mb-3">{dict.form.success.title}</h3>
              <p className="text-[15px] text-[#76777d] leading-relaxed max-w-sm mx-auto mb-6">
                {dict.form.success.desc}
              </p>
              <div className={`inline-flex items-center gap-2 px-4 py-2 bg-[#f2f4f6] border border-[#e0e3e5] rounded-[4px] ${isRTL ? 'flex-row-reverse' : ''}`}>
                <span className="text-[12px] font-semibold text-[#0a0a0a]">{formData.city}</span>
                <span className="text-[10px] text-[#b0b0b0]">→</span>
                <span className="text-[12px] font-semibold text-[#0a0a0a]">{formData.service}</span>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
