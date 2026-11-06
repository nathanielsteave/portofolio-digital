import { profile } from '../../data/profile';

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-line bg-void">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-5 px-5 py-7 font-mono text-[9px] uppercase tracking-[0.16em] text-muted sm:flex-row sm:items-center sm:justify-between md:px-8 lg:px-12">
        <p>{profile.name} / Portfolio</p>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/nathanielsteave"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub profile"
            className="text-bone transition-colors hover:text-ion"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/nathanielsteaveharjanto/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn profile"
            className="text-bone transition-colors hover:text-ion"
          >
            LinkedIn
          </a>
          <a
            href="#origin"
            className="border-b border-line-strong py-1 text-bone transition-colors duration-200 hover:border-ion hover:text-ion"
          >
            Back to origin
          </a>
        </div>
      </div>
    </footer>
  );
}
