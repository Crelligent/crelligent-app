/** Skeleton in the invoice's shape. */
export default function Loading() {
  const block = 'bg-(--cr-surface-2) rounded-md motion-safe:animate-pulse'
  return (
    <div
      aria-busy="true"
      aria-label="Loading invoice"
      className="rounded-lg border border-(--cr-border) bg-(--cr-surface) p-5 sm:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <div className={`${block} h-8 w-36`} />
          <div className={`${block} h-4 w-28`} />
        </div>
        <div className={`${block} h-8 w-16`} />
      </div>
      <div className="mt-8 grid grid-cols-2 gap-x-8 gap-y-5">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="space-y-1.5">
            <div className={`${block} h-3 w-16`} />
            <div className={`${block} h-4 w-32 max-w-full`} />
          </div>
        ))}
      </div>
      <div className={`${block} mt-8 h-10 w-full`} />
      <div className={`${block} mt-6 ml-auto h-10 w-48`} />
      <div className={`${block} mt-8 h-12 w-full`} />
    </div>
  )
}
