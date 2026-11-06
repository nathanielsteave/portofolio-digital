import { useMemo } from 'react';
import * as THREE from 'three';
import { GlowSprite } from './GlowSprite';

export function SkillsPlanet() {
  const geometry = useMemo(() => {
    const shape = new THREE.IcosahedronGeometry(2.1, 2);
    const position = shape.getAttribute('position');
    const vertex = new THREE.Vector3();

    for (let i = 0; i < position.count; i += 1) {
      vertex.fromBufferAttribute(position, i);
      vertex.normalize();

      const band = Math.sin(vertex.x * 3 + vertex.y * 2 + vertex.z * 4) * 0.5 + 0.5;
      vertex.multiplyScalar(2.1 + band * 0.15);
      position.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }

    shape.computeVertexNormals();
    shape.computeBoundingSphere();
    return shape;
  }, []);

  const atmosphereUniforms = useMemo(() => ({
    uColor: { value: new THREE.Color('#5fe3ff') },
    uIntensity: { value: 0.4 },
  }), []);

  const atmosphereVertex = `
      varying vec3 vNormal;
      varying vec3 vViewDirection;
      void main() {
        vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
        vNormal = normalize(normalMatrix * normal);
        vViewDirection = normalize(-modelViewPosition.xyz);
        gl_Position = projectionMatrix * modelViewPosition;
      }
    `;

  const atmosphereFragment = `
      uniform vec3 uColor;
      uniform float uIntensity;
      varying vec3 vNormal;
      varying vec3 vViewDirection;
      void main() {
        float rim = 1.0 - abs(dot(normalize(vNormal), normalize(vViewDirection)));
        float atmosphere = pow(rim, 2.5) * uIntensity;
        gl_FragColor = vec4(uColor * atmosphere, atmosphere);
      }
    `;

  return (
    <group>
      <mesh geometry={geometry}>
        <meshStandardMaterial color="#0a0f1a" roughness={0.9} metalness={0.05} flatShading />
      </mesh>
      <mesh geometry={geometry} scale={1.04}>
        <shaderMaterial
          vertexShader={atmosphereVertex}
          fragmentShader={atmosphereFragment}
          uniforms={atmosphereUniforms}
          transparent
          depthWrite={false}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, Math.PI / 6]}>
        <ringGeometry args={[1.8, 2, 32]} />
        <meshBasicMaterial color="#5fe3ff" transparent opacity={0.25} depthWrite={false} toneMapped={false} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, -Math.PI / 6]}>
        <ringGeometry args={[2.5, 2.7, 32]} />
        <meshBasicMaterial color="#5fe3ff" transparent opacity={0.25} depthWrite={false} toneMapped={false} />
      </mesh>
      <GlowSprite position={[0, 1.5, 0]} scale={3} color="#5fe3ff" opacity={0.15} />
      <GlowSprite position={[0, -1.5, 0]} scale={2.5} color="#8b7cff" opacity={0.12} />
    </group>
  );
}