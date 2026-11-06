import { about } from '../../data/about';

export function AboutMeSection() {
  return (
    <section
      id="profile"
      aria-labelledby="profile-title"
      className="relative z-10 border-t border-line bg-void"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-8 md:py-32 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ion">01 / Profile</p>
            <h2 id="profile-title" className="mt-5 font-display text-5xl leading-[0.95] text-bone md:text-6xl">
              A little about me.
            </h2>
            <div className="mt-8 aspect-[4/5] max-w-[360px] overflow-hidden border border-line bg-ink">
              <img
                src={about.profileImage}
                alt="Nathaniel Steave Harjanto"
                width={800}
                height={1000}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover object-[center_30%]"
              />
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <p className="font-display text-3xl leading-tight text-bone md:text-4xl">{about.headline}</p>
            <p className="mt-5 max-w-[58ch] text-[15px] leading-[1.75] text-muted md:text-base">{about.intro}</p>

            <div className="mt-10 border-t border-line pt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ion">Education</p>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <div className="flex items-start gap-4">
                  <img src={about.universityLogo} alt="" width={56} height={56} loading="lazy" className="mt-1 size-12 shrink-0 object-contain" />
                  <div>
                    <h3 className="font-display text-2xl text-bone">{about.degree}</h3>
                    <p className="mt-1 text-[13px] text-muted">{about.university}</p>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">{about.period}</p>
                  </div>
                </div>
                <dl className="grid grid-cols-2 gap-4">
                  <div>
                    <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">GPA</dt>
                    <dd className="mt-1 font-display text-2xl text-bone">{about.gpa}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">Credits</dt>
                    <dd className="mt-1 font-display text-2xl text-bone">{about.credits}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">Distinction</dt>
                    <dd className="mt-1 text-[13px] text-bone">{about.distinction}</dd>
                  </div>
                </dl>
              </div>
              <a
                href={about.resume}
                download
                className="mt-6 inline-flex min-h-11 items-center border-b border-line-strong py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-bone transition-colors hover:border-ion hover:text-ion"
              >
                Download resume
              </a>
            </div>

            <div className="mt-8 border-t border-line pt-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ion">Relevant coursework</p>
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                {about.relevantCoursework.map((course) => (
                  <li key={course} className="border-b border-line pb-1 text-[12px] text-muted">{course}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}