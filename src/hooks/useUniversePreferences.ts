import { useEffect } from 'react';
import { detectQuality } from '../lib/quality';
import {
  hasStoredMotionPreference,
  useUniverseStore,
} from '../stores/useUniverseStore';

export function useMotionPreference(): void {
  const motionEnabled = useUniverseStore((state) => state.motionEnabled);
  const setMotionEnabled = useUniverseStore((state) => state.setMotionEnabled);

  useEffect(() => {
    document.documentElement.dataset.motion = motionEnabled ? 'on' : 'off';
  }, [motionEnabled]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (event: MediaQueryListEvent) => {
      if (!hasStoredMotionPreference()) {
        setMotionEnabled(!event.matches);
      }
    };

    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, [setMotionEnabled]);
}

export function useSceneQuality() {
  const quality = useUniverseStore((state) => state.quality);
  const setQuality = useUniverseStore((state) => state.setQuality);
  const setSceneStatus = useUniverseStore((state) => state.setSceneStatus);

  useEffect(() => {
    const nextQuality = detectQuality();
    setQuality(nextQuality);

    if (nextQuality === 'static') {
      setSceneStatus('static');
    }
  }, [setQuality, setSceneStatus]);

  return quality;
}
