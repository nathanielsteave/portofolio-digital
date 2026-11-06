import { about } from '../../data/about';

export function LearningSection() {
  return (
    <section
      id="learning"
      aria-labelledby="learning-title"
      className="relative z-10 border-t border-line bg-void"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-8 md:py-24 lg:px-12">
        <div className="grid gap-8 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ion">03 / In progress</p>
            <h2 id="learning-title" className="mt-5 font-display text-4xl leading-[0.98] text-bone md:text-5xl">
              Currently learning
            </h2>
          </div>
          <ol className="divide-y divide-line border-t border-line md:col-span-7 md:col-start-6">
            {about.currentlyLearning.map((item, index) => (
              <li key={item.title} className="grid gap-2 py-5 sm:grid-cols-[48px_1fr] sm:gap-4">
                <span className="font-mono text-[10px] tracking-[0.14em] text-ion">0{index + 1}</span>
                <div>
                  <h3 className="font-display text-2xl text-bone">{item.title}</h3>
                  <p className="mt-1 text-[13px] leading-[1.65] text-muted">{item.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}