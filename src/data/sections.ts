export type ZoneStatus = 'live' | 'building';

export interface Zone {
  id: string;
  index: string;
  label: string;
  note: string;
  status: ZoneStatus;
  href?: string;
}

export const zones: readonly Zone[] = [
  {
    id: 'origin',
    index: '00',
    label: 'Origin',
    note: 'The universe environment',
    status: 'live',
    href: '#origin',
  },
  {
    id: 'profile',
    index: '01',
    label: 'Profile',
    note: 'Background and education',
    status: 'live',
    href: '#profile',
  },
  {
    id: 'skills',
    index: '02',
    label: 'Skills',
    note: 'Tools and capabilities',
    status: 'live',
    href: '#skills',
  },
  {
    id: 'learning',
    index: '03',
    label: 'Learning',
    note: 'Current study and practice',
    status: 'live',
    href: '#learning',
  },
  {
    id: 'projects',
    index: '04',
    label: 'Projects',
    note: 'Selected work and repositories',
    status: 'live',
    href: '#projects',
  },
  {
    id: 'experience',
    index: '05',
    label: 'Experience',
    note: 'Work and community experience',
    status: 'live',
    href: '#experience',
  },
  {
    id: 'certificates',
    index: '06',
    label: 'Certificates',
    note: 'Training and verified credentials',
    status: 'live',
    href: '#certificates',
  },
  {
    id: 'contact',
    index: '07',
    label: 'Contact',
    note: 'Professional links',
    status: 'live',
    href: '#contact',
  },
];
