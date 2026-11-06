export interface About {
  name: string;
  role: string;
  headline: string;
  intro: string;
  degree: string;
  university: string;
  period: string;
  gpa: string;
  distinction: string;
  credits: string;
  profileImage: string;
  universityLogo: string;
  resume: string;
  relevantCoursework: string[];
  currentlyLearning: { title: string; description: string }[];
}

export const about: About = {
  name: 'Nathaniel Steave Harjanto',
  role: 'Informatics Graduate',
  headline: 'Software, data, and practical problem-solving.',
  intro:
    'I connect software engineering with data-driven work, turning practical requirements into web applications, analytics, and machine-learning tools. My experience includes internships in IT and software development, plus an independent study in data science.',
  degree: 'Bachelor of Informatics',
  university: 'Sebelas Maret University (UNS)',
  period: '2022–2026',
  gpa: '3.55 / 4.00',
  distinction: 'Graduated with honors',
  credits: '145 credits completed',
  profileImage: '/portfolio/profile.jpg',
  universityLogo: '/portfolio/logo_uns.png',
  resume: '/portfolio/Nathaniel_Steave_Harjanto_Resume.pdf',
  relevantCoursework: [
    'Artificial Intelligence',
    'Machine Learning',
    'Data Mining',
    'Data Structures & Algorithms',
    'Web Programming',
    'Databases',
    'Software Engineering',
  ],
  currentlyLearning: [
    {
      title: 'React & Next.js',
      description: 'Building server-rendered web applications with App Router and Server Actions.',
    },
    {
      title: 'Deep learning',
      description: 'Exploring neural networks, transformers, and computer vision with PyTorch and Hugging Face.',
    },
    {
      title: 'DevOps & cloud',
      description: 'Learning containerization, CI/CD pipelines, and AWS cloud architecture.',
    },
  ],
};