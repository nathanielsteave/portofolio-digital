export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  category: ProjectCategory;
  image: string;
  gallery?: string[];
  portrait?: boolean;
  github?: string;
  external?: string;
}

export type ProjectCategory = 'web' | 'data' | 'basic' | 'ai' | 'cv' | 'uiux';

export const projects: Project[] = [
  {
    id: 'sukha-pos',
    title: 'Sukha POS',
    description: 'A point-of-sale website for restaurants that digitizes ordering and payment to improve operational efficiency.',
    technologies: ['Laravel', 'PHP', 'MySQL'],
    category: 'web',
    image: '/portfolio/sukha.png',
    github: 'https://github.com/sukharesto/Sukha-Serve',
    external: 'https://sukha.great-site.net/',
  },
  {
    id: 'co2-emission',
    title: 'CO2 Emission Analysis',
    description: 'Data analysis and machine-learning models to predict CO2 emissions in Spain, with interactive visualizations for sustainability decisions.',
    technologies: ['Python', 'Random Forest', 'Looker Studio'],
    category: 'data',
    image: '/portfolio/co2-spain.png',
    external: 'https://lookerstudio.google.com/s/j9UaD2x0vrk',
  },
  {
    id: 'sipeta-cuaca',
    title: 'SiPETA CUACA TANI',
    description: 'A web-based weather information system designed to help farmers plan agricultural activities.',
    technologies: ['Python', 'Flask', 'Weather API'],
    category: 'web',
    image: '/portfolio/sipeta-cuaca-tani.png',
    github: 'https://github.com/nathanielsteave/sipeta-cuaca-tani',
    external: 'https://sipeta-cuaca-tani.vercel.app/',
  },
  {
    id: 'bmi-calculator',
    title: 'BMI Calculator',
    description: 'A responsive single-page app with real-time BMI calculation and persistent dark-mode preference.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    category: 'basic',
    image: '/portfolio/bmi-calculator.png',
    github: 'https://github.com/nathanielsteave/bmi-calculator',
    external: 'https://bmi-calculator-mocha-eight-47.vercel.app/',
  },
  {
    id: 'todo-list',
    title: 'To-Do List',
    description: 'A responsive single-page app with CRUD features, local storage, deadline handling, and dark mode.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'CRUD'],
    category: 'basic',
    image: '/portfolio/to-do-list.png',
    github: 'https://github.com/nathanielsteave/to-do-list',
    external: 'https://to-do-list-nathaniel.vercel.app/',
  },
  {
    id: 'notes-app',
    title: 'Notes App',
    description: 'A dual-pane note-taking app with CRUD features, debounced auto-save, and local storage persistence.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    category: 'basic',
    image: '/portfolio/notes-app.png',
    github: 'https://github.com/nathanielsteave/notes-app',
    external: 'https://notes-app-mu-jade.vercel.app/',
  },
  {
    id: 'ai-code-reviewer',
    title: 'AI Code Reviewer',
    description: 'A client-server tool for Python code inspection, combining static analysis with the Llama 3.1 model through Groq API.',
    technologies: ['Python', 'FastAPI', 'Groq AI', 'Vanilla JS'],
    category: 'ai',
    image: '/portfolio/ai-code-reviewer (4).png',
    gallery: [
      '/portfolio/ai-code-reviewer (4).png',
      '/portfolio/ai-code-reviewer (1).png',
      '/portfolio/ai-code-reviewer (2).png',
      '/portfolio/ai-code-reviewer (3).png',
    ],
    github: 'https://github.com/nathanielsteave/ai-code-reviewer',
  },
  {
    id: 'crypto-pulse',
    title: 'Crypto Pulse AI',
    description: 'A cryptocurrency dashboard for prices, on-chain whale activity, and market-sentiment analysis, with interactive charts.',
    technologies: ['Python', 'Streamlit', 'Groq AI', 'Plotly'],
    category: 'ai',
    image: '/portfolio/crypto-pulse(1).png',
    gallery: ['/portfolio/crypto-pulse(1).png', '/portfolio/crypto-pulse(2).png', '/portfolio/crypto-pulse(3).png'],
    github: 'https://github.com/nathanielsteave/ai-crypto-pulse',
    external: 'https://ai-crypto-pulse-t7hwrda7cupn98e4uxkbyc.streamlit.app/',
  },
  {
    id: 'face-puzzle',
    title: 'Face Puzzle Game',
    description: 'A browser-based computer-vision game that uses hand gestures to capture a photo and solve a sliding puzzle through finger tracking.',
    technologies: ['JavaScript', 'MediaPipe Web', 'Canvas', 'Computer Vision'],
    category: 'cv',
    image: '/portfolio/face-puzzle-game(1).png',
    gallery: ['/portfolio/face-puzzle-game(1).png', '/portfolio/face-puzzle-game(2).png'],
    github: 'https://github.com/nathanielsteave/face-puzzle-web',
    external: 'https://face-puzzle-web.vercel.app/',
  },
  {
    id: 'race-pace-calculator',
    title: 'Race Pace Calculator',
    description: 'A running tool for race pace, kilometer splits, finish-time estimates, and GPX elevation adjustments.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Chart.js'],
    category: 'web',
    image: '/portfolio/race-pace-calculator.png',
    github: 'https://github.com/nathanielsteave/race-pace-calculator',
    external: 'https://race-pace-calculator-three.vercel.app/',
  },
  {
    id: 'collabboard',
    title: 'CollabBoard',
    description: 'A real-time collaborative whiteboard with drawing and shape tools, text, pan and zoom, and room chat.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'Socket.io', 'Canvas API'],
    category: 'web',
    image: '/portfolio/collaboard(3).png',
    gallery: ['/portfolio/collaboard(3).png', '/portfolio/collaboard(1).png', '/portfolio/collaboard(2).png'],
    github: 'https://github.com/nathanielsteave/collabboard',
    external: 'https://collaboard-rz5c.vercel.app/',
  },
  {
    id: 'visiobus26',
    title: 'VisioBus26 (Visionary Business)',
    description: 'A catalog of 2026 trend predictions and business ideas with category filters and a responsive layout.',
    technologies: ['HTML', 'Tailwind CSS', 'JavaScript'],
    category: 'web',
    image: '/portfolio/visiobus(1).png',
    gallery: [
      '/portfolio/visiobus(1).png',
      '/portfolio/visiobus(2).png',
      '/portfolio/visiobus(3).png',
      '/portfolio/visiobus(4).png',
      '/portfolio/visiobus(5).png',
      '/portfolio/visiobus(6).png',
      '/portfolio/visiobus(7).png',
    ],
    github: 'https://github.com/nathanielsteave/website-celine',
    external: 'https://website-celine.vercel.app/index.html',
  },
  {
    id: 'nutrifood-figma',
    title: 'NutriFood Mobile Design',
    description: 'A mobile nutrition-tracking and healthy-food ordering concept, presented as an interactive UI/UX prototype.',
    technologies: ['Figma', 'UI/UX Design', 'Wireframing', 'Prototyping'],
    category: 'uiux',
    image: '/portfolio/nutrifood.png',
    portrait: true,
    external: 'https://www.figma.com/design/CzoKLlWbaVcGsLFPIkG3EY/Figma---NutriFood-Project?node-id=0-1&t=PUYUzyaip9JR3OwR-1',
  },
];