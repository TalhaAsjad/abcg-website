'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect, useState } from 'react'

import type { Page } from '@/payload-types'

import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import Link from 'next/link'
import { CopyButton } from './CopyButton'

export const HighImpactHero: React.FC<Page['hero']> = ({
  links,
  heroImage1,
  heroImage2,
  richText,
}) => {
  const { setHeaderTheme } = useHeaderTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setHeaderTheme('dark')
  })

  useEffect(() => {
    const timer = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(timer)
  }, [])

  return (
    <div
      className="relative -mt-[10.4rem] flex items-center text-white overflow-hidden"
      data-theme="dark"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-10"
        src="https://l4wlsi8vxy8hre4v.public.blob.vercel-storage.com/video/glass-animation-5-f0gPcjmKFIV3ot5MGOdNy2r4QHBoXt.mp4"
      />
      <div className="absolute inset-0 bg-black/40 -z-[5]" />
      <div
        className="absolute inset-0 -z-4 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 6px 3px at center, transparent 60%, rgba(0,0,0,0.5) 100%)',
          backgroundSize: '8px 5px',
        }}
      />
      {/* Grid lines - mobile: side borders only */}
      <div className="container absolute inset-0 z-0 grid grid-cols-1 lg:hidden mx-auto left-0 right-0 pointer-events-none">
        <div className="border-x border-white/10 min-h-screen" />
      </div>
      {/* Grid lines - desktop: 4-col */}
      <div className="container absolute inset-0 z-0 hidden lg:grid grid-cols-4 mx-auto left-0 right-0 pointer-events-none">
        <div className="border-x border-white/10 min-h-screen" />
        <div className="border-r border-white/10 min-h-screen" />
        <div className="border-r border-white/10 min-h-screen" />
        <div className="border-r border-white/10 min-h-screen" />
      </div>
      {/* Content */}
      <div className="container min-h-screen z-10 relative flex flex-col justify-center">
        {/* Left: Heading + Links */}
        <div className=" lg:mt-40 pb-12 lg:pb-20">
          {/* Heading */}
          <div
            className="mb-8"
            style={{
              transform: mounted ? 'translateY(0)' : 'translateY(20px)',
              transition: 'transform 0.6s ease-out',
            }}
          >
            {richText && (
              <RichText
                className="[&_h1]:text-[2.5rem] [&_h1]:sm:text-[4rem] [&_h1]:md:text-[4.5rem] [&_h1]:lg:text-[3.25rem] [&_h1]:xl:text-[4rem] [&_h1]:font-medium [&_h1]:leading-none [&_h1]:w-full [&_h1]:lg:max-w-[calc((100vw-4rem)/4+1.5rem)]"
                data={richText}
                enableGutter={false}
                style={{ letterSpacing: '-0.05em' }}
              />
            )}
          </div>

          {/* Links */}
          {Array.isArray(links) && links.length > 0 && (
            <div
              className="mt-8 w-full lg:w-1/4"
              style={{
                transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                transition: 'transform 0.6s ease-out 0.1s',
              }}
            >
              {links.map(({ text, link }, i) =>
                i === 0 ? (
                  <CopyButton
                    key={i}
                    textToCopy={text}
                    className="group link-fill-up flex w-full items-center justify-between border-y border-x-0 border-white/10 bg-transparent px-3 py-4 lg:px-5 lg:py-6 font-mono text-xs lg:text-sm overflow-hidden cursor-pointer"
                    style={{ color: 'white' }}
                    copiedChildren={
                      <>
                        <span className="text-white group-hover:text-black transition-colors duration-300">
                          Copied!
                        </span>
                        <span className="text-white group-hover:text-black transition-all duration-300">
                          <svg
                            width="13"
                            height="13"
                            viewBox="0 0 13 13"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M2 7L5 10L11 3"
                              stroke="currentColor"
                              strokeWidth="1"
                              className="transition-colors duration-300"
                            />
                          </svg>
                        </span>
                      </>
                    }
                  >
                    <span className="flex items-center gap-2 overflow-hidden transition-colors duration-300 group-hover:text-black">
                      <span className="text-white transition-colors duration-300 group-hover:text-black">
                        $
                      </span>
                      <span className="relative inline-flex flex-col h-[1.25em] overflow-hidden">
                        <span className="transition-transform duration-300 lg:group-hover:-translate-y-full">
                          {text}
                        </span>
                        <span className="hidden lg:inline transition-transform duration-300 lg:group-hover:-translate-y-full">
                          {text}
                        </span>
                      </span>
                    </span>
                    <span className="text-white transition-all duration-300 lg:group-hover:translate-x-0.5 group-hover:text-black group-hover:opacity-100">
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.5 4.5H8.5V12.5H0.5V4.5Z"
                          stroke="currentColor"
                          strokeWidth="1"
                          className="transition-colors duration-300"
                        />
                        <path
                          d="M4.5 3V0.5H12.5V8.5H10"
                          stroke="currentColor"
                          strokeWidth="1"
                          className="transition-colors duration-300"
                        />
                      </svg>
                    </span>
                  </CopyButton>
                ) : (
                  <Link
                    key={i}
                    href={link}
                    className="group link-fill-up flex w-full items-center justify-between border-b border-x-0 border-white/10 bg-transparent px-3 py-4 lg:px-5 lg:py-6 text-xs lg:text-sm font-semibold overflow-hidden"
                    style={{ color: 'white' }}
                  >
                    <span className="relative inline-flex flex-col h-[1.25em] overflow-hidden transition-colors duration-300 group-hover:text-black">
                      <span className="transition-transform duration-300 group-hover:-translate-y-full">
                        {text}
                      </span>
                      <span className="transition-transform duration-300 group-hover:-translate-y-full">
                        {text}
                      </span>
                    </span>
                    <span className="text-white transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-black group-hover:opacity-100">
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 12L12 1"
                          stroke="currentColor"
                          strokeWidth="1"
                          className="transition-colors duration-300"
                        />
                        <path
                          d="M3 1H12V10"
                          stroke="currentColor"
                          strokeWidth="1"
                          className="transition-colors duration-300"
                        />
                      </svg>
                    </span>
                  </Link>
                ),
              )}
            </div>
          )}
        </div>

        {/* Right: Overlapping images — desktop */}
        <div className="absolute top-0 right-0 bottom-0 hidden lg:block" style={{ width: '60%' }}>
          {/* Image 1 — on top, upper-right */}
          {heroImage1 && typeof heroImage1 === 'object' && (
            <div
              className="absolute z-2"
              style={{
                top: '20%',
                right: '-40%',
                width: '100%',
                boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.5)',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(60px)',
                transition: 'opacity 1.2s ease-out 0.25s, transform 1.2s ease-out 0.25s',
              }}
            >
              <Media resource={heroImage1} priority imgClassName="rounded-lg w-[130%] h-auto" />
            </div>
          )}
          {/* Image 2 — behind, bottom-left */}
          {heroImage2 && typeof heroImage2 === 'object' && (
            <div
              className="absolute z-1"
              style={{
                bottom: '-4%',
                left: '13%',
                width: '100%',
                boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.4)',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(60px)',
                transition: 'opacity 1.2s ease-out 0.5s, transform 1.6s ease-out 0.5s',
              }}
            >
              <Media resource={heroImage2} priority imgClassName="rounded-lg w-[140%] h-auto" />
            </div>
          )}
        </div>

        {/* Mobile images — stacked below content */}
        <div className="relative lg:hidden overflow-hidden" style={{ height: '60vw' }}>
          {heroImage1 && typeof heroImage1 === 'object' && (
            <div
              className="absolute z-2"
              style={{
                top: '0',
                right: '0',
                width: '85%',
                boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.5)',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(60px)',
                transition: 'opacity 1.2s ease-out 0.25s, transform 1.2s ease-out 0.25s',
              }}
            >
              <Media resource={heroImage1} priority imgClassName="rounded-lg w-full h-auto" />
            </div>
          )}
          {heroImage2 && typeof heroImage2 === 'object' && (
            <div
              className="absolute z-1"
              style={{
                bottom: '5%',
                left: '0',
                width: '80%',
                boxShadow: '0 25px 60px -10px rgba(0, 0, 0, 0.4)',
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(60px)',
                transition: 'opacity 1.2s ease-out 0.5s, transform 1.2s ease-out 0.5s',
              }}
            >
              <Media resource={heroImage2} priority imgClassName="rounded-lg w-full h-auto" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
