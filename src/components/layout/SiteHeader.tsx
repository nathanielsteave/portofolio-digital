import { Menu } from 'lucide-react';
import { useUniverseStore } from '../../stores/useUniverseStore';
import { MotionToggle } from '../ui/MotionToggle';

export function SiteHeader() {
  const openIndex = useUniverseStore((state) => state.openIndex);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-void/90 md:border-transparent md:bg-transparent">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:h-18 md:px-8 lg:px-12">
        <a
          href="#origin"
          className="group flex items-center gap-3 text-bone"
          aria-label="Nathaniel Steave Harjanto, back to the origin"
        >
          <span
            className="h-7 w-px bg-ion transition-transform duration-300 group-hover:scale-y-75"
            aria-hidden="true"
          />
          <span className="flex flex-col font-mono text-[10px] uppercase leading-tight tracking-[0.2em]">
            <span>NSH</span>
            <span>Portfolio</span>
          </span>
        </a>

        <div className="flex items-center gap-2">
          <MotionToggle />
          <a
            href="/portfolio/Nathaniel_Steave_Harjanto_Resume.pdf"
            download
            className="inline-flex h-11 items-center border border-line-strong px-3 font-mono text-[10px] uppercase tracking-[0.14em] text-bone transition-colors duration-200 hover:border-bone/40 hover:bg-white/[0.035]"
          >
            Resume
          </a>
          <button
            type="button"
            onClick={openIndex}
            aria-label="Open zone index"
            className="inline-flex h-11 items-center gap-2 rounded-xs border border-line-strong px-3 font-mono text-[10px] uppercase tracking-[0.14em] text-bone transition-colors duration-200 hover:border-bone/40 hover:bg-white/[0.035]"
          >
            <Menu size={15} strokeWidth={1.5} aria-hidden="true" />
            <span className="hidden sm:inline">Zone index</span>
          </button>
        </div>
      </div>
    </header>
  );
}
