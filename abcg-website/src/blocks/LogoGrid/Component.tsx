'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'

import type { LogoGridBlock as LogoGridBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

const TOTAL_CELLS = 6 // 1 row x 6 columns
const ANIMATION_DURATION = 1500 // ms for fade out/in
const CYCLE_INTERVAL = 3000 // ms between each logo swap

type LogoItem = NonNullable<LogoGridBlockProps['logos']>[number]

export const LogoGridBlock: React.FC<LogoGridBlockProps> = ({ richText, logos }) => {
  const validLogos =
    logos?.filter(
      (logo): logo is LogoItem => !!logo.logoMedia && typeof logo.logoMedia === 'object',
    ) ?? []

  // Each cell either holds a logo index (into validLogos) or null (empty)
  const [grid, setGrid] = useState<(number | null)[]>(Array(TOTAL_CELLS).fill(null))
  // Which cell is currently animating out
  const [animatingCell, setAnimatingCell] = useState<number | null>(null)
  // Track which logo index to swap in next
  const nextLogoRef = useRef(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Initialize: place logos into random cells on mount
  useEffect(() => {
    if (validLogos.length === 0) return

    const count = Math.min(validLogos.length, TOTAL_CELLS)
    // Shuffle cell positions
    const positions = Array.from({ length: TOTAL_CELLS }, (_, i) => i)
    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[positions[i], positions[j]] = [positions[j], positions[i]]
    }

    const initial: (number | null)[] = Array(TOTAL_CELLS).fill(null)
    for (let i = 0; i < count; i++) {
      initial[positions[i]] = i
    }

    setGrid(initial)
    nextLogoRef.current = count % validLogos.length
  }, [validLogos.length])

  // Animation cycle: rotate logos if we have more logos than cells
  const runCycle = useCallback(() => {
    if (validLogos.length <= TOTAL_CELLS) return

    // Find a random occupied cell to animate out
    setGrid((prev) => {
      const occupiedCells = prev
        .map((val, idx) => (val !== null ? idx : -1))
        .filter((idx) => idx !== -1)

      if (occupiedCells.length === 0) return prev

      const cellToSwap = occupiedCells[Math.floor(Math.random() * occupiedCells.length)]
      setAnimatingCell(cellToSwap)

      // After fade out, swap the logo
      setTimeout(() => {
        setGrid((current) => {
          const updated = [...current]
          updated[cellToSwap] = nextLogoRef.current
          nextLogoRef.current = (nextLogoRef.current + 1) % validLogos.length
          return updated
        })
        // Brief pause then fade back in
        setTimeout(() => {
          setAnimatingCell(null)
        }, 100)
      }, ANIMATION_DURATION)

      return prev
    })
  }, [validLogos.length])

  useEffect(() => {
    if (validLogos.length <= TOTAL_CELLS) return

    intervalRef.current = setInterval(runCycle, CYCLE_INTERVAL)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [runCycle, validLogos.length])

  if (validLogos.length === 0) return null

  return (
    <div className="container">
      <div className="flex flex-col mt-30 gap-1 items-center">
        {/* Top: Tagline */}
        <div className="flex max-w-5xl">
          {richText && (
            <RichText
              className="[&_h2]:text-3xl [&_h2]:lg:text-4xl [&_h2]:font-medium [&_h2]:leading-tight [&_p]:text-lg [&_p]:lg:text-xl [&_p]:text-white [&_p]:leading-relaxed [&_p]:mx-auto"
              data={richText}
              enableGutter={false}
            />
          )}
        </div>

        {/* Bottom: Logo Grid — 75% width so cell borders align with page grid lines at 25%/50%/75% */}
        <div className="relative w-3/4 mx-auto">
          {/* Grid of logos */}
          <div className="grid grid-cols-3 lg:grid-cols-6 border border-white/10 relative">
            {/* Crosshair at top-right of first cell */}
            <div
              className="absolute text-white z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${(1 / 6) * 100}%`, top: '0%' }}
            >
              <CrosshairIcon />
            </div>
            {/* Crosshair at bottom-left of last cell */}
            <div
              className="absolute text-white z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${(5 / 6) * 100}%`, top: '100%' }}
            >
              <CrosshairIcon />
            </div>

            {Array.from({ length: TOTAL_CELLS }).map((_, cellIndex) => {
              const logoIndex = grid[cellIndex]
              const logo = logoIndex !== null ? validLogos[logoIndex] : null
              const isAnimating = animatingCell === cellIndex

              return (
                <div
                  key={cellIndex}
                  className="relative border-r border-white/10 last:border-r-0 flex items-center justify-center p-4 lg:p-6 py-10 lg:py-14"
                >
                  {/* Scanline texture on empty cells */}
                  {!logo && (
                    <div
                      className="absolute inset-0 opacity-[0.08]"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
                      }}
                    />
                  )}

                  {/* Logo */}
                  {logo && typeof logo.logoMedia === 'object' && (
                    <div
                      className="w-full h-full flex items-center justify-center transition-all"
                      style={{
                        opacity: isAnimating ? 0 : 1,
                        filter: isAnimating ? 'blur(8px)' : 'blur(0px)',
                        transitionDuration: `${ANIMATION_DURATION}ms`,
                      }}
                    >
                      <Media
                        resource={logo.logoMedia}
                        imgClassName="max-h-12 lg:max-h-16 w-auto object-contain brightness-0 invert"
                      />
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

function CrosshairIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="10" y1="0" x2="10" y2="21" stroke="currentColor" strokeWidth="1" />
      <line x1="0" y1="10.5" x2="20" y2="10.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  )
}
