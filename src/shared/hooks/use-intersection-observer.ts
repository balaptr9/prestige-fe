'use client';

import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  delay?: number;
}

export const useIntersectionObserver = ({
                                          threshold = 0.1,
                                          rootMargin = '0px',
                                          triggerOnce = true,
                                          delay = 0
                                        }: UseIntersectionObserverOptions = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || !hasTriggered)) {
          if (delay > 0) {
            setTimeout(() => {
              setIsIntersecting(true);
              setHasTriggered(true);
            }, delay);
          } else {
            setIsIntersecting(true);
            setHasTriggered(true);
          }

          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce && !entry.isIntersecting) {
          setIsIntersecting(false);
        }
      },
      {
        threshold,
        rootMargin
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, hasTriggered, delay]);

  return { ref, isIntersecting, hasTriggered };
};

// Hook for staggered animations
export const useStaggeredIntersection = (
  itemCount: number,
  staggerDelay: number = 100
) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true
  });

  const getItemProps = (index: number) => ({
    style: {
      transitionDelay: isIntersecting ? `${index * staggerDelay}ms` : '0ms'
    },
    className: isIntersecting ? 'animate-fade-in-up' : 'opacity-0 translate-y-4'
  });

  return { ref, isIntersecting, getItemProps };
};