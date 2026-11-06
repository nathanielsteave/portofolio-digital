import { skillGroups } from '../../data/skills';

export function SkillsSection() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-title"
      className="relative z-10 border-t border-line bg-void"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-8 md:py-32 lg:px-12">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ion">02 / Toolkit</p>
            <h2 id="skills-title" className="mt-5 font-display text-5xl leading-[0.95] text-bone md:text-6xl">Skills &amp; technology</h2>
          </div>
          <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 md:col-span-8">
            {skillGroups.map((group) => (
              <section key={group.name} aria-label={group.name} className="border-t border-line pt-4">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted">{group.name}</h3>
                <ul className="mt-4 divide-y divide-line/70">
                  {group.skills.map((skill) => (
                    <li key={skill.name} className="flex min-h-10 items-center justify-between gap-4 py-2">
                      <span className="text-[13px] text-bone">{skill.name}</span>
                      {skill.level ? (
                        <span className="shrink-0 font-mono text-[9px] uppercase tracking-[0.1em] text-muted">{skill.level}</span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}