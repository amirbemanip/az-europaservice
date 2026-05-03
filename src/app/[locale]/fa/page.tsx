import React from 'react';
import dynamic from 'next/dynamic';
const SmartLeadForm = dynamic(() => import('@/components/SmartLeadForm').then(mod => mod.SmartLeadForm), { ssr: false });
import { ShieldCheck, Zap, Phone, Star, CheckCircle2 } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'خدمات حرفه‌ای نظافت و تاسیسات در آلمان | AZ-Europa Service',
  description: 'ارائه کلیه خدمات نظافت منازل و دفاتر، خدمات سرایداری و نوسازی در ایالت بایرن (ارلانگن، نورنبرگ، بامبرگ). مشاوره رایگان به زبان فارسی.',
};

export default function PersianPillarPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white overflow-x-hidden">
      
      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#fed01b]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-screen-xl mx-auto px-6 lg:px-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="text-right">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fed01b]/10 border border-[#fed01b]/20 text-[#fed01b] text-xs font-bold tracking-wide mb-6">
                <Zap className="w-3.5 h-3.5" />
                خدمات تخصصی در ایالت بایرن
              </span>
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8">
                خدمات حرفه‌ای <br />
                <span className="text-[#fed01b]">نظافت و تاسیسات</span>
              </h1>
              <p className="text-xl text-[#7c839b] leading-relaxed mb-10">
                مجموعه AZ-Europa Service با سال‌ها تجربه در آلمان، اکنون آماده ارائه خدمات ویژه به فارسی‌زبانان عزیز در شهرهای ارلانگن، نورنبرگ و بامبرگ است. کیفیت آلمانی، همراه با پشتیبانی فارسی.
              </p>
              
              <div className="flex flex-wrap justify-end gap-6">
                <div className="flex items-center gap-3 text-white font-bold">
                  <span>تضمین قیمت ثابت</span>
                  <CheckCircle2 className="text-[#fed01b] w-5 h-5" />
                </div>
                <div className="flex items-center gap-3 text-white font-bold">
                  <span>تیم متخصص و مجرب</span>
                  <CheckCircle2 className="text-[#fed01b] w-5 h-5" />
                </div>
              </div>
            </div>

            <div className="w-full max-w-lg mx-auto lg:mr-auto">
              <div className="bg-[#f7f9fb] p-1 rounded-2xl shadow-2xl border border-white/10">
                <div className="p-6 bg-white rounded-xl">
                  <h3 className="text-xl font-bold text-[#0a0a0a] mb-2 text-center">دریافت مشاوره رایگان (فارسی)</h3>
                  <p className="text-sm text-[#76777d] mb-6 text-center">فرم زیر را پر کنید تا در کمتر از ۲ ساعت با شما تماس بگیریم.</p>
                  <SmartLeadForm locale="fa" dict={{
                    form: {
                      steps: {
                        location: { title: 'Standort', subtitle: 'کجا نیاز دارید؟', desc: 'محل ارائه خدمات را انتخاب کنید.' },
                        service: { title: 'خدمت', subtitle: 'چه خدماتی لازم دارید؟', desc: 'خدمت مورد نظر خود را انتخاب کنید.' },
                        contact: { title: 'تماس', subtitle: 'چگونه با شما تماس بگیریم؟', desc: 'اطلاعات تماس خود را وارد کنید.' }
                      },
                      cities: ['Erlangen', 'Nürnberg', 'Bamberg', 'Fürth', 'Andere Region'],
                      services: ['نظافت', 'خدمات سرایداری', 'نوسازی', 'تخلیه', 'فضای سبز', 'ساختمان'],
                      buttons: { next: 'بعدی', prev: 'بازگشت', submit: 'ارسال درخواست', submitting: 'در حال ارسال...' },
                      trust: { ssl: 'SSL رمزگذاری شده', gdpr: 'مطابق GDPR', response: 'پاسخ طی ۲ ساعت' },
                      validation: { city: 'لطفاً مکان را انتخاب کنید', service: 'لطفاً خدمت را انتخاب کنید', email: 'ایمیل معتبر وارد کنید', name: 'لطفاً نام خود را وارد کنید' }
                    }
                  }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="py-24 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-[#0a0a0a] mb-6">چرا AZ-Europa Service؟</h2>
            <p className="text-[#76777d] max-w-2xl mx-auto">ما استانداردهای سخت‌گیرانه آلمان را با درک نیازهای فرهنگی و زبانی شما ترکیب کرده‌ایم.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-right">
            {[
              {
                title: 'پشتیبانی فارسی',
                desc: 'دیگر نگران موانع زبانی نباشید. مدیریت و تیم پشتیبانی ما به زبان فارسی با شما در ارتباط خواهند بود.',
                icon: ShieldCheck
              },
              {
                title: 'سرعت در اجرا',
                desc: 'حضور فعال در قلب بایرن به ما این امکان را می‌دهد که در کوتاه‌ترین زمان ممکن در محل شما حاضر شویم.',
                icon: Zap
              },
              {
                title: 'رضایت ۱۰۰٪',
                desc: 'بیش از ۱۵۰۰ پروژه موفق در منطقه و امتیاز کامل در گوگل، گواه کیفیت خدمات ماست.',
                icon: Star
              }
            ].map((item, i) => (
              <div key={i} className="p-8 border border-[#e0e3e5] rounded-2xl hover:border-[#fed01b] transition-all">
                <div className="w-14 h-14 bg-[#f7f9fb] rounded-xl flex items-center justify-center mb-6 mr-0 ml-auto">
                  <item.icon className="w-7 h-7 text-[#0a0a0a]" />
                </div>
                <h4 className="text-xl font-bold text-[#0a0a0a] mb-4">{item.title}</h4>
                <p className="text-[#76777d] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES SUMMARY ── */}
      <section className="py-24 bg-[#f7f9fb]">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
               <div className="grid grid-cols-2 gap-4">
                  {[
                    'نظافت منازل و دفاتر',
                    'خدمات سرایداری',
                    'نوسازی و بازسازی',
                    'باغبانی و فضای سبز',
                    'تخلیه و اسباب‌کشی',
                    'تخریب حرفه‌ای'
                  ].map((s, i) => (
                    <div key={i} className="p-4 bg-white border border-[#e0e3e5] rounded-lg flex items-center justify-between">
                       <CheckCircle2 className="text-[#fed01b] w-4 h-4" />
                       <span className="font-bold text-[#0a0a0a]">{s}</span>
                    </div>
                  ))}
               </div>
            </div>
            <div className="order-1 lg:order-2 text-right">
              <h2 className="text-3xl md:text-5xl font-black text-[#0a0a0a] mb-8">خدمات جامع در یک نگاه</h2>
              <p className="text-lg text-[#45464d] leading-relaxed mb-8">
                ما تمامی خدمات مربوط به ملک شما را از صفر تا صد پوشش می‌دهیم. از نظافت روزانه تا بازسازی‌های کلی، تیم متخصص ما با تجهیزات مدرن در کنار شماست.
              </p>
              <div className="inline-flex items-center gap-4 bg-[#0a0a0a] p-4 rounded-xl text-white">
                <Phone className="w-6 h-6 text-[#fed01b]" />
                <div className="text-right">
                  <p className="text-[10px] font-bold text-[#7c839b] mb-1">تماس مستقیم با بخش فارسی</p>
                  <p className="text-xl font-bold">۰۱۷۶ ۶۲۴۹۴۴۰۱</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
