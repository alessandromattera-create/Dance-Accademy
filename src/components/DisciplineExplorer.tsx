import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ArrowRight, ChevronLeft, ChevronRight, Clock, Users, User } from 'lucide-react';
import { disciplines, disciplineCategories } from '@/data/disciplines';

export function DisciplineExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeCategory === 'All'
      ? disciplines
      : disciplines.filter((d) => d.category === activeCategory);

  const current = filtered[activeIndex] ?? disciplines[0];

  const selectDiscipline = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, filtered.length - 1));
      setActiveIndex(clamped);
    },
    [filtered.length]
  );

  // reset index when category changes
  useEffect(() => {
    setActiveIndex(0);
  }, [activeCategory]);

  // animate content transition on discipline change
  useEffect(() => {
    if (!contentRef.current) return;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    const tl = gsap.timeline();
    tl.fromTo(
      contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    );
    const metaEls = contentRef.current?.querySelectorAll('[data-meta]');
    if (metaEls.length) {
      tl.fromTo(
        metaEls,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', stagger: 0.08 },
        '-=0.3'
      );
    }
  }, [activeIndex, activeCategory]);

  // animate background crossfade
  useEffect(() => {
    if (!bgRef.current) return;
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion) return;

    gsap.fromTo(
      bgRef.current,
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }
    );
  }, [activeIndex, activeCategory]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        selectDiscipline(activeIndex + 1);
      } else {
        selectDiscipline(activeIndex - 1);
      }
    }
  };

  const goPrev = () => selectDiscipline(activeIndex - 1);
  const goNext = () => selectDiscipline(activeIndex + 1);

  return (
    <section className="relative min-h-screen bg-mh-black pt-24 lg:pt-32">
      {/* header */}
      <div className="px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-editorial text-accent">
            What we teach
          </p>
          <h1 className="mt-4 font-display text-display-lg font-extrabold text-ivory text-balance">
            Explore Disciplines
          </h1>
        </div>
      </div>

      {/* category filter */}
      <div className="mt-8 overflow-x-auto px-6 lg:px-10 no-scrollbar">
        <div className="mx-auto flex max-w-7xl gap-2">
          {['All', ...disciplineCategories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wide-sm transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-accent text-ivory'
                  : 'bg-ivory/5 text-ivory/50 hover:bg-ivory/10 hover:text-ivory/80'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* interactive stage */}
      <div
        ref={stageRef}
        className="relative mt-8 lg:mt-12"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* background visual */}
        <div className="relative h-[60vh] w-full overflow-hidden lg:h-[70vh]">
          <div ref={bgRef} className="absolute inset-0">
            <img
              src={current.image}
              alt={current.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-mh-black via-mh-black/50 to-mh-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-mh-black/70 via-transparent to-transparent" />

          {/* desktop nav arrows */}
          <button
            onClick={goPrev}
            disabled={activeIndex === 0}
            className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-ivory/20 bg-mh-black/40 p-3 text-ivory backdrop-blur-sm transition-all hover:border-ivory/50 hover:bg-mh-black/60 disabled:opacity-30 lg:flex"
            aria-label="Previous discipline"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goNext}
            disabled={activeIndex >= filtered.length - 1}
            className="absolute right-4 top-1/2 z-20 hidden -translate-y-1/2 items-center justify-center rounded-full border border-ivory/20 bg-mh-black/40 p-3 text-ivory backdrop-blur-sm transition-all hover:border-ivory/50 hover:bg-mh-black/60 disabled:opacity-30 lg:flex"
            aria-label="Next discipline"
          >
            <ChevronRight size={24} />
          </button>

          {/* content overlay */}
          <div
            ref={contentRef}
            className="absolute bottom-0 left-0 right-0 z-10 px-6 pb-8 lg:px-10 lg:pb-16"
          >
            <div className="mx-auto max-w-7xl">
              <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
                {/* left: name + description */}
                <div className="lg:col-span-6">
                  <p
                    data-meta
                    className="text-xs font-semibold uppercase tracking-editorial text-accent"
                  >
                    {current.category}
                  </p>
                  <h2 className="mt-3 font-display text-display-md font-extrabold text-ivory">
                    {current.name}
                  </h2>
                  <p className="mt-2 font-display text-lg italic text-ivory/60">
                    {current.tagline}
                  </p>
                  <p
                    data-meta
                    className="mt-6 max-w-md text-base leading-relaxed text-ivory/70"
                  >
                    {current.description}
                  </p>
                </div>

                {/* right: details grid */}
                <div className="lg:col-span-5 lg:col-start-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div data-meta>
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide-sm text-accent">
                        <Users size={14} />
                        Age Groups
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {current.ageRanges.map((age) => (
                          <span
                            key={age}
                            className="rounded-full border border-ivory/20 px-3 py-1 text-xs text-ivory/70"
                          >
                            {age}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div data-meta>
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide-sm text-accent">
                        <Clock size={14} />
                        Duration
                      </div>
                      <p className="mt-3 text-sm text-ivory/70">
                        {current.duration}
                      </p>
                    </div>

                    <div data-meta className="col-span-2">
                      <div className="text-xs font-semibold uppercase tracking-wide-sm text-accent">
                        Levels
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {current.levels.map((level) => (
                          <span
                            key={level}
                            className="rounded-full bg-ivory/10 px-3 py-1 text-xs text-ivory/80"
                          >
                            {level}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div data-meta className="col-span-2">
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide-sm text-accent">
                        <User size={14} />
                        Teachers
                      </div>
                      <p className="mt-3 text-sm text-ivory/70">
                        {current.teachers.join(', ')}
                      </p>
                    </div>
                  </div>

                  <div data-meta className="mt-8">
                    <Link
                      to={`/prenota?discipline=${current.id}`}
                      className="group inline-flex items-center justify-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-semibold uppercase tracking-wide-sm text-ivory transition-all duration-300 hover:bg-accent-light"
                    >
                      Book a Trial — {current.name}
                      <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* mobile swipe hint */}
        <div className="flex items-center justify-center gap-2 py-4 text-ivory/40 lg:hidden">
          <ChevronLeft size={16} />
          <span className="text-xs uppercase tracking-wide-sm">Swipe to explore</span>
          <ChevronRight size={16} />
        </div>
      </div>

      {/* discipline selector strip */}
      <div className="border-t border-ivory/10 px-6 py-8 lg:px-10 lg:py-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2 lg:gap-3">
            {filtered.map((disc, index) => (
              <button
                key={disc.id}
                onClick={() => selectDiscipline(index)}
                className={`group rounded-lg px-4 py-3 text-left transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-ivory/10'
                    : 'hover:bg-ivory/5'
                }`}
              >
                <div
                  className={`font-display text-base font-bold transition-colors lg:text-lg ${
                    index === activeIndex
                      ? 'text-ivory'
                      : 'text-ivory/40 group-hover:text-ivory/70'
                  }`}
                >
                  {disc.name}
                </div>
                <div
                  className={`mt-0.5 text-xs uppercase tracking-wide-sm transition-colors ${
                    index === activeIndex ? 'text-accent' : 'text-ivory/30'
                  }`}
                >
                  {disc.category}
                </div>
              </button>
            ))}
          </div>

          {/* progress indicator */}
          <div className="mt-8 flex items-center gap-3">
            <span className="text-xs font-medium text-ivory/40">
              {String(activeIndex + 1).padStart(2, '0')}
            </span>
            <div className="relative h-px flex-1 max-w-xs bg-ivory/10">
              <div
                className="absolute left-0 top-0 h-full bg-accent transition-all duration-500 ease-smooth-out"
                style={{
                  width: `${((activeIndex + 1) / filtered.length) * 100}%`,
                }}
              />
            </div>
            <span className="text-xs font-medium text-ivory/40">
              {String(filtered.length).padStart(2, '0')}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
