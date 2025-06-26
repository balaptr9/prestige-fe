import { useEffect, useState, useRef } from 'react'

interface UseAnimationProps {
  threshold?: number
  triggerOnce?: boolean
  delay?: number
}

export const useAnimation = ({
                               threshold = 0.1,
                               triggerOnce = true,
                               delay = 0
                             }: UseAnimationProps = {}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const currentRef = ref.current
    if (!currentRef) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && (!triggerOnce || !hasTriggered)) {
          setTimeout(() => {
            setIsVisible(true)
            setHasTriggered(true)
          }, delay)

          if (triggerOnce) {
            observer.unobserve(entry.target)
          }
        } else if (!triggerOnce && !entry.isIntersecting) {
          setIsVisible(false)
        }
      },
      { threshold }
    )

    observer.observe(currentRef)
    return () => observer.disconnect()
  }, [threshold, triggerOnce, hasTriggered, delay])

  return { ref, isVisible, hasTriggered }
}

export const useStaggeredAnimation = (
  itemCount: number,
  delayBetween: number = 100,
  threshold: number = 0.1
) => {
  const { ref, isVisible } = useAnimation({ threshold })

  const getItemProps = (index: number) => ({
    style: {
      animationDelay: isVisible ? `${index * delayBetween}ms` : undefined,
    },
    className: isVisible ? 'animate-fade-in-up' : 'opacity-0',
  })

  return { ref, isVisible, getItemProps }
}