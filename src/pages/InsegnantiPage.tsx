import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Calendar, Clock, Users, Check } from 'lucide-react';
import { teachers, type Teacher } from '@/data/teachers';

export function InsegnantiPage() {
  const [selected, setSelected] = useState<Teacher | null>(null);

  const closeModal = useCallback(() => setSelected(null), []);

  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selected]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [closeModal]);

  return (
    <section className="min-h-screen bg-ivory pt-32 pb-20">
      <div className="px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-editorial text-accent">
            The artists
          </p>
          <h1 className="mt-4 font-display text-display-lg font-extrabold text-mh-black text-balance">
            Insegnanti
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone">
            The faculty at Movement House — professional dancers, choreographers,
            and educators dedicated to guiding every dancer's journey.
          </p>
        </div>
      </div>

      <div className="mt-16 px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
            {teachers.map((teacher, index) => (
              <motion.button
                key={teacher.id}
                onClick={() => setSelected(teacher)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="group text-left"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-graphite">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-smooth-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-mh-black/90 via-mh-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-xs font-semibold uppercase tracking-editorial text-accent">
                      {teacher.role}
                    </p>
                    <h2 className="mt-2 font-display text-2xl font-bold text-ivory">
                      {teacher.name}
                    </h2>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {teacher.styles.slice(0, 3).map((style) => (
                        <span
                          key={style}
                          className="rounded-full bg-ivory/10 px-2.5 py-0.5 text-xs text-ivory/70"
                        >
                          {style}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-xs text-ivory/50 transition-colors group-hover:text-accent">
                      <span className="uppercase tracking-wide-sm">View profile</span>
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-mh-black/80 backdrop-blur-sm"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative my-8 w-full max-w-4xl rounded-2xl bg-ivory shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-mh-black/60 text-ivory backdrop-blur-sm transition-colors hover:bg-mh-black/80"
                aria-label="Close profile"
              >
                <X size={20} />
              </button>

              <div className="grid gap-0 md:grid-cols-5">
                <div className="relative aspect-[3/4] overflow-hidden rounded-t-2xl md:aspect-auto md:rounded-l-2xl md:rounded-tr-none">
                  <img
                    src={selected.image}
                    alt={selected.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-mh-black/60 to-transparent md:bg-gradient-to-r" />
                </div>

                <div className="flex flex-col p-8 md:col-span-3 md:p-10">
                  <p className="text-xs font-semibold uppercase tracking-editorial text-accent">
                    {selected.role}
                  </p>
                  <h2 className="mt-3 font-display text-3xl font-extrabold text-mh-black lg:text-4xl">
                    {selected.name}
                  </h2>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {selected.styles.map((style) => (
                      <span
                        key={style}
                        className="rounded-full bg-mh-black/5 px-3 py-1 text-xs font-medium text-stone"
                      >
                        {style}
                      </span>
                    ))}
                  </div>

                  <p className="mt-6 text-base leading-relaxed text-stone">
                    {selected.bio}
                  </p>

                  <div className="mt-8 space-y-6">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide-sm text-accent">
                        <Users size={14} />
                        Levels
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {selected.levels.map((level) => (
                          <span
                            key={level}
                            className="rounded-full border border-mh-black/10 px-3 py-1 text-xs text-stone"
                          >
                            {level}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wide-sm text-accent">
                        Classes
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {selected.classes.map((cls) => (
                          <span
                            key={cls}
                            className="rounded-full bg-mh-black/5 px-3 py-1 text-xs text-stone"
                          >
                            {cls}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide-sm text-accent">
                        <Calendar size={14} />
                        Availability
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        {selected.availability.map((slot) => (
                          <div
                            key={slot.day}
                            className="flex items-center gap-2 rounded-lg bg-mh-black/5 px-3 py-2"
                          >
                            <Clock size={14} className="text-stone" />
                            <div>
                              <span className="text-xs font-semibold text-mh-black">
                                {slot.day}
                              </span>
                              <span className="ml-2 text-xs text-stone">
                                {slot.time}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-auto pt-8">
                    <Link
                      to={`/prenota?discipline=${selected.styles[0].toLowerCase().replace(/\s+/g, '-')}&teacher=${selected.id}`}
                      className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-semibold uppercase tracking-wide-sm text-ivory transition-all duration-300 hover:bg-accent-light"
                    >
                      <Check size={18} />
                      Book with {selected.name.split(' ')[0]}
                      <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
