import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { profile } from '../../data/profile';
import { useUniverseStore } from '../../stores/useUniverseStore';
import { SceneStatusIndicator } from '../ui/SceneStatusIndicator';
import { ScrollCue } from '../ui/ScrollCue';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function HeroSection() {
  const motionEnabled = useUniverseStore((state) => state.motionEnabled);
  const openIndex = useUniverseStore((state) => state.openIndex);
  const reduce = !motionEnabled;

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.09,
        delayChildren: reduce ? 0 : 0.12,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.85, ease: EASE },
    },
  };

  return (
    <section
      id="origin"
      aria-labelledby="hero-title"
      className="relative z-10 overflow-hidden"
    >
      <div className="hero-scrim" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-svh max-w-[1600px] flex-col px-5 pb-7 pt-24 md:px-8 md:pb-10 md:pt-32 lg:px-12">
        <motion.div
          variants={container}
          initial={reduce ? false : 'hidden'}
          animate="show"
          className="relative z-10 flex flex-1 items-center py-10 md:py-14"
        >
          <div className="w-full max-w-170">
            <motion.div variants={item} className="flex items-center gap-3">
              <span className="h-px w-8 bg-ion" aria-hidden="true" />
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
                00 / Origin
              </p>
            </motion.div>

            <motion.h1
              id="hero-title"
              variants={item}
              className="mt-6 font-display text-[clamp(4.25rem,10vw,9.5rem)] leading-[0.9] tracking-[-0.035em] text-bone md:mt-8"
            >
              <span className="block">
                {profile.headlineLead}
                {' '}
              </span>
              <span className="block italic">{profile.headlineAccent}</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="mt-6 max-w-[48ch] text-[15px] leading-[1.65] text-muted md:mt-8 md:text-base"
            >
              {profile.intro}
            </motion.p>

            <motion.div
              variants={item}
              className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3 font-mono text-[9px] uppercase tracking-[0.16em] text-muted md:mt-9"
            >
              <span className="text-bone">{profile.name}</span>
              <span className="h-3 w-px bg-line" aria-hidden="true" />
              <span>{profile.role}</span>
            </motion.div>

            <motion.div variants={item} className="mt-7 flex flex-wrap items-center gap-3 md:mt-9">
              <a
                href="#projects"
                className="inline-flex h-12 items-center gap-3 rounded-xs bg-ion px-5 font-mono text-[10px] uppercase tracking-[0.14em] text-void transition-colors duration-200 hover:bg-bone"
              >
                View my work
                <ArrowDown size={15} strokeWidth={1.7} aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={openIndex}
                className="inline-flex h-12 items-center rounded-xs border border-line-strong px-5 font-mono text-[10px] uppercase tracking-[0.14em] text-bone transition-colors duration-200 hover:border-bone/40 hover:bg-white/[0.035]"
              >
                Open zone index
              </button>
              <a
                href="#skills"
                className="ml-4 inline-flex h-12 items-center rounded-xs border border-line-strong px-5 font-mono text-[10px] uppercase tracking-[0.14em] text-bone transition-colors duration-200 hover:border-bone/40 hover:bg-white/[0.035]"
              >
                Explore skills
              </a>
            </motion.div>
          </div>
        </motion.div>

        <div className="flex items-end justify-between gap-6">
          <ScrollCue />
          <SceneStatusIndicator />
        </div>
      </div>
    </section>
  );
}
