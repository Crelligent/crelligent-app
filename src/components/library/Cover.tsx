'use client'

import Image from 'next/image'
import { useState } from 'react'
import type { LibraryType } from '@/data/library'
import { TYPE_LABEL } from '@/data/library'
import { cx } from '@/components/foundry/ui'

/** Per-type tint for the fallback panel (Crelligent tokens only). */
const TINT: Record<LibraryType, string> = {
  whitepaper: 'var(--cr-accent)',
  article: 'var(--cr-l1-ink)',
  research: 'var(--cr-l3-ink)',
  'ceo-corner': 'var(--cr-warning)',
}

/**
 * Library cover photo. Renders the local /images/insights/<slug>.webp with next/image; if the file is
 * missing (or fails to load) it shows a branded dark panel with a fine grid and the type label.
 * The parent sets the aspect ratio; this fills it.
 */
export function Cover({
  src,
  alt,
  type,
  sizes,
  priority = false,
  showLabel = true,
  className,
}: {
  src: string
  alt: string
  type: LibraryType
  sizes: string
  priority?: boolean
  /** Show the type label inside the fallback panel. */
  showLabel?: boolean
  className?: string
}) {
  const [failed, setFailed] = useState(false)
  const tint = TINT[type]

  return (
    <div
      className={cx(
        // Callers that pass `absolute` position the cover themselves; adding `relative` too would
        // override it, collapse the box to zero height and stop the lazy image from ever loading.
        !/(^|\s)(absolute|fixed)(\s|$)/.test(className ?? '') && 'relative',
        'overflow-hidden bg-(--cr-surface-2)',
        className,
      )}
    >
      {/* Fallback panel: always painted underneath, visible while loading and when the photo is missing */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage: [
            `radial-gradient(120% 90% at 100% 0%, color-mix(in srgb, ${tint} 22%, transparent) 0%, transparent 60%)`,
            `radial-gradient(90% 80% at 0% 100%, color-mix(in srgb, ${tint} 10%, transparent) 0%, transparent 65%)`,
            'linear-gradient(to right, var(--cr-border) 1px, transparent 1px)',
            'linear-gradient(to bottom, var(--cr-border) 1px, transparent 1px)',
            'linear-gradient(160deg, var(--cr-surface-2), var(--cr-bg))',
          ].join(','),
          backgroundSize: 'auto, auto, 32px 32px, 32px 32px, auto',
        }}
      >
        <svg
          viewBox="0 0 120 120"
          className="absolute -right-6 -top-6 h-[85%] w-auto opacity-40"
          fill="none"
          stroke={tint}
          strokeWidth="0.6"
        >
          <circle cx="60" cy="60" r="56" />
          <circle cx="60" cy="60" r="40" />
          <circle cx="60" cy="60" r="24" />
          <path d="M4 60h112M60 4v112" strokeOpacity="0.5" />
        </svg>
        {showLabel && (
          <span
            className="absolute bottom-3 left-4 font-mono text-[11px] uppercase tracking-[0.2em]"
            style={{ color: `color-mix(in srgb, ${tint} 80%, var(--cr-text))` }}
          >
            Crelligent · {TYPE_LABEL[type]}
          </span>
        )}
      </div>

      {!failed && (
        <>
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
            onError={() => setFailed(true)}
          />
          {/* Subtle dark gradient so chips and text stay readable on any photo */}
          <div
            aria-hidden
            className="absolute inset-0 bg-linear-to-t from-(--cr-bg)/70 via-(--cr-bg)/10 to-transparent"
          />
        </>
      )}
    </div>
  )
}
