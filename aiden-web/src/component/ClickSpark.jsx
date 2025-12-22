import { useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'

const GlobalClickSpark = ({
  sparkColor = '#fff',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = 'ease-out',
  extraScale = 1.0,
}) => {
  const canvasRef = useRef(null)
  const sparksRef = useRef([])

  const easeFunc = useCallback((t) => {
    switch (easing) {
      case 'linear':
        return t
      case 'ease-in':
        return t * t
      case 'ease-in-out':
        return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
      default:
        return t * (2 - t)
    }
  }, [easing])

  // 전역 캔버스 세팅
  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const canvas = canvasRef.current
    if (!canvas) return undefined
    const ctx = canvas.getContext('2d')

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const w = window.innerWidth
      const h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    let raf
    const draw = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      sparksRef.current = sparksRef.current.filter((spark) => {
        const elapsed = time - spark.startTime
        if (elapsed > duration) return false

        const progress = elapsed / duration
        const eased = easeFunc(progress)

        const dist = eased * sparkRadius * extraScale
        const len = sparkSize * (1 - eased)

        const x1 = spark.x + Math.cos(spark.angle) * dist
        const y1 = spark.y + Math.sin(spark.angle) * dist
        const x2 = spark.x + Math.cos(spark.angle) * (dist + len)
        const y2 = spark.y + Math.sin(spark.angle) * (dist + len)

        ctx.strokeStyle = sparkColor
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()

        return true
      })

      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [sparkColor, sparkSize, sparkRadius, duration, easeFunc, extraScale])

  // 클릭(터치) 시 스파크 생성
  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const handleClick = (e) => {
      const now = performance.now()
      const sparks = Array.from({ length: sparkCount }, (_, i) => ({
        x: e.clientX,
        y: e.clientY,
        angle: (Math.PI * 2 * i) / sparkCount,
        startTime: now,
      }))
      sparksRef.current.push(...sparks)
    }

    window.addEventListener('pointerdown', handleClick)
    return () => window.removeEventListener('pointerdown', handleClick)
  }, [sparkCount])

  if (typeof document === 'undefined') return null

  return createPortal(
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />,
    document.body,
  )
}

export default GlobalClickSpark
