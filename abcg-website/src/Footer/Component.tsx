import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'

import type { Footer } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { BackgroundGrid } from '@/components/BackgroundGrid'

export async function Footer() {
  const footerData = (await getCachedGlobal('footer', 1)()) as Footer

  const navItems = footerData?.navItems || []

  return (
    <footer className="relative mt-auto border-t border-border bg-black text-white">
      <BackgroundGrid />
      <div className="container">
        {/* Mobile: stacked, Desktop: logo + columns equally spaced in one row */}
        <div className="flex flex-col gap-10 md:flex-row md:justify-between md:gap-8">
          {/* Logo */}
          <div className="md:flex-1">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          {/* Nav Columns */}
          {navItems.map((column, i) => (
            <div key={i} className="md:flex-1">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-white/70 mb-6">
                {column.heading}
              </h3>
              <ul className="flex flex-col gap-3">
                {column.subLinks?.map(({ link }, j) => (
                  <li key={j}>
                    <CMSLink
                      className="text-white hover:text-white/80 transition-colors"
                      {...link}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}
