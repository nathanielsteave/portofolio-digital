/* eslint-disable react-hooks/immutability -- The star uniforms are intentionally mutated inside the render loop. */
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { mulberry32 } from '../../lib/math';
import { useUniverseStore } from '../../stores/useUniverseStore';
import type { QualityTier } from '../../types/scene';

interface StarfieldProps {
  quality: QualityTier;
}

const STAR_COUNTS: Record<QualityTier, number> = {
  high: 3800,
  medium: 2400,
  low: 1300,
  static: 0,
};

const VERTEX_SHADER = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute float aSpeed;
  attribute vec3 aColor;

  uniform float uTime;
  uniform float uPixelRatio;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vColor = aColor;
    float twinkle = 0.7 + 0.3 * sin(uTime * aSpeed + aPhase);
    vAlpha = twinkle;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uPixelRatio * (58.0 / max(1.0, -mvPosition.z));
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec2 offset = gl_PointCoord - 0.5;
    float distanceToCenter = length(offset);

    if (distanceToCenter > 0.5) {
      discard;
    }

    float core = smoothstep(0.5, 0.04, distanceToCenter);
    float strength = core * vAlpha;
    gl_FragColor = vec4(vColor * strength, strength);
  }
`;

function buildStarGeometry(count: number) {
  const random = mulberry32(90210);
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const phases = new Float32Array(count);
  const speeds = new Float32Array(count);

  const bone = new THREE.Color('#c9d7f0');
  const ion = new THREE.Color('#5fe3ff');
  const nebula = new THREE.Color('#8b7cff');
  const color = new THREE.Color();

  for (let index = 0; index < count; index += 1) {
    const vertical = random() * 2 - 1;
    const theta = random() * Math.PI * 2;
    const radius = 24 + Math.pow(random(), 0.62) * 52;
    const horizontal = Math.sqrt(Math.max(0, 1 - vertical * vertical));

    positions[index * 3] = Math.cos(theta) * horizontal * radius;
    positions[index * 3 + 1] = vertical * radius * 0.82;
    positions[index * 3 + 2] = Math.sin(theta) * horizontal * radius;

    const tint = random();
    if (tint > 0.9) {
      color.copy(ion);
    } else if (tint > 0.82) {
      color.copy(nebula);
    } else {
      color.copy(bone);
    }

    const brightness = 0.55 + random() * 0.45;
    colors[index * 3] = color.r * brightness;
    colors[index * 3 + 1] = color.g * brightness;
    colors[index * 3 + 2] = color.b * brightness;

    const rare = random() > 0.985;
    sizes[index] = rare ? 1.5 + random() * 0.7 : 0.34 + random() * 0.7;
    phases[index] = random() * Math.PI * 2;
    speeds[index] = 0.45 + random() * 1.4;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
  geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));
  geometry.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
  geometry.computeBoundingSphere();

  return geometry;
}

export function Starfield({ quality }: StarfieldProps) {
  const motionEnabled = useUniverseStore((state) => state.motionEnabled);
  const groupRef = useRef<THREE.Group>(null);

  const count = STAR_COUNTS[quality];
  const geometry = useMemo(() => buildStarGeometry(Math.max(count, 1)), [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: {
        value: Math.min(typeof window === 'undefined' ? 1 : window.devicePixelRatio, 2),
      },
    }),
    [],
  );

  useFrame((state) => {
    if (!motionEnabled) {
      return;
    }

    uniforms.uTime.value = state.clock.elapsedTime;

    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.005;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.02) * 0.015;
    }
  });

  if (count === 0) {
    return null;
  }

  return (
    <group ref={groupRef} rotation={[0.1, 0, 0]}>
      <points geometry={geometry} frustumCulled={false}>
        <shaderMaterial
          vertexShader={VERTEX_SHADER}
          fragmentShader={FRAGMENT_SHADER}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </points>
    </group>
  );
}
