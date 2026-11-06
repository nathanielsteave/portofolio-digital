import { GlowSprite } from './GlowSprite';

interface ProjectNode {
  position: [number, number, number];
  size: number;
  color: string;
}

export function ProjectGalaxy() {
  const random = (seed: number) => {
    let value = seed;
    return () => {
      value = (value * 1103515245 + 12345) >>> 0;
      return (value >>> 16) / 65536;
    };
  };

  const seed = random(90210);

  const nodes: ProjectNode[] = Array.from({ length: 28 }, () => {
    const theta = seed() * Math.PI * 2;
    const phi = Math.acos(2 * seed() - 1);
    const r = 3 + seed() * 4;

    const x = Math.sin(phi) * Math.cos(theta) * r;
    const y = Math.cos(phi) * r;
    const z = Math.sin(phi) * Math.sin(theta) * r;

    const nodeColor = seed() > 0.7 ? '#5fe3ff' : (seed() > 0.5 ? '#8b7cff' : '#0a0f1a');
    const size = 0.15 + seed() * 0.25;

    return { position: [x, y, z], size, color: nodeColor };
  });

  return (
    <group>
      <mesh>
        <sphereGeometry args={[3, 32, 32]} />
        <meshStandardMaterial color="#0a0f1a" roughness={0.9} metalness={0.05} />
      </mesh>
      {nodes.map((node, index) => (
        <mesh key={index} position={node.position}>
          <sphereGeometry args={[node.size, 12, 12]} />
          <meshStandardMaterial
            color={node.color}
            roughness={0.8}
            metalness={node.color === '#5fe3ff' ? 0.8 : 0.2}
          />
        </mesh>
      ))}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.2, 3.5, 32]} />
        <meshBasicMaterial
          color="#5fe3ff"
          transparent
          opacity={0.15}
          depthWrite={false}
          side={2}
          toneMapped={false}
        />
      </mesh>
      <GlowSprite position={[0, 2, 0]} scale={3.5} color="#5fe3ff" opacity={0.18} />
      <GlowSprite position={[0, -2, 0]} scale={3} color="#8b7cff" opacity={0.14} />
    </group>
  );
}