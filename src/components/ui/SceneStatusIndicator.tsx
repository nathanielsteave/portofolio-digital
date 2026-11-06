import { useUniverseStore } from '../../stores/useUniverseStore';
import { cn } from '../../lib/cn';

export function SceneStatusIndicator() {
  const sceneStatus = useUniverseStore((state) => state.sceneStatus);

  const label =
    sceneStatus === 'loading' || sceneStatus === 'idle'
      ? 'Calibrating scene'
      : sceneStatus === 'error' || sceneStatus === 'static'
        ? 'Static view active'
        : 'Scene online';

  const isFallback = sceneStatus === 'error' || sceneStatus === 'static';

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex items-center gap-2.5 font-mono text-[9px] uppercase tracking-[0.16em]',
        isFallback ? 'text-muted' : 'text-bone/80',
      )}
    >
      <span
        className={cn(
          'h-1 w-1 rounded-full',
          isFallback ? 'bg-muted' : 'bg-ion',
          sceneStatus === 'ready' ? 'opacity-100' : 'opacity-70',
        )}
        aria-hidden="true"
      />
      {label}
    </div>
  );
}
