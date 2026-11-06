export interface Contact {
  message: string;
  formEndpoint: string;
  links: { label: string; href: string }[];
}

export const contact: Contact = {
  message: 'I am open to discussing new opportunities, collaboration projects, or exchanging ideas.',
  formEndpoint: 'https://formspree.io/f/xbdpjvyy',
  links: [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/nathanielsteaveharjanto/' },
    { label: 'GitHub', href: 'https://github.com/nathanielsteave' },
  ],
};