import { GlowSprite } from './GlowSprite';

export function AboutMeIsland() {
  return (
    <group>
      <mesh receiveShadow>
        <torusKnotGeometry args={[2.2, 0.4, 64, 8]} />
        <meshStandardMaterial color="#5fe3ff" roughness={0.7} metalness={0.3} />
      </mesh>

      <mesh>
        <torusGeometry args={[2.2, 0.1, 8, 64]} />
        <meshStandardMaterial color="#8b7cff" transparent opacity={0.4} depthWrite={false} toneMapped={false} />
      </mesh>

      <group>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.3, 0]} receiveShadow>
          <boxGeometry args={[4.5, 0.1, 4.5]} />
          <meshStandardMaterial color="#0a0f1a" roughness={0.95} metalness={0.05} />
        </mesh>

        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.8, 0]} receiveShadow>
          <torusGeometry args={[3.8, 0.15, 8, 64]} />
          <meshStandardMaterial color="#5fe3ff" transparent opacity={0.3} depthWrite={false} toneMapped={false} />
        </mesh>

        <mesh position={[0, 1.6, 0]} receiveShadow>
          <sphereGeometry args={[0.9, 32, 32]} />
          <meshStandardMaterial color="#8b7cff" roughness={0.6} metalness={0.3} />
        </mesh>

        <mesh position={[0, 2.4, 0]} receiveShadow>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial color="#5fe3ff" roughness={0.6} metalness={0.3} />
        </mesh>
      </group>

      <GlowSprite position={[0, 1.2, 0]} scale={2.5} color="#5fe3ff" opacity={0.18} />
      <GlowSprite position={[0, -1.2, 0]} scale={2} color="#8b7cff" opacity={0.14} />
    </group>
  );
}