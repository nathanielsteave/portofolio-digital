import { useState, type FormEvent } from 'react';
import { contact } from '../../data/contact';

export function ContactSection() {
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmissionStatus('sending');

    try {
      const response = await fetch(contact.formEndpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) throw new Error('Message request failed.');

      form.reset();
      setSubmissionStatus('success');
    } catch {
      setSubmissionStatus('error');
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="relative z-10 border-t border-line bg-void"
    >
      <div className="mx-auto max-w-[1600px] px-5 py-24 md:px-8 md:py-32 lg:px-12">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ion">07 / Contact</p>
            <h2 id="contact-title" className="mt-5 font-display text-5xl leading-[0.95] text-bone md:text-6xl">Start a conversation.</h2>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <p className="max-w-[52ch] text-[15px] leading-[1.75] text-muted md:text-base">{contact.message}</p>
            <form onSubmit={handleSubmit} className="mt-8 grid gap-5 border-t border-line pt-6 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">Your name</label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="mt-2 min-h-11 w-full border border-line-strong bg-ink px-3 text-[14px] text-bone placeholder:text-muted/70 focus-visible:border-ion"
                  placeholder="Name"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">Your email</label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="mt-2 min-h-11 w-full border border-line-strong bg-ink px-3 text-[14px] text-bone placeholder:text-muted/70 focus-visible:border-ion"
                  placeholder="you@example.com"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="contact-message" className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={5}
                  required
                  className="mt-2 w-full resize-y border border-line-strong bg-ink px-3 py-3 text-[14px] leading-relaxed text-bone placeholder:text-muted/70 focus-visible:border-ion"
                  placeholder="What would you like to discuss?"
                />
              </div>
              <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
                <button
                  type="submit"
                  disabled={submissionStatus === 'sending'}
                  className="inline-flex min-h-11 items-center border border-ion bg-ion px-5 font-mono text-[9px] uppercase tracking-[0.14em] text-void transition-colors hover:border-bone hover:bg-bone disabled:opacity-60"
                >
                  {submissionStatus === 'sending' ? 'Sending' : 'Send message'}
                </button>
                <p aria-live="polite" className="text-[12px] text-muted">
                  {submissionStatus === 'success' ? 'Message sent. Thank you for reaching out.' : null}
                  {submissionStatus === 'error' ? 'Message could not be sent. Please try again.' : null}
                </p>
              </div>
            </form>
            <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-4 border-t border-line pt-5">
              {contact.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center border-b border-line-strong py-2 font-mono text-[10px] uppercase tracking-[0.14em] text-bone transition-colors hover:border-ion hover:text-ion"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}