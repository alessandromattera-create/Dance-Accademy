import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, MapPin, Users, ArrowRight, AlertCircle } from 'lucide-react';
import { events, eventTypes, type EventType } from '@/data/events';

const typeColors: Record<EventType, string> = {
  Masterclass: 'bg-accent/15 text-accent',
  Workshop: 'bg-blue-500/15 text-blue-700',
  'Open Class': 'bg-green-600/15 text-green-700',
  Audition: 'bg-amber-600/15 text-amber-700',
  Showcase: 'bg-rose-600/15 text-rose-700',
  'Competition Preparation': 'bg-purple-600/15 text-purple-700',
};

export function EventiPage() {
  const [activeType, setActiveType] = useState<EventType | 'All'>('All');

  const filtered = useMemo(() => {
    if (activeType === 'All') return events;
    return events.filter((e) => e.type === activeType);
  }, [activeType]);

  return (
    <section className="min-h-screen bg-mh-black pt-32 pb-20">
      <div className="px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-editorial text-accent">
            Workshops & performances
          </p>
          <h1 className="mt-4 font-display text-display-lg font-extrabold text-ivory text-balance">
            Eventi
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/60">
            Masterclasses, workshops, auditions, showcases, and special events.
            Reserve your place online.
          </p>
        </div>
      </div>

      {/* type filter */}
      <div className="mt-8 overflow-x-auto px-6 lg:px-10 no-scrollbar">
        <div className="mx-auto flex max-w-7xl gap-2">
          {['All', ...eventTypes].map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type as EventType | 'All')}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide-sm transition-all duration-300 ${
                activeType === type
                  ? 'bg-accent text-ivory'
                  : 'bg-ivory/5 text-ivory/50 hover:bg-ivory/10 hover:text-ivory/80'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* events list */}
      <div className="mt-12 space-y-12 px-6 lg:mt-20 lg:space-y-24 lg:px-10">
        {filtered.map((event, index) => {
          const isFull = event.availablePlaces === 0;
          return (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto max-w-7xl"
            >
              <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
                {/* cinematic visual */}
                <div className="relative aspect-video overflow-hidden rounded-xl bg-graphite">
                  <img
                    src={event.image}
                    alt={event.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-mh-black/60 to-transparent" />
                  <div className="absolute left-6 top-6 flex items-center gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide-sm ${
                        typeColors[event.type]
                      }`}
                    >
                      {event.type}
                    </span>
                    {event.isPlaceholder && (
                      <span className="flex items-center gap-1.5 rounded-full bg-mh-black/60 px-3 py-1 text-xs font-medium text-ivory/70 backdrop-blur-sm">
                        <AlertCircle size={12} />
                        Example event
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-6 left-6">
                    <span className="font-display text-5xl font-extrabold text-ivory/30">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* event info */}
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-ivory/50">
                    <Calendar size={16} className="text-accent" />
                    <span className="text-sm font-medium">{event.dateLabel}</span>
                  </div>

                  <h2 className="mt-4 font-display text-2xl font-bold text-ivory lg:text-3xl">
                    {event.title}
                  </h2>

                  <p className="mt-4 text-base leading-relaxed text-ivory/60">
                    {event.description}
                  </p>

                  <div className="mt-6 grid grid-cols-2 gap-4 border-t border-ivory/10 pt-6">
                    <div className="flex items-center gap-2 text-sm text-ivory/60">
                      <User size={14} className="text-accent" />
                      <span>{event.teacher}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-ivory/60">
                      <Clock size={14} className="text-accent" />
                      <span>{event.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-ivory/60">
                      <MapPin size={14} className="text-accent" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-ivory/60">
                      <Users size={14} className="text-accent" />
                      <span>
                        {isFull
                          ? `Full (${event.totalPlaces} places)`
                          : `${event.availablePlaces}/${event.totalPlaces} available`}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <span className="rounded-full bg-ivory/5 px-3 py-1 text-xs font-medium text-ivory/50">
                      Level: {event.level}
                    </span>
                    <span className="ml-2 rounded-full bg-ivory/5 px-3 py-1 text-xs font-medium text-ivory/50">
                      Style: {event.style}
                    </span>
                  </div>

                  <div className="mt-8">
                    {isFull ? (
                      <button className="inline-flex items-center justify-center gap-3 rounded-full border border-ivory/20 px-8 py-4 text-sm font-semibold uppercase tracking-wide-sm text-ivory/60 transition-all duration-300 hover:border-ivory/40">
                        Join Waiting List
                      </button>
                    ) : (
                      <Link
                        to={`/prenota?event=${event.id}`}
                        className="group inline-flex items-center justify-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-semibold uppercase tracking-wide-sm text-ivory transition-all duration-300 hover:bg-accent-light"
                      >
                        Reserve Your Place
                        <ArrowRight
                          size={18}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
