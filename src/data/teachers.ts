export interface Teacher {
  id: string;
  name: string;
  role: string;
  styles: string[];
  levels: string[];
  bio: string;
  classes: string[];
  availability: { day: string; time: string }[];
  image: string;
}

export const teachers: Teacher[] = [
  {
    id: 'elena-bianchi',
    name: 'Elena Bianchi',
    role: 'Ballet & Rhythmic',
    styles: ['Ballet', 'Pointe', 'Rhythmic', 'Kids'],
    levels: ['Beginner', 'Intermediate', 'Advanced', 'Pre-professional'],
    bio: 'Classically trained at the Accademia Teatro alla Scala, Elena brings over fifteen years of teaching experience to Movement House. Her approach blends rigorous Vaganova technique with a warm, encouraging pedagogy that meets each dancer where they are. She has guided students from first plié to pre-professional auditions.',
    classes: ['Ballet Beginner', 'Ballet Intermediate', 'Pointe', 'Rhythmic Junior', 'Kids Creative Movement'],
    availability: [
      { day: 'Lun', time: '16:00 — 20:00' },
      { day: 'Mer', time: '16:00 — 20:00' },
      { day: 'Ven', time: '16:00 — 21:00' },
      { day: 'Sab', time: '10:00 — 14:00' },
    ],
    image: 'https://images.pexels.com/photos/3902514/pexels-photo-3902514.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'marco-ferrari',
    name: 'Marco Ferrari',
    role: 'Ballet & Adults',
    styles: ['Ballet', 'Adults', 'Stretch'],
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    bio: 'A former soloist with the Balletto di Roma, Marco transitioned to teaching after a distinguished performing career. He specializes in adult dancers — from complete beginners to returning professionals — creating a welcoming, pressure-free environment that respects every body\'s journey.',
    classes: ['Ballet Advanced', 'Adults Open Ballet', 'Adults Beginner', 'Ballet Intermediate'],
    availability: [
      { day: 'Mar', time: '18:00 — 22:00' },
      { day: 'Gio', time: '18:00 — 22:00' },
      { day: 'Sab', time: '14:00 — 18:00' },
    ],
    image: 'https://images.pexels.com/photos/31528817/pexels-photo-31528817.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'sofia-romano',
    name: 'Sofia Romano',
    role: 'Contemporary & Modern',
    styles: ['Contemporary', 'Modern', 'Improvisation', 'Adults'],
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    bio: 'Sofia trained in Cunningham and release technique across Europe, studying at the London Contemporary Dance School and with the Forsythe Company. Her classes explore weight, momentum, and breath — guiding dancers toward an authentic, personal movement language rooted in solid technique.',
    classes: ['Contemporary Beginner', 'Contemporary Intermediate', 'Modern Technique', 'Improvisation Lab', 'Adults Contemporary'],
    availability: [
      { day: 'Lun', time: '18:00 — 22:00' },
      { day: 'Mer', time: '18:00 — 22:00' },
      { day: 'Gio', time: '16:00 — 20:00' },
    ],
    image: 'https://images.pexels.com/photos/6719010/pexels-photo-6719010.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'luca-moretti',
    name: 'Luca Moretti',
    role: 'Contemporary & Acro',
    styles: ['Contemporary', 'Acro', 'Partnering'],
    levels: ['Intermediate', 'Advanced'],
    bio: 'Luca is a choreographer and acrobatic dance specialist who has worked with companies across Italy and Germany. His teaching bridges contemporary floor work with acrobatic elements — building the strength, trust, and spatial awareness needed for partnering and aerial movement.',
    classes: ['Contemporary Advanced', 'Acro Intermediate', 'Acro Advanced', 'Partnering Workshop'],
    availability: [
      { day: 'Mar', time: '16:00 — 20:00' },
      { day: 'Gio', time: '16:00 — 20:00' },
      { day: 'Ven', time: '16:00 — 20:00' },
    ],
    image: 'https://images.pexels.com/photos/30658927/pexels-photo-30658927.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'giulia-conti',
    name: 'Giulia Conti',
    role: 'Jazz, Commercial & Musical Theatre',
    styles: ['Jazz', 'Commercial', 'Musical Theatre', 'Urban'],
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    bio: 'Giulia has performed in musical theatre productions across Italy and worked as a commercial choreographer for television and music videos. She brings industry experience into the studio — teaching the versatility, stage presence, and performance skills that professional dance demands.',
    classes: ['Jazz Beginner', 'Commercial Intermediate', 'Musical Theatre', 'Jazz Advanced', 'Urban Choreography'],
    availability: [
      { day: 'Lun', time: '16:00 — 20:00' },
      { day: 'Mar', time: '16:00 — 20:00' },
      { day: 'Ven', time: '18:00 — 23:00' },
    ],
    image: 'https://images.pexels.com/photos/30102824/pexels-photo-30102824.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    id: 'davide-russo',
    name: 'Davide Russo',
    role: 'Hip Hop & Urban',
    styles: ['Hip Hop', 'Urban', 'House', 'Breaking'],
    levels: ['Beginner', 'Intermediate', 'Advanced'],
    bio: 'Davide is a street dancer and battle competitor who has been part of the Italian hip-hop scene for over a decade. He teaches the cultural foundations of hip-hop, house, and breaking — not just the moves, but the history, the grooves, and the freestyle spirit that define street dance.',
    classes: ['Hip Hop Beginner', 'Hip Hop Intermediate', 'Urban Choreography', 'House Fundamentals'],
    availability: [
      { day: 'Mer', time: '16:00 — 20:00' },
      { day: 'Gio', time: '18:00 — 22:00' },
      { day: 'Ven', time: '16:00 — 20:00' },
    ],
    image: 'https://images.pexels.com/photos/30718155/pexels-photo-30718155.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
];
