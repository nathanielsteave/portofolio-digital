import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { mulberry32 } from '../../lib/math';
import { useUniverseStore } from '../../stores/useUniverseStore';
import type { QualityTier } from '../../types/scene';
import { GlowSprite } from './GlowSprite';

interface FloatingIslandProps {
  quality: QualityTier;
  compact: boolean;
}

type OutlinePoint = [number, number];

interface Shard {
  position: [number, number, number];
  rotation: [number, number, number];
  radius: number;
  height: number;
}

function createOutline(random: () => number, radius: number, count: number): OutlinePoint[] {
  const points: OutlinePoint[] = [];

  for (let index = 0; index < count; index += 1) {
    const angle = (index / count) * Math.PI * 2;
    const wobble = 1 + (random() - 0.5) * 0.24 + Math.sin(angle * 3 + 0.9) * 0.075;
    const pointRadius = radius * wobble;
    points.push([
      Math.cos(angle) * pointRadius * 1.16,
      Math.sin(angle) * pointRadius * 0.8,
    ]);
  }

  return points;
}

function createShape(points: OutlinePoint[], scale = 1): THREE.Shape {
  const shape = new THREE.Shape();

  points.forEach(([x, y], index) => {
    if (index === 0) {
      shape.moveTo(x * scale, y * scale);
    } else {
      shape.lineTo(x * scale, y * scale);
    }
  });

  shape.closePath();
  return shape;
}

function createSlabGeometry(
  points: OutlinePoint[],
  depth: number,
  bevel: number,
): THREE.BufferGeometry {
  const geometry = new THREE.ExtrudeGeometry(createShape(points), {
    depth,
    steps: 1,
    curveSegments: 2,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel * 0.85,
    bevelSegments: 2,
  });

  geometry.rotateX(-Math.PI / 2);
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

function createContourGeometry(
  points: OutlinePoint[],
  rings: readonly number[],
): THREE.BufferGeometry {
  const positions: number[] = [];

  for (const ring of rings) {
    points.forEach(([x, y], index) => {
      const next = points[(index + 1) % points.length];
      positions.push(x * ring, 0, -y * ring, next[0] * ring, 0, -next[1] * ring);
    });
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geometry.computeBoundingSphere();
  return geometry;
}

function createShards(random: () => number, count: number): Shard[] {
  const shards: Shard[] = [
    {
      position: [0, -0.95, 0],
      rotation: [0, 0.4, Math.PI],
      radius: 0.26,
      height: 1.8,
    },
  ];

  for (let index = 1; index < count; index += 1) {
    const angle = random() * Math.PI * 2;
    const distance = 0.16 + random() * 0.68;
    const height = 0.34 + random() * 0.9;

    shards.push({
      position: [
        Math.cos(angle) * distance * 1.12,
        -height / 2 - 0.04,
        Math.sin(angle) * distance * 0.78,
      ],
      rotation: [
        (random() - 0.5) * 0.24,
        random() * Math.PI,
        Math.PI + (random() - 0.5) * 0.2,
      ],
      radius: 0.055 + random() * 0.12,
      height,
    });
  }

  return shards;
}

export function FloatingIsland({ quality, compact }: FloatingIslandProps) {
  const motionEnabled = useUniverseStore((state) => state.motionEnabled);
  const floatRef = useRef<THREE.Group>(null);

  const model = useMemo(() => {
    const random = mulberry32(41107);
    const points = createOutline(random, 1, 15);
    const slab = createSlabGeometry(points, 0.26, 0.05);
    const plate = createSlabGeometry(points, 0.035, 0.018);
    const contours = createContourGeometry(points, [0.34, 0.55, 0.76, 0.93]);
    const shards = createShards(random, quality === 'high' ? 9 : quality === 'medium' ? 7 : 5);

    return { slab, plate, contours, shards };
  }, [quality]);

  useFrame((state, delta) => {
    if (!motionEnabled || !floatRef.current) {
      return;
    }

    const time = state.clock.elapsedTime;
    floatRef.current.position.y = Math.sin(time * 0.55) * 0.08;
    floatRef.current.rotation.z = Math.sin(time * 0.34) * 0.022;
    floatRef.current.rotation.y += delta * 0.035;
  });

  const position: [number, number, number] = compact ? [1.25, -1.35, 1.1] : [1.5, -1.3, 1.1];
  const scale = compact ? 0.52 : 0.95;

  return (
    <group position={position} scale={scale}>
      <group ref={floatRef}>
        <mesh geometry={model.slab} castShadow={quality === 'high'} receiveShadow>
          <meshStandardMaterial color="#162134" roughness={0.92} metalness={0.06} flatShading />
        </mesh>

        <mesh geometry={model.plate} position={[0, 0.3, 0]} receiveShadow>
          <meshStandardMaterial color="#1d2b42" roughness={0.78} metalness={0.08} flatShading />
        </mesh>

        <lineSegments geometry={model.contours} position={[0, 0.365, 0]}>
          <lineBasicMaterial
            color="#5fe3ff"
            transparent
            opacity={0.22}
            depthWrite={false}
            toneMapped={false}
          />
        </lineSegments>

        {model.shards.map((shard, index) => (
          <mesh
            key={index}
            position={shard.position}
            rotation={shard.rotation}
            castShadow={quality === 'high'}
          >
            <coneGeometry args={[shard.radius, shard.height, 5, 1]} />
            <meshStandardMaterial
              color="#0f1725"
              roughness={0.97}
              metalness={0.03}
              flatShading
            />
          </mesh>
        ))}

        <group position={[0.19, 0.74, -0.12]} rotation={[0.02, 0.42, -0.035]}>
          <mesh castShadow>
            <boxGeometry args={[0.09, 0.86, 0.12]} />
            <meshStandardMaterial color="#0b1320" roughness={0.52} metalness={0.28} />
          </mesh>
          <mesh position={[0.051, 0.02, 0.002]}>
            <boxGeometry args={[0.007, 0.62, 0.03]} />
            <meshBasicMaterial color="#5fe3ff" toneMapped={false} />
          </mesh>
        </group>

        <pointLight
          position={[0.26, 0.72, 0.08]}
          intensity={2.6}
          distance={3.6}
          decay={2}
          color="#5fe3ff"
        />
        <pointLight
          position={[0, -1.1, 0.9]}
          intensity={8}
          distance={5}
          decay={2}
          color="#5fe3ff"
        />

        <GlowSprite position={[0, -0.55, 0.35]} scale={3.1} color="#5fe3ff" opacity={0.14} />
        <GlowSprite position={[0.2, 0.55, -0.2]} scale={1.6} color="#8b7cff" opacity={0.16} />
      </group>
    </group>
  );
}
