'use client';

import { motion } from 'framer-motion';
import { cn } from '@/shared/lib/utils/cn';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white' | 'current';
  type?: 'spin' | 'pulse' | 'bounce' | 'dots' | 'bars';
  className?: string;
}

export const LoadingSpinner = ({
                                 size = 'md',
                                 color = 'primary',
                                 type = 'spin',
                                 className
                               }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12'
  };

  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary',
    white: 'text-white',
    current: 'text-current'
  };

  if (type === 'dots') {
    return (
      <div className={cn('flex space-x-1', className)}>
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className={cn(
              'rounded-full',
              size === 'sm' ? 'w-1 h-1' : size === 'md' ? 'w-2 h-2' : 'w-3 h-3',
              colorClasses[color] === 'text-primary' ? 'bg-primary' :
                colorClasses[color] === 'text-secondary' ? 'bg-secondary' :
                  colorClasses[color] === 'text-white' ? 'bg-white' : 'bg-current'
            )}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.1
            }}
          />
        ))}
      </div>
    );
  }

  if (type === 'bars') {
    return (
      <div className={cn('flex space-x-1', className)}>
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className={cn(
              'w-1',
              size === 'sm' ? 'h-4' : size === 'md' ? 'h-6' : 'h-8',
              colorClasses[color] === 'text-primary' ? 'bg-primary' :
                colorClasses[color] === 'text-secondary' ? 'bg-secondary' :
                  colorClasses[color] === 'text-white' ? 'bg-white' : 'bg-current'
            )}
            animate={{
              scaleY: [1, 2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.1
            }}
          />
        ))}
      </div>
    );
  }

  if (type === 'pulse') {
    return (
      <motion.div
        className={cn(
          'rounded-full',
          sizeClasses[size],
          colorClasses[color] === 'text-primary' ? 'bg-primary' :
            colorClasses[color] === 'text-secondary' ? 'bg-secondary' :
              colorClasses[color] === 'text-white' ? 'bg-white' : 'bg-current',
          className
        )}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [1, 0.7, 1]
        }}
        transition={{
          duration: 1,
          repeat: Infinity
        }}
      />
    );
  }

  if (type === 'bounce') {
    return (
      <motion.div
        className={cn(
          'rounded-full',
          sizeClasses[size],
          colorClasses[color] === 'text-primary' ? 'bg-primary' :
            colorClasses[color] === 'text-secondary' ? 'bg-secondary' :
              colorClasses[color] === 'text-white' ? 'bg-white' : 'bg-current',
          className
        )}
        animate={{
          y: [0, -10, 0]
        }}
        transition={{
          duration: 0.6,
          repeat: Infinity
        }}
      />
    );
  }

  // Default spin
  return (
    <motion.div
      className={cn(
        'border-2 border-current border-t-transparent rounded-full',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
};

// Overlay spinner for full page loading
export const LoadingOverlay = ({
                                 show,
                                 children,
                                 className
                               }: {
  show: boolean;
  children?: React.ReactNode;
  className?: string;
}) => {
  if (!show) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm',
        className
      )}
    >
      <div className="text-center space-y-4">
        <LoadingSpinner size="xl" type="spin" />
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground"
          >
            {children}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};