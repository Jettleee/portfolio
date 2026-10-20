import { useLayoutEffect, useRef, useState } from 'react'

/*
  Splits a list of <li> items into pages that fit the available height,
  so a section never needs scrolling. Items are measured in a hidden copy
  of the list, then packed greedily. Recomputes on resize and font load.
*/
export default function Paged({ pre, items, post, page, onPages, listClass = '' }) {
  const areaRef = useRef(null)
  const measureRef = useRef(null)
  const [pages, setPages] = useState(() => [items.map((_, i) => i)])

  useLayoutEffect(() => {
    const area = areaRef.current
    const measure = measureRef.current
    if (!area || !measure) return

    const compute = () => {
      const avail = area.clientHeight
      const heights = [...measure.children].map((el) => el.getBoundingClientRect().height + 1)
      const out = []
      let cur = []
      let used = 0
      heights.forEach((h, i) => {
        if (cur.length && used + h > avail) {
          out.push(cur)
          cur = []
          used = 0
        }
        cur.push(i)
        used += h
      })
      if (cur.length) out.push(cur)
      setPages((prev) => (JSON.stringify(prev) === JSON.stringify(out) ? prev : out))
      onPages?.(out.length)
    }

    compute()
    const ro = new ResizeObserver(compute)
    ro.observe(area)
    document.fonts?.ready.then(compute)
    return () => ro.disconnect()
  }, [items, onPages])

  const current = pages[Math.min(Math.max(page, 0), pages.length - 1)] || []

  return (
    <>
      {pre}
      <div className="paged-area" ref={areaRef}>
        <ul className={`${listClass} page`} key={current.join('-')}>
          {current.map((i) => items[i])}
        </ul>
        <div className="measure" aria-hidden="true">
          <ul className={listClass} ref={measureRef}>{items}</ul>
        </div>
      </div>
      {post}
    </>
  )
}
