import HexDump from './HexDump.jsx'
import { profile, links, experience, projects, ctf, certs, skills, languages } from './data.js'

const nav = [
  ['experience', 'Experience'],
  ['projects', 'Projects'],
  ['ctf', 'CTF'],
  ['certs', 'Certifications'],
  ['contact', 'Contact'],
]

function Section({ id, title, aside, children }) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-h`}>
      <header className="section-head">
        <h2 id={`${id}-h`}>{title}</h2>
        {aside && <p className="section-aside">{aside}</p>}
      </header>
      <div className="section-body">{children}</div>
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
          <h1>
            <span>Charaf</span>
            <span>Youssef</span>
          </h1>
          <div className="hero-text">
            <p className="hero-role">{profile.role}</p>
            <p className="hero-intro">{profile.intro}</p>
            <div className="hero-actions">
              <a className="btn btn-solid" href={`mailto:${links.email}`}>Email me</a>
              <a className="btn" href={links.writeups} target="_blank" rel="noreferrer">Read my CTF writeups</a>
            </div>
          </div>
          <HexDump />
        </section>

        <Section id="about" title="About">
          <div className="prose">
            {profile.about.map((p, i) => <p key={i}>{p}</p>)}
            <p className="looking">{profile.lookingFor}</p>
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <ol className="timeline">
            {experience.map((job) => (
              <li key={job.org + job.when} className="job">
                <p className="job-when">{job.when}</p>
                <div>
                  <h3>{job.title}</h3>
                  <p className="job-org"><strong>{job.org}</strong>, {job.place}</p>
                  <ul className="job-points">
                    {job.points.map((pt, i) => <li key={i}>{pt}</li>)}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section id="projects" title="Projects" aside="Academic and personal projects. Code is private for the academic ones.">
          <ul className="projects">
            {projects.map((p) => (
              <li key={p.name} className="project">
                <div className="project-top">
                  <h3>{p.name}</h3>
                  <span className={`status status-${p.status === 'done' ? 'done' : 'wip'}`}>
                    {p.status === 'done' ? p.when : `In progress, ${p.when}`}
                  </span>
                </div>
                <p>{p.summary}</p>
                <ul className="tags" aria-label="Technologies">
                  {p.tags.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="ctf" title="CTF" aside={`${ctf.headline} ${ctf.rankingNote}.`}>
          <div className="table-wrap">
            <table className="ctf-table">
              <thead>
                <tr><th scope="col">Event</th><th scope="col">Morocco</th><th scope="col">Overall</th></tr>
              </thead>
              <tbody>
                {ctf.results.map((r) => (
                  <tr key={r.event}>
                    <th scope="row">{r.event}{r.note && <span className="ctf-note">{r.note}</span>}</th>
                    <td className={r.morocco === '1st' ? 'gold' : ''}>{r.morocco || <span className="na">n/a</span>}</td>
                    <td className={r.world.startsWith('1st') ? 'gold' : ''}>{r.world || <span className="na">n/a</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="ctf-links">
            <a href={links.ctftime} target="_blank" rel="noreferrer">CTFtime profile</a>
            <a href={links.htb} target="_blank" rel="noreferrer">Hack The Box profile</a>
            <a href={links.writeups} target="_blank" rel="noreferrer">Writeups on GitHub</a>
          </div>
        </Section>

        <Section id="certs" title="Certifications">
          <ul className="certs">
            {certs.map((c) => (
              <li key={c.name} className={`cert ${c.status === 'in progress' ? 'is-wip' : ''}`}>
                <h3>{c.name}</h3>
                <p>{c.issuer}{c.when && <>, {c.when}</>}</p>
                {c.status === 'in progress' && <span className="status status-wip">In progress</span>}
              </li>
            ))}
          </ul>
        </Section>

        <Section id="skills" title="Skills" aside={`Languages: ${languages}.`}>
          <div className="skills">
            {skills.map((s) => (
              <div key={s.group} className="skill-group">
                <h3>{s.group}</h3>
                <ul>{s.items.map((i) => <li key={i}>{i}</li>)}</ul>
              </div>
            ))}
          </div>
        </Section>

        <section id="contact" className="contact" aria-labelledby="contact-h">
          <h2 id="contact-h">Have a scope that needs testing?</h2>
          <a className="contact-mail" href={`mailto:${links.email}`}>{links.email}</a>
          <ul className="contact-links">
            <li><a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></li>
            <li><a href={links.github} target="_blank" rel="noreferrer">GitHub</a></li>
            <li><a href={links.htb} target="_blank" rel="noreferrer">Hack The Box</a></li>
            <li><a href={links.ctftime} target="_blank" rel="noreferrer">CTFtime</a></li>
          </ul>
        </section>
      </main>

      <footer className="foot">
        <p>© {new Date().getFullYear()} Charaf Youssef. {profile.location}.</p>
      </footer>
    </>
  )
}
