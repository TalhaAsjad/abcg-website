'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [theme, setTheme] = useState<string | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { headerTheme, setHeaderTheme } = useHeaderTheme()
  const pathname = usePathname()

  useEffect(() => {
    setHeaderTheme(null)
    setMobileMenuOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  useEffect(() => {
    if (headerTheme && headerTheme !== theme) setTheme(headerTheme)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerTheme])

  return (
    <header className="relative z-20 w-full bg-black" {...(theme ? { 'data-theme': theme } : {})}>
      <div className="container py-8 flex items-center justify-between">
        {/* Left logo — always visible */}
        <Link href="/">
          <Logo loading="eager" priority="high" className="invert dark:invert-0 w-24 h-auto" />
        </Link>

        {/* Desktop nav — centered, hidden on mobile */}
        <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
          <HeaderNav data={data} />
        </div>

        {/* Right logo — hidden on mobile */}
        <Link href="/" className="hidden lg:block">
          <Logo loading="eager" priority="high" className="invert dark:invert-0 w-24 h-auto" />
        </Link>

        {/* Hamburger button — visible on mobile only */}
        <button
          className="lg:hidden text-white"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          type="button"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-black border-t border-white/10">
          <div className="container py-6">
            <HeaderNav data={data} mobile />
          </div>
        </div>
      )}
    </header>
  )
}
