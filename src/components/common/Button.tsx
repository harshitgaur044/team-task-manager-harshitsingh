import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, children, ...props }, ref) => {
    const variants = {
      primary: 'bg-brand-600 text-white hover:bg-brand-500 shadow-xl shadow-brand-600/20 active:scale-[0.98] transition-all duration-300 inner-glow border border-white/10',
      secondary: 'glass text-slate-900 hover:bg-white dark:text-text-primary dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 transition-all duration-300 active:scale-[0.98]',
      outline: 'border border-slate-200 bg-transparent hover:bg-slate-50 dark:border-dark-border dark:text-text-secondary dark:hover:text-text-primary dark:hover:bg-white/5 transition-all duration-300 active:scale-[0.98]',
      ghost: 'bg-transparent hover:bg-slate-100 dark:text-text-muted dark:hover:text-text-primary dark:hover:bg-white/5 transition-all duration-300',
      danger: 'bg-red-600 text-white hover:bg-red-700 shadow-lg shadow-red-600/20 active:scale-[0.98] transition-all duration-300',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 py-2 text-sm',
      lg: 'h-12 px-6 text-base',
      icon: 'h-10 w-10 p-2',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 disabled:opacity-50 disabled:pointer-events-none',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
