import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { motion, type HTMLMotionProps } from 'framer-motion';

export type ButtonVariant = 'primary' | 'ghost' | 'danger' | 'success';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  loading?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-gradient-to-r from-neon-pink to-neon-purple text-white shadow-glow hover:brightness-110',
  ghost: 'bg-white/5 text-white hover:bg-white/10 border border-white/10',
  danger: 'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-glow',
  success: 'bg-gradient-to-r from-emerald-400 to-cyan-400 text-ink-900 shadow-glow-cyan',
};

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-6 py-3 text-lg',
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  loading,
  children,
  className,
  disabled,
  ...rest
}: ButtonProps) => {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ y: -1 }}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-semibold',
        'transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-neon-pink/70',
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      disabled={loading || disabled}
      {...rest}
    >
      {iconLeft}
      <span>{children as ReactNode}</span>
      {iconRight}
    </motion.button>
  );
};
