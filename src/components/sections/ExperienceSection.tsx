import { experience } from '../../data/experience';

export function ExperienceSection() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="relative z-10 border-t border-line bg-void"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-8 md:py-32 lg:px-12">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ion">05 / Experience</p>
            <h2 id="experience-title" className="mt-5 font-display text-5xl leading-[0.95] text-bone md:text-6xl">Work &amp; community</h2>
          </div>
          <div className="md:col-span-8">
            <ol className="border-t border-line">
              {experience.map((entry) => (
                <li key={`${entry.role}-${entry.period}`} className="grid gap-3 border-b border-line py-6 sm:grid-cols-[150px_1fr] sm:gap-8">
                  <p className="font-mono text-[10px] uppercase leading-relaxed tracking-[0.1em] text-muted">{entry.period}</p>
                  <div>
                    <h3 className="font-display text-3xl leading-tight text-bone">{entry.role}</h3>
                    <p className="mt-1 text-[13px] text-ion">{entry.company} <span className="text-muted">/ {entry.location}</span></p>
                    {entry.description ? <p className="mt-4 max-w-[66ch] text-[14px] leading-[1.7] text-muted">{entry.description}</p> : null}
                    {entry.technologies.length > 0 ? (
                      <p className="mt-3 font-mono text-[9px] uppercase leading-[1.8] tracking-[0.08em] text-muted">
                        {entry.technologies.join(' / ')}
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}