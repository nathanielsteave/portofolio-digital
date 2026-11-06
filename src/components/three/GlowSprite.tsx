import { useMemo } from 'react';
import * as THREE from 'three';

interface GlowSpriteProps {
  position: [number, number, number];
  scale: number;
  color?: string;
  opacity?: number;
}

function createGlowTexture(): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext('2d');
  if (context) {
    const gradient = context.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2,
    );
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.5)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.12)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.needsUpdate = true;
  return texture;
}

let sharedGlowTexture: THREE.CanvasTexture | null = null;

function getGlowTexture(): THREE.CanvasTexture {
  if (!sharedGlowTexture) {
    sharedGlowTexture = createGlowTexture();
  }

  return sharedGlowTexture;
}

export function GlowSprite({
  position,
  scale,
  color = '#5fe3ff',
  opacity = 0.2,
}: GlowSpriteProps) {
  const texture = useMemo(() => getGlowTexture(), []);

  return (
    <sprite position={position} scale={[scale, scale, 1]} renderOrder={-1}>
      <spriteMaterial
        map={texture}
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        depthTest
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </sprite>
  );
}
