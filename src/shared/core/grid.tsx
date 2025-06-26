'use client';

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, HTMLMotionProps } from 'framer-motion';
import { useIntersectionObserver } from '@/shared/hooks/use-intersection-observer';
import { cn } from "@/shared/lib/utils/cn";

const gridVariants = cva(
  "grid",
  {
    variants: {
      cols: {
        1: "grid-cols-1",
        2: "grid-cols-1 md:grid-cols-2",
        3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
        4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
        5: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
        6: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
        auto: "grid-cols-[repeat(auto-fit,minmax(280px,1fr))]",
        "auto-sm": "grid-cols-[repeat(auto-fit,minmax(200px,1fr))]",
        "auto-lg": "grid-cols-[repeat(auto-fit,minmax(350px,1fr))]",
      },
      gap: {
        none: "gap-0",
        sm: "gap-3 md:gap-4",
        default: "gap-4 md:gap-6",
        lg: "gap-6 md:gap-8",
        xl: "gap-8 md:gap-10",
      },
      align: {
        start: "items-start",
        center: "items-center",
        end: "items-end",
        stretch: "items-stretch",
      },
      justify: {
        start: "justify-items-start",
        center: "justify-items-center",
        end: "justify-items-end",
        stretch: "justify-items-stretch",
      }
    },
    defaultVariants: {
      cols: 3,
      gap: "default",
      align: "stretch",
      justify: "stretch",
    },
  }
);

interface GridProps
  extends Omit<HTMLMotionProps<"div">, 'variants'>,
    VariantProps<typeof gridVariants> {
  children: React.ReactNode;
  stagger?: boolean;
  staggerDelay?: number;
  animateItems?: boolean;
}

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  ({
     className,
     cols,
     gap,
     align,
     justify,
     children,
     stagger = false,
     staggerDelay = 0.1,
     animateItems = false,
     ...props
   }, ref) => {
    const { ref: observerRef, isIntersecting } = useIntersectionObserver({
      threshold: 0.1,
      triggerOnce: true
    });

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: stagger ? staggerDelay : 0,
          delayChildren: 0.1,
        }
      }
    };

    const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
      }
    };

    const childrenArray = React.Children.toArray(children);

    return (
      <motion.div
        ref={(node) => {
          observerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(gridVariants({ cols, gap, align, justify }), className)}
        variants={stagger ? containerVariants : undefined}
        initial={stagger ? "hidden" : undefined}
        animate={stagger ? (isIntersecting ? "visible" : "hidden") : undefined}
        {...props}
      >
        {stagger && animateItems
          ? childrenArray.map((child, index) => (
            <motion.div key={index} variants={itemVariants}>
              {child}
            </motion.div>
          ))
          : children
        }
      </motion.div>
    );
  }
);

Grid.displayName = "Grid";

export { Grid, gridVariants };