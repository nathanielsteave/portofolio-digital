import { useThree } from '@react-three/fiber';
import type { QualityTier } from '../../types/scene';
import { CameraRig } from './CameraRig';
import { FloatingIsland } from './FloatingIsland';
import { GlowSprite } from './GlowSprite';
import { Lighting } from './Lighting';
import { Planet } from './Planet';
import { SceneLifecycle } from './SceneLifecycle';
import { Starfield } from './Starfield';

interface SceneRootProps {
  quality: QualityTier;
}

export function SceneRoot({ quality }: SceneRootProps) {
  const compact = useThree((state) => state.size.width < 768);

  return (
    <>
      <fogExp2 attach="fog" args={['#060a14', 0.028]} />

      <SceneLifecycle />
      <Lighting quality={quality} />
      <CameraRig />

      <GlowSprite position={[-6, 3.5, -12]} scale={18} color="#8b7cff" opacity={0.09} />
      <GlowSprite position={[6.5, -2.5, -9]} scale={13} color="#3e73c4" opacity={0.08} />

      <Starfield quality={quality} />
      <Planet quality={quality} compact={compact} />
      <FloatingIsland quality={quality} compact={compact} />
    </>
  );
}
