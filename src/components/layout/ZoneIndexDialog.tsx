import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { zones } from '../../data/sections';
import { useUniverseStore } from '../../stores/useUniverseStore';
import { MotionToggle } from '../ui/MotionToggle';
import type { DestinationId } from '../../types/scene';

export function ZoneIndexDialog() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isOpen = useUniverseStore((state) => state.isIndexOpen);
  const closeIndex = useUniverseStore((state) => state.closeIndex);
  const setCurrentDestination = useUniverseStore((state) => state.setCurrentDestination);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
      document.documentElement.style.overflow = 'hidden';
      return;
    }

    if (dialog.open) {
      dialog.close();
    }
    document.documentElement.style.overflow = '';
  }, [isOpen]);

  useEffect(() => {
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="zone-index-title"
      onKeyDown={(event) => {
        if (event.key === 'Escape') {
          event.preventDefault();
          closeIndex();
        }
      }}
      onCancel={(event) => {
        event.preventDefault();
        closeIndex();
      }}
      onClose={closeIndex}
      onClick={(event) => {
        if (event.target === dialogRef.current) {
          closeIndex();
        }
      }}
      className="zone-dialog"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between border-b border-line px-6 py-6 sm:px-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ion">
              Navigation
            </p>
            <h2 id="zone-index-title" className="mt-1 font-display text-4xl leading-none text-bone">
              Zone index
            </h2>
          </div>
          <button
            type="button"
            onClick={closeIndex}
            aria-label="Close zone index"
            className="inline-flex h-11 w-11 items-center justify-center rounded-[2px] border border-line-strong text-bone transition-colors duration-200 hover:border-bone/40 hover:bg-white/[0.035]"
          >
            <X size={17} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4 sm:px-8">
          <ul>
            {zones.map((zone) => {
                return (
                  <li key={zone.id} className="border-b border-line/70">
                  {zone.href ? (
                    <a
                      href={zone.href}
                      onClick={() => {
                        setCurrentDestination(zone.id as DestinationId);
                        closeIndex();
                      }}
                      className="group flex min-h-[72px] items-center justify-between gap-4 py-4"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-mono text-[10px] tracking-[0.16em] text-muted">
                          {zone.index}
                        </span>
                        <span>
                          <span className="block font-display text-3xl leading-none text-bone transition-colors group-hover:text-ion">
                            {zone.label}
                          </span>
                          <span className="mt-1 block text-[13px] text-muted">{zone.note}</span>
                        </span>
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ion">
                        Live
                      </span>
                    </a>
                  ) : (
                    <div
                      className="flex min-h-[72px] items-center justify-between gap-4 py-4"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-mono text-[10px] tracking-[0.16em] text-muted">
                          {zone.index}
                        </span>
                        <span>
                          <span className="block font-display text-3xl leading-none text-bone">
                            {zone.label}
                          </span>
                          <span className="mt-1 block text-[13px] text-muted">{zone.note}</span>
                        </span>
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted">
                        In build
                      </span>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="flex items-center justify-between gap-4 border-t border-line px-6 py-5 sm:px-8">
          <p className="text-[13px] text-muted">Motion follows your system until changed.</p>
          <MotionToggle />
        </div>
      </div>
    </dialog>
  );
}