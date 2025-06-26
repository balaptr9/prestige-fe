'use client';

import { useEffect, useState } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export const useScrollProgress = () => {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  // Smooth spring animation for scroll progress
  const smoothProgress = useMotionValue(0);
  const springProgress = useSpring(smoothProgress, {
    stiffness: 400,
    damping: 40
  });

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? (currentScrollY / maxScroll) * 100 : 0;

      setScrollY(currentScrollY);
      setScrollProgress(progress);
      setIsScrolling(true);
      smoothProgress.set(progress);

      // Clear existing timeout
      clearTimeout(scrollTimeout);

      // Set new timeout to detect scroll end
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [smoothProgress]);

  return {
    scrollY,
    scrollProgress,
    smoothProgress: springProgress,
    isScrolling,
    isAtTop: scrollY < 50,
    isNearBottom: scrollProgress > 90
  };
};