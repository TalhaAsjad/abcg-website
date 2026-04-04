import React from 'react'

export const BackgroundGrid: React.FC<{ className?: string; zIndex?: number }> = ({
  className,
  zIndex = 0,
}) => {
  return (
    <div
      className={['absolute inset-0 container mx-auto pointer-events-none', className]
        .filter(Boolean)
        .join(' ')}
      style={{ zIndex }}
      aria-hidden="true"
    >
      {/* Mobile: side borders only */}
      <div className="grid grid-cols-1 lg:hidden h-full">
        <div className="border-x border-white/10 h-full" />
      </div>
      {/* Desktop: 4-col */}
      <div className="hidden lg:grid grid-cols-4 h-full">
        <div className="border-x border-white/10 h-full" />
        <div className="border-r border-white/10 h-full" />
        <div className="border-r border-white/10 h-full" />
        <div className="border-r border-white/10 h-full" />
      </div>
    </div>
  )
}
