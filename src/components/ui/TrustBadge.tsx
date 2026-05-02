import * as React from 'react';
import { cn } from '@/lib/utils';
import { ShieldCheck, CheckCircle } from 'lucide-react';

interface TrustBadgeProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
  variant?: 'solid' | 'outline' | 'ghost';
}

export function TrustBadge({
  title,
  subtitle,
  icon,
  className,
  variant = 'solid',
}: TrustBadgeProps) {
  const variants = {
    solid: 'bg-brand-slate text-white border border-slate-700',
    outline: 'border-2 border-brand-yellow/50 bg-white text-brand-navy',
    ghost: 'bg-transparent text-brand-navy',
  };

  return (
    <div
      className={cn(
        'flex items-center gap-4 rounded-xl p-4 transition-all duration-300 hover:shadow-md',
        variants[variant],
        className
      )}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-yellow/10 text-brand-yellow">
        {icon || <ShieldCheck className="h-6 w-6" />}
      </div>
      <div className="flex flex-col">
        <span className="font-bold leading-tight">{title}</span>
        {subtitle && (
          <span className="text-sm font-medium opacity-80">{subtitle}</span>
        )}
      </div>
    </div>
  );
}
