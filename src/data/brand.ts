export const brand = {
  name: 'MOVEMENT HOUSE',
  shortName: 'MH',
  tagline: 'Move beyond the expected.',
  logo: {
    placeholder: '/logo-placeholder.svg',
    alt: 'Movement House logo',
  },
  contact: {
    email: 'info@movementhouse.it',
    phone: '+39 02 1234 5678',
    address: 'Via del Movimento 12, 20121 Milano, Italia',
    instagram: '@movementhouse',
    instagramUrl: 'https://instagram.com/movementhouse',
  },
  hours: [
    { day: 'Lun', time: '16:00 — 22:00' },
    { day: 'Mar', time: '16:00 — 22:00' },
    { day: 'Mer', time: '16:00 — 22:00' },
    { day: 'Gio', time: '16:00 — 22:00' },
    { day: 'Ven', time: '16:00 — 23:00' },
    { day: 'Sab', time: '10:00 — 18:00' },
    { day: 'Dom', time: 'Chiuso' },
  ],
} as const;

export const colors = {
  ivory: '#F5F1EA',
  black: '#0A0A0A',
  graphite: '#1C1C1E',
  stone: '#8E8B82',
  softGray: '#C7C4BD',
  accent: {
    name: 'burgundy',
    DEFAULT: '#5E1A26',
    light: '#7A2A38',
    dark: '#3F1019',
  },
} as const;

export const fonts = {
  display: {
    family: "'Bricolage Grotesque', serif",
    weights: { regular: 400, medium: 500, bold: 700, extrabold: 800 },
  },
  body: {
    family: "'Inter', sans-serif",
    weights: { light: 300, regular: 400, medium: 500, semibold: 600 },
  },
} as const;

export type BrandColor = keyof typeof colors;
