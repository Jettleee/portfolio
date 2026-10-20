import { useCallback, useEffect, useRef, useState } from 'react'
import HexDump from './HexDump.jsx'
import Paged from './Paged.jsx'
import {
  profile, links, experience, projects, ctf, certs, skills, languages, writeups,
} from './data.js'

const addr = (n) => '0x' + n.toString(16).padStart(16, '0')
const ext = { target: '_blank', rel: 'noreferrer' }

/* ---------- Section contents, as lists of items the pager can split ---------- */

const experienceItems = [
  ...experience.map((job, i) => (
    <li key={job.fn} className="frame">
      <p className="frame-sig">
        <span className="frame-no">#{i}</span>
        <span className="frame-addr">{addr(0x5555555552a1 + i * 0x3c)}</span>
        <span className="frame-in">in</span>
        <span className="frame-fn">{job.fn} ()</span>
        <span className="frame-when">{job.when}</span>
      </p>
      <div className="frame-body">
        <h3>{job.title}</h3>
        <p className="frame-org"><strong>{job.org}</strong>, {job.place}</p>
        {job.points.length > 0 && (
          <ul className="frame-points">
            {job.points.map((pt, k) => <li key={k}>{pt}</li>)}
          </ul>
        )}
      </div>
    </li>
  )),
  <li key="main" className="frame frame-main" aria-hidden="true">
    <p className="frame-sig">
      <span className="frame-no">#{experience.length}</span>
      <span className="frame-addr">{addr(0x555555555189)}</span>
      <span className="frame-in">in</span>
      <span className="frame-fn">main ()</span>
    </p>
  </li>,
]

const ctfItems = [
  <li key="stats" className="score-stats-row">
    <ul className="score-stats">
      {ctf.stats.map((s) => (
        <li key={s.big}><span className="stat-big">{s.big}</span><span className="stat-label">{s.label}</span></li>
      ))}
    </ul>
  </li>,
  ...ctf.results.map((r) => (
  <li key={r.event} className="score-row">
    <div className="score-event">
      <h3>{r.event}</h3>
      {r.note && <p>{r.note}</p>}
    </div>
    <ul className="score-ranks">
      {r.ranks.map((k) => (
        <li key={k.label} className={k.n === 1 ? 'rank is-first' : 'rank'}>
          <span className="rank-num">
            {k.top && <span className="rank-top">top</span>}
            {k.n}
            {!k.top && k.n === 1 && <span className="rank-ord">st</span>}
          </span>
          <span className="rank-label">{k.label}</span>
        </li>
      ))}
    </ul>
  </li>
  )),
]

const writeupItems = writeups.flatMap((d) => [
  <li key={d.dir} className="ls-dirrow">
    <p className="ls-line">
      <span className="ls-perm">drwxr-xr-x</span>
      <span className="ls-owner">jettlee</span>
      <span className="ls-size">4096</span>
      <span className="ls-date">Oct 18</span>
      <span className="ls-name">{d.dir}/</span>
    </p>
  </li>,
  ...d.files.map((f) => (
    <li key={d.dir + f.file} className="ls-file">
      <a href={f.url} {...ext} className="ls-line">
        <span className="ls-perm">-rw-r--r--</span>
        <span className="ls-owner">jettlee</span>
        <span className="ls-size">{f.size}</span>
        <span className="ls-date">{f.date}</span>
        <span className="ls-name">{f.file}</span>
      </a>
      <p className="ls-about">{f.about}</p>
    </li>
  )),
])

const projectItems = projects.map((p, i) => (
  <li key={p.name} className="func">
    <p className="func-sig">
      <span className="frame-addr">{addr(0x555555555400 + i * 0x120)}</span>
      <span className={p.status === 'done' ? 'func-when' : 'func-when is-wip'}>
        {p.status === 'done' ? p.when : `In progress, ${p.when}`}
      </span>
    </p>
    <h3>{p.name}</h3>
    <p className="func-sum">{p.summary}</p>
    <p className="func-tags">{p.tags.join(', ')}</p>
  </li>
))

const certItems = certs.map((c) => (
  <li key={c.key} className={`cs-row is-${c.status}`}>
    <span className="cs-key">{c.key}</span>
    <span className="cs-name">
      <strong>{c.name}</strong>
      <span>{c.issuer}</span>
    </span>
    <span className="cs-status">
      <span aria-hidden="true">: </span>
      {c.status === 'enabled' ? '✓ Enabled' : '~ Partial'}
      <span className="sr-only">{c.status === 'enabled' ? ', certified' : ', in progress'}</span>
    </span>
  </li>
))

const skillItems = (() => {
  let cursor = 0x555555554000
  return skills.map((s) => {
    const start = cursor
    const end = start + s.items.length * 0x1000
    cursor = end + 0x1000
    return (
      <li key={s.group} className="vm-row">
        <p className="vm-line" aria-hidden="true">
          <span className="vm-addr">{addr(start)}</span>
          <span className="vm-addr vm-end">{addr(end)}</span>
          <span className={`vm-perm${s.perm.includes('x') ? ' is-x' : ''}`}>{s.perm}</span>
          <span className="vm-path">{s.path}</span>
        </p>
        <div className="vm-body">
          <h3>{s.group}</h3>
          <p>{s.items.join(', ')}</p>
        </div>
      </li>
    )
  })
})()

/* ---------- Screens, in order. Arrows step through pages, then screens. ---------- */

const SCREENS = [
  { id: 'top', title: 'Intro', kind: 'hero' },
  { id: 'about', title: 'About', kind: 'about' },
  {
    id: 'experience', title: 'Experience', cmd: 'bt',
    lede: 'Most recent first, the way a backtrace reads.',
    items: experienceItems, listClass: 'bt',
  },
  {
    id: 'ctf', title: 'CTF results', cmd: '!cat scoreboard', lede: 'Best finishes so far.',
    items: ctfItems, listClass: 'scoreboard',
    post: (
      <p className="term-links">
        <a href={links.ctftime} {...ext}>CTFtime profile</a>
        <a href={links.htb} {...ext}>Hack The Box profile</a>
      </p>
    ),
  },
  {
    id: 'writeups', title: 'Writeups', cmd: '!ls -la ~/CTFs-and-Writeups/*',
    lede: 'Step-by-step solutions to labs and CTF challenges. Each one opens on GitHub.',
    pre: <p className="ls-total" aria-hidden="true">~/CTFs-and-Writeups</p>,
    items: writeupItems, listClass: 'ls no-rules',
    post: (
      <p className="term-links">
        <a href={links.writeups} {...ext}>Open the repo on GitHub</a>
      </p>
    ),
  },
  {
    id: 'projects', title: 'Projects', cmd: 'info functions project_',
    lede: 'Academic and personal builds. Code for the academic ones is private.',
    items: projectItems, listClass: 'funcs',
  },
  {
    id: 'certs', title: 'Certifications', cmd: 'checksec',
    lede: 'Enabled means certified. Partial means in progress.',
    pre: <p className="cs-head" aria-hidden="true">[+] checksec for '/home/jettlee/certs'</p>,
    items: certItems, listClass: 'checksec',
  },
  {
    id: 'skills', title: 'Skills', cmd: 'vmmap',
    lede: `What I work with, mapped by area. Languages: ${languages}.`,
    pre: (
      <p className="vm-legend" aria-hidden="true">
        <span>Start</span><span className="vm-end">End</span><span>Perm</span><span>Path</span>
      </p>
    ),
    items: skillItems, listClass: 'vmmap',
  },
  { id: 'contact', title: 'Contact', kind: 'contact' },
]

/* ---------- Screen bodies ---------- */

function Hero() {
  return (
    <div className="screen-free screen-hero">
      <section className="hero" aria-labelledby="hero-h">
        <div className="hero-text">
          <h1 id="hero-h">Charaf Youssef</h1>
          <p className="hero-role">{profile.role}</p>
          <p className="hero-intro">{profile.intro}</p>
          <div className="hero-actions">
            <a className="btn btn-solid" href={`mailto:${links.email}`}>Email me</a>
            <a className="btn" href="#writeups">Read my writeups</a>
          </div>
        </div>
        <HexDump />
      </section>
    </div>
  )
}

function About() {
  return (
    <div className="screen-free screen-about">
      <section className="about" aria-labelledby="about-h">
        <h2 id="about-h">About</h2>
        {profile.about.map((p, i) => <p key={i}>{p}</p>)}
        <p className="looking">{profile.lookingFor}</p>
      </section>
    </div>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(links.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${links.email}`
    }
  }
  return (
    <div className="screen-free">
      <section className="section" aria-labelledby="contact-h">
        <header className="section-head">
          <h2 id="contact-h">Contact</h2>
          <p className="lede">Have a scope that needs testing, or a PFE spot for 2027? Email is the fastest way to reach me.</p>
        </header>
        <div className="term">
          <div className="term-head"><span><span aria-hidden="true">$ </span>python3 hire.py</span></div>
          <div className="term-body">
            <pre className="code" aria-label="Python snippet: connect to Charaf by email and say hello">
<span className="k">from</span> pwn <span className="k">import</span> *{'\n'}
{'\n'}
io = remote(<span className="s">'{links.email}'</span>, <span className="n">587</span>){'\n'}
io.sendline(<span className="s">b"Hi Charaf, we'd like to talk about a role"</span>){'\n'}
io.interactive()  <span className="c"># your move</span>
            </pre>
            <div className="contact-actions">
              <a className="btn btn-solid" href={`mailto:${links.email}?subject=Hello%20Charaf`}>Email me</a>
              <button type="button" className="btn" onClick={copy} aria-live="polite">
                {copied ? 'Copied' : 'Copy email address'}
              </button>
            </div>
            <ul className="contact-links">
              <li><a href={links.linkedin} {...ext}>LinkedIn</a></li>
              <li><a href={links.github} {...ext}>GitHub</a></li>
              <li><a href={links.htb} {...ext}>Hack The Box</a></li>
              <li><a href={links.ctftime} {...ext}>CTFtime</a></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

function PagedSection({ screen, page, pageCount, onPages }) {
  return (
    <section className="section section-paged" aria-labelledby={`${screen.id}-h`}>
      <header className="section-head">
        <h2 id={`${screen.id}-h`}>{screen.title}</h2>
        {screen.lede && <p className="lede">{screen.lede}</p>}
      </header>
      <div className="term">
        <div className="term-head">
          <span><span aria-hidden="true">gef➤ </span>{screen.cmd}</span>
          {pageCount > 1 && <span className="term-page">page {page + 1}/{pageCount}</span>}
        </div>
        <div className="term-body">
          <Paged
            pre={screen.pre}
            items={screen.items}
            post={screen.post}
            page={page}
            onPages={onPages}
            listClass={screen.listClass}
          />
        </div>
      </div>
    </section>
  )
}

/* ---------- Deck: no page scroll; arrows, keys and swipes move through it ---------- */

const indexOf = (hash) => {
  const i = SCREENS.findIndex((s) => '#' + s.id === hash)
  return i < 0 ? 0 : i
}

export default function App() {
  const [pos, setPos] = useState(() => ({ s: indexOf(window.location.hash), p: 0, dir: 1 }))
  const [pageCount, setPageCount] = useState(1)
  const touch = useRef(null)
  const screen = SCREENS[pos.s]

  const onPages = useCallback((n) => {
    setPageCount(n)
    setPos((cur) => (cur.p < 0 || cur.p > n - 1 ? { ...cur, p: n - 1 } : cur))
  }, [])

  const go = useCallback((s, p = 0) => {
    setPos((cur) => {
      if (s < 0 || s >= SCREENS.length) return cur
      return { s, p: SCREENS[s].items ? p : 0, dir: s >= cur.s ? 1 : -1 }
    })
    if (SCREENS[s] && !SCREENS[s].items) setPageCount(1)
  }, [])

  const next = useCallback(() => {
    if (pos.p < pageCount - 1) setPos({ ...pos, p: pos.p + 1, dir: 1 })
    else go(pos.s + 1)
  }, [pos, pageCount, go])

  const prev = useCallback(() => {
    if (pos.p > 0) setPos({ ...pos, p: pos.p - 1, dir: -1 })
    else go(pos.s - 1, -1) // -1: land on the last page of the previous screen
  }, [pos, go])

  // keep the URL in sync so sections can be linked
  useEffect(() => {
    const hash = '#' + screen.id
    if (window.location.hash !== hash) history.replaceState(null, '', hash)
  }, [screen.id])

  // in-page links like #contact or #writeups jump to that screen
  useEffect(() => {
    const onHash = () => go(indexOf(window.location.hash))
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [go])

  useEffect(() => {
    const onKey = (e) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return
      const tag = e.target.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || e.target.isContentEditable) return
      const k = e.key
      if (k === 'ArrowRight' || k === 'ArrowDown' || k === 'PageDown') { e.preventDefault(); next() }
      else if (k === 'ArrowLeft' || k === 'ArrowUp' || k === 'PageUp') { e.preventDefault(); prev() }
      else if (k === 'Home') { e.preventDefault(); go(0) }
      else if (k === 'End') { e.preventDefault(); go(SCREENS.length - 1) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, go])

  const onTouchStart = (e) => { const t = e.touches[0]; touch.current = { x: t.clientX, y: t.clientY } }
  const onTouchEnd = (e) => {
    if (!touch.current) return
    const t = e.changedTouches[0]
    const dx = t.clientX - touch.current.x
    const dy = t.clientY - touch.current.y
    touch.current = null
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.3) (dx < 0 ? next : prev)()
  }

  const atStart = pos.s === 0 && pos.p === 0
  const atEnd = pos.s === SCREENS.length - 1 && pos.p >= pageCount - 1
  const morePages = pos.p < pageCount - 1
  const nextLabel = morePages ? `Page ${pos.p + 2} of ${pageCount}` : SCREENS[pos.s + 1]?.title
  const prevLabel = pos.p > 0 ? `Page ${pos.p} of ${pageCount}` : SCREENS[pos.s - 1]?.title

  return (
    <div className="app">
      <nav className="topnav" aria-label="Sections">
        <button type="button" className="brand" onClick={() => go(0)}>jettlee</button>
        <ul className="tabs">
          {SCREENS.slice(1).map((s, i) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={pos.s === i + 1 ? 'page' : undefined}
                onClick={(e) => { e.preventDefault(); go(i + 1) }}
              >
                {s.title}
              </a>
            </li>
          ))}
        </ul>
        <p className="tab-now" aria-hidden="true">{screen.title}</p>
      </nav>

      <main className="stage" id="main" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <div className={`screen screen-${screen.id}`} key={screen.id} data-dir={pos.dir}>
          {screen.kind === 'hero' && <Hero />}
          {screen.kind === 'about' && <About />}
          {screen.kind === 'contact' && <Contact />}
          {screen.items && (
            <PagedSection screen={screen} page={pos.p} pageCount={pageCount} onPages={onPages} />
          )}
        </div>
      </main>

      <footer className="deckbar">
        <button type="button" className="arrow arrow-prev" onClick={prev} disabled={atStart} aria-label={atStart ? 'Previous' : `Previous: ${prevLabel}`}>
          <span className="arrow-icon" aria-hidden="true">←</span>
          <span className="arrow-label">{atStart ? '' : prevLabel}</span>
        </button>

        <div className="progress">
          <ol className="dots" aria-label="Jump to section">
            {SCREENS.map((s, i) => (
              <li key={s.id}>
                <button
                  type="button"
                  className={i === pos.s ? 'dot is-on' : 'dot'}
                  aria-label={s.title}
                  aria-current={i === pos.s ? 'step' : undefined}
                  onClick={() => go(i)}
                />
              </li>
            ))}
          </ol>
          <p className="keys-hint" aria-hidden="true">← → to navigate</p>
        </div>

        <button type="button" className="arrow arrow-next" onClick={next} disabled={atEnd} aria-label={atEnd ? 'Next' : `Next: ${nextLabel}`}>
          <span className="arrow-label">{atEnd ? '' : nextLabel}</span>
          <span className="arrow-icon" aria-hidden="true">→</span>
        </button>
        <p className="sr-only" aria-live="polite">
          {screen.title}{pageCount > 1 ? `, page ${pos.p + 1} of ${pageCount}` : ''}
        </p>
      </footer>
    </div>
  )
}
