'use client'

import React, { useState } from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'


export const HeaderNav: React.FC<{ data: HeaderType; mobile?: boolean }> = ({ data, mobile }) => {
  const navItems = data?.navItems || []

  return (
    <nav className={mobile ? 'flex flex-col gap-4 items-center' : 'flex gap-10 items-center'}>
      {navItems.map((item, i) => {
        const { link, hasDropdown, dropdownItems } = item

        if (hasDropdown && dropdownItems && dropdownItems.length > 0) {
          return <DropdownNavItem key={i} link={link} dropdownItems={dropdownItems} mobile={mobile} />
        }

        return <CMSLink key={i} {...link} appearance="link" />
      })}
    </nav>
  )
}

type NavItem = NonNullable<HeaderType['navItems']>[number]

const DropdownNavItem: React.FC<{
  link: NavItem['link']
  dropdownItems: NonNullable<NavItem['dropdownItems']>
  mobile?: boolean
}> = ({ link, dropdownItems, mobile }) => {
  const [open, setOpen] = useState(false)
  let timeout: ReturnType<typeof setTimeout>

  const handleMouseEnter = () => {
    if (mobile) return
    clearTimeout(timeout)
    setOpen(true)
  }

  const handleMouseLeave = () => {
    if (mobile) return
    timeout = setTimeout(() => setOpen(false), 150)
  }

  return (
    <div
      className={mobile ? 'flex flex-col items-center' : 'relative'}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="flex items-center gap-1 text-white underline-offset-4 hover:underline"
        type="button"
        onClick={() => mobile && setOpen((prev) => !prev)}
      >
        {link.label}
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open && (
        <div className={mobile ? 'mt-2' : 'absolute top-full left-1/2 -translate-x-1/2 pt-2'}>
          <div className={mobile
            ? 'flex flex-col items-center gap-2'
            : 'bg-background border border-border rounded-lg shadow-lg py-2 min-w-55'
          }>
            {dropdownItems.map(({ link: subLink, description }, j) => {
              const href =
                subLink.type === 'reference' &&
                typeof subLink.reference?.value === 'object' &&
                subLink.reference.value.slug
                  ? `${subLink.reference?.relationTo !== 'pages' ? `/${subLink.reference?.relationTo}` : ''}/${subLink.reference.value.slug}`
                  : subLink.url

              if (!href) return null

              const newTabProps = subLink.newTab
                ? { rel: 'noopener noreferrer' as const, target: '_blank' as const }
                : {}

              return (
                <Link
                  key={j}
                  href={href}
                  className={mobile
                    ? 'block py-1 text-center'
                    : 'block px-4 py-2 hover:bg-muted transition-colors'
                  }
                  {...newTabProps}
                >
                  <span className={mobile
                    ? 'block text-xs text-muted-foreground'
                    : 'block text-sm font-medium text-foreground'
                  }>
                    {subLink.label}
                  </span>
                  {description && (
                    <span className="block text-xs text-muted-foreground mt-0.5">
                      {description}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
