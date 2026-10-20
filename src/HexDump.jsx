import { useEffect, useState } from 'react'

// One stack frame, before and after a classic overflow.
// On load the input is written byte by byte from the bottom of the buffer
// upwards, smashing saved RBP and the return address. It plays once.

const enc = (s) => [...s].map((c) => c.charCodeAt(0))
const pad = (arr, n = 16) => [...arr, ...Array(Math.max(0, n - arr.length)).fill(0)].slice(0, n)
const le64 = (hexStr) => hexStr.padStart(16, '0').match(/../g).reverse().map((h) => parseInt(h, 16))

const BEFORE = [
  ...Array(48).fill(0),
  ...le64('7ffd5e2a1c70'), // saved rbp
  ...le64('555555555249'), // ret -> main+73
]
const AFTER = [
  ...pad(enc('CHARAF YOUSSEF')),
  ...pad(enc('aka jettlee')),
  ...pad(enc('AAAAAAAAAAAAAAAA')),
  ...enc('BBBBBBBB'),
  ...le64('7f3c1a2b4f50'), // ret -> contact
]
const NOTES = ['buf', '', 'padding', 'saved rbp, ret']
const KIND = ['name', 'name', 'pad', 'ret']

const BASE = 0x7ffd5e2a1c00
const TOTAL = 64
const hex = (n) => n.toString(16).padStart(2, '0')
const printable = (b) => (b >= 0x20 && b < 0x7f ? String.fromCharCode(b) : '.')

const prefersReduced = () =>
  typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

// The overflow plays once per page load, not every time the intro is shown again.
let played = false

export default function HexDump() {
  const [written, setWritten] = useState(() => (prefersReduced() || played ? TOTAL : 0))

  useEffect(() => {
    if (prefersReduced() || played) return
    let raf
    let start
    const delay = 600
    const dur = 1500
    const loop = (t) => {
      start ??= t
      const p = Math.min(1, Math.max(0, (t - start - delay) / dur))
      setWritten(Math.round(p * TOTAL))
      if (p < 1) raf = requestAnimationFrame(loop)
      else played = true
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  const done = written >= TOTAL
  const bytes = BEFORE.map((b, i) => (i < written ? AFTER[i] : b))

  return (
    <figure
      className={`dump term${done ? ' is-done' : ''}`}
      aria-label="Debugger memory dump: the input CHARAF YOUSSEF, aka jettlee, overflows the buffer and overwrites the return address so execution jumps to the contact section."
    >
      <div className="term-head" aria-hidden="true">gef➤ x/64bx $rsp</div>
      <div className="dump-body" aria-hidden="true">
        {[0, 1, 2, 3].map((r) => {
          const row = bytes.slice(r * 16, r * 16 + 16)
          return (
            <div className={`dump-row is-${KIND[r]}`} key={r}>
              <span className="addr">0x{(BASE + r * 16).toString(16)}</span>
              <span className="bytes">
                {row.map((b, j) => {
                  const i = r * 16 + j
                  let cls = 'b'
                  if (i < written) cls += ' on'
                  if (i < written && i >= written - 3 && !done) cls += ' just'
                  if (r === 3 && j >= 8 && i < written) cls += ' hot'
                  if (j === 8) cls += ' gap'
                  return <span key={j} className={cls}>{hex(b)}</span>
                })}
              </span>
              <span className="ascii">{row.map(printable).join('')}</span>
              <span className="note">{NOTES[r]}</span>
            </div>
          )
        })}
      </div>
      <a className="dump-rip" href="#contact" aria-label="Return address now points to the contact section">
        <span className="reg">$rip</span>
        <span>: {done ? '0x00007f3c1a2b4f50' : '0x0000555555555249'}</span>
        <span className="sym">{done ? '→ <contact+0>' : '→ <main+73>'}</span>
      </a>
    </figure>
  )
}
