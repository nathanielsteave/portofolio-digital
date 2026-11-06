import { useMemo } from 'react';
import * as THREE from 'three';
import { GlowSprite } from './GlowSprite';

export function ContactPortal() {
  const geometry = useMemo(() => new THREE.IcosahedronGeometry(1.5, 1), []);

  const position = geometry.getAttribute('position');
  const vertex = new THREE.Vector3();

  for (let i = 0; i < position.count; i += 1) {
    vertex.fromBufferAttribute(position, i);
    vertex.normalize();

    const pulse = Math.sin(i * 0.5) * 0.3 + 0.7;
    const r = 1.5 * pulse;

    vertex.multiplyScalar(r);
    position.setXYZ(i, vertex.x, vertex.y, vertex.z);
  }

  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();

  return (
    <group>
      <mesh receiveShadow />
      <mesh />
      <mesh />
      <GlowSprite position={[0, 0.8, 0]} scale={3.5} color="#5fe3ff" opacity={0.2} />
      <GlowSprite position={[0, -0.8, 0]} scale={3} color="#8b7cff" opacity={0.18} />
    </group>
  );
}