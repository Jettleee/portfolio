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
  lookingFor: 'Open to a PFE internship in pentest or red teaming, starting 2027.',
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
    when: 'Jul – Aug 2025',
    title: 'Offensive security intern',
    org: 'OLTECHGROUP',
    place: 'Morocco, on-site',
    points: [
      'Practiced pentest methodology in lab environments: reconnaissance, vulnerability analysis and reporting.',
      'Load and stress tested web environments with k6.',
    ],
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
  headline: '30+ CTFs since 2025, mostly pwn, reversing and web.',
  rankingNote: '8th in Morocco on the 2025 CTFtime ranking',
  results: [
    { event: '0xfun CTF 2026', morocco: '1st', world: 'Top 15 of 2,000+ teams', note: 'Won a .xyz domain' },
    { event: 'PwnSec 2025', morocco: '1st', world: 'Top 8' },
    { event: 'ESI CTF International', morocco: '', world: '1st overall' },
    { event: 'AISEC National CTF 2025', morocco: 'Top 3', world: '' },
  ],
}

export const certs = [
  { name: 'Certified Red Team Professional (CRTP)', issuer: 'Altered Security', when: 'Jul 2026', status: 'held' },
  { name: 'Certified Penetration Testing Specialist (CPTS)', issuer: 'Hack The Box', when: 'Path done, exam next', status: 'in progress' },
  { name: 'ISO/IEC 27001 Associate', issuer: 'SkillFront', when: '', status: 'held' },
  { name: 'Jr Penetration Tester', issuer: 'TryHackMe', when: '', status: 'held' },
  { name: 'Web Fundamentals', issuer: 'TryHackMe', when: '', status: 'held' },
  { name: 'Mobile App Security', issuer: 'MLIAEDU', when: 'Jun 2026', status: 'held' },
]

export const skills = [
  {
    group: 'Offensive',
    items: ['Internal & external pentest', 'Active Directory', 'OWASP Top 10', 'OSINT', 'Android security', 'Burp Suite', 'Nmap', 'Metasploit', 'BloodHound'],
  },
  {
    group: 'Pwn & reversing',
    items: ['ROP chains', 'ret2libc / ret2plt', 'Heap UAF', 'Format strings', 'Shellcoding', 'ELF & PE reversing', 'Static & dynamic analysis'],
  },
  {
    group: 'Defensive & SOC',
    items: ['Wazuh', 'TheHive', 'Cortex', 'Shuffle', 'Behavioral detection', 'Incident response', 'Threat intel', 'OpenVAS'],
  },
  {
    group: 'GRC',
    items: ['ISO/IEC 27001', 'Risk management', 'Security policies', 'Hardening', 'Audit reports'],
  },
  {
    group: 'Code & infra',
    items: ['Python', 'C', 'Java / Spring Boot', 'PowerShell', 'Bash', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'GitLab CI', 'Azure'],
  },
]

export const languages = 'Arabic (native), French and English (fluent)'
