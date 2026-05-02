import * as React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-yellow disabled:pointer-events-none disabled:opacity-50 active:scale-95';

    const variants = {
      primary:
        'bg-brand-yellow text-brand-navy shadow-lg shadow-brand-yellow/20 hover:bg-brand-yellow-hover hover:shadow-brand-yellow/40',
      secondary:
        'bg-brand-slate text-white shadow-md hover:bg-brand-navy border border-slate-700 hover:border-slate-600',
      outline:
        'border-2 border-brand-slate bg-transparent text-foreground hover:bg-brand-slate hover:text-white',
      ghost: 'hover:bg-slate-100 hover:text-brand-navy dark:hover:bg-slate-800 dark:hover:text-slate-50',
    };

    const sizes = {
      sm: 'h-9 px-4',
      md: 'h-11 px-6 py-2',
      lg: 'h-14 px-8 text-base',
      icon: 'h-10 w-10',
    };

    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {!isLoading && children}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button };
