export interface StudioSpace {
  id: string;
  name: string;
  number: string;
  description: string;
  image: string;
  specs: string[];
}

export const studioSpaces: StudioSpace[] = [
  {
    id: 'studio-01',
    name: 'Studio 01',
    number: '01',
    description: 'Our principal ballet studio — sprung harlequin flooring, full-wall mirrors, and natural light from south-facing windows. Designed for classical technique and pointe work.',
    image: 'https://images.pexels.com/photos/7319683/pexels-photo-7319683.jpeg?auto=compress&cs=tinysrgb&w=1600',
    specs: ['120 m²', 'Sprung floor', 'Barres on three walls', 'Natural light'],
  },
  {
    id: 'studio-02',
    name: 'Studio 02',
    number: '02',
    description: 'A versatile contemporary and urban studio with modular flooring and integrated sound system. Home to floor work, hip-hop, and choreography sessions.',
    image: 'https://images.pexels.com/photos/7318661/pexels-photo-7318661.jpeg?auto=compress&cs=tinysrgb&w=1600',
    specs: ['95 m²', 'Marley floor', 'Integrated sound system', 'Adjustable lighting'],
  },
  {
    id: 'performance-space',
    name: 'Performance Space',
    number: '03',
    description: 'A black-box theatre space with professional rigging, wing access, and raked seating for up to 80. Hosts showcases, auditions, and masterclasses.',
    image: 'https://images.pexels.com/photos/5135104/pexels-photo-5135104.jpeg?auto=compress&cs=tinysrgb&w=1600',
    specs: ['180 m²', 'Theatre rigging', 'Seating for 80', 'Wing access'],
  },
  {
    id: 'changing-area',
    name: 'Changing Area',
    number: '04',
    description: 'Individual lockers, showers, and vanity stations. A calm, private space to prepare before class and unwind after.',
    image: 'https://images.pexels.com/photos/3907399/pexels-photo-3907399.jpeg?auto=compress&cs=tinysrgb&w=1600',
    specs: ['30 lockers', '4 shower stalls', 'Vanity stations', 'Towel service'],
  },
  {
    id: 'waiting-area',
    name: 'Waiting Area',
    number: '05',
    description: 'A lounge for parents, visitors, and dancers between classes. Comfortable seating, coffee, and a view into Studio 01 through a observation window.',
    image: 'https://images.pexels.com/photos/8066333/pexels-photo-8066333.jpeg?auto=compress&cs=tinysrgb&w=1600',
    specs: ['Lounge seating', 'Coffee bar', 'Observation window', 'Free Wi-Fi'],
  },
];
