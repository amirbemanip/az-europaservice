import * as React from 'react';
import { cn } from '@/lib/utils';
import { Star, MapPin } from 'lucide-react';
import { Testimonial } from '@/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-300',
        className
      )}
    >
      <div className="flex text-brand-yellow">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={cn(
              'h-5 w-5',
              i < testimonial.rating ? 'fill-current' : 'text-slate-300'
            )}
          />
        ))}
      </div>
      
      <p className="text-brand-slate italic flex-grow">
        "{testimonial.content}"
      </p>
      
      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
        <span className="font-bold text-brand-navy">{testimonial.author}</span>
        <div className="flex items-center text-xs font-medium text-slate-500 gap-1 bg-slate-50 px-2 py-1 rounded-full">
          <MapPin className="h-3 w-3" />
          <span className="capitalize">{testimonial.cityId}</span>
        </div>
      </div>
    </div>
  );
}
