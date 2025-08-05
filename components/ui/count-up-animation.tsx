"use client"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import CountUp from "react-countup"

interface CountUpAnimationProps {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

export function CountUpAnimation({
  end,
  duration = 2,
  prefix = "",
  suffix = "",
  className = "",
}: CountUpAnimationProps) {
  const [hasAnimated, setHasAnimated] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  })

  useEffect(() => {
    if (inView && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [inView, hasAnimated])

  return (
    <div ref={ref} className={className}>
      {hasAnimated ? (
        <CountUp start={0} end={end} duration={duration} prefix={prefix} suffix={suffix} separator="," />
      ) : (
        <span>
          {prefix}0{suffix}
        </span>
      )}
    </div>
  )
}
