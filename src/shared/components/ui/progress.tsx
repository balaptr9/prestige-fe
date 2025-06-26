'use client';

import { motion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { cn } from '@/shared/lib/utils/cn';

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  showValue?: boolean;
  animated?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
  gradient?: boolean;
}

export const Progress = ({
                           value,
                           max = 100,
                           className,
                           showValue = false,
                           animated = true,
                           color = 'primary',
                           size = 'md',
                           rounded = true,
                           gradient = false
                         }: ProgressProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  const normalizedValue = Math.min(Math.max(value, 0), max);
  const percentage = (normalizedValue / max) * 100;

  // Animated progress value
  const springValue = useSpring(displayValue, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const animatedWidth = useTransform(springValue, [0, max], ['0%', '100%']);

  useEffect(() => {
    if (animated) {
      setDisplayValue(normalizedValue);
    }
  }, [normalizedValue, animated]);

  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-4'
  };

  const colorClasses = {
    primary: gradient
      ? 'bg-gradient-to-r from-primary to-primary/80'
      : 'bg-primary',
    secondary: gradient
      ? 'bg-gradient-to-r from-secondary to-secondary/80'
      : 'bg-secondary',
    success: gradient
      ? 'bg-gradient-to-r from-green-500 to-green-600'
      : 'bg-green-500',
    warning: gradient
      ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
      : 'bg-yellow-500',
    error: gradient
      ? 'bg-gradient-to-r from-red-500 to-red-600'
      : 'bg-red-500'
  };

  return (
    <div className={cn('w-full', className)}>
      {showValue && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground">Progress</span>
          <span className="text-sm text-muted-foreground">
            {Math.round(percentage)}%
          </span>
        </div>
      )}

      <div className={cn(
        'w-full bg-muted overflow-hidden',
        sizeClasses[size],
        rounded ? 'rounded-full' : 'rounded-sm'
      )}>
        {animated ? (
          <motion.div
            className={cn(
              'h-full transition-colors duration-300',
              colorClasses[color],
              rounded ? 'rounded-full' : 'rounded-sm'
            )}
            style={{ width: animatedWidth }}
            initial={{ width: '0%' }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        ) : (
          <div
            className={cn(
              'h-full transition-all duration-500 ease-out',
              colorClasses[color],
              rounded ? 'rounded-full' : 'rounded-sm'
            )}
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
    </div>
  );
};