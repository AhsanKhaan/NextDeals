"use client"

import { useEffect, useRef } from "react"
import Lottie from "lottie-react"

interface LottieAnimationProps {
  animationData?: any
  animationUrl?: string
  className?: string
  loop?: boolean
  autoplay?: boolean
  speed?: number
}

export function LottieAnimation({
  animationData,
  animationUrl,
  className = "w-full h-full",
  loop = true,
  autoplay = true,
  speed = 1,
}: LottieAnimationProps) {
  const lottieRef = useRef<any>(null)

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(speed)
    }
  }, [speed])

  // Default shopping animation data (simplified)
  const defaultAnimationData = {
    v: "5.7.4",
    fr: 30,
    ip: 0,
    op: 90,
    w: 200,
    h: 200,
    nm: "Shopping",
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "Circle",
        sr: 1,
        ks: {
          o: { a: 0, k: 100 },
          r: {
            a: 1,
            k: [
              { t: 0, s: [0] },
              { t: 90, s: [360] },
            ],
          },
          p: { a: 0, k: [100, 100, 0] },
          a: { a: 0, k: [0, 0, 0] },
          s: { a: 0, k: [100, 100, 100] },
        },
        ao: 0,
        shapes: [
          {
            ty: "el",
            p: { a: 0, k: [0, 0] },
            s: { a: 0, k: [60, 60] },
          },
          {
            ty: "fl",
            c: { a: 0, k: [0.2, 0.6, 1, 1] },
          },
        ],
        ip: 0,
        op: 90,
        st: 0,
      },
    ],
  }

  const animation = animationData || defaultAnimationData

  if (animationUrl) {
    return (
      <div className={className}>
        <Lottie lottieRef={lottieRef} animationData={null} path={animationUrl} loop={loop} autoplay={autoplay} />
      </div>
    )
  }

  return (
    <div className={className}>
      <Lottie lottieRef={lottieRef} animationData={animation} loop={loop} autoplay={autoplay} />
    </div>
  )
}
