import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/shared/lib/utils/cn"
import { Text } from "@/shared/core/typography"

const priceDisplayVariants = cva(
  "font-bold tabular-nums",
  {
    variants: {
      variant: {
        default: "text-foreground",
        primary: "text-primary",
        secondary: "text-secondary",
        success: "text-success",
        muted: "text-muted-foreground",
      },
      size: {
        sm: "text-lg",
        default: "text-2xl",
        lg: "text-3xl",
        xl: "text-4xl",
      },
      currency: {
        hidden: "",
        visible: "",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      currency: "visible",
    },
  }
)

export interface PriceDisplayProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof priceDisplayVariants> {
  price: number
  currency?: string
  locale?: string
  showDecimals?: boolean
  originalPrice?: number
}

const PriceDisplay = React.forwardRef<HTMLSpanElement, PriceDisplayProps>(
  ({
     className,
     variant,
     size,
     currency = "visible",
     price,
     currency: currencySymbol = "Rp",
     locale = "id-ID",
     showDecimals = false,
     originalPrice,
     ...props
   }, ref) => {
    const formatPrice = (amount: number) => {
      if (amount === 0) return "GRATIS"

      const options: Intl.NumberFormatOptions = {
        style: 'decimal',
        minimumFractionDigits: showDecimals ? 2 : 0,
        maximumFractionDigits: showDecimals ? 2 : 0,
      }

      return new Intl.NumberFormat(locale, options).format(amount)
    }

    return (
      <div className="flex items-baseline gap-2">
        {currency === "visible" && price > 0 && (
          <Text size="sm" variant="muted" className="font-medium">
            {currencySymbol}
          </Text>
        )}
        <span
          ref={ref}
          className={cn(priceDisplayVariants({ variant, size, currency, className }))}
          {...props}
        >
          {formatPrice(price)}
        </span>
        {originalPrice && originalPrice > price && (
          <span className={cn(priceDisplayVariants({ variant: "muted", size: "sm" }), "line-through")}>
            {currency === "visible" && `${currencySymbol} `}{formatPrice(originalPrice)}
          </span>
        )}
      </div>
    )
  }
)
PriceDisplay.displayName = "PriceDisplay"

export { PriceDisplay, priceDisplayVariants }