import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { brand } from '@/data/brand';

gsap.registerPlugin(ScrollTrigger);

const featureImages = [
  {
    src: 'https://images.pexels.com/photos/29540792/pexels-photo-29540792.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Silhouette of a graceful dancer in an artistic ballet pose',
    label: 'Classical',
    desc: 'Ballet, pointe, and the discipline of line.',
  },
  {
    src: 'https://images.pexels.com/photos/6926606/pexels-photo-6926606.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Dancers practicing contemporary moves in a mirrored studio',
    label: 'Contemporary',
    desc: 'Floor work, release technique, improvisation.',
  },
  {
    src: 'https://images.pexels.com/photos/690597/pexels-photo-690597.jpeg?auto=compress&cs=tinysrgb&w=1200',
    alt: 'Group of adults performing dynamic contemporary dance',
    label: 'Urban',
    desc: 'Hip-hop, house, and street-derived movement.',
  },
];

export function ScrollTransition() {
  const sectionRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      if (overlayRef.current) {
        gsap.fromTo(
          overlayRef.current,
          { opacity: 0.85 },
          {
            opacity: 0.15,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom center',
              scrub: 1,
            },
          }
        );
      }

      if (headlineRef.current) {
        gsap.fromTo(
          headlineRef.current,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      if (subRef.current) {
        gsap.fromTo(
          subRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            delay: 0.2,
            scrollTrigger: {
              trigger: subRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      imageRefs.current.forEach((img, index) => {
        if (!img) return;
        const innerImg = img.querySelector('img');
        const textEls = img.querySelectorAll('[data-anim]');

        gsap.fromTo(
          img,
          { scale: 1.15, opacity: 0, y: 60 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 1.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: img,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );

        if (innerImg) {
          gsap.fromTo(
            innerImg,
            { scale: 1.3 },
            {
              scale: 1.05,
              ease: 'none',
              scrollTrigger: {
                trigger: img,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          );
        }

        textEls.forEach((el, i) => {
          gsap.fromTo(
            el,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              delay: 0.3 + i * 0.15,
              scrollTrigger: {
                trigger: img,
                start: 'top 75%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-ivory">
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-mh-black via-graphite to-ivory"
      />

      <div className="relative z-10 px-6 pb-32 pt-32 lg:px-10 lg:pt-48">
        <div className="mx-auto max-w-5xl text-center">
          <h2
            ref={headlineRef}
            className="font-display text-display-lg font-extrabold text-mh-black text-balance"
          >
            Three disciplines.
            <br />
            <span className="text-accent">One language.</span>
          </h2>
          <p
            ref={subRef}
            className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-stone"
          >
            {brand.name} brings together classical technique, contemporary
            expression, and urban energy — a place where every dancer discovers
            their own voice through movement.
          </p>
        </div>

        <div className="mx-auto mt-24 grid max-w-7xl gap-8 md:grid-cols-3 lg:mt-32 lg:gap-6">
          {featureImages.map((feature, index) => (
            <div
              key={feature.label}
              ref={(el) => {
                imageRefs.current[index] = el;
              }}
              className="group relative aspect-[3/4] overflow-hidden rounded-lg bg-graphite"
            >
              <img
                src={feature.src}
                alt={feature.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-smooth-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mh-black/90 via-mh-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
                <p
                  data-anim
                  className="text-xs font-semibold uppercase tracking-editorial text-accent"
                >
                  {feature.label}
                </p>
                <h3
                  data-anim
                  className="mt-3 font-display text-2xl font-bold text-ivory lg:text-3xl"
                >
                  {feature.desc}
                </h3>
              </div>
              <div className="absolute inset-0 border border-ivory/0 transition-all duration-500 group-hover:border-ivory/20 group-hover:mix-blend-overlay" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
