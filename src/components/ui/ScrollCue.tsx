export function ScrollCue() {
  return (
    <a
      href="#profile"
      aria-label="Scroll to the profile section"
      className="group flex items-center gap-4 text-muted transition-colors duration-200 hover:text-bone"
    >
      <span className="scroll-cue-line" aria-hidden="true" />
      <span className="font-mono text-[9px] uppercase tracking-[0.18em]">Scroll</span>
    </a>
  );
}
