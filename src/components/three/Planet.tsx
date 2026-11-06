import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useUniverseStore } from '../../stores/useUniverseStore';
import type { QualityTier } from '../../types/scene';
import { GlowSprite } from './GlowSprite';

interface PlanetProps {
  quality: QualityTier;
  compact: boolean;
}

const PLANET_RADIUS = 2.35;

const ATMOSPHERE_VERTEX = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDirection;

  void main() {
    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDirection = normalize(-modelViewPosition.xyz);
    gl_Position = projectionMatrix * modelViewPosition;
  }
`;

const ATMOSPHERE_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;

  varying vec3 vNormal;
  varying vec3 vViewDirection;

  void main() {
    float rim = 1.0 - abs(dot(normalize(vNormal), normalize(vViewDirection)));
    float atmosphere = pow(rim, 2.7) * uIntensity;
    gl_FragColor = vec4(uColor * atmosphere, atmosphere);
  }
`;

function createSurfaceGeometry(detail: number): THREE.BufferGeometry {
  const geometry = new THREE.IcosahedronGeometry(PLANET_RADIUS, detail);
  const position = geometry.getAttribute('position');
  const vertex = new THREE.Vector3();
  const direction = new THREE.Vector3();

  for (let index = 0; index < position.count; index += 1) {
    vertex.fromBufferAttribute(position, index);
    direction.copy(vertex).normalize();

    const ridgeA =
      Math.sin(direction.x * 5.1 + direction.y * 3.3) *
      Math.cos(direction.z * 4.6 - direction.x * 2.1);
    const ridgeB = Math.sin(direction.y * 8.4 + direction.z * 6.1);
    const basin =
      Math.cos(direction.x * 2.2 - direction.z * 3.4 + direction.y * 1.7);
    const displacement = ridgeA * 0.045 + ridgeB * 0.02 + basin * 0.018;
    const scale = 1 + displacement;

    vertex.copy(direction).multiplyScalar(PLANET_RADIUS * scale);
    position.setXYZ(index, vertex.x, vertex.y, vertex.z);
  }

  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

export function Planet({ quality, compact }: PlanetProps) {
  const motionEnabled = useUniverseStore((state) => state.motionEnabled);
  const surfaceRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Group>(null);

  const detail = quality === 'high' ? 3 : 2;
  const segments = quality === 'high' ? 128 : quality === 'medium' ? 96 : 64;
  const atmosphereSegments = quality === 'high' ? 64 : quality === 'medium' ? 48 : 32;

  const surfaceGeometry = useMemo(() => createSurfaceGeometry(detail), [detail]);

  const atmosphereUniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color('#73a9f2') },
      uIntensity: { value: 0.72 },
    }),
    [],
  );

  useFrame((_, delta) => {
    if (!motionEnabled) {
      return;
    }

    if (surfaceRef.current) {
      surfaceRef.current.rotation.y += delta * 0.026;
    }

    if (ringRef.current) {
      ringRef.current.rotation.y += delta * 0.012;
    }
  });

  const position: [number, number, number] = compact ? [1.6, 4.6, -3.5] : [3.45, 1.0, -2.5];
  const scale = compact ? 0.5 : 1;

  return (
    <group position={position} scale={scale}>
      <GlowSprite position={[0, 0, -1.4]} scale={10.5} color="#4f86d8" opacity={0.13} />

      <pointLight
        position={[-3.1, 1.4, 2.7]}
        intensity={18}
        distance={9}
        decay={2}
        color="#5fe3ff"
      />
      <pointLight
        position={[-2.2, -2.1, 1.8]}
        intensity={9}
        distance={7}
        decay={2}
        color="#8b7cff"
      />

      <group ref={surfaceRef} rotation={[0.08, 0, -0.16]}>
        <mesh geometry={surfaceGeometry} castShadow={false} receiveShadow={false}>
          <meshStandardMaterial
            color="#243753"
            roughness={0.88}
            metalness={0.08}
            emissive="#0a1730"
            emissiveIntensity={0.55}
            flatShading
          />
        </mesh>

        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.72, 0]}>
          <torusGeometry args={[2.21, 0.0035, 4, segments]} />
          <meshBasicMaterial
            color="#5fe3ff"
            transparent
            opacity={0.28}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>

        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.88, 0]}>
          <torusGeometry args={[1.96, 0.0025, 4, segments]} />
          <meshBasicMaterial
            color="#8b7cff"
            transparent
            opacity={0.2}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </group>

      <mesh>
        <sphereGeometry args={[PLANET_RADIUS * 1.04, atmosphereSegments, atmosphereSegments]} />
        <shaderMaterial
          vertexShader={ATMOSPHERE_VERTEX}
          fragmentShader={ATMOSPHERE_FRAGMENT}
          uniforms={atmosphereUniforms}
          transparent
          depthWrite={false}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>

      <group ref={ringRef} rotation={[-Math.PI / 2 + 0.32, 0, 0.19]}>
        <mesh>
          <ringGeometry args={[PLANET_RADIUS * 1.45, PLANET_RADIUS * 1.95, segments]} />
          <meshBasicMaterial
            color="#5c7ea6"
            transparent
            opacity={0.14}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
        <mesh>
          <ringGeometry args={[PLANET_RADIUS * 1.96, PLANET_RADIUS * 1.985, segments]} />
          <meshBasicMaterial
            color="#6fdcf7"
            transparent
            opacity={0.42}
            side={THREE.DoubleSide}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
        <mesh>
          <ringGeometry args={[PLANET_RADIUS * 1.36, PLANET_RADIUS * 1.38, segments]} />
          <meshBasicMaterial
            color="#8b7cff"
            transparent
            opacity={0.24}
            side={THREE.DoubleSide}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      </group>
    </group>
  );
}
