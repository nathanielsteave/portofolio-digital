import { useUniverseStore } from '../../stores/useUniverseStore';
import { cn } from '../../lib/cn';

export function MotionToggle() {
  const motionEnabled = useUniverseStore((state) => state.motionEnabled);
  const toggleMotion = useUniverseStore((state) => state.toggleMotion);

  return (
    <button
      type="button"
      onClick={toggleMotion}
      aria-pressed={motionEnabled}
      aria-label="Motion"
      className="inline-flex h-11 items-center gap-2 rounded-[2px] border border-line-strong px-3 font-mono text-[10px] uppercase tracking-[0.14em] text-bone transition-colors duration-200 hover:border-bone/40 hover:bg-white/[0.035]"
    >
      <span
        className={cn(
          'h-1.5 w-1.5 rounded-full transition-colors duration-200',
          motionEnabled ? 'bg-ion' : 'bg-muted',
        )}
        aria-hidden="true"
      />
      <span>Motion</span>
      <span className={cn('hidden xs:inline', motionEnabled ? 'text-ion' : 'text-muted')}>
        {motionEnabled ? 'On' : 'Off'}
      </span>
    </button>
  );
}
