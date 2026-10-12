import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { formatLibraryDate, TYPE_LABEL, type LibraryItem } from '@/data/library'
import { chip, chipAccent, cx } from '@/components/foundry/ui'
import { Cover } from './Cover'

function TypeChip({ item, onPhoto = false }: { item: LibraryItem; onPhoto?: boolean }) {
  const accent = item.type === 'whitepaper'
  return (
    <span
      className={cx(
        accent ? chipAccent : chip,
        onPhoto && 'bg-(--cr-bg)/80 backdrop-blur-sm',
        onPhoto && !accent && 'text-(--cr-text)',
      )}
    >
      {TYPE_LABEL[item.type]}
    </span>
  )
}

export function LibraryMeta({ item, className }: { item: LibraryItem; className?: string }) {
  return (
    <p className={cx('flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-(--cr-text-muted)', className)}>
      {item.date ? (
        <time dateTime={item.date} className="tabular">
          {formatLibraryDate(item.date)}
        </time>
      ) : (
        <span>{item.statusLabel ?? 'Undated'}</span>
      )}
      {item.readingMinutes ? (
        <>
          <span aria-hidden>·</span>
          <span className="tabular">{item.readingMinutes} min read</span>
        </>
      ) : null}
    </p>
  )
}

/** Grid card: 16:9 photo, type chip, title, excerpt, date/status and reading time. Whole card is clickable. */
export function LibraryCard({
  item,
  headingLevel = 'h3',
  sizes = '(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw',
}: {
  item: LibraryItem
  headingLevel?: 'h2' | 'h3'
  sizes?: string
}) {
  const H = headingLevel
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-(--cr-border) bg-(--cr-surface) transition-colors duration-150 hover:border-(--cr-border-strong) has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-(--cr-accent)">
      <div className="relative aspect-video">
        <Cover
          src={item.cover}
          alt={item.coverAlt}
          type={item.type}
          sizes={sizes}
          showLabel={false}
          className="absolute inset-0 transition-transform duration-300 motion-safe:group-hover:scale-[1.02]"
        />
        <div className="absolute left-3 top-3">
          <TypeChip item={item} onPhoto />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <LibraryMeta item={item} />
        <H className="mt-2 font-outfit text-lg leading-snug font-normal! tracking-[-0.01em] text-(--cr-text)">
          <Link
            href={item.href}
            className="no-underline after:absolute after:inset-0 after:content-[''] group-hover:text-(--cr-accent-ink) focus-visible:outline-none"
          >
            {item.title}
          </Link>
        </H>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-(--cr-text-muted)">{item.excerpt}</p>
      </div>
    </article>
  )
}

/** Lead card for the featured item (the whitepaper): photo left, text right on wide screens. */
export function LibraryLeadCard({ item }: { item: LibraryItem }) {
  return (
    <article className="group relative overflow-hidden rounded-lg border border-(--cr-border) bg-(--cr-surface) transition-colors duration-150 hover:border-(--cr-border-strong) has-[a:focus-visible]:ring-2 has-[a:focus-visible]:ring-(--cr-accent) lg:grid lg:grid-cols-12">
      <div className="relative aspect-video lg:col-span-7 lg:aspect-auto lg:min-h-[360px]">
        <Cover
          src={item.cover}
          alt={item.coverAlt}
          type={item.type}
          sizes="(min-width: 1024px) 640px, 100vw"
          priority
          showLabel={false}
          className="absolute inset-0"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <TypeChip item={item} onPhoto />
          <span className={cx(chip, 'bg-(--cr-bg)/80 backdrop-blur-sm text-(--cr-text)')}>Featured</span>
        </div>
      </div>
      <div className="flex flex-col justify-center p-5 sm:p-6 lg:col-span-5 lg:p-8">
        <LibraryMeta item={item} />
        <h2 className="mt-3 font-outfit text-2xl leading-tight font-normal! tracking-[-0.02em] text-(--cr-text) lg:text-[1.75rem]">
          <Link
            href={item.href}
            className="no-underline after:absolute after:inset-0 after:content-[''] group-hover:text-(--cr-accent-ink) focus-visible:outline-none"
          >
            {item.title}
          </Link>
        </h2>
        <p className="mt-3 text-base leading-relaxed text-(--cr-text-muted)">{item.excerpt}</p>
        <p aria-hidden className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-(--cr-accent-ink)">
          Read the {TYPE_LABEL[item.type].toLowerCase()}
          <ArrowRight className="size-4 transition-transform duration-150 motion-safe:group-hover:translate-x-0.5" />
        </p>
      </div>
    </article>
  )
}
