import type { QualityTier } from '../../types/scene';

interface LightingProps {
  quality: QualityTier;
}

export function Lighting({ quality }: LightingProps) {
  const shadowsEnabled = quality === 'high';

  return (
    <>
      <ambientLight intensity={0.42} color="#8092b8" />
      <hemisphereLight args={['#6b80b7', '#05070c', 0.44]} />
      <directionalLight
        position={[5.5, 7, 4.5]}
        intensity={2.8}
        color="#dce9ff"
        castShadow={shadowsEnabled}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={32}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0004}
      />
      <pointLight
        position={[-4.5, 2.2, -2.5]}
        intensity={28}
        distance={18}
        decay={2}
        color="#8b7cff"
      />
      <pointLight
        position={[3.4, -1.4, 2.8]}
        intensity={13}
        distance={11}
        decay={2}
        color="#5fe3ff"
      />
    </>
  );
}
