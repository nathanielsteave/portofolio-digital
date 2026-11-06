export interface Certificate {
  title: string;
  organization: string;
  image: string;
  verificationUrl?: string;
}

export const certificates: Certificate[] = [
  {
    title: 'Python Developer',
    organization: 'Micro1',
    image: '/portfolio/certi-micro1.png',
    verificationUrl: 'https://micro1-portal-data.s3.amazonaws.com/engineer-certificates/1778163470-3bf7f6c0-982f-42f2-9c01-255f549c74b9.jpg',
  },
  {
    title: 'Belajar Dasar Data Science',
    organization: 'Dicoding Indonesia',
    image: '/portfolio/dasar-data-science.png',
    verificationUrl: 'https://www.dicoding.com/certificates/4EXGQLY71ZRL',
  },
  {
    title: 'Belajar Dasar SQL',
    organization: 'Dicoding Indonesia',
    image: '/portfolio/dasar-sql.png',
    verificationUrl: 'https://www.dicoding.com/certificates/MRZME1K5KPYQ',
  },
  {
    title: 'Belajar Dasar Manajemen Proyek',
    organization: 'Dicoding Indonesia',
    image: '/portfolio/dasar-manajemenproyek.png',
    verificationUrl: 'https://www.dicoding.com/certificates/JLX17Y37GX72',
  },
  {
    title: 'Belajar Dasar AI',
    organization: 'Great Learning',
    image: '/portfolio/dasar-ai.png',
  },
  {
    title: 'CCNAv7: Introduction to Networks',
    organization: 'Cisco Networking Academy',
    image: '/portfolio/cisco-jarkom.png',
  },
  {
    title: 'Short Class FrontEnd Development',
    organization: 'MySkill',
    image: '/portfolio/myskill-frontend.png',
  },
  {
    title: 'Short Class UX Writing',
    organization: 'MySkill',
    image: '/portfolio/myskill-uxwriting.png',
  },
  {
    title: 'Competitive Programming Participation',
    organization: 'P!NGFEST',
    image: '/portfolio/competitive-programming-pingfest.png',
  },
  {
    title: 'Kampus Merdeka Batch 7: Data Science',
    organization: 'Startup Campus',
    image: '/portfolio/msib-sc-datascience.png',
    verificationUrl: 'https://www.startupcampus.id/certificate/public/KM7-DS33E6',
  },
];