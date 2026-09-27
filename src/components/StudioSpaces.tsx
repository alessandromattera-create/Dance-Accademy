import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { studioSpaces } from '@/data/studioSpaces';

gsap.registerPlugin(ScrollTrigger);

export function StudioSpaces() {
  const sectionRef = useRef<HTMLElement>(null);
  const spaceRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      spaceRefs.current.forEach((space, index) => {
        if (!space) return;
        const img = space.querySelector('[data-space-img]');
        const text = space.querySelectorAll('[data-space-text]');

        const isEven = index % 2 === 0;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: space,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        });

        tl.fromTo(
          space,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }
        );

        if (img) {
          tl.fromTo(
            img,
            { scale: 1.2, x: isEven ? -30 : 30 },
            {
              scale: 1,
              x: 0,
              duration: 1.2,
              ease: 'power3.out',
            },
            '<'
          );
        }

        text.forEach((el, i) => {
          tl.fromTo(
            el,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
            `-=${0.6 - i * 0.1}`
          );
        });

        if (img) {
          gsap.fromTo(
            img,
            { y: 0 },
            {
              y: -40,
              ease: 'none',
              scrollTrigger: {
                trigger: space,
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
      className="relative overflow-hidden bg-mh-black py-32 text-ivory lg:py-48"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-20 lg:mb-32">
          <p className="text-xs font-semibold uppercase tracking-editorial text-accent">
            The spaces
          </p>
          <h2 className="mt-6 font-display text-display-lg font-extrabold text-ivory text-balance">
            Studio Spaces
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/60">
            Five purpose-built spaces designed for every kind of movement — from
            classical technique to performance, from preparation to rest.
          </p>
        </div>

        <div className="space-y-20 lg:space-y-32">
          {studioSpaces.map((space, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={space.id}
                ref={(el) => {
                  spaceRefs.current[index] = el;
                }}
                className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
              >
                <div
                  className={`relative aspect-[4/3] overflow-hidden rounded-lg ${
                    isEven ? '' : 'lg:order-2'
                  }`}
                >
                  <img
                    data-space-img
                    src={space.image}
                    alt={space.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-mh-black/40 to-transparent" />
                  <span className="absolute left-4 top-4 font-display text-6xl font-extrabold text-ivory/20">
                    {space.number}
                  </span>
                </div>

                <div className={isEven ? '' : 'lg:order-1'}>
                  <p
                    data-space-text
                    className="text-xs font-semibold uppercase tracking-editorial text-accent"
                  >
                    {space.number}
                  </p>
                  <h3
                    data-space-text
                    className="mt-3 font-display text-3xl font-bold text-ivory lg:text-4xl"
                  >
                    {space.name}
                  </h3>
                  <p
                    data-space-text
                    className="mt-4 text-base leading-relaxed text-ivory/60"
                  >
                    {space.description}
                  </p>
                  <div
                    data-space-text
                    className="mt-6 flex flex-wrap gap-2"
                  >
                    {space.specs.map((spec) => (
                      <span
                        key={spec}
                        className="rounded-full border border-ivory/15 px-3 py-1 text-xs text-ivory/50"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
