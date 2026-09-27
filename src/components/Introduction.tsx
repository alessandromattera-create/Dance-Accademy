import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const editorialBlocks = [
  {
    word: 'Discipline',
    text: 'The foundation — technique, alignment, repetition. The quiet work that makes everything else possible.',
  },
  {
    word: 'Expression',
    text: 'The voice — emotion, intention, story. Movement as language, spoken through the body.',
  },
  {
    word: 'Technique',
    text: 'The craft — strength, flexibility, control. The physical vocabulary that gives form to idea.',
  },
  {
    word: 'Performance',
    text: 'The moment — presence, projection, connection. Where preparation meets audience and becomes art.',
  },
  {
    word: 'Community',
    text: 'The heartbeat — shared space, shared growth. Dancers who push each other, lift each other, belong.',
  },
];

export function Introduction() {
  const sectionRef = useRef<HTMLElement>(null);
  const statementRef = useRef<HTMLHeadingElement>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (statementRef.current) {
        const words = statementRef.current.querySelectorAll('[data-word]');
        gsap.fromTo(
          words,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power4.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: statementRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      blockRefs.current.forEach((block, index) => {
        if (!block) return;
        const numberEl = block.querySelector('[data-number]');
        const wordEl = block.querySelector('[data-block-word]');
        const textEl = block.querySelector('[data-block-text]');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: block,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });

        if (numberEl) {
          tl.fromTo(
            numberEl,
            { x: -20, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
          );
        }
        if (wordEl) {
          tl.fromTo(
            wordEl,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
            '-=0.3'
          );
        }
        if (textEl) {
          tl.fromTo(
            textEl,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
            '-=0.4'
          );
        }

        // subtle parallax on the number
        if (numberEl) {
          gsap.fromTo(
            numberEl,
            { y: 0 },
            {
              y: -30,
              ease: 'none',
              scrollTrigger: {
                trigger: block,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-mh-black px-6 py-32 text-ivory lg:px-10 lg:py-48"
    >
      <div className="mx-auto max-w-6xl">
        <div className="overflow-hidden">
          <h2
            ref={statementRef}
            className="font-display text-display-xl font-extrabold leading-[0.9] text-ivory"
          >
            <span data-word className="inline-block">Dance</span>{' '}
            <span data-word className="inline-block">is</span>{' '}
            <span data-word className="inline-block">not</span>{' '}
            <span data-word className="inline-block text-accent">one</span>{' '}
            <span data-word className="inline-block">style.</span>
          </h2>
        </div>

        <div className="mt-24 lg:mt-40">
          <div className="space-y-0">
            {editorialBlocks.map((block, index) => (
              <div
                key={block.word}
                ref={(el) => {
                  blockRefs.current[index] = el;
                }}
                className="group grid gap-6 border-t border-ivory/10 py-12 lg:grid-cols-12 lg:gap-10 lg:py-16"
              >
                <div className="lg:col-span-2">
                  <span
                    data-number
                    className="font-display text-5xl font-bold text-ivory/20 lg:text-6xl"
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="lg:col-span-4">
                  <h3
                    data-block-word
                    className="font-display text-3xl font-bold text-ivory transition-colors duration-500 group-hover:text-accent lg:text-4xl"
                  >
                    {block.word}
                  </h3>
                </div>
                <div className="lg:col-span-5 lg:col-start-8">
                  <p
                    data-block-text
                    className="text-lg leading-relaxed text-ivory/60"
                  >
                    {block.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
