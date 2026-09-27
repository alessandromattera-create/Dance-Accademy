export type EventType =
  | 'Masterclass'
  | 'Workshop'
  | 'Open Class'
  | 'Audition'
  | 'Showcase'
  | 'Competition Preparation';

export interface DanceEvent {
  id: string;
  title: string;
  type: EventType;
  date: string;
  dateLabel: string;
  teacher: string;
  style: string;
  duration: string;
  level: string;
  location: string;
  availablePlaces: number;
  totalPlaces: number;
  description: string;
  image: string;
  videoPoster: string;
  isPlaceholder: boolean;
}

export const events: DanceEvent[] = [
  {
    id: 'evt-01',
    title: 'Contemporary Masterclass with Sofia Romano',
    type: 'Masterclass',
    date: '2026-10-18',
    dateLabel: '18 October 2026',
    teacher: 'Sofia Romano',
    style: 'Contemporary',
    duration: '3 hours',
    level: 'Intermediate — Advanced',
    location: 'Performance Space, Movement House',
    availablePlaces: 8,
    totalPlaces: 20,
    description: 'An intensive masterclass exploring release technique, floor work, and improvisation. Dancers will dive into Sofia\'s signature approach to weight and momentum, developing tools for authentic physical storytelling. The session concludes with a guided improvisation circle.',
    image: 'https://images.pexels.com/photos/6926606/pexels-photo-6926606.jpeg?auto=compress&cs=tinysrgb&w=1600',
    videoPoster: 'https://images.pexels.com/photos/6926436/pexels-photo-6926436.jpeg?auto=compress&cs=tinysrgb&w=1600',
    isPlaceholder: true,
  },
  {
    id: 'evt-02',
    title: 'Hip Hop Foundations Workshop',
    type: 'Workshop',
    date: '2026-10-25',
    dateLabel: '25 October 2026',
    teacher: 'Davide Russo',
    style: 'Hip Hop',
    duration: '2.5 hours',
    level: 'All levels welcome',
    location: 'Studio 02, Movement House',
    availablePlaces: 12,
    totalPlaces: 25,
    description: 'A deep dive into the cultural roots and foundational grooves of hip-hop dance. From bounces and rocks to basic breaking footwork — this workshop is open to everyone, no prior experience needed. Davide shares the history behind the movement alongside the technique.',
    image: 'https://images.pexels.com/photos/8973460/pexels-photo-8973460.jpeg?auto=compress&cs=tinysrgb&w=1600',
    videoPoster: 'https://images.pexels.com/photos/8973460/pexels-photo-8973460.jpeg?auto=compress&cs=tinysrgb&w=1600',
    isPlaceholder: true,
  },
  {
    id: 'evt-03',
    title: 'Winter Showcase — Open Rehearsal',
    type: 'Showcase',
    date: '2026-12-12',
    dateLabel: '12 December 2026',
    teacher: 'All faculty',
    style: 'All disciplines',
    duration: 'Full day',
    level: 'Enrolled students',
    location: 'Performance Space, Movement House',
    availablePlaces: 0,
    totalPlaces: 80,
    description: 'Our end-of-year showcase brings together students from every discipline for an evening of performance. This open rehearsal gives family and friends a behind-the-scenes look at the creative process. Note: this is an example event — placeholder — no real showcase is confirmed yet.',
    image: 'https://images.pexels.com/photos/26726497/pexels-photo-26726497.jpeg?auto=compress&cs=tinysrgb&w=1600',
    videoPoster: 'https://images.pexels.com/photos/26726497/pexels-photo-26726497.jpeg?auto=compress&cs=tinysrgb&w=1600',
    isPlaceholder: true,
  },
  {
    id: 'evt-04',
    title: 'Pre-Professional Audition — Ballet',
    type: 'Audition',
    date: '2026-11-08',
    dateLabel: '8 November 2026',
    teacher: 'Elena Bianchi & Marco Ferrari',
    style: 'Ballet',
    duration: '2 hours',
    level: 'Advanced / Pre-professional',
    location: 'Studio 01, Movement House',
    availablePlaces: 6,
    totalPlaces: 15,
    description: 'Audition for the Movement House pre-professional ballet program. Dancers will participate in a standard ballet class followed by a short improvisation exercise. Please prepare a 1-minute solo phrase. Results communicated within one week.',
    image: 'https://images.pexels.com/photos/3901644/pexels-photo-3901644.jpeg?auto=compress&cs=tinysrgb&w=1600',
    videoPoster: 'https://images.pexels.com/photos/3901639/pexels-photo-3901639.jpeg?auto=compress&cs=tinysrgb&w=1600',
    isPlaceholder: true,
  },
  {
    id: 'evt-05',
    title: 'Acro & Partnering Intensive',
    type: 'Workshop',
    date: '2026-11-22',
    dateLabel: '22 November 2026',
    teacher: 'Luca Moretti',
    style: 'Acro / Contemporary',
    duration: '4 hours',
    level: 'Intermediate — Advanced',
    location: 'Performance Space, Movement House',
    availablePlaces: 0,
    totalPlaces: 12,
    description: 'A hands-on intensive covering acrobatic foundations, counterbalance, and contact partnering. Dancers work in pairs and small groups to build trust, strength, and spatial awareness. Previous contemporary or acro experience recommended.',
    image: 'https://images.pexels.com/photos/6926403/pexels-photo-6926403.jpeg?auto=compress&cs=tinysrgb&w=1600',
    videoPoster: 'https://images.pexels.com/photos/6926439/pexels-photo-6926439.jpeg?auto=compress&cs=tinysrgb&w=1600',
    isPlaceholder: true,
  },
  {
    id: 'evt-06',
    title: 'Competition Preparation Clinic',
    type: 'Competition Preparation',
    date: '2027-01-17',
    dateLabel: '17 January 2027',
    teacher: 'Giulia Conti',
    style: 'Jazz / Commercial',
    duration: '5 hours',
    level: 'Intermediate — Advanced',
    location: 'Performance Space, Movement House',
    availablePlaces: 10,
    totalPlaces: 20,
    description: 'A full-day clinic for dancers preparing for competition season. Focus on choreography retention, performance quality, stamina, and presentation. Each participant receives individualized feedback on a prepared solo or group routine.',
    image: 'https://images.pexels.com/photos/4250534/pexels-photo-4250534.jpeg?auto=compress&cs=tinysrgb&w=1600',
    videoPoster: 'https://images.pexels.com/photos/4250534/pexels-photo-4250534.jpeg?auto=compress&cs=tinysrgb&w=1600',
    isPlaceholder: true,
  },
];

export const eventTypes: EventType[] = [
  'Masterclass',
  'Workshop',
  'Open Class',
  'Audition',
  'Showcase',
  'Competition Preparation',
];
