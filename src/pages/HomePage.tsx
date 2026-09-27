import { Hero } from '@/components/Hero';
import { Introduction } from '@/components/Introduction';
import { ScrollTransition } from '@/components/ScrollTransition';
import { StudentJourney } from '@/components/StudentJourney';
import { StudioSpaces } from '@/components/StudioSpaces';
import { Gallery } from '@/components/Gallery';
import { TrialLesson } from '@/components/TrialLesson';

export function HomePage() {
  return (
    <>
      <Hero />
      <Introduction />
      <ScrollTransition />
      <StudentJourney />
      <StudioSpaces />
      <Gallery />
      <TrialLesson />
    </>
  );
}
