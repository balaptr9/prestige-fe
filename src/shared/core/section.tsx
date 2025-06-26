'use client';

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, HTMLMotionProps } from 'framer-motion';
import { useIntersectionObserver } from '@/shared/hooks/use-intersection-observer';
import { cn } from "@/shared/lib/utils/cn";

const sectionVariants = cva(
  "relative w-full overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-background",
        primary: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        muted: "bg-muted",
        gradient: "bg-gradient-to-br from-primary/5 via-secondary/5 to-background",
        "gradient-primary": "bg-gradient-to-r from-primary to-primary/80",
        "gradient-secondary": "bg-gradient-to-r from-secondary to-secondary/80",
        glass: "bg-background/50 backdrop-blur-xl border border-border/50",
        transparent: "bg-transparent",
      },
      padding: {
        none: "",
        sm: "py-8 md:py-12",
        default: "py-12 md:py-16 lg:py-20",
        lg: "py-16 md:py-20 lg:py-24",
        xl: "py-20 md:py-24 lg:py-32",
      },
      container: {
        none: "",
        default: "container mx-auto px-4 sm:px-6 lg:px-8",
        narrow: "container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl",
        wide: "container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl",
        full: "px-4 sm:px-6 lg:px-8",
      },
      animation: {
        none: "",
        fade: "animate-on-scroll",
        slide: "animate-on-scroll-slide",
        scale: "animate-on-scroll-scale",
      }
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
      container: "default",
      animation: "fade",
    },
  }
);

interface SectionProps
  extends Omit<HTMLMotionProps<"section">, 'variants'>,
    VariantProps<typeof sectionVariants> {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  parallax?: boolean;
  parallaxOffset?: number;
}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({
     className,
     variant,
     padding,
     container,
     animation,
     as = "section",
     children,
     parallax = false,
     parallaxOffset = 50,
     ...props
   }, ref) => {
    const { ref: observerRef, isIntersecting } = useIntersectionObserver({
      threshold: 0.1,
      triggerOnce: true
    });

    const Component = motion[as] as any;

    const animationVariants = {
      fade: {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
      },
      slide: {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
      },
      scale: {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
      }
    };

    const parallaxProps = parallax ? {
      style: {
        transform: isIntersecting ? `translateY(0px)` : `translateY(${parallaxOffset}px)`,
        transition: 'transform 0.8s ease-out'
      }
    } : {};

    return (
      <Component
        ref={(node: any) => {
          observerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(sectionVariants({ variant, padding, animation }), className)}
        variants={animation !== 'none' ? animationVariants[animation as keyof typeof animationVariants] : undefined}
        initial={animation !== 'none' ? "hidden" : undefined}
        animate={animation !== 'none' ? (isIntersecting ? "visible" : "hidden") : undefined}
        {...parallaxProps}
        {...props}
      >
        <div className={cn(sectionVariants({ container, padding: 'none' }))}>
          {children}
        </div>
      </Component>
    );
  }
);

Section.displayName = "Section";

export { Section, sectionVariants };