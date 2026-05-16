import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={cn("premium-card shadow-sm dark:glass", className)}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardProps> = ({ children, className }) => (
  <div className={cn("p-6 pb-3 border-b border-slate-100/50 dark:border-white/5", className)}>{children}</div>
);

export const CardContent: React.FC<CardProps> = ({ children, className }) => (
  <div className={cn("p-6 pt-0", className)}>{children}</div>
);

export const CardFooter: React.FC<CardProps> = ({ children, className }) => (
  <div className={cn("flex items-center p-6 pt-0", className)}>{children}</div>
);
