import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blog';
import { getDictionary } from '@/lib/get-dictionary';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tag, Clock, Share2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export async function generateStaticParams() {
  const locales = ['de', 'en', 'fa', 'ar', 'ru', 'uk'];
  const params = [];
  for (const locale of locales) {
    for (const post of blogPosts) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale, slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return { title: 'Post not found' };

  return {
    title: post.title[locale] || post.title['de'],
    description: post.excerpt[locale] || post.excerpt['de'],
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
  const { locale, slug } = await params;
  const post = blogPosts.find(p => p.slug === slug);
  const dict = await getDictionary(locale);

  if (!post) notFound();

  const isRTL = locale === 'fa' || locale === 'ar';
  const title = post.title[locale] || post.title['de'];
  const excerpt = post.excerpt[locale] || post.excerpt['de'];
  const content = post.content[locale] || post.content['de'];

  return (
    <article className={`min-h-screen bg-white pb-24 ${isRTL ? 'text-right' : 'text-left'}`}>
      {/* ── 1. ARTICLE HERO ── */}
      <header className="relative pt-32 pb-20 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `radial-gradient(#ffffff 0.5px, transparent 0.5px)`, backgroundSize: '32px 32px' }} />
        
        <div className="max-w-screen-xl mx-auto px-6 lg:px-16 relative z-10">
          <Link 
            href={locale === 'de' ? '/blog' : `/${locale}/blog`}
            className={`inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] uppercase text-[#7c839b] hover:text-[#fed01b] transition-colors mb-12 ${isRTL ? 'flex-row-reverse' : ''}`}
          >
            <ArrowLeft className={`w-3.5 h-3.5 ${isRTL ? 'rotate-180' : ''}`} />
            {dict.common.back || 'Zurück zur Übersicht'}
          </Link>

          <div className="max-w-3xl">
            <div className={`flex items-center gap-4 mb-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
              <span className="px-3 py-1 bg-[#fed01b] text-[#0a0a0a] text-[10px] font-black uppercase tracking-wider rounded-[2px]">
                {post.category}
              </span>
              <div className="flex items-center gap-2 text-[#565e74] text-[12px] font-medium">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(post.date).toLocaleDateString(locale === 'de' ? 'de-DE' : 'en-US', { day: '2-digit', month: 'long', year: 'numeric' })}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-[-0.03em] leading-[1.1] mb-8">
              {title}
            </h1>

            <p className="text-xl text-[#7c839b] leading-relaxed font-medium">
              {excerpt}
            </p>
          </div>
        </div>
      </header>

      {/* ── 2. FEATURED IMAGE ── */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 -mt-10 relative z-20">
        <div className="relative aspect-[21/9] w-full rounded-[4px] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.1)] bg-[#f7f9fb] border border-white/10">
          <Image 
            src={post.image} 
            alt={title} 
            fill 
            priority
            className="object-cover"
            sizes="(max-w-1280px) 100vw, 1280px"
          />
        </div>
      </div>

      {/* ── 3. CONTENT GRID ── */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-16 mt-20">
        <div className={`grid lg:grid-cols-12 gap-16 ${isRTL ? 'rtl' : ''}`}>
          
          {/* Sidebar Left: Author & Meta */}
          <aside className="lg:col-span-3 space-y-12 order-2 lg:order-1">
            <div className={`flex flex-col gap-4 ${isRTL ? 'items-end' : 'items-start'}`}>
              <div className="w-16 h-16 rounded-full bg-[#f7f9fb] border border-[#e0e3e5] flex items-center justify-center overflow-hidden">
                <User className="w-8 h-8 text-[#0a0a0a]" />
              </div>
              <div>
                <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-[#7c839b] mb-0.5">Autor</p>
                <p className="text-[15px] font-bold text-[#0a0a0a]">{post.author}</p>
                <p className="text-[12px] text-[#565e74]">SEO & Technical Strategy</p>
              </div>
            </div>

            <div className="pt-8 border-t border-[#e0e3e5]">
              <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-[#7c839b] mb-4">Teilen</p>
              <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <p className="text-[11px] text-[#565e74]">Coming soon...</p>
              </div>
            </div>
          </aside>

          {/* Main Content: Typography Focus */}
          <div className={`lg:col-span-7 order-1 lg:order-2 ${isRTL ? 'text-right' : 'text-left'}`}>
            <div className="prose prose-slate prose-lg max-w-none prose-headings:text-[#0a0a0a] prose-headings:font-black prose-headings:tracking-tight prose-p:text-[#45464d] prose-p:leading-[1.8] prose-strong:text-[#0a0a0a] prose-blockquote:border-[#fed01b] prose-blockquote:bg-[#f7f9fb] prose-blockquote:py-2 prose-img:rounded-[4px]">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>

            {/* Newsletter CTA */}
            <div className="mt-20 p-10 bg-[#f7f9fb] border border-[#e0e3e5] rounded-[4px] relative overflow-hidden">
              <div className="relative z-10 max-w-lg">
                <h3 className="text-2xl font-black text-[#0a0a0a] mb-4">Nichts mehr verpassen.</h3>
                <p className="text-[#565e74] mb-8">Erhalten Sie Experten-Tipps für Ihr Facility Management direkt in Ihr Postfach.</p>
                <form className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="E-Mail Adresse" 
                    className="flex-1 px-4 py-3 bg-white border border-[#e0e3e5] rounded-[4px] text-sm focus:outline-none focus:border-[#fed01b]"
                  />
                  <button className="px-6 py-3 bg-[#0a0a0a] text-white text-[11px] font-bold tracking-[0.1em] uppercase rounded-[4px] hover:bg-[#1e293b] transition-colors">
                    Anmelden
                  </button>
                </form>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#fed01b]/5 rounded-full blur-[60px] -mr-32 -mt-32" />
            </div>
          </div>

          {/* Sidebar Right: TOC or Related (Optional) */}
          <aside className="lg:col-span-2 hidden xl:block order-3">
             {/* Content can be added here if needed */}
          </aside>

        </div>
      </div>
    </article>
  );
}
