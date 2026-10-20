import { useEffect, useState } from 'react'

// A stack frame after a classic overflow: name in the buffer,
// padding, then a smashed saved RBP and return address.
const enc = (s) => [...s].map((c) => c.charCodeAt(0))
const pad = (arr, n = 16) => [...arr, ...Array(Math.max(0, n - arr.length)).fill(0)].slice(0, n)

const ROWS = [
  { bytes: pad(enc('CHARAF YOUSSEF')), note: 'buf', kind: 'name' },
  { bytes: pad(enc('aka jettlee')), note: '', kind: 'name' },
  { bytes: pad(enc('AAAAAAAAAAAAAAAA')), note: 'padding', kind: 'pad' },
  {
    bytes: [...enc('BBBBBBBB'), 0x50, 0x4f, 0x2b, 0x1a, 0x3c, 0x7f, 0x00, 0x00],
    note: 'rbp, rip',
    kind: 'ret',
  },
]

const BASE = 0x7ffd5e2a1c00
const hex = (n) => n.toString(16).padStart(2, '0')
const printable = (b) => (b >= 0x20 && b < 0x7f ? String.fromCharCode(b) : '.')
const rand = () => Math.floor(Math.random() * 256)

const TOTAL = ROWS.length * 16

export default function HexDump() {
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const [settled, setSettled] = useState(reduce ? TOTAL : 0)
  const [, tick] = useState(0)

  useEffect(() => {
    if (reduce) return
    let raf
    const start = performance.now()
    const delay = 350
    const dur = 1300
    const loop = (t) => {
      const p = Math.min(1, Math.max(0, (t - start - delay) / dur))
      setSettled(Math.floor(p * TOTAL))
      tick((n) => n + 1)
      if (p < 1) raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [reduce])

  return (
    <figure className="dump" aria-label="Memory dump spelling Charaf Youssef, aka Jettlee, followed by an overwritten return address">
      <div className="dump-head" aria-hidden="true">
        <span>gef➤ x/64bx $rsp</span>
      </div>
      <div className="dump-body" aria-hidden="true">
        {ROWS.map((row, r) => {
          const shown = row.bytes.map((b, i) => (r * 16 + i < settled ? b : rand()))
          return (
            <div className={`dump-row is-${row.kind}`} key={r}>
              <span className="addr">0x{(BASE + r * 16).toString(16)}</span>
              <span className="bytes">
                {shown.map((b, i) => (
                  <span
                    key={i}
                    className={
                      'b' +
                      (r * 16 + i < settled ? ' on' : '') +
                      (row.kind === 'ret' && i >= 8 ? ' hot' : '') +
                      (i === 8 ? ' gap' : '')
                    }
                  >
                    {hex(b)}
                  </span>
                ))}
              </span>
              <span className="ascii">{shown.map(printable).join('')}</span>
              <span className="note">{row.note}</span>
            </div>
          )
        })}
      </div>
    </figure>
  )
}
