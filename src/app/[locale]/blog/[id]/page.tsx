import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getDictionary } from '@/lib/get-dictionary';

interface BlogPost {
  id: number;
  title: string;
  date: string;
  category: string;
  excerpt: string;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; id: string }> }): Promise<Metadata> {
  const { locale, id } = await params;
  const dict = await getDictionary(locale);
  const items: BlogPost[] = dict.blog?.items || [];
  const post = items.find((item) => item.id.toString() === id);

  if (!post) {
    return {
      title: `${dict.blog?.title || 'Blog'} | AZ-Europa Service GmbH`,
    };
  }

  return {
    title: `${post.title} | ${dict.blog?.title || 'Blog'}`,
    description: post.excerpt,
  };
}

export async function generateStaticParams() {
  const dict = await getDictionary('de');
  const ids = dict.blog?.items?.map((item: any) => item.id.toString()) || [];
  return ids.map((id: string) => ({ id }));
}

export default async function BlogPostPage({ params }: { params: { locale: string; id: string } }) {
  const { locale, id } = params;
  const dict = await getDictionary(locale);
  const posts: BlogPost[] = dict.blog?.items || [];
  const post = posts.find((item) => item.id.toString() === id);

  if (!post) {
    notFound();
  }

  const isRTL = locale === 'fa' || locale === 'ar';
  const blogIndexHref = locale === 'de' ? '/blog' : `/${locale}/blog`;

  return (
    <div className={`min-h-screen bg-[#f7f9fb] overflow-x-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
      <section className="relative pt-32 pb-20 bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)`, backgroundSize: '80px 80px' }} />
        <div className="max-w-screen-xl mx-auto px-6 lg:px-16 relative z-10">
          <span className={`text-[11px] font-bold tracking-[0.2em] uppercase text-[#fed01b] mb-6 block ${isRTL ? 'flex-row-reverse' : ''}`}>
            {dict.blog?.badge || 'Magazin & Ratgeber'}
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
            {post.title}
          </h1>
          <div className={`mt-6 flex flex-wrap items-center gap-4 text-[13px] text-[#bec6e0] ${isRTL ? 'flex-row-reverse' : ''}`}>
            <span>{post.category}</span>
            <span>•</span>
            <span>{post.date}</span>
          </div>
          <p className="mt-6 max-w-2xl text-lg text-[#bec6e0] leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-16">
          <div className="max-w-3xl mx-auto bg-white rounded-[10px] border border-[#e0e3e5] p-10 shadow-[0_24px_80px_rgba(0,0,0,0.08)]">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#0a0a0a] mb-4">{post.title}</h2>
              <p className="text-sm text-[#76777d] mb-6">{dict.blog?.subtitle || ''}</p>
            </div>
            <div className="prose prose-slate max-w-none text-[#45464d]">
              <p>{post.excerpt}</p>
              <p>{dict.blog?.read_more || 'Weiterlesen'}</p>
            </div>
            <Link href={blogIndexHref} className="inline-flex items-center gap-2 mt-10 text-[11px] font-bold uppercase tracking-[0.18em] text-[#0a0a0a]">
              <ArrowLeft className="w-3.5 h-3.5" />
              {dict.blog?.back_to_blog || 'Zurück zum Blog'}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
