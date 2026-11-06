export interface ExperienceEntry {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  technologies: string[];
}

export const experience: ExperienceEntry[] = [
  {
    role: 'Software Developer Intern',
    company: 'PT Tiga Serangkai Inti Corpora',
    period: 'Sep 2026–Present',
    location: 'Indonesia',
    description: '',
    technologies: [],
  },
  {
    role: 'IT Intern',
    company: 'SMK Negeri 4 Klaten',
    period: 'Feb 2025–Apr 2025',
    location: 'Klaten, Indonesia',
    description: 'Built a web-based attendance system with geolocation and a 100-meter geofence. Led work from UI prototyping through backend development, testing, and deployment.',
    technologies: ['Laravel', 'Blade', 'MySQL', 'REST API', 'Figma'],
  },
  {
    role: 'Data Science Independent Study',
    company: 'Kampus Merdeka, Startup Campus',
    period: 'Sep 2024–Dec 2024',
    location: 'Indonesia',
    description: 'Developed a Random Forest regression model for CO₂ emissions in Spain, completed end-to-end data preparation and evaluation, and presented the work at Selection to Showcase.',
    technologies: ['Python', 'Random Forest', 'Looker Studio'],
  },
  {
    role: 'Staff, Institutional Independence',
    company: 'HIMASTER UNS',
    period: 'Jan 2023–Dec 2023',
    location: 'Surakarta, Indonesia',
    description: 'Produced business-development infographics and promotional media, and managed sales records and transaction verification.',
    technologies: ['Content Design', 'Operations'],
  },
  {
    role: 'Fundraising Staff',
    company: 'Pekan Informasi dan Teknologi (P!NGFEST)',
    period: 'Mar 2023–Sep 2023',
    location: 'Surakarta, Indonesia',
    description: 'Organized fundraising campaigns with a reported target of approximately IDR 10 million over six months, and prepared monthly income reports.',
    technologies: ['Fundraising', 'Reporting'],
  },
];