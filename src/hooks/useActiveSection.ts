import { useEffect } from 'react';
import { useUniverseStore } from '../stores/useUniverseStore';
import type { SectionId } from '../types/scene';

const TRACKED_SECTIONS: SectionId[] = [
  'origin',
  'profile',
  'skills',
  'learning',
  'projects',
  'experience',
  'certificates',
  'contact',
];

export function useActiveSection(): void {
  const setActiveSection = useUniverseStore((state) => state.setActiveSection);

  useEffect(() => {
    const elements = TRACKED_SECTIONS.map((id) => document.getElementById(id)).filter(
      (element): element is HTMLElement => element !== null,
    );

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActiveSection(visible.target.id as SectionId);
        }
      },
      {
        rootMargin: '-40% 0px -40% 0px',
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    for (const element of elements) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [setActiveSection]);
}
