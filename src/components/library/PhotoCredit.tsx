import { PHOTO_CREDIT } from '@/data/library'
import { cx, linkAccent } from '@/components/foundry/ui'

/** Freepik free-licence attribution for the Library cover photos. */
export function PhotoCredit({ className }: { className?: string }) {
  return (
    <p className={cx('text-xs text-(--cr-text-muted)', className)}>
      <a href={PHOTO_CREDIT.href} target="_blank" rel="noopener noreferrer" className={linkAccent}>
        {PHOTO_CREDIT.label}
        <span className="sr-only"> (opens in new tab)</span>
      </a>
    </p>
  )
}
