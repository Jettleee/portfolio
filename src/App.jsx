import { useState } from 'react'
import HexDump from './HexDump.jsx'
import {
  profile, links, experience, projects, ctf, certs, skills, languages, writeups,
} from './data.js'

const nav = [
  ['experience', 'Experience'],
  ['ctf', 'CTF'],
  ['writeups', 'Writeups'],
  ['certs', 'Certifications'],
  ['contact', 'Contact'],
]

const addr = (n) => '0x' + n.toString(16).padStart(16, '0')

/* A section: plain-English title, a one-line explanation, and a debugger panel. */
function Section({ id, title, lede, cmd, children, className = '' }) {
  return (
    <section id={id} className={`section ${className}`} aria-labelledby={`${id}-h`}>
      <header className="section-head">
        <h2 id={`${id}-h`}>{title}</h2>
        {lede && <p className="lede">{lede}</p>}
      </header>
      <div className="term">
        <div className="term-head"><span aria-hidden="true">gef➤ </span>{cmd}</div>
        <div className="term-body">{children}</div>
      </div>
    </section>
  )
}

function Experience() {
  return (
    <ol className="bt">
      {experience.map((job, i) => (
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
      ))}
      <li className="frame frame-main" aria-hidden="true">
        <p className="frame-sig">
          <span className="frame-no">#{experience.length}</span>
          <span className="frame-addr">{addr(0x555555555189)}</span>
          <span className="frame-in">in</span>
          <span className="frame-fn">main ()</span>
        </p>
      </li>
    </ol>
  )
}

function Projects() {
  return (
    <ul className="funcs">
      {projects.map((p, i) => (
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
      ))}
    </ul>
  )
}

function Scoreboard() {
  return (
    <>
      <ul className="score-stats">
        {ctf.stats.map((s) => (
          <li key={s.big}><span className="stat-big">{s.big}</span><span className="stat-label">{s.label}</span></li>
        ))}
      </ul>
      <ol className="scoreboard">
        {ctf.results.map((r) => (
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
        ))}
      </ol>
      <p className="term-links">
        <a href={links.ctftime} target="_blank" rel="noreferrer">CTFtime profile</a>
        <a href={links.htb} target="_blank" rel="noreferrer">Hack The Box profile</a>
      </p>
    </>
  )
}

function Writeups() {
  return (
    <>
      <p className="ls-total" aria-hidden="true">~/CTFs-and-Writeups</p>
      {writeups.map((d) => (
        <div key={d.dir} className="ls-dir">
          <p className="ls-line ls-dirline">
            <span className="ls-perm">drwxr-xr-x</span>
            <span className="ls-owner">jettlee</span>
            <span className="ls-size">4096</span>
            <span className="ls-date">Oct 18</span>
            <span className="ls-name">{d.dir}/</span>
          </p>
          <ul>
            {d.files.map((f) => (
              <li key={f.file} className="ls-file">
                <a href={f.url} target="_blank" rel="noreferrer" className="ls-line">
                  <span className="ls-perm">-rw-r--r--</span>
                  <span className="ls-owner">jettlee</span>
                  <span className="ls-size">{f.size}</span>
                  <span className="ls-date">{f.date}</span>
                  <span className="ls-name">{f.file}</span>
                </a>
                <p className="ls-about">{f.about}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <p className="term-links">
        <a href={links.writeups} target="_blank" rel="noreferrer">Open the repo on GitHub</a>
      </p>
    </>
  )
}

function Checksec() {
  return (
    <>
      <p className="cs-head" aria-hidden="true">[+] checksec for '/home/jettlee/certs'</p>
      <ul className="checksec">
        {certs.map((c) => (
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
        ))}
      </ul>
    </>
  )
}

function Vmmap() {
  let cursor = 0x555555554000
  const rows = skills.map((s) => {
    const start = cursor
    const end = start + s.items.length * 0x1000
    cursor = end + 0x1000
    return { ...s, start, end }
  })
  return (
    <>
      <p className="vm-legend" aria-hidden="true">
        <span>Start</span><span>End</span><span>Perm</span><span>Path</span>
      </p>
      <ul className="vmmap">
        {rows.map((r) => (
          <li key={r.group} className="vm-row">
            <p className="vm-line" aria-hidden="true">
              <span className="vm-addr">{addr(r.start)}</span>
              <span className="vm-addr vm-end">{addr(r.end)}</span>
              <span className={`vm-perm${r.perm.includes('x') ? ' is-x' : ''}`}>{r.perm}</span>
              <span className="vm-path">{r.path}</span>
            </p>
            <div className="vm-body">
              <h3>{r.group}</h3>
              <p>{r.items.join(', ')}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
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
    <section id="contact" className="section contact" aria-labelledby="contact-h">
      <header className="section-head">
        <h2 id="contact-h">Contact</h2>
        <p className="lede">Have a scope that needs testing, or a PFE spot for 2027? Email is the fastest way to reach me.</p>
      </header>
      <div className="term">
        <div className="term-head"><span aria-hidden="true">$ </span>python3 hire.py</div>
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
            <li><a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a href={links.github} target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a href={links.htb} target="_blank" rel="noreferrer">Hack The Box</a></li>
            <li><a href={links.ctftime} target="_blank" rel="noreferrer">CTFtime</a></li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <nav className="topnav" aria-label="Sections">
        <a className="brand" href="#top">jettlee</a>
        <ul>
          {nav.map(([id, label]) => (
            <li key={id}><a href={`#${id}`}>{label}</a></li>
          ))}
        </ul>
      </nav>

      <main id="main">
        <section className="hero" id="top">
          <div className="hero-text">
            <h1>Charaf Youssef</h1>
            <p className="hero-role">{profile.role}</p>
            <p className="hero-intro">{profile.intro}</p>
            <div className="hero-actions">
              <a className="btn btn-solid" href={`mailto:${links.email}`}>Email me</a>
              <a className="btn" href="#writeups">Read my writeups</a>
            </div>
          </div>
          <HexDump />
        </section>

        <section id="about" className="about" aria-labelledby="about-h">
          <h2 id="about-h" className="sr-only">About</h2>
          {profile.about.map((p, i) => <p key={i}>{p}</p>)}
          <p className="looking">{profile.lookingFor}</p>
        </section>

        <Section id="experience" title="Experience" cmd="bt" lede="Most recent first, the way a backtrace reads.">
          <Experience />
        </Section>

        <Section id="ctf" title="CTF results" cmd="!cat scoreboard" lede="Best finishes so far.">
          <Scoreboard />
        </Section>

        <Section id="writeups" title="Writeups" cmd="!ls -la ~/CTFs-and-Writeups/*" lede="Step-by-step solutions to labs and CTF challenges. Each one opens on GitHub.">
          <Writeups />
        </Section>

        <Section id="projects" title="Projects" cmd="info functions project_" lede="Academic and personal builds. Code for the academic ones is private.">
          <Projects />
        </Section>

        <Section id="certs" title="Certifications" cmd="checksec" lede="Enabled means certified. Partial means in progress.">
          <Checksec />
        </Section>

        <Section id="skills" title="Skills" cmd="vmmap" lede={`What I work with, mapped by area. Languages: ${languages}.`}>
          <Vmmap />
        </Section>

        <Contact />
      </main>

      <footer className="foot">
        <p>© {new Date().getFullYear()} Charaf Youssef, {profile.location}.</p>
      </footer>
    </>
  )
}
