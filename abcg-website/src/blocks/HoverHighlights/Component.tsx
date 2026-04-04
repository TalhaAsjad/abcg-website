'use client'

import React, { useState } from 'react'

import type { HoverHighlightsBlock as HoverHighlightsBlockProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

export const HoverHighlightsBlock: React.FC<HoverHighlightsBlockProps> = (props) => {
  const { beforeHighlights, highlights, afterHighlights, link } = props
  const [active, setActive] = useState(0)

  if (!highlights || highlights.length === 0) return null

  return (
    <div className="relative overflow-hidden">
      <div className="container relative min-h-[80vh] pt-48 pb-64">
        {/* Left Column: Text + Links — aligned to first grid line */}
        <div className="md:w-1/2 flex flex-col justify-center gap-8 z-10 items-start relative">
          {beforeHighlights && (
            <span className="text-xl text-white text-left">{beforeHighlights}</span>
          )}

          <div className="flex flex-col gap-4">
            {highlights.map((highlight, index) => {
              const isActive = index === active

              return (
                <div key={index} className="group" onMouseOver={() => setActive(index)}>
                  <CMSLink
                    {...highlight.link}
                    className={[
                      'flex items-center gap-4 text-4xl md:text-5xl lg:text-md font-medium no-underline transition-opacity duration-700',
                      isActive ? 'opacity-100' : 'opacity-40',
                    ].join(' ')}
                  >
                    {highlight.text}
                  </CMSLink>

                  {/* Mobile-only images: show below the active link */}
                  <div className="md:hidden mt-4">
                    {isActive &&
                      highlight.media?.top &&
                      typeof highlight.media.top === 'object' &&
                      (highlight.media?.bottom && typeof highlight.media.bottom === 'object' ? (
                        /* Two images: overlapping layout */
                        <div className="relative w-full" style={{ paddingBottom: '80%' }}>
                          <div className="absolute bottom-0 left-0 w-full h-[75%]">
                            <Media
                              resource={highlight.media.bottom}
                              imgClassName="object-cover rounded-lg shadow-2xl"
                            />
                          </div>
                          <div className="absolute top-0 right-0 w-[55%] h-[50%] z-10">
                            <Media
                              resource={highlight.media.top}
                              imgClassName="object-cover rounded-lg shadow-2xl"
                            />
                          </div>
                        </div>
                      ) : (
                        /* Single image */
                        <Media
                          resource={highlight.media.top}
                          imgClassName="w-full h-auto rounded-lg"
                        />
                      ))}
                  </div>
                </div>
              )
            })}
          </div>

          {afterHighlights && <span className="text-lg text-white/80">{afterHighlights}</span>}

          {link && (
            <CMSLink
              {...link}
              className="link-fill-up flex items-center justify-between text-lg text-white border border-white/20 px-6 py-3 w-full md:w-1/2 mt-4 overflow-hidden cursor-pointer"
            >
              <ArrowIcon className="w-4 h-4" />
            </CMSLink>
          )}
        </div>
      </div>

      {/* Right Column: Images — positioned from 50% to beyond the right edge, clipped by viewport */}
      <div
        className="hidden md:block absolute top-0 bottom-0 right-0 pointer-events-none"
        style={{ left: '50%' }}
      >
        {highlights.map((highlight, index) => {
          const isActive = index === active
          const isBefore = index < active
          const isAfter = index > active
          const hasTop = highlight.media?.top && typeof highlight.media.top === 'object'
          const hasBottom = highlight.media?.bottom && typeof highlight.media.bottom === 'object'
          const hasBoth = hasTop && hasBottom

          return (
            <div
              key={index}
              className={[
                'absolute inset-0 pl-8',
                hasBoth ? 'flex items-center' : 'flex flex-col items-start justify-center gap-6',
              ].join(' ')}
            >
              {hasBoth ? (
                /* Two images: overlapping layout — bottom (large) + top (small) overlapping */
                <div className="relative w-full h-full">
                  {/* Bottom image — larger, serves as the base */}
                  <div
                    className="absolute transition-all duration-900 ease-out"
                    style={{
                      width: '150%',
                      height: '65%',
                      bottom: '8%',
                      left: '-13%',
                      opacity: isActive ? 1 : 0,
                      transform: isBefore
                        ? 'translateY(-4rem)'
                        : isAfter
                          ? 'translateY(4rem)'
                          : 'translateY(0)',
                    }}
                  >
                    <Media
                      resource={highlight.media!.bottom as any}
                      imgClassName="object-cover rounded-l-lg shadow-2xl"
                    />
                  </div>

                  {/* Top image — smaller, overlaps the bottom image */}
                  <div
                    className="w-[140%] absolute z-10 transition-all duration-700 ease-out"
                    style={{
                      right: '-35%',
                      top: '-11%',
                      opacity: isActive ? 1 : 0,
                      transform: isBefore
                        ? 'translateY(-6rem)'
                        : isAfter
                          ? 'translateY(6rem)'
                          : 'translateY(0)',
                    }}
                  >
                    <Media
                      resource={highlight.media!.top as any}
                      imgClassName="w-full h-auto object-contain"
                    />
                  </div>
                </div>
              ) : (
                /* Single image: original layout */
                <>
                  {highlight.media?.top && typeof highlight.media.top === 'object' && (
                    <div
                      className="relative aspect-video transition-all duration-700 ease-out"
                      style={{
                        opacity: isActive ? 1 : 0,
                        transform: isBefore
                          ? 'translateY(-6rem)'
                          : isAfter
                            ? 'translateY(6rem)'
                            : 'translateY(0)',
                      }}
                    >
                      <Media
                        resource={highlight.media.top}
                        imgClassName="object-cover rounded-l-lg shadow-2xl"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}
