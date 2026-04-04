'use client'

import React, { useCallback, useState } from 'react'

import type { TestimonialSliderBlock as TestimonialSliderBlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { Media } from '@/components/Media'

export const TestimonialSliderBlock: React.FC<TestimonialSliderBlockProps> = ({
  richText,
  testimonials,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const items = testimonials ?? []
  const maxIndex = Math.max(0, items.length - 2)

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }, [maxIndex])

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }, [])

  if (items.length === 0) return null

  return (
    <div className="container pt-40">
      {/* Heading */}
      {richText && (
        <div className="lg:w-3/4 pb-16">
          <RichText
            className="[&_h2]:text-3xl [&_h2]:lg:text-5xl [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:tracking-tight"
            data={richText}
            enableGutter={false}
          />
        </div>
      )}

      {/* Slider track */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${currentIndex * 50}%)`,
          }}
        >
          {items.map((testimonial, index) => {
            const href = testimonial.caseStudyLink
              ? testimonial.caseStudyLink.type === 'custom'
                ? (testimonial.caseStudyLink.url ?? '#')
                : typeof testimonial.caseStudyLink.reference?.value === 'object'
                  ? `/${(testimonial.caseStudyLink.reference.value as any).slug ?? ''}`
                  : '#'
              : undefined

            const linkProps = testimonial.caseStudyLink?.newTab
              ? { target: '_blank' as const, rel: 'noopener noreferrer' }
              : {}

            return (
              <div
                key={testimonial.id ?? index}
                className="w-1/2 shrink-0 relative z-10 bg-black border-x border-white/10"
                style={{ marginLeft: index === 0 ? 0 : '-1px' }}
              >
                <a
                  href={href ?? '#'}
                  {...linkProps}
                  className="group border-t border-white/10 flex flex-col justify-between h-80 pl-8 pr-10 cursor-pointer no-underline"
                >
                  {/* Top section: quote + name */}
                  <div className="pt-10">
                    <p className="text-lg lg:text-[24px] text-white leading-snug tracking-tight">
                      &ldquo;{testimonial.feedback}&rdquo;
                    </p>

                    <p className="mt-6 text-lg text-white/90">{testimonial.name}</p>
                  </div>

                  {/* Bottom section: logo left, case study right */}
                  <div className="flex items-end justify-between pb-4">
                    <div className="flex items-center">
                      {testimonial.companyLogo && typeof testimonial.companyLogo === 'object' && (
                        <Media
                          resource={testimonial.companyLogo}
                          imgClassName="h-10 w-auto object-contain brightness-0 invert"
                        />
                      )}
                    </div>

                    <span className="flex items-center gap-2 text-base text-white/50 group-hover:text-white transition-colors pb-3">
                      <span>{testimonial.caseStudyLabel || 'Case Study'}</span>
                      <ArrowIcon className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </a>
              </div>
            )
          })}
        </div>
      </div>

      {/* Bottom border + Navigation Arrows */}
      <div className="border-t border-white/10 pt-6 pb-16 flex items-center gap-3">
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className="text-white disabled:text-white/20 transition-colors hover:text-white/70"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>
        <button
          onClick={goNext}
          disabled={currentIndex === maxIndex}
          className="text-white disabled:text-white/20 transition-colors hover:text-white/70"
          aria-label="Next slide"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
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

function ChevronLeftIcon({ className }: { className?: string }) {
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
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function ChevronRightIcon({ className }: { className?: string }) {
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
      <polyline points="9 6 15 12 9 18" />
    </svg>
  )
}
