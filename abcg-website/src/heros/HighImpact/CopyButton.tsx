'use client'

import React, { useState } from 'react'

export function CopyButton({
  textToCopy,
  className,
  style,
  children,
  copiedChildren,
}: {
  textToCopy: string
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
  copiedChildren?: React.ReactNode
}) {
  const [copied, setCopied] = useState(false)
  const [tapped, setTapped] = useState(false)

  const isTouchDevice =
    typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

  return (
    <button
      type="button"
      className={`${className}${tapped ? ' filled' : ''}`}
      style={style}
      onClick={async () => {
        await navigator.clipboard.writeText(textToCopy)
        if (isTouchDevice) {
          setTapped(true)
        }
        setCopied(true)
        setTimeout(() => setCopied(false), 1000)
      }}
    >
      {copied ? copiedChildren : children}
    </button>
  )
}
