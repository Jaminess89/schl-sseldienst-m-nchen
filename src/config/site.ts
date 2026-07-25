export const SITE = {
  name: 'Rauchmelder Service Berlin',
  title: 'Rauchmelder Service Berlin | Installation, Wartung & Prüfung',
  description:
    'Rauchmelder in Berlin installieren, prüfen und warten lassen. Service für Vermieter, Eigentümer und Hausverwaltungen mit transparenter Planung und digitaler Dokumentation.',
  lang: 'de',
  url: 'https://www.rauchmelder-service-berlin.de/',
  // TODO: Replace with verified business contact details before launch.
  phone: '+4915735981964',
  phoneDisplay: '0157 359 819 64',
  email: '', // TODO: verified email
  twitterHandle: '',
  socials: {
    twitter: '',
    instagram: '',
    linkedin: '',
    dribbble: '',
  },
} as const;

export type SiteConfig = typeof SITE;
