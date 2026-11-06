import { useUniverseStore } from '../../stores/useUniverseStore';

export function StaticBackdrop() {
  const sceneStatus = useUniverseStore((state) => state.sceneStatus);
  const sceneHidden = sceneStatus === 'ready';

  return (
    <>
      <div className="static-atmosphere" aria-hidden="true" />
      <div className="static-stars" aria-hidden="true" />
      <div className="static-scene" data-hidden={sceneHidden} aria-hidden="true">
        <div className="static-ring" />
        <div className="static-planet" />
        <div className="static-island" />
      </div>
    </>
  );
}
