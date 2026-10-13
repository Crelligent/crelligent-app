/** Route loading state shaped like the hero (DESIGN.md 6.8). Never shows the live counter. */
export default function Loading() {
  return (
    <div className="bg-aehi-bg pb-16 pt-10 lg:pb-24 lg:pt-14" aria-busy="true" aria-live="polite">
      <p className="sr-only">Loading</p>
      <div className="container-x">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-6">
          <div className="lg:col-span-7">
            <div className="skeleton h-3 w-40" />
            <div className="skeleton mt-6 h-10 w-[70%]" />
            <div className="skeleton mt-3 h-10 w-1/2" />
            <div className="mt-8 space-y-3">
              <div className="skeleton h-4 w-full max-w-prose" />
              <div className="skeleton h-4 w-[92%] max-w-prose" />
              <div className="skeleton h-4 w-[60%] max-w-prose" />
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <div className="skeleton h-12 w-full rounded-md sm:w-[200px]" />
              <div className="skeleton h-12 w-full rounded-md sm:w-[200px]" />
            </div>
          </div>
          <div className="hidden lg:col-span-4 lg:col-start-9 lg:block">
            <div className="skeleton h-[280px] w-full max-w-[320px] rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  )
}
