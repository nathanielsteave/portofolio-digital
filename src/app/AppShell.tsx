import { lazy, Suspense, useEffect, useState } from 'react';
import { SiteFooter } from '../components/layout/SiteFooter';
import { SiteHeader } from '../components/layout/SiteHeader';
import { SkipLink } from '../components/layout/SkipLink';
import { ZoneIndexDialog } from '../components/layout/ZoneIndexDialog';
import { AboutMeSection } from '../components/sections/AboutMeSection';
import { CertificatesSection } from '../components/sections/CertificatesSection';
import { ContactSection } from '../components/sections/ContactSection';
import { ExperienceSection } from '../components/sections/ExperienceSection';
import { HeroSection } from '../components/sections/HeroSection';
import { LearningSection } from '../components/sections/LearningSection';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { SkillsSection } from '../components/sections/SkillsSection';
import { StaticBackdrop } from '../components/ui/StaticBackdrop';
import { useActiveSection } from '../hooks/useActiveSection';
import { useMotionPreference, useSceneQuality } from '../hooks/useUniversePreferences';
import { useUniverseStore } from '../stores/useUniverseStore';
import { SceneErrorBoundary } from './SceneErrorBoundary';

const UniverseCanvas = lazy(() => import('../components/three/UniverseCanvas'));

export function AppShell() {
  const quality = useSceneQuality();
  useMotionPreference();
  useActiveSection();

  const sceneStatus = useUniverseStore((state) => state.sceneStatus);
  const [loadScene, setLoadScene] = useState(false);

  useEffect(() => {
    if (quality === 'static') {
      return;
    }

    const timer = window.setTimeout(() => setLoadScene(true), 300);
    return () => window.clearTimeout(timer);
  }, [quality]);

  const shouldRenderScene =
    loadScene && quality !== 'static' && sceneStatus !== 'error';

  return (
    <>
      <SkipLink />
      <StaticBackdrop />

      {shouldRenderScene ? (
        <div className="scene-layer" data-ready={sceneStatus === 'ready'} aria-hidden="true">
          <SceneErrorBoundary>
            <Suspense fallback={null}>
              <UniverseCanvas quality={quality} />
            </Suspense>
          </SceneErrorBoundary>
        </div>
      ) : null}

      <SiteHeader />

      <main id="main" tabIndex={-1} className="focus-visible:outline-none">
        <HeroSection />
        <AboutMeSection />
        <SkillsSection />
        <LearningSection />
        <ProjectsSection />
        <ExperienceSection />
        <CertificatesSection />
        <ContactSection />
      </main>

      <SiteFooter />
      <ZoneIndexDialog />
    </>
  );
}
