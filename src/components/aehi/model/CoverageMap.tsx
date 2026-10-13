'use client'

import dynamic from 'next/dynamic'

/** The crelligent.com Africa map (components/landing/AehiMap) in AEHI colours. Coverage only, no scores. */
const AehiMap = dynamic(() => import('@/components/landing/AehiMap'), {
  ssr: false,
  loading: () => <div className="h-full w-full rounded-[18px] bg-aehi-surface/40" aria-hidden="true" />,
})

export function CoverageMap() {
  return (
    <div className="relative h-[460px] w-full overflow-hidden rounded-[18px] border border-aehi-line bg-aehi-bg-deep sm:h-[560px] lg:h-[620px]">
      <AehiMap height="100%" accent="#00C985" />
    </div>
  )
}
