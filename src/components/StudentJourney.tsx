import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stages = [
  {
    number: '01',
    title: 'Discover',
    text: 'Explore disciplines, watch showcases, find the style that speaks to you.',
  },
  {
    number: '02',
    title: 'Trial',
    text: 'Step into a class with no commitment. Experience the studio, the energy, the method.',
  },
  {
    number: '03',
    title: 'Join',
    text: 'Enrol in your chosen discipline. Begin the structured journey with a clear path.',
  },
  {
    number: '04',
    title: 'Train',
    text: 'Build technique week by week. Progress through levels with expert guidance.',
  },
  {
    number: '05',
    title: 'Perform',
    text: 'Take the stage. Showcases, competitions, and events that turn training into art.',
  },
  {
    number: '06',
    title: 'Grow',
    text: 'Mentor others, join advanced programs, or step toward a professional career.',
  },
];

export function StudentJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // progress line
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: 'top center',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 60%',
              end: 'bottom 70%',
              scrub: 1,
            },
          }
        );
      }

      stageRefs.current.forEach((stage, index) => {
        if (!stage) return;
        const dot = stage.querySelector('[data-dot]');
        const number = stage.querySelector('[data-stage-number]');
        const title = stage.querySelector('[data-stage-title]');
        const text = stage.querySelector('[data-stage-text]');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });

        if (dot) {
          tl.fromTo(
            dot,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
          );
        }
        if (number) {
          tl.fromTo(
            number,
            { x: -15, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
            '-=0.2'
          );
        }
        if (title) {
          tl.fromTo(
            title,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
            '-=0.2'
          );
        }
        if (text) {
          tl.fromTo(
            text,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
            '-=0.3'
          );
        }

        // parallax on alternate sides
        const isEven = index % 2 === 0;
        gsap.fromTo(
          stage,
          { x: isEven ? -20 : 20 },
          {
            x: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: stage,
              start: 'top bottom',
              end: 'top 40%',
              scrub: 1.5,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-ivory px-6 py-32 lg:px-10 lg:py-48"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-20 text-center lg:mb-32">
          <p className="text-xs font-semibold uppercase tracking-editorial text-accent">
            The path
          </p>
          <h2 className="mt-6 font-display text-display-lg font-extrabold text-mh-black text-balance">
            Your journey,
            <br />
            <span className="text-accent">step by step.</span>
          </h2>
        </div>

        <div className="relative">
          {/* center progress line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-mh-black/10 lg:left-1/2 lg:-translate-x-1/2">
            <div
              ref={lineRef}
              className="h-full w-full origin-top bg-accent"
            />
          </div>

          <div className="space-y-16 lg:space-y-24">
            {stages.map((stage, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={stage.number}
                  ref={(el) => {
                    stageRefs.current[index] = el;
                  }}
                  className={`relative flex items-start gap-8 pl-16 lg:pl-0 ${
                    isEven ? 'lg:flex-row lg:justify-start' : 'lg:flex-row-reverse lg:justify-start'
                  }`}
                >
                  {/* dot */}
                  <div
                    className={`absolute left-6 top-1 z-10 -translate-x-1/2 lg:left-1/2 ${
                      isEven ? 'lg:translate-x-1/2' : 'lg:-translate-x-1/2'
                    }`}
                  >
                    <span
                      data-dot
                      className="block h-4 w-4 rounded-full border-2 border-accent bg-ivory"
                    />
                  </div>

                  {/* content card */}
                  <div
                    className={`lg:w-5/12 ${
                      isEven ? 'lg:pr-16 lg:text-right' : 'lg:pl-16'
                    }`}
                  >
                    <span
                      data-stage-number
                      className="font-display text-6xl font-bold text-accent/20 lg:text-7xl"
                    >
                      {stage.number}
                    </span>
                    <h3
                      data-stage-title
                      className="mt-2 font-display text-3xl font-bold text-mh-black lg:text-4xl"
                    >
                      {stage.title}
                    </h3>
                    <p
                      data-stage-text
                      className="mt-4 text-base leading-relaxed text-stone lg:text-lg"
                    >
                      {stage.text}
                    </p>
                  </div>

                  {/* spacer for alternating layout */}
                  <div className="hidden lg:block lg:w-5/12" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
