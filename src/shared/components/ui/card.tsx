'use client';

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from "@/shared/lib/utils/cn";


const cardVariants = cva(
  "rounded-5xl border bg-card text-card-foreground shadow-sm transition-all duration-300",
  {
    variants: {
      variant: {
        default: "border-border bg-card",
        outline: "border-2 border-primary/20",
        ghost: "border-transparent shadow-none bg-transparent",
        filled: "border-transparent bg-muted/50",
        gradient: "border-0 bg-gradient-to-br from-primary/5 to-secondary/5",
        glass: "bg-background/50 backdrop-blur-xl border border-border/50",
        elevated: "shadow-lg hover:shadow-xl border-border/50",
      },
      size: {
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
        xl: "p-10",
      },
      animation: {
        none: "",
        hover: "hover:shadow-lg hover:-translate-y-1",
        scale: "hover:scale-105",
        lift: "hover:shadow-xl hover:-translate-y-2",
        glow: "hover:shadow-colored transition-shadow",
      },
      interactive: {
        none: "",
        clickable: "cursor-pointer active:scale-95",
        hoverable: "cursor-pointer",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "hover",
      interactive: "none",
    },
  }
);

interface CardProps
  extends Omit<HTMLMotionProps<"div">, 'variants'>,
    VariantProps<typeof cardVariants> {
  motionProps?: {
    whileHover?: any;
    whileTap?: any;
    initial?: any;
    animate?: any;
    exit?: any;
  };
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, animation, interactive, motionProps, children, ...props }, ref) => {
    const defaultMotionProps = {
      whileHover: interactive !== 'none' ? { scale: 1.02 } : undefined,
      whileTap: interactive === 'clickable' ? { scale: 0.98 } : undefined,
      transition: { type: "spring", stiffness: 300, damping: 30 },
      ...motionProps
    };

    return (
      <motion.div
        ref={ref}
        className={cn(cardVariants({ variant, size, animation, interactive }), className)}
        {...defaultMotionProps}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
Card.displayName = "Card";

// Sub-components tetap sama, tapi dengan motion support
const CardHeader = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, HTMLMotionProps<"h3">>(
  ({ className, ...props }, ref) => (
    <motion.h3
      ref={ref}
      className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, HTMLMotionProps<"p">>(
  ({ className, ...props }, ref) => (
    <motion.p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn("p-6 pt-0", className)}
      {...props}
    />
  )
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, HTMLMotionProps<"div">>(
  ({ className, ...props }, ref) => (
    <motion.div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants };