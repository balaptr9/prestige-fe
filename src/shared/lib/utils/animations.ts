export const animationPresets = {
  // Entrance animations
  fadeIn: "animate-fade-in",
  fadeInUp: "animate-fade-in-up",
  slideInLeft: "animate-slide-in-left",
  slideInRight: "animate-slide-in-right",
  scaleIn: "animate-scale-in",

  // Continuous animations
  float: "animate-float",
  bounce: "animate-bounce-subtle",
  pulse: "animate-pulse-soft",

  // Interactive animations
  hover: "hover:scale-105 hover:-translate-y-1 transition-all duration-300",
  press: "active:scale-95 transition-all duration-150",

  // Stagger delays
  stagger: {
    100: "animation-delay-100",
    200: "animation-delay-200",
    300: "animation-delay-300",
    400: "animation-delay-400",
    500: "animation-delay-500",
  }
} as const

export const createStaggeredAnimation = (baseClass: string, itemCount: number, delayMs: number = 100) => {
  return Array.from({ length: itemCount }, (_, i) => ({
    class: `${baseClass} animation-delay-${i * delayMs}`,
    style: { animationDelay: `${i * delayMs}ms` }
  }))
}

export const useIntersectionAnimation = (threshold: number = 0.1) => {
  const [isVisible, setIsVisible] = React.useState(false)
  const ref = React.useRef<HTMLElement>(null)

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isVisible }
}