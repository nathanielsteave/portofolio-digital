import { GlowSprite } from './GlowSprite';

interface Module {
  id: number;
  position: [number, number, number];
  size: [number, number, number];
  color: string;
}

export function ExperienceStation() {
  const modules: Module[] = Array.from({ length: 12 }, (_, i) => {
    const theta = (i / 12) * Math.PI * 2;
    const level = Math.floor(i / 3);
    const offset = (i % 3) - 1;

    const x = Math.cos(theta) * (1.5 + level * 0.8) + offset * 0.3;
    const y = level * 1.3 - 1.5;
    const z = Math.sin(theta) * (1.5 + level * 0.8) + offset * 0.3;

    const color = i % 2 === 0 ? '#5fe3ff' : '#8b7cff';
    return {
      id: i,
      position: [x, y, z],
      size: [0.4, 0.6, 0.4],
      color,
    };
  });

  return (
    <group>
      <mesh>
        <icosahedronGeometry args={[1.8, 1]} />
        <meshStandardMaterial color="#0a0f1a" roughness={0.9} metalness={0.05} />
      </mesh>
      {modules.map((mod) => (
        <mesh key={mod.id} position={mod.position}>
          <boxGeometry args={mod.size} />
          <meshStandardMaterial color={mod.color} roughness={0.8} metalness={0.3} />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.2, 2.8, 32]} />
        <meshBasicMaterial
          color="#5fe3ff"
          transparent
          opacity={0.2}
          depthWrite={false}
          side={2}
          toneMapped={false}
        />
      </mesh>
      <GlowSprite position={[0, -2, 0]} scale={3} color="#5fe3ff" opacity={0.16} />
      <GlowSprite position={[0, 2, 0]} scale={2.5} color="#8b7cff" opacity={0.14} />
    </group>
  );
}