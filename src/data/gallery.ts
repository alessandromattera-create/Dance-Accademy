export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  orientation: 'wide' | 'portrait' | 'detail' | 'performance';
  caption: string;
  span: 'col-span-2 row-span-2' | 'col-span-1 row-span-2' | 'col-span-2 row-span-1' | 'col-span-1 row-span-1';
}

export const galleryImages: GalleryImage[] = [
  {
    id: 'g1',
    src: 'https://images.pexels.com/photos/24408960/pexels-photo-24408960.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'A woman in a dramatic dance performance on stage',
    orientation: 'wide',
    caption: 'Performance — solo piece, winter showcase',
    span: 'col-span-2 row-span-2',
  },
  {
    id: 'g2',
    src: 'https://images.pexels.com/photos/11323676/pexels-photo-11323676.jpeg?auto=compress&cs=tinysrgb&w=1000',
    alt: 'Long exposure motion blur of a ballet dancer',
    orientation: 'portrait',
    caption: 'Motion blur — ballet rehearsal',
    span: 'col-span-1 row-span-2',
  },
  {
    id: 'g3',
    src: 'https://images.pexels.com/photos/6714222/pexels-photo-6714222.jpeg?auto=compress&cs=tinysrgb&w=1000',
    alt: 'Close-up of dance shoes on a studio floor',
    orientation: 'detail',
    caption: 'Detail — pointe shoes, Studio 01',
    span: 'col-span-1 row-span-1',
  },
  {
    id: 'g4',
    src: 'https://images.pexels.com/photos/27352253/pexels-photo-27352253.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Group of dancers performing a contemporary piece on stage',
    orientation: 'performance',
    caption: 'Performance — contemporary ensemble',
    span: 'col-span-2 row-span-1',
  },
  {
    id: 'g5',
    src: 'https://images.pexels.com/photos/6221587/pexels-photo-6221587.jpeg?auto=compress&cs=tinysrgb&w=1000',
    alt: 'Artful grayscale shot of a dancer mid-motion with dramatic shadow',
    orientation: 'portrait',
    caption: 'Motion study — shadow and form',
    span: 'col-span-1 row-span-2',
  },
  {
    id: 'g6',
    src: 'https://images.pexels.com/photos/8935599/pexels-photo-8935599.jpeg?auto=compress&cs=tinysrgb&w=1000',
    alt: "Ballet dancer's feet in pointe shoes on studio floor",
    orientation: 'detail',
    caption: 'Detail — feet in second position',
    span: 'col-span-1 row-span-1',
  },
  {
    id: 'g7',
    src: 'https://images.pexels.com/photos/12442273/pexels-photo-12442273.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Group of ballet dancers captured mid-leap during a stage performance',
    orientation: 'performance',
    caption: 'Performance — grand allegro, ensemble',
    span: 'col-span-2 row-span-2',
  },
  {
    id: 'g8',
    src: 'https://images.pexels.com/photos/18380711/pexels-photo-18380711.jpeg?auto=compress&cs=tinysrgb&w=1600',
    alt: 'Dynamic black and white silhouette of dancers in motion',
    orientation: 'wide',
    caption: 'Silhouette — group movement study',
    span: 'col-span-2 row-span-1',
  },
  {
    id: 'g9',
    src: 'https://images.pexels.com/photos/14811264/pexels-photo-14811264.jpeg?auto=compress&cs=tinysrgb&w=1000',
    alt: 'Blurred motion shot of a dancer spinning',
    orientation: 'portrait',
    caption: 'Motion blur — turn sequence',
    span: 'col-span-1 row-span-2',
  },
  {
    id: 'g10',
    src: 'https://images.pexels.com/photos/7267171/pexels-photo-7267171.jpeg?auto=compress&cs=tinysrgb&w=1000',
    alt: 'Silhouettes of women dancing on a white wall in a studio',
    orientation: 'detail',
    caption: 'Shadow play — studio wall',
    span: 'col-span-1 row-span-1',
  },
];
