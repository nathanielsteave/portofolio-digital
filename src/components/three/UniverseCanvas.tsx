import { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { useUniverseStore } from '../../stores/useUniverseStore';
import type { QualityTier } from '../../types/scene';
import { SceneRoot } from './SceneRoot';

interface UniverseCanvasProps {
  quality: QualityTier;
}

export default function UniverseCanvas({ quality }: UniverseCanvasProps) {
  const motionEnabled = useUniverseStore((state) => state.motionEnabled);
  const activeSection = useUniverseStore((state) => state.activeSection);
  const setSceneStatus = useUniverseStore((state) => state.setSceneStatus);

  useEffect(() => {
    setSceneStatus('loading');
  }, [setSceneStatus]);

  const sceneInView = activeSection === 'origin';
  const dpr: [number, number] =
    quality === 'high' ? [1, 1.75] : quality === 'medium' ? [1, 1.5] : [1, 1.25];

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0.65, 10.4], fov: 42, near: 0.1, far: 120 }}
      frameloop={motionEnabled && sceneInView ? 'always' : 'demand'}
      shadows={quality === 'high'}
      gl={{
        antialias: quality !== 'low',
        alpha: true,
        powerPreference: quality === 'high' ? 'high-performance' : 'default',
        stencil: false,
        depth: true,
      }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.08;
      }}
      style={{ touchAction: 'pan-y' }}
    >
      <SceneRoot quality={quality} />
    </Canvas>
  );
}
