import React from 'react';
import { cn } from '../../lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-text-muted ml-1">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "flex h-12 w-full rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm transition-all duration-300 placeholder:text-slate-400 focus:border-brand-500 focus:ring-4 focus:ring-brand-500/10 focus:outline-none dark:border-dark-border dark:bg-dark-secondary dark:text-text-primary dark:placeholder:text-text-placeholder",
            error ? "border-red-500/50 focus:ring-red-500/10" : "hover:border-slate-300 dark:hover:border-brand-500/30",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
