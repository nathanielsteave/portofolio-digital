/* eslint-disable react-hooks/immutability -- React Three Fiber scene objects are intentionally mutated inside the render loop. */
import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { clamp } from '../../lib/math';
import { useUniverseStore } from '../../stores/useUniverseStore';

export function CameraRig() {
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const motionEnabled = useUniverseStore((state) => state.motionEnabled);

  const pointer = useRef({ x: 0, y: 0 });
  const scroll = useRef(0);
  const intro = useRef(0);
  const lookAt = useRef(new THREE.Vector3(0.2, 0.5, 0));

  const compact = size.width < 768;

  useEffect(() => {
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = compact ? 52 : 42;
      camera.updateProjectionMatrix();
    }
  }, [camera, compact]);

  useEffect(() => {
    if (!motionEnabled) {
      return;
    }

    const handlePointer = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener('pointermove', handlePointer, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointer);
  }, [motionEnabled]);

  useEffect(() => {
    const handleScroll = () => {
      scroll.current = clamp(window.scrollY / Math.max(window.innerHeight, 1), 0, 1);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame((_, delta) => {
    const step = Math.min(delta, 0.05);
    const baseX = 0;
    const baseY = compact ? 0.45 : 0.65;
    const baseZ = compact ? 10.2 : 8.8;
    const maxParallaxX = compact ? 0.12 : 0.38;
    const maxParallaxY = compact ? 0.08 : 0.2;

    if (!motionEnabled) {
      intro.current = 1;
      camera.position.set(baseX, baseY, baseZ);
      lookAt.current.set(compact ? 0.1 : 0.3, compact ? 0.6 : 0.55, 0);
      camera.lookAt(lookAt.current);
      return;
    }

    intro.current = THREE.MathUtils.damp(intro.current, 1, 1.6, step);

    const targetX = baseX + pointer.current.x * maxParallaxX;
    const targetY = baseY + pointer.current.y * maxParallaxY - scroll.current * 0.22;
    const targetZ = baseZ + (1 - intro.current) * 2.4 + scroll.current * 0.7;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 4.2, step);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 4.2, step);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 3.4, step);

    const lookX = (compact ? 0.1 : 0.3) + pointer.current.x * 0.08;
    const lookY = (compact ? 0.6 : 0.55) + pointer.current.y * 0.04;
    lookAt.current.x = THREE.MathUtils.damp(lookAt.current.x, lookX, 3.6, step);
    lookAt.current.y = THREE.MathUtils.damp(lookAt.current.y, lookY, 3.6, step);
    lookAt.current.z = 0;

    camera.lookAt(lookAt.current);
  });

  return null;
}
