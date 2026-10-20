// All site content lives here. Edit this file to update the portfolio.

export const profile = {
  name: 'Charaf Youssef',
  handle: 'Jettlee',
  role: 'Offensive security engineer',
  intro:
    "Final-year Cyber Defense engineering student at ENSA Marrakech. I pentest, attack Active Directory and exploit binaries. I've also deployed SOCs, so I know what the defenders will see.",
  about: [
    'I focus on offensive work: internal and external pentests, Active Directory attack paths, red team simulation and binary exploitation. Most of my free time goes into CTFs, mainly pwn and reverse engineering.',
    "My internships and lab projects put me on the other side too: SIEM/SOAR deployment, vulnerability management and hardening. I use that view to write findings a blue team can act on, with remediation they can actually ship.",
  ],
  location: 'Morocco',
  lookingFor: 'Open to a PFE (final-year) internship in cybersecurity, starting 2027.',
}

export const links = {
  email: 'youssefcharaf404@gmail.com',
  github: 'https://github.com/Jettleee',
  linkedin: 'https://www.linkedin.com/in/youssef-charaf-49b726318',
  writeups: 'https://github.com/Jettleee/CTFs-and-Writeups',
  htb: 'https://profile.hackthebox.com/profile/019e5abe-0376-71d6-9fab-3aab6b036f4f',
  ctftime: 'https://ctftime.org/user/233368',
}

export const experience = [
  {
    fn: 'soc_deployment_intern',
    when: 'Jul – Aug 2026',
    title: 'SOC deployment & information systems security intern',
    org: 'I-Gouvernancia',
    place: 'Morocco, on-site',
    points: [
      'Helped deploy a production-bound SOC covering monitoring, detection and incident response.',
      'Built vulnerability management into the automation workflow by integrating OpenVAS scanners.',
      'Rolled out hardening policies across endpoints.',
      'Ran simulated Active Directory attacks and wrote the remediation recommendations.',
    ],
  },
  {
    fn: 'cybersecurity_contributor',
    when: 'Jun 2026',
    title: 'Cybersecurity contributor, freelance',
    org: 'shipd.ai',
    place: 'AI platform, invitation-only',
    points: [
      'Designed CTF-style attack scenarios used to train AI agents in threat detection.',
      'Built vulnerable web and binary environments for the agents to exploit during training.',
    ],
  },
  {
    fn: 'offensive_security_intern',
    when: 'Jul – Aug 2025',
    title: 'Offensive security intern',
    org: 'OLTECHGROUP',
    place: 'Morocco, on-site',
    points: [
      'Practiced pentest methodology in lab environments: reconnaissance, vulnerability analysis and reporting.',
      'Load and stress tested web environments with k6.',
    ],
  },
  {
    fn: 'engineering_degree',
    when: '2021 – 2027',
    title: 'Engineering degree, Cyber Defense & Embedded Telecom Systems',
    org: 'ENSA Marrakech',
    place: 'final year',
    points: [],
  },
]

export const projects = [
  {
    name: 'AI-assisted binary analysis tool',
    when: 'May 2026',
    status: 'done',
    summary:
      'An assistant for static and dynamic analysis of ELF and EXE binaries that produces vulnerability reports automatically.',
    tags: ['Reverse engineering', 'ELF / PE', 'LLM'],
  },
  {
    name: 'Ransomware simulator & detection system',
    when: 'May – Nov 2025',
    status: 'done',
    summary:
      'Reproduces the ransomware attack chain, from encryption to C2, and detects it in real time from process behavior.',
    tags: ['Malware', 'C2', 'Behavioral detection'],
  },
  {
    name: 'Cloud SOC on Azure',
    when: '2025',
    status: 'done',
    summary:
      'A SIEM/SOAR stack with Wazuh, Cortex, TheHive and Shuffle, on segmented Azure networks (VNet, subnets, peering) locked down with NSG rules.',
    tags: ['Wazuh', 'TheHive', 'Shuffle', 'Azure'],
  },
  {
    name: 'Malware detection & classification',
    when: 'Oct – Dec 2026',
    status: 'in progress',
    summary:
      'A pipeline that classifies malware from behavioral analysis using deep learning models.',
    tags: ['Deep learning', 'Malware analysis'],
  },
  {
    name: 'Sports coaching & nutrition platform',
    when: 'Oct – Dec 2026',
    status: 'in progress',
    summary:
      'A training and nutrition app in the spirit of MyFitnessPal and Liftup, built as a DevSecOps project with security checks in the pipeline.',
    tags: ['DevSecOps', 'CI/CD', 'SAST / DAST'],
  },
]

export const ctf = {
  stats: [
    { big: '30+', label: 'CTFs played since 2025, mostly pwn, reversing and web' },
    { big: '8th', label: 'in Morocco on the 2025 CTFtime ranking' },
  ],
  results: [
    {
      event: '0xfun CTF 2026',
      note: 'Won a .xyz domain',
      ranks: [
        { n: 1, label: 'in Morocco' },
        { n: 15, top: true, label: 'worldwide, of 2,000+ teams' },
      ],
    },
    {
      event: 'PwnSec 2025',
      ranks: [
        { n: 1, label: 'in Morocco' },
        { n: 8, top: true, label: 'worldwide' },
      ],
    },
    { event: 'ESI CTF International', ranks: [{ n: 1, label: 'overall winner' }] },
    { event: 'AISEC National CTF 2025', ranks: [{ n: 3, top: true, label: 'nationally' }] },
  ],
}

// status: 'enabled' (held) or 'partial' (in progress)
export const certs = [
  { key: 'CRTP', name: 'Certified Red Team Professional', issuer: 'Altered Security, Jul 2026', status: 'enabled' },
  { key: 'CPTS', name: 'Certified Penetration Testing Specialist', issuer: 'Hack The Box. Path completed, exam next', status: 'partial' },
  { key: 'ISO27001', name: 'ISO/IEC 27001 Associate', issuer: 'SkillFront', status: 'enabled' },
  { key: 'THM-JrPT', name: 'Jr Penetration Tester', issuer: 'TryHackMe', status: 'enabled' },
  { key: 'THM-Web', name: 'Web Fundamentals', issuer: 'TryHackMe', status: 'enabled' },
  { key: 'MobSec', name: 'Mobile App Security', issuer: 'MLIAEDU, Jun 2026', status: 'enabled' },
]

export const skills = [
  {
    group: 'Offensive',
    perm: 'r-x',
    path: '/opt/offensive',
    items: ['Internal & external pentest', 'Active Directory', 'OWASP Top 10', 'OSINT', 'Android security', 'Burp Suite', 'Nmap', 'Metasploit', 'BloodHound'],
  },
  {
    group: 'Pwn & reversing',
    perm: 'rwx',
    path: '/opt/pwn',
    items: ['ROP chains', 'ret2libc / ret2plt', 'Heap UAF', 'Format strings', 'Shellcoding', 'ELF & PE reversing', 'Static & dynamic analysis'],
  },
  {
    group: 'Defensive & SOC',
    perm: 'r--',
    path: '/var/log/soc',
    items: ['Wazuh', 'TheHive', 'Cortex', 'Shuffle', 'Behavioral detection', 'Incident response', 'Threat intel', 'OpenVAS'],
  },
  {
    group: 'GRC',
    perm: 'r--',
    path: '/etc/grc',
    items: ['ISO/IEC 27001', 'Risk management', 'Security policies', 'Hardening', 'Audit reports'],
  },
  {
    group: 'Code & infra',
    perm: 'rw-',
    path: '/usr/lib/infra',
    items: ['Python', 'C', 'Java / Spring Boot', 'PowerShell', 'Bash', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'GitLab CI', 'Azure'],
  },
]

export const languages = 'Arabic (native), French and English (fluent)'

const repo = 'https://github.com/Jettleee/CTFs-and-Writeups/blob/HEAD/'
const blob = (path) => repo + path.split('/').map(encodeURIComponent).join('/')

// Mirrors github.com/Jettleee/CTFs-and-Writeups. Add a line when you publish a new writeup.
export const writeups = [
  {
    dir: 'HTB labs',
    files: [
      { file: 'AEN part1.md', size: 24422, date: 'Oct 18', about: 'Attacking Enterprise Networks, part 1. Black-box, from an anonymous FTP login to a SYSTEM shell in a segmented AD lab.' },
    ],
  },
  {
    dir: 'PWN',
    files: [
      { file: '0xfun.md', size: 17304, date: 'Oct 17', about: '0xfun CTF: heap use-after-free to shell on glibc 2.42, with every protection enabled.' },
    ],
  },
  {
    dir: 'mobile',
    files: [
      { file: 'snake challenge.md', size: 4667, date: 'Oct 17', about: 'PwnSec Snake: patching out root and Frida detection, then SnakeYAML deserialization (CVE-2022-1471).' },
      { file: 'firestorm challenge.md', size: 3564, date: 'Oct 17', about: 'PwnSec FireStorm: forcing a hidden password routine to run with Frida.' },
      { file: 'uncrackable level 2 challenge.md', size: 5030, date: 'Oct 17', about: 'OWASP UnCrackable L2: reversing the native JNI check with Ghidra.' },
      { file: 'uncrackable level 3 challenge.md', size: 4320, date: 'Oct 17', about: 'OWASP UnCrackable L3: bypassing native anti-Frida checks and recovering the XOR-encoded flag.' },
    ],
  },
].map((d) => ({ ...d, files: d.files.map((f) => ({ ...f, url: blob(`${d.dir}/${f.file}`) })) }))
