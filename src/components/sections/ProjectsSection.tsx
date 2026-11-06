import { useEffect, useRef, useState } from 'react';
import { projects } from '../../data/projects';
import type { Project, ProjectCategory } from '../../data/projects';

const categories: { id: ProjectCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All work' },
  { id: 'web', label: 'Web' },
  { id: 'data', label: 'Data science' },
  { id: 'ai', label: 'AI / ML' },
  { id: 'cv', label: 'Computer vision' },
  { id: 'basic', label: 'Web basics' },
  { id: 'uiux', label: 'UI/UX' },
];

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'all'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const visibleProjects = projects.filter(
    (project) => activeCategory === 'all' || project.category === activeCategory,
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (selectedProject && !dialog.open) {
      dialog.showModal();
    } else if (!selectedProject && dialog.open) {
      dialog.close();
    }
  }, [selectedProject]);

  const selectedImages = selectedProject?.gallery ?? (selectedProject ? [selectedProject.image] : []);
  const selectImage = (index: number) => {
    setActiveImageIndex((index + selectedImages.length) % selectedImages.length);
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      className="relative z-10 border-t border-line bg-void"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-8 md:py-32 lg:px-12">
        <div className="grid gap-8 md:grid-cols-12 md:items-end md:gap-8">
          <div className="md:col-span-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ion">04 / Selected work</p>
            <h2 id="projects-title" className="mt-5 font-display text-5xl leading-[0.95] text-bone md:text-6xl">Projects</h2>
          </div>
          <p className="max-w-[50ch] text-[14px] leading-[1.7] text-muted md:col-span-6 md:col-start-7">
            Web applications, data tools, and experiments. Filter by discipline, then open a live project or its source.
          </p>
        </div>

        <div role="group" aria-label="Filter projects by category" className="mt-10 flex gap-2 overflow-x-auto border-y border-line py-3">
          {categories.map((category) => (
            <button
              key={category.id}
              type="button"
              aria-pressed={activeCategory === category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`min-h-11 shrink-0 border px-4 font-mono text-[9px] uppercase tracking-widest transition-colors ${
                activeCategory === category.id
                  ? 'border-ion bg-ion text-void'
                  : 'border-transparent text-muted hover:border-line-strong hover:text-bone'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {visibleProjects.length > 0 ? (
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProjects.map((project) => (
              <article key={project.id} className="group min-w-0 border border-line bg-ink/70">
                <button
                  type="button"
                  aria-label={`View ${project.title} details and screenshots`}
                  onClick={() => {
                    setActiveImageIndex(0);
                    setSelectedProject(project);
                  }}
                  className="block aspect-video w-full overflow-hidden bg-ink text-left"
                >
                  <img
                    src={project.image}
                    alt={`${project.title} project preview`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </button>
                <div className="flex min-h-61.25 flex-col p-5">
                  <h3 className="font-display text-3xl leading-tight text-bone">
                    <button type="button" onClick={() => { setActiveImageIndex(0); setSelectedProject(project); }} className="text-left transition-colors hover:text-ion">
                      {project.title}
                    </button>
                  </h3>
                  <p className="mt-3 text-[13px] leading-[1.65] text-muted">{project.description}</p>
                  <ul aria-label={`${project.title} technologies`} className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[9px] uppercase leading-[1.7] tracking-[0.06em] text-muted">
                    {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
                  </ul>
                  <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-4">
                    {project.external ? (
                      <a href={project.external} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center font-mono text-[9px] uppercase tracking-widest text-bone transition-colors hover:text-ion">
                        {project.category === 'uiux' ? 'View design' : 'Live project'}
                      </a>
                    ) : null}
                    {project.github ? (
                      <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center font-mono text-[9px] uppercase tracking-widest text-muted transition-colors hover:text-ion">
                        Source code
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : <p className="mt-8 border-t border-line pt-6 text-[14px] text-muted">No projects in this category yet.</p>}
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="project-detail-title"
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            event.preventDefault();
            setSelectedProject(null);
          }
        }}
        onCancel={(event) => {
          event.preventDefault();
          setSelectedProject(null);
        }}
        onClose={() => {
          setSelectedProject(null);
          setActiveImageIndex(0);
        }}
        onClick={(event) => {
          if (event.target === dialogRef.current) setSelectedProject(null);
        }}
        className="w-[min(94vw,1100px)] max-w-none overflow-hidden border border-line bg-void p-0 text-bone backdrop:bg-black/80"
      >
        {selectedProject ? (
          <div className="grid max-h-[90dvh] overflow-y-auto md:grid-cols-[1.15fr_0.85fr]">
            <div className="min-w-0 bg-ink">
              <div className={selectedProject.portrait ? 'relative mx-auto aspect-4/5 max-h-[75dvh] max-w-130' : 'relative aspect-video'}>
                <img
                  src={selectedImages[activeImageIndex]}
                  alt={`${selectedProject.title} screenshot ${activeImageIndex + 1}`}
                  className="h-full w-full object-contain"
                />
                {selectedImages.length > 1 ? (
                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-void/85 p-3">
                    <button type="button" onClick={() => selectImage(activeImageIndex - 1)} className="min-h-11 border border-line-strong px-3 font-mono text-[9px] uppercase tracking-widest hover:border-ion hover:text-ion">
                      Previous screenshot
                    </button>
                    <span aria-live="polite" className="font-mono text-[9px] uppercase tracking-widest text-muted">
                      {String(activeImageIndex + 1).padStart(2, '0')} / {String(selectedImages.length).padStart(2, '0')}
                    </span>
                    <button type="button" onClick={() => selectImage(activeImageIndex + 1)} className="min-h-11 border border-line-strong px-3 font-mono text-[9px] uppercase tracking-widest hover:border-ion hover:text-ion">
                      Next screenshot
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
            <div className="flex min-w-0 flex-col p-6 sm:p-8">
              <div className="flex items-start justify-between gap-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-ion">
                  {categories.find((category) => category.id === selectedProject.category)?.label}
                </p>
                <button type="button" onClick={() => setSelectedProject(null)} className="min-h-11 shrink-0 border border-line-strong px-3 font-mono text-[9px] uppercase tracking-widest hover:border-ion hover:text-ion">
                  Close
                </button>
              </div>
              <h3 id="project-detail-title" className="mt-6 font-display text-4xl leading-[0.98] text-bone sm:text-5xl">
                {selectedProject.title}
              </h3>
              <p className="mt-5 text-[14px] leading-[1.75] text-muted">{selectedProject.description}</p>
              <ul aria-label="Technologies used" className="mt-6 flex flex-wrap gap-x-4 gap-y-2 border-t border-line pt-5 font-mono text-[9px] uppercase tracking-[0.08em] text-muted">
                {selectedProject.technologies.map((technology) => <li key={technology}>{technology}</li>)}
              </ul>
              <div className="mt-auto flex flex-wrap gap-x-6 gap-y-2 pt-8">
                {selectedProject.external ? (
                  <a href={selectedProject.external} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center border-b border-line-strong py-2 font-mono text-[9px] uppercase tracking-widest text-bone hover:border-ion hover:text-ion">
                    {selectedProject.category === 'uiux' ? 'Open Figma design' : 'Open live project'}
                  </a>
                ) : null}
                {selectedProject.github ? (
                  <a href={selectedProject.github} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center border-b border-line-strong py-2 font-mono text-[9px] uppercase tracking-widest text-muted hover:border-ion hover:text-ion">
                    View source code
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}