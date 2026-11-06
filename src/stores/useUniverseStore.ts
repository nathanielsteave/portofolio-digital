import { create } from 'zustand';
import type { QualityTier, SceneStatus, SectionId, DestinationId } from '../types/scene';

const MOTION_STORAGE_KEY = 'du:motion';

function canUseStorage(): boolean {
  try {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  } catch {
    return false;
  }
}

export function hasStoredMotionPreference(): boolean {
  if (!canUseStorage()) {
    return false;
  }

  try {
    return window.localStorage.getItem(MOTION_STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}

export function readInitialMotionPreference(): boolean {
  if (typeof window === 'undefined') {
    return true;
  }

  if (canUseStorage()) {
    try {
      const stored = window.localStorage.getItem(MOTION_STORAGE_KEY);
      if (stored === 'on') {
        return true;
      }
      if (stored === 'off') {
        return false;
      }
    } catch {
      // Fall through to the system preference.
    }
  }

  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

interface UniverseState {
  activeSection: SectionId;
  quality: QualityTier;
  sceneStatus: SceneStatus;
  motionEnabled: boolean;
  isIndexOpen: boolean;
  currentDestination: DestinationId;
  setActiveSection: (section: SectionId) => void;
  setQuality: (quality: QualityTier) => void;
  setSceneStatus: (status: SceneStatus) => void;
  setMotionEnabled: (motionEnabled: boolean) => void;
  toggleMotion: () => void;
  openIndex: () => void;
  closeIndex: () => void;
  setCurrentDestination: (destination: DestinationId) => void;
}

export const useUniverseStore = create<UniverseState>((set) => ({
  activeSection: 'origin',
  quality: 'medium',
  sceneStatus: 'idle',
  motionEnabled: readInitialMotionPreference(),
  isIndexOpen: false,
  currentDestination: 'origin',
  setActiveSection: (activeSection) => set({ activeSection }),
  setQuality: (quality) => set({ quality }),
  setSceneStatus: (sceneStatus) => set({ sceneStatus }),
  setMotionEnabled: (motionEnabled) => set({ motionEnabled }),
  toggleMotion: () =>
    set((state) => {
      const motionEnabled = !state.motionEnabled;

      if (canUseStorage()) {
        try {
          window.localStorage.setItem(MOTION_STORAGE_KEY, motionEnabled ? 'on' : 'off');
        } catch {
          // The session still works without persistence.
        }
      }

      return { motionEnabled };
    }),
  openIndex: () => set({ isIndexOpen: true }),
  closeIndex: () => set({ isIndexOpen: false }),
  setCurrentDestination: (destination) => set({ currentDestination: destination }),
}));
