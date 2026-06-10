import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/cn';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  variant?: 'panel' | 'strong' | 'comic';
  glow?: 'pink' | 'cyan' | 'purple' | 'none';
}

export const Card = ({ children, className, variant = 'panel', glow = 'none', ...rest }: CardProps) => {
  const base =
    variant === 'comic'
      ? 'comic-card'
      : variant === 'strong'
        ? 'panel-strong'
        : 'panel';
  const glowClass =
    glow === 'pink' ? 'shadow-glow' : glow === 'cyan' ? 'shadow-glow-cyan' : glow === 'purple' ? 'shadow-glow-purple' : '';
  return (
    <div className={cn(base, glowClass, className)} {...rest}>
      {children}
    </div>
  );
};
