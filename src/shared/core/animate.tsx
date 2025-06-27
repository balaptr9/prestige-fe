'use client';

import { motion, Variants, HTMLMotionProps } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/use-intersection-observer';
import { cn } from '@/utils/cn';

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

type AnimationSpeed = 'instant' | 'fast' | 'normal' | 'slow' | 'very-slow';

interface AnimateProps extends Omit<HTMLMotionProps<"div">, 'variants' | 'initial' | 'animate'> {
  children: React.ReactNode;
  animation?: AnimationType;
  speed?: AnimationSpeed;
  delay?: AnimationSpeed;
  className?: string;
  threshold?: number;
  triggerOnce?: boolean;
  stagger?: boolean;
  staggerDelay?: AnimationSpeed;
  as?: keyof HTMLElementTagNameMap;
}

// ✅ NATURAL - Timing yang terasa lebih organic dan pleasant
const getAnimationDuration = (speed: AnimationSpeed): number => {
  const durations = {
    'instant': 0.15,  // 150ms - tetap cepat tapi tidak jarring
    'fast': 0.35,     // 350ms - cukup responsif tapi smooth
    'normal': 0.6,    // 600ms - sweet spot untuk UI animations
    'slow': 0.8,      // 800ms - untuk emphasis animations
    'very-slow': 1.2  // 1200ms - untuk complex transitions
  };
  return durations[speed];
};

// ✅ NATURAL - Easing functions yang lebih organic
const easingFunctions = {
  smooth: [0.25, 0.46, 0.45, 0.94],   // Lebih gentle curve
  bounce: [0.68, -0.55, 0.265, 1.55], // Tetap bouncy untuk playful elements
  sharp: [0.4, 0, 0.2, 1],             // Untuk quick feedback
  gentle: [0.25, 0.1, 0.25, 1],       // Extra smooth untuk entrance animations
} as const;

const animations: Record<AnimationType, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 }
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 }
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 }
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  slideInUp: {
    hidden: { y: 60, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  },
  slideInDown: {
    hidden: { y: -60, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  },
  slideInLeft: {
    hidden: { x: -60, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  },
  slideInRight: {
    hidden: { x: 60, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  },
  rotateIn: {
    hidden: { opacity: 0, rotate: -45, scale: 0.8 },
    visible: { opacity: 1, rotate: 0, scale: 1 }
  },
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
                          speed = 'normal',           // ✅ SELARAS - Default speed dari CSS variables
                          delay = 'instant',         // ✅ SELARAS - Default delay dari CSS variables
                          className,
                          threshold = 0.1,
                          triggerOnce = true,
                          stagger = false,
                          staggerDelay = 'fast',     // ✅ SELARAS - Stagger delay dari CSS variables
                          as = 'div',
                          ...props
                        }: AnimateProps) => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    triggerOnce
  });

  const variants = animations[animation];

  // ✅ SELARAS - Semua timing menggunakan mapping dari CSS variables
  const duration = getAnimationDuration(speed);
  const delayValue = getAnimationDuration(delay);
  const staggerDelayValue = getAnimationDuration(staggerDelay);

  const transition = {
    duration,
    delay: stagger ? delayValue + staggerDelayValue : delayValue,
    ease: animation === 'bounceIn' ? easingFunctions.bounce :
      animation.includes('scale') ? easingFunctions.gentle :
        easingFunctions.smooth // ✅ CONTEXT-AWARE - Different easing for different animations
  };

  const MotionComponent = motion[as] as any;

  return (
    <MotionComponent
      ref={ref}
      className={cn('gpu-accelerated', className)} // ✅ SELARAS - Auto GPU acceleration
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

// ✅ Preset animations dengan timing yang natural dan context-appropriate
export const FadeIn = (props: Omit<AnimateProps, 'animation'>) =>
  <Animate animation="fadeIn" speed="normal" {...props} />;

export const FadeInUp = (props: Omit<AnimateProps, 'animation'>) =>
  <Animate animation="fadeInUp" speed="normal" {...props} />;

export const FadeInLeft = (props: Omit<AnimateProps, 'animation'>) =>
  <Animate animation="fadeInLeft" speed="fast" {...props} />; // Sedikit lebih cepat untuk slide

export const FadeInRight = (props: Omit<AnimateProps, 'animation'>) =>
  <Animate animation="fadeInRight" speed="fast" {...props} />; // Sedikit lebih cepat untuk slide

export const ScaleIn = (props: Omit<AnimateProps, 'animation'>) =>
  <Animate animation="scaleIn" speed="slow" {...props} />; // Lebih lambat untuk emphasis

export const SlideInUp = (props: Omit<AnimateProps, 'animation'>) =>
  <Animate animation="slideInUp" speed="normal" {...props} />;

// ✅ Stagger animation helper - untuk animasi berurutan
export const StaggerContainer = ({
                                   children,
                                   staggerDelay = 'fast',
                                   ...props
                                 }: Omit<AnimateProps, 'stagger'>) => (
  <Animate stagger staggerDelay={staggerDelay} {...props}>
    {children}
  </Animate>
);

// ✅ Hook untuk akses animation durations di JavaScript
export const useAnimationDurations = () => ({
  instant: getAnimationDuration('instant'),
  fast: getAnimationDuration('fast'),
  normal: getAnimationDuration('normal'),
  slow: getAnimationDuration('slow'),
  'very-slow': getAnimationDuration('very-slow'),
});

/* ============================================================================
   📝 USAGE EXAMPLES:

   // Basic usage dengan semantic speed
   <FadeInUp speed="fast">Content</FadeInUp>

   // Custom animation dengan stagger
   <Animate animation="scaleIn" speed="slow" stagger staggerDelay="fast">
     <div>Item 1</div>
     <div>Item 2</div>
   </Animate>

   // Stagger container untuk multiple children
   <StaggerContainer>
     <div>Item 1</div>
     <div>Item 2</div>
     <div>Item 3</div>
   </StaggerContainer>

   // Access durations in JS
   const durations = useAnimationDurations();
   setTimeout(() => {}, durations.fast * 1000);

   ============================================================================ */