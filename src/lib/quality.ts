import type { QualityTier } from '../types/scene';

type NavigatorWithHints = Navigator & {
  deviceMemory?: number;
  connection?: { saveData?: boolean };
};

let cachedQuality: QualityTier | null = null;

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const context =
      canvas.getContext('webgl2') ?? canvas.getContext('webgl');

    if (!context) {
      return false;
    }

    context.getExtension('WEBGL_lose_context')?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export function detectQuality(): QualityTier {
  if (typeof window === 'undefined') {
    return 'static';
  }

  if (cachedQuality) {
    return cachedQuality;
  }

  const override = new URLSearchParams(window.location.search).get('quality');
  if (
    override === 'high' ||
    override === 'medium' ||
    override === 'low' ||
    override === 'static'
  ) {
    cachedQuality = override;
    return override;
  }

  if (!supportsWebGL()) {
    cachedQuality = 'static';
    return cachedQuality;
  }

  const navigatorHints = navigator as NavigatorWithHints;
  if (navigatorHints.connection?.saveData) {
    cachedQuality = 'static';
    return cachedQuality;
  }

  const width = window.innerWidth;
  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = navigatorHints.deviceMemory ?? 8;

  if (width < 640 || cores <= 4 || memory <= 4) {
    cachedQuality = 'low';
  } else if (width < 1024 || cores < 8) {
    cachedQuality = 'medium';
  } else {
    cachedQuality = 'high';
  }

  return cachedQuality;
}
