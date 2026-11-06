export interface Skill {
  name: string;
  level?: string;
}

export interface SkillGroup {
  name: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    name: 'Programming languages',
    skills: [
      { name: 'Python', level: 'Advanced' },
      { name: 'JavaScript', level: 'Advanced' },
      { name: 'PHP', level: 'Intermediate' },
      { name: 'Java & C++', level: 'Intermediate' },
      { name: 'SQL', level: 'Advanced' },
    ],
  },
  {
    name: 'Web development',
    skills: [
      { name: 'Laravel', level: 'Advanced' },
      { name: 'FastAPI', level: 'Intermediate' },
      { name: 'MySQL & relational databases', level: 'Advanced' },
      { name: 'REST APIs', level: 'Advanced' },
      { name: 'HTML, CSS & Tailwind', level: 'Advanced' },
    ],
  },
  {
    name: 'AI & data science',
    skills: [
      { name: 'Machine learning & regression', level: 'Advanced' },
      { name: 'LLM integration', level: 'Advanced' },
      { name: 'Data preprocessing & feature engineering', level: 'Advanced' },
      { name: 'Streamlit & Plotly', level: 'Advanced' },
      { name: 'Computer vision, MediaPipe', level: 'Intermediate' },
    ],
  },
  {
    name: 'Tools & workflow',
    skills: [
      { name: 'Git & GitHub' },
      { name: 'Visual Studio Code' },
      { name: 'Vercel' },
      { name: 'Looker Studio' },
      { name: 'Figma' },
      { name: 'Excel & Google Sheets' },
    ],
  },
];