import { useEffect, useRef, useState } from 'react'

export function Reveal({ children, className = "" }) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === "undefined") return false

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches
  })

  useEffect(() => {
    const element = ref.current
    if (!element) return undefined

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    if (prefersReducedMotion) {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.18 },
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={[
        "transition duration-700 ease-out",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </div>
  )
}
