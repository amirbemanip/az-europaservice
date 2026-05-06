import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getDictionary } from '@/lib/get-dictionary';
import { blogPosts } from '@/data/blog';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  
  return {
    title: `${dict.blog?.title || 'Blog'} | AZ-Europa Service GmbH`,
    description: dict.blog?.subtitle || '',
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const dict = await getDictionary(locale);
  const isRTL = locale === 'fa' || locale === 'ar';

  const posts = blogPosts.map(p => ({
    id: p.id,
    slug: p.slug,
    date: new Date(p.date).toLocaleDateString(locale === 'de' ? 'de-DE' : 'en-US', { day: '2-digit', month: 'long', year: 'numeric' }),
    category: p.category,
    title: p.title[locale] || p.title['de'],
    excerpt: p.excerpt[locale] || p.excerpt['de'],
  }));

  return (
    <div className={`flex flex-col min-h-screen bg-[#f7f9fb] overflow-x-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
      
      {/* ── HERO ── */}
      <section className="relative pt-32 pb-24 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
        
        <div className="max-w-screen-xl mx-auto px-6 lg:px-16 relative z-10">
          <span className={`text-[11px] font-bold tracking-[0.2em] uppercase text-[#fed01b] mb-6 block ${isRTL ? 'flex-row-reverse' : ''}`}>
            {dict.blog?.badge || 'Magazin & Ratgeber'}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
            {dict.blog?.title_1 || 'Wissen für Ihre'} <br />
            <span className="text-[#fed01b]">{dict.blog?.title_2 || 'Immobilie.'}</span>
          </h1>
        </div>
      </section>

      {/* ── POSTS GRID ── */}
      <section className="py-24">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article key={post.id} className={`bg-white border border-[#e0e3e5] rounded-[4px] overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all group ${isRTL ? 'text-right' : ''}`}>
                <div className="h-48 bg-[#0a0a0a] relative flex items-center justify-center overflow-hidden">
                   <div className="absolute inset-0 opacity-20 bg-gradient-to-tr from-[#fed01b] to-transparent" />
                   <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-white/40">{post.category}</span>
                </div>
                <div className="p-8">
                  <div className={`flex items-center gap-4 text-[11px] text-[#76777d] font-bold tracking-[0.05em] uppercase mb-4 ${isRTL ? 'flex-row-reverse' : ''}`}>
                    <div className={`flex items-center gap-1.5 ${isRTL ? 'flex-row-reverse' : ''}`}><Calendar className="w-3.5 h-3.5" /> {post.date}</div>
                  </div>
                  <h3 className="text-xl font-bold text-[#0a0a0a] mb-4 group-hover:text-[#fed01b] transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[#45464d] leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                  <Link 
                    href={locale === 'de' ? `/blog/${post.slug}` : `/${locale}/blog/${post.slug}`} 
                    className={`inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] uppercase text-[#0a0a0a] group-hover:gap-3 transition-all ${isRTL ? 'flex-row-reverse' : ''}`}
                  >
                    {dict.blog?.read_more || 'Weiterlesen'}
                    <ArrowRight className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
