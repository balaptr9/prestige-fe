'use client';

import { motion, Variants, HTMLMotionProps } from 'framer-motion';
import { useIntersectionObserver } from '@/shared/hooks/use-intersection-observer';
import { cn } from '@/shared/lib/utils/cn';

type AnimationType =
  | 'fadeIn'
  | 'fadeInUp'
  | 'fadeInDown'
  | 'fadeInLeft'
  | 'fadeInRight'
  | 'scaleIn'
  | 'slideInUp'
  | 'slideInDown'
  | 'slideInLeft'
  | 'slideInRight'
  | 'rotateIn'
  | 'bounceIn';

interface AnimateProps extends Omit<HTMLMotionProps<"div">, 'variants' | 'initial' | 'animate'> {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
  stagger?: boolean;
  staggerDelay?: number;
  as?: keyof HTMLElementTagNameMap;
}

const animations: Record<AnimationType, Variants> = {
  fadeIn: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  fadeInUp: { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } },
  fadeInDown: { hidden: { opacity: 0, y: -40 }, visible: { opacity: 1, y: 0 } },
  fadeInLeft: { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } },
  fadeInRight: { hidden: { opacity: 0, x: 40 }, visible: { opacity: 1, x: 0 } },
  scaleIn: { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } },
  slideInUp: { hidden: { y: 60, opacity: 0 }, visible: { y: 0, opacity: 1 } },
  slideInDown: { hidden: { y: -60, opacity: 0 }, visible: { y: 0, opacity: 1 } },
  slideInLeft: { hidden: { x: -60, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  slideInRight: { hidden: { x: 60, opacity: 0 }, visible: { x: 0, opacity: 1 } },
  rotateIn: { hidden: { opacity: 0, rotate: -45, scale: 0.8 }, visible: { opacity: 1, rotate: 0, scale: 1 } },
  bounceIn: {
    hidden: { opacity: 0, scale: 0.3 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 260, damping: 20 }
    }
  }
};

export const Animate = ({
                          children,
                          animation = 'fadeInUp',
                          delay = 0,
                          duration = 0.6,
                          className,
                          threshold = 0.1,
                          triggerOnce = false, // ✨ PERUBAHAN DI SINI
                          stagger = false,
                          staggerDelay = 0.1,
                          as = 'div',
                          ...props
                        }: AnimateProps) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    triggerOnce
  });

  const variants = animations[animation];
  const transition = {
    duration,
    delay: stagger ? delay + staggerDelay : delay,
    ease: [0.25, 0.46, 0.45, 0.94]
  };

  const MotionComponent = motion[as] as any;

  return (
    <MotionComponent
      ref={ref}
      className={cn(className)}
      variants={variants}
      initial="hidden"
      animate={isIntersecting ? "visible" : "hidden"}
      transition={transition}
      {...props}
    >
      {children}
    </MotionComponent>
  );
};

// Preset animations (tidak ada perubahan di sini)
export const FadeIn = (props: Omit<AnimateProps, 'animation'>) =>
  <Animate animation="fadeIn" {...props} />;
export const FadeInUp = (props: Omit<AnimateProps, 'animation'>) =>
  <Animate animation="fadeInUp" {...props} />;
export const FadeInLeft = (props: Omit<AnimateProps, 'animation'>) =>
  <Animate animation="fadeInLeft" {...props} />;
export const FadeInRight = (props: Omit<AnimateProps, 'animation'>) =>
  <Animate animation="fadeInRight" {...props} />;
export const ScaleIn = (props: Omit<AnimateProps, 'animation'>) =>
  <Animate animation="scaleIn" {...props} />;
export const SlideInUp = (props: Omit<AnimateProps, 'animation'>) =>
  <Animate animation="slideInUp" {...props} />;