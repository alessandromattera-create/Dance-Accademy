export interface ClassEntry {
  id: string;
  discipline: string;
  level: string;
  teacher: string;
  teacherId: string;
  room: string;
  day: string;
  startTime: string;
  duration: number;
  availablePlaces: number;
  totalPlaces: number;
}

export const days = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'] as const;
export type Day = (typeof days)[number];

export const dayLabels: Record<string, string> = {
  Lun: 'Lunedì',
  Mar: 'Martedì',
  Mer: 'Mercoledì',
  Gio: 'Giovedì',
  Ven: 'Venerdì',
  Sab: 'Sabato',
};

export const classes: ClassEntry[] = [
  // Monday
  { id: 'c1', discipline: 'Ballet', level: 'Beginner', teacher: 'Elena Bianchi', teacherId: 'elena-bianchi', room: 'Studio 01', day: 'Lun', startTime: '16:00', duration: 60, availablePlaces: 6, totalPlaces: 15 },
  { id: 'c2', discipline: 'Kids', level: 'Beginner', teacher: 'Elena Bianchi', teacherId: 'elena-bianchi', room: 'Studio 02', day: 'Lun', startTime: '17:00', duration: 45, availablePlaces: 4, totalPlaces: 12 },
  { id: 'c3', discipline: 'Jazz', level: 'Beginner', teacher: 'Giulia Conti', teacherId: 'giulia-conti', room: 'Studio 01', day: 'Lun', startTime: '18:00', duration: 60, availablePlaces: 8, totalPlaces: 15 },
  { id: 'c4', discipline: 'Contemporary', level: 'Beginner', teacher: 'Sofia Romano', teacherId: 'sofia-romano', room: 'Studio 02', day: 'Lun', startTime: '18:00', duration: 75, availablePlaces: 0, totalPlaces: 18 },
  { id: 'c5', discipline: 'Contemporary', level: 'Advanced', teacher: 'Sofia Romano', teacherId: 'sofia-romano', room: 'Studio 02', day: 'Lun', startTime: '19:30', duration: 90, availablePlaces: 3, totalPlaces: 16 },
  { id: 'c6', discipline: 'Ballet', level: 'Intermediate', teacher: 'Elena Bianchi', teacherId: 'elena-bianchi', room: 'Studio 01', day: 'Lun', startTime: '19:00', duration: 75, availablePlaces: 5, totalPlaces: 15 },

  // Tuesday
  { id: 'c7', discipline: 'Ballet', level: 'Advanced', teacher: 'Marco Ferrari', teacherId: 'marco-ferrari', room: 'Studio 01', day: 'Mar', startTime: '18:00', duration: 90, availablePlaces: 2, totalPlaces: 14 },
  { id: 'c8', discipline: 'Contemporary', level: 'Intermediate', teacher: 'Luca Moretti', teacherId: 'luca-moretti', room: 'Studio 02', day: 'Mar', startTime: '16:00', duration: 75, availablePlaces: 7, totalPlaces: 18 },
  { id: 'c9', discipline: 'Jazz', level: 'Intermediate', teacher: 'Giulia Conti', teacherId: 'giulia-conti', room: 'Studio 01', day: 'Mar', startTime: '16:30', duration: 75, availablePlaces: 5, totalPlaces: 15 },
  { id: 'c10', discipline: 'Adults', level: 'Beginner', teacher: 'Marco Ferrari', teacherId: 'marco-ferrari', room: 'Studio 01', day: 'Mar', startTime: '20:00', duration: 60, availablePlaces: 10, totalPlaces: 20 },
  { id: 'c11', discipline: 'Acro', level: 'Intermediate', teacher: 'Luca Moretti', teacherId: 'luca-moretti', room: 'Performance Space', day: 'Mar', startTime: '19:30', duration: 75, availablePlaces: 0, totalPlaces: 12 },

  // Wednesday
  { id: 'c12', discipline: 'Ballet', level: 'Intermediate', teacher: 'Elena Bianchi', teacherId: 'elena-bianchi', room: 'Studio 01', day: 'Mer', startTime: '16:00', duration: 75, availablePlaces: 4, totalPlaces: 15 },
  { id: 'c13', discipline: 'Hip Hop', level: 'Beginner', teacher: 'Davide Russo', teacherId: 'davide-russo', room: 'Studio 02', day: 'Mer', startTime: '16:00', duration: 60, availablePlaces: 9, totalPlaces: 18 },
  { id: 'c14', discipline: 'Rhythmic', level: 'Beginner', teacher: 'Elena Bianchi', teacherId: 'elena-bianchi', room: 'Studio 01', day: 'Mer', startTime: '17:30', duration: 60, availablePlaces: 3, totalPlaces: 12 },
  { id: 'c15', discipline: 'Contemporary', level: 'Beginner', teacher: 'Sofia Romano', teacherId: 'sofia-romano', room: 'Studio 02', day: 'Mer', startTime: '18:00', duration: 75, availablePlaces: 6, totalPlaces: 18 },
  { id: 'c16', discipline: 'Hip Hop', level: 'Intermediate', teacher: 'Davide Russo', teacherId: 'davide-russo', room: 'Studio 02', day: 'Mer', startTime: '19:00', duration: 60, availablePlaces: 0, totalPlaces: 16 },
  { id: 'c17', discipline: 'Contemporary', level: 'Intermediate', teacher: 'Sofia Romano', teacherId: 'sofia-romano', room: 'Studio 02', day: 'Mer', startTime: '20:00', duration: 90, availablePlaces: 8, totalPlaces: 18 },

  // Thursday
  { id: 'c18', discipline: 'Acro', level: 'Beginner', teacher: 'Luca Moretti', teacherId: 'luca-moretti', room: 'Performance Space', day: 'Gio', startTime: '16:00', duration: 75, availablePlaces: 5, totalPlaces: 12 },
  { id: 'c19', discipline: 'Contemporary', level: 'Intermediate', teacher: 'Luca Moretti', teacherId: 'luca-moretti', room: 'Studio 02', day: 'Gio', startTime: '16:00', duration: 75, availablePlaces: 6, totalPlaces: 18 },
  { id: 'c20', discipline: 'Ballet', level: 'Intermediate', teacher: 'Marco Ferrari', teacherId: 'marco-ferrari', room: 'Studio 01', day: 'Gio', startTime: '18:00', duration: 75, availablePlaces: 3, totalPlaces: 15 },
  { id: 'c21', discipline: 'Commercial', level: 'Intermediate', teacher: 'Giulia Conti', teacherId: 'giulia-conti', room: 'Studio 01', day: 'Gio', startTime: '19:30', duration: 60, availablePlaces: 7, totalPlaces: 16 },
  { id: 'c22', discipline: 'Hip Hop', level: 'Advanced', teacher: 'Davide Russo', teacherId: 'davide-russo', room: 'Studio 02', day: 'Gio', startTime: '20:00', duration: 60, availablePlaces: 2, totalPlaces: 16 },

  // Friday
  { id: 'c23', discipline: 'Ballet', level: 'Pre-professional', teacher: 'Elena Bianchi', teacherId: 'elena-bianchi', room: 'Studio 01', day: 'Ven', startTime: '16:00', duration: 90, availablePlaces: 1, totalPlaces: 12 },
  { id: 'c24', discipline: 'Hip Hop', level: 'Beginner', teacher: 'Davide Russo', teacherId: 'davide-russo', room: 'Studio 02', day: 'Ven', startTime: '16:00', duration: 60, availablePlaces: 12, totalPlaces: 18 },
  { id: 'c25', discipline: 'Contemporary', level: 'Advanced', teacher: 'Luca Moretti', teacherId: 'luca-moretti', room: 'Performance Space', day: 'Ven', startTime: '18:00', duration: 90, availablePlaces: 4, totalPlaces: 16 },
  { id: 'c26', discipline: 'Jazz', level: 'Advanced', teacher: 'Giulia Conti', teacherId: 'giulia-conti', room: 'Studio 01', day: 'Ven', startTime: '19:00', duration: 75, availablePlaces: 5, totalPlaces: 14 },
  { id: 'c27', discipline: 'Musical Theatre', level: 'Intermediate', teacher: 'Giulia Conti', teacherId: 'giulia-conti', room: 'Performance Space', day: 'Ven', startTime: '20:30', duration: 90, availablePlaces: 0, totalPlaces: 20 },

  // Saturday
  { id: 'c28', discipline: 'Kids', level: 'Beginner', teacher: 'Elena Bianchi', teacherId: 'elena-bianchi', room: 'Studio 02', day: 'Sab', startTime: '10:00', duration: 45, availablePlaces: 5, totalPlaces: 12 },
  { id: 'c29', discipline: 'Ballet', level: 'Beginner', teacher: 'Elena Bianchi', teacherId: 'elena-bianchi', room: 'Studio 01', day: 'Sab', startTime: '11:00', duration: 60, availablePlaces: 8, totalPlaces: 15 },
  { id: 'c30', discipline: 'Adults', level: 'Intermediate', teacher: 'Marco Ferrari', teacherId: 'marco-ferrari', room: 'Studio 01', day: 'Sab', startTime: '14:00', duration: 60, availablePlaces: 10, totalPlaces: 20 },
  { id: 'c31', discipline: 'Urban', level: 'Intermediate', teacher: 'Davide Russo', teacherId: 'davide-russo', room: 'Studio 02', day: 'Sab', startTime: '15:00', duration: 60, availablePlaces: 6, totalPlaces: 16 },
];
