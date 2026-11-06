import { certificates } from '../../data/certificates';

export function CertificatesSection() {
  return (
    <section
      id="certificates"
      aria-labelledby="certificates-title"
      className="relative z-10 border-t border-line bg-void"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-8 md:py-32 lg:px-12">
        <div className="grid gap-8 md:grid-cols-12 md:items-end md:gap-8">
          <div className="md:col-span-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ion">06 / Learning record</p>
            <h2 id="certificates-title" className="mt-5 font-display text-5xl leading-[0.95] text-bone md:text-6xl">
              Certificates
            </h2>
          </div>
          <p className="max-w-[48ch] text-[14px] leading-[1.7] text-muted md:col-span-6 md:col-start-7">
            Selected certificates and learning milestones. Items with a verification link open the issuer record.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {certificates.map((certificate) => (
            <article key={certificate.title} className="min-w-0 border border-line bg-ink/70">
              <div className="aspect-video overflow-hidden bg-ink">
                <img
                  src={certificate.image}
                  alt={`${certificate.title} certificate`}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex min-h-32 flex-col p-4">
                <p className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">{certificate.organization}</p>
                <h3 className="mt-2 font-display text-2xl leading-tight text-bone">{certificate.title}</h3>
                {certificate.verificationUrl ? (
                  <a
                    href={certificate.verificationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-auto inline-flex min-h-11 items-center pt-3 font-mono text-[9px] uppercase tracking-widest text-ion hover:text-bone"
                  >
                    Verify certificate
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}