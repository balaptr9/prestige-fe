import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/shared/lib/utils/cn"

const inputVariants = cva(
  "flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-300",
  {
    variants: {
      variant: {
        default: "border-input focus-visible:ring-primary",
        error: "border-error focus-visible:ring-error",
        success: "border-success focus-visible:ring-success",
        ghost: "border-transparent bg-muted/50 focus-visible:bg-background",
      },
      size: {
        default: "h-10 px-3 py-2",
        sm: "h-9 px-3 py-2 text-sm",
        lg: "h-12 px-4 py-3",
        xl: "h-14 px-5 py-4 text-lg",
      },
      animation: {
        none: "",
        focus: "focus:scale-[1.02] focus:shadow-medium",
        glow: "focus:shadow-colored",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      animation: "focus",
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string
  error?: string
  helper?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, animation, label, error, helper, ...props }, ref) => {
    const id = React.useId()
    const inputId = props.id || id

    return (
      <div className="space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
        <input
          id={inputId}
          className={cn(
            inputVariants({ variant: error ? "error" : variant, size, animation }),
            className
          )}
          ref={ref}
          {...props}
        />
        {(error || helper) && (
          <p className={cn(
            "text-sm",
            error ? "text-error" : "text-muted-foreground"
          )}>
            {error || helper}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input, inputVariants }