export interface Discipline {
  id: string;
  name: string;
  category: 'Classical' | 'Contemporary' | 'Urban' | 'Specialized' | 'Programs';
  tagline: string;
  description: string;
  ageRanges: string[];
  levels: string[];
  duration: string;
  teachers: string[];
  image: string;
  accentColor: string;
}

export const disciplines: Discipline[] = [
  {
    id: 'ballet',
    name: 'Ballet',
    category: 'Classical',
    tagline: 'The discipline of line.',
    description:
      'Classical ballet technique rooted in tradition — barre work, centre practice, allegro, and pointe. Students build poise, alignment, strength, and the precision that underpins all dance forms.',
    ageRanges: ['4–7', '8–12', '13–17', '18+'],
    levels: ['Beginner', 'Intermediate', 'Advanced', 'Pre-professional'],
    duration: '60–90 min',
    teachers: ['Elena Bianchi', 'Marco Ferrari'],
    image:
      'https://images.pexels.com/photos/3901644/pexels-photo-3901644.jpeg?auto=compress&cs=tinysrgb&w=1600',
    accentColor: '#5E1A26',
  },
  {
    id: 'contemporary',
    name: 'Contemporary',
    category: 'Contemporary',
    tagline: 'Floor work, release, improvisation.',
    description:
      'Contemporary dance blends release technique, floor work, and improvisation. Dancers explore weight, momentum, and breath — developing a personal movement vocabulary that is both expressive and athletic.',
    ageRanges: ['8–12', '13–17', '18+'],
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    duration: '75–90 min',
    teachers: ['Sofia Romano', 'Luca Moretti'],
    image:
      'https://images.pexels.com/photos/6926606/pexels-photo-6926606.jpeg?auto=compress&cs=tinysrgb&w=1600',
    accentColor: '#1C1C1E',
  },
  {
    id: 'modern',
    name: 'Modern',
    category: 'Contemporary',
    tagline: 'Graham, Cunningham, Horton.',
    description:
      'Modern dance technique drawing from Graham, Cunningham, and Horton traditions. Focus on contraction, spiral, fall and recovery — the foundational principles that shaped 20th-century dance.',
    ageRanges: ['13–17', '18+'],
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    duration: '75 min',
    teachers: ['Sofia Romano'],
    image:
      'https://images.pexels.com/photos/6926436/pexels-photo-6926436.jpeg?auto=compress&cs=tinysrgb&w=1600',
    accentColor: '#3F1019',
  },
  {
    id: 'jazz',
    name: 'Jazz',
    category: 'Classical',
    tagline: 'Rhythm, style, theatricality.',
    description:
      'Jazz dance combines rhythm, isolations, and theatrical flair. From classic Broadway jazz to contemporary fusion — sharp, dynamic movement that celebrates musicality and individual style.',
    ageRanges: ['8–12', '13–17', '18+'],
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    duration: '60–75 min',
    teachers: ['Giulia Conti'],
    image:
      'https://images.pexels.com/photos/4250534/pexels-photo-4250534.jpeg?auto=compress&cs=tinysrgb&w=1600',
    accentColor: '#7A2A38',
  },
  {
    id: 'hiphop',
    name: 'Hip Hop',
    category: 'Urban',
    tagline: 'Grooves, foundations, freestyle.',
    description:
      'Authentic hip-hop dance covering grooves, bounces, and foundational styles. Dancers learn the cultural roots of hip-hop while developing their own freestyle voice and musicality.',
    ageRanges: ['8–12', '13–17', '18+'],
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    duration: '60 min',
    teachers: ['Davide Russo'],
    image:
      'https://images.pexels.com/photos/8973460/pexels-photo-8973460.jpeg?auto=compress&cs=tinysrgb&w=1600',
    accentColor: '#0A0A0A',
  },
  {
    id: 'urban',
    name: 'Urban',
    category: 'Urban',
    tagline: 'Street styles, choreography.',
    description:
      'Urban dance spans house, waacking, locking, and street choreography. A high-energy class focused on groove, character, and the storytelling power of street dance culture.',
    ageRanges: ['13–17', '18+'],
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    duration: '60 min',
    teachers: ['Davide Russo', 'Giulia Conti'],
    image:
      'https://images.pexels.com/photos/690597/pexels-photo-690597.jpeg?auto=compress&cs=tinysrgb&w=1600',
    accentColor: '#1C1C1E',
  },
  {
    id: 'commercial',
    name: 'Commercial',
    category: 'Urban',
    tagline: 'Stage, screen, industry.',
    description:
      'Commercial dance prepares dancers for the stage and screen — music-video choreography, pop-style routines, and the versatile performance skills needed in the entertainment industry.',
    ageRanges: ['13–17', '18+'],
    levels: ['Intermediate', 'Advanced'],
    duration: '60 min',
    teachers: ['Giulia Conti'],
    image:
      'https://images.pexels.com/photos/6926734/pexels-photo-6926734.jpeg?auto=compress&cs=tinysrgb&w=1600',
    accentColor: '#5E1A26',
  },
  {
    id: 'rhythmic',
    name: 'Rhythmic',
    category: 'Specialized',
    tagline: 'Apparatus, grace, flow.',
    description:
      'Rhythmic dance combines elements of ballet, gymnastics, and apparatus work — ribbon, ball, hoop, and clubs. Students develop grace, coordination, and expressive performance with props.',
    ageRanges: ['4–7', '8–12', '13–17'],
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    duration: '60–75 min',
    teachers: ['Elena Bianchi'],
    image:
      'https://images.pexels.com/photos/7186303/pexels-photo-7186303.jpeg?auto=compress&cs=tinysrgb&w=1600',
    accentColor: '#7A2A38',
  },
  {
    id: 'acro',
    name: 'Acro',
    category: 'Specialized',
    tagline: 'Strength, flexibility, tricks.',
    description:
      'Acro dance blends acrobatics with choreography — tumbling, balances, and contortion elements woven into dance sequences. Builds extraordinary strength, flexibility, and control.',
    ageRanges: ['8–12', '13–17', '18+'],
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    duration: '75 min',
    teachers: ['Luca Moretti'],
    image:
      'https://images.pexels.com/photos/6926403/pexels-photo-6926403.jpeg?auto=compress&cs=tinysrgb&w=1600',
    accentColor: '#3F1019',
  },
  {
    id: 'musical-theatre',
    name: 'Musical Theatre',
    category: 'Specialized',
    tagline: 'Act, sing, dance.',
    description:
      'Musical theatre dance integrates jazz, tap, and character work with acting and vocal performance. Dancers train in the triple-threat tradition — preparing for stage musicals and performance art.',
    ageRanges: ['8–12', '13–17', '18+'],
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    duration: '90 min',
    teachers: ['Giulia Conti', 'Sofia Romano'],
    image:
      'https://images.pexels.com/photos/16126271/pexels-photo-16126271.jpeg?auto=compress&cs=tinysrgb&w=1600',
    accentColor: '#5E1A26',
  },
  {
    id: 'kids',
    name: 'Kids',
    category: 'Programs',
    tagline: 'Play, explore, discover.',
    description:
      'Creative movement and introductory dance for young children. Play-based classes that build coordination, rhythm, social skills, and a love of movement — the perfect first step into dance.',
    ageRanges: ['3–4', '5–7'],
    levels: ['Beginner'],
    duration: '45 min',
    teachers: ['Elena Bianchi'],
    image:
      'https://images.pexels.com/photos/6713390/pexels-photo-6713390.jpeg?auto=compress&cs=tinysrgb&w=1600',
    accentColor: '#7A2A38',
  },
  {
    id: 'adults',
    name: 'Adults',
    category: 'Programs',
    tagline: 'It is never too late.',
    description:
      'Open-level classes designed for adult dancers of all backgrounds — from complete beginners returning to movement to experienced dancers maintaining technique. A welcoming, no-pressure environment.',
    ageRanges: ['18+', '30+', '50+'],
    levels: ['Beginner', 'Intermediate'],
    duration: '60 min',
    teachers: ['Sofia Romano', 'Marco Ferrari'],
    image:
      'https://images.pexels.com/photos/39205157/pexels-photo-39205157.jpeg?auto=compress&cs=tinysrgb&w=1600',
    accentColor: '#1C1C1E',
  },
];

export const disciplineCategories = [
  'Classical',
  'Contemporary',
  'Urban',
  'Specialized',
  'Programs',
] as const;
