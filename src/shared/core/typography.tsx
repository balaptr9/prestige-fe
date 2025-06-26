'use client';

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, HTMLMotionProps } from 'framer-motion';
import { useIntersectionObserver } from '@/shared/hooks/use-intersection-observer';
import { cn } from "@/shared/lib/utils/cn";

const headingVariants = cva(
  "font-display font-bold tracking-tight",
  {
    variants: {
      variant: {
        default: "text-foreground",
        primary: "text-primary",
        secondary: "text-secondary",
        muted: "text-muted-foreground",
        gradient: "bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent",
        "gradient-primary": "bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent",
        "gradient-secondary": "bg-gradient-to-r from-secondary to-secondary/70 bg-clip-text text-transparent",
      },
      size: {
        "display-2xl": "text-display-2xl",
        "display-xl": "text-display-xl",
        "display-lg": "text-display-lg",
        "display-md": "text-display-md",
        "display-sm": "text-display-sm",
        "xl": "text-xl",
        "lg": "text-lg",
        "md": "text-base",
        "sm": "text-sm",
        "xs": "text-xs",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
        extrabold: "font-extrabold",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
      tracking: {
        tight: "tracking-tight",
        normal: "tracking-normal",
        wide: "tracking-wide",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "lg",
      weight: "bold",
      tracking: "tight",
    },
  }
);

const textVariants = cva(
  "font-body leading-relaxed",
  {
    variants: {
      variant: {
        default: "text-foreground",
        muted: "text-muted-foreground",
        primary: "text-primary",
        secondary: "text-secondary",
        accent: "text-accent-foreground",
      },
      size: {
        "xl": "text-lg md:text-xl",
        "lg": "text-base md:text-lg",
        "md": "text-sm md:text-base",
        "sm": "text-xs md:text-sm",
        "xs": "text-xs",
      },
      weight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
      align: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
        justify: "text-justify",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      weight: "normal",
    },
  }
);

interface BaseTypographyProps {
  className?: string;
  animate?: boolean;
  animationType?: 'fadeIn' | 'slideUp' | 'typewriter';
  delay?: number;
  duration?: number;
}

export interface HeadingProps
  extends Omit<HTMLMotionProps<"h1">, 'variants'>,
    VariantProps<typeof headingVariants>,
    BaseTypographyProps {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export interface TextProps
  extends Omit<HTMLMotionProps<"p">, 'variants'>,
    VariantProps<typeof textVariants>,
    BaseTypographyProps {
  as?: keyof JSX.IntrinsicElements;
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({
     className,
     variant,
     size,
     weight,
     align,
     tracking,
     as = "h2",
     animate = false,
     animationType = 'slideUp',
     delay = 0,
     duration = 0.6,
     children,
     ...props
   }, ref) => {
    const { ref: observerRef, isIntersecting } = useIntersectionObserver({
      threshold: 0.1,
      triggerOnce: false
    });

    const animationVariants = {
      fadeIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
      },
      slideUp: {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
      },
      typewriter: {
        hidden: { width: 0 },
        visible: { width: "auto" }
      }
    };

    const MotionComponent = motion[as] as any;

    if (!animate) {
      const Component = as;
      return (
        <Component
          ref={ref}
          className={cn(headingVariants({ variant, size, weight, align, tracking, className }))}
          {...props}
        >
          {children}
        </Component>
      );
    }

    return (
      <MotionComponent
        ref={(node: any) => {
          observerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(headingVariants({ variant, size, weight, align, tracking, className }), animationType === 'typewriter' && 'overflow-hidden whitespace-nowrap')}
        variants={animationVariants[animationType]}
        initial="hidden"
        animate={isIntersecting ? "visible" : "hidden"}
        transition={{ duration, delay, ease: "easeOut" }}
        {...props}
      >
        {children}
      </MotionComponent>
    );
  }
);

const Text = React.forwardRef<HTMLElement, TextProps>(
  ({
     className,
     variant,
     size,
     weight,
     align,
     as = "p",
     animate = false,
     animationType = 'fadeIn',
     delay = 0,
     duration = 0.6,
     children,
     ...props
   }, ref) => {
    const { ref: observerRef, isIntersecting } = useIntersectionObserver({
      threshold: 0.1,
      triggerOnce: false
    });

    const animationVariants = {
      fadeIn: {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
      },
      slideUp: {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }
    };

    if (!animate) {
      const Component = as as any;
      return (
        <Component
          ref={ref}
          className={cn(textVariants({ variant, size, weight, align }), className)}
          {...props}
        >
          {children}
        </Component>
      );
    }

    const MotionComponent = motion[as] as any;

    return (
      <MotionComponent
        ref={(node: any) => {
          observerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(textVariants({ variant, size, weight, align }), className)}
        variants={animationVariants[animationType]}
        initial="hidden"
        animate={isIntersecting ? "visible" : "hidden"}
        transition={{ duration, delay, ease: "easeOut" }}
        {...props}
      >
        {children}
      </MotionComponent>
    );
  }
);

Heading.displayName = "Heading";
Text.displayName = "Text";

export { Heading, Text, headingVariants, textVariants };