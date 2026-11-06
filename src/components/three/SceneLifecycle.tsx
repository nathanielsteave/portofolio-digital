import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useUniverseStore } from '../../stores/useUniverseStore';

export function SceneLifecycle() {
  const gl = useThree((state) => state.gl);
  const invalidate = useThree((state) => state.invalidate);
  const motionEnabled = useUniverseStore((state) => state.motionEnabled);
  const setSceneStatus = useUniverseStore((state) => state.setSceneStatus);
  const ready = useRef(false);

  useEffect(() => {
    invalidate();
  }, [invalidate, motionEnabled]);

  useEffect(() => {
    const canvas = gl.domElement;

    const handleContextLost = (event: Event) => {
      event.preventDefault();
      setSceneStatus('error');
    };

    canvas.addEventListener('webglcontextlost', handleContextLost);
    return () => canvas.removeEventListener('webglcontextlost', handleContextLost);
  }, [gl, setSceneStatus]);

  useFrame(() => {
    if (!ready.current) {
      ready.current = true;
      setSceneStatus('ready');
    }
  });

  return null;
}
