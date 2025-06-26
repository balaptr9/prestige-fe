'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';
import { Button } from '@/shared/components/ui/button';
import { Progress } from '@/shared/components/ui/progress';
import { cn } from '@/shared/lib/utils/cn';

interface TimerProps {
  duration: number; // in seconds
  onComplete?: () => void;
  onTick?: (remaining: number) => void;
  autoStart?: boolean;
  showProgress?: boolean;
  showControls?: boolean;
  format?: 'mm:ss' | 'hh:mm:ss' | 'compact';
  warningThreshold?: number; // seconds when to show warning
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Timer = ({
                        duration,
                        onComplete,
                        onTick,
                        autoStart = false,
                        showProgress = true,
                        showControls = true,
                        format = 'mm:ss',
                        warningThreshold = 60,
                        className,
                        size = 'md'
                      }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(autoStart);
  const [isWarning, setIsWarning] = useState(false);

  const formatTime = useCallback((seconds: number): string => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    switch (format) {
      case 'hh:mm:ss':
        return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      case 'compact':
        if (hrs > 0) return `${hrs}h ${mins}m`;
        if (mins > 0) return `${mins}m ${secs}s`;
        return `${secs}s`;
      default:
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
  }, [format]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          const newTime = prev - 1;
          onTick?.(newTime);

          if (newTime <= warningThreshold && newTime > 0) {
            setIsWarning(true);
          }

          if (newTime <= 0) {
            setIsRunning(false);
            onComplete?.();
            return 0;
          }

          return newTime;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onTick, onComplete, warningThreshold]);

  const handlePlayPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setTimeLeft(duration);
    setIsRunning(false);
    setIsWarning(false);
  };

  const progress = ((duration - timeLeft) / duration) * 100;

  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Timer Display */}
      <div className="text-center">
        <motion.div
          className={cn(
            'font-mono font-bold tracking-wider',
            sizeClasses[size],
            isWarning ? 'text-red-500' : 'text-foreground'
          )}
          animate={{
            scale: isWarning && timeLeft % 2 === 0 ? 1.05 : 1,
            color: isWarning ? '#ef4444' : undefined
          }}
          transition={{ duration: 0.2 }}
        >
          <Clock className="inline w-6 h-6 mr-2" />
          {formatTime(timeLeft)}
        </motion.div>

        {/* Warning Message */}
        <AnimatePresence>
          {isWarning && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-red-500 text-sm font-medium mt-2"
            >
              ⚠️ Waktu hampir habis!
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Progress Bar */}
      {showProgress && (
        <Progress
          value={progress}
          color={isWarning ? 'error' : 'primary'}
          animated
          gradient
        />
      )}

      {/* Controls */}
      {showControls && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePlayPause}
            disabled={timeLeft <= 0}
          >
            {isRunning ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};