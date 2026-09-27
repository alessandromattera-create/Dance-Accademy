import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, MapPin, User, Users } from 'lucide-react';
import { classes, days, dayLabels, type Day } from '@/data/classes';

function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

function ClassCard({ cls }: { cls: (typeof classes)[0] }) {
  const isFull = cls.availablePlaces === 0;
  const endTime = timeToMinutes(cls.startTime) + cls.duration;
  const endHour = Math.floor(endTime / 60);
  const endMin = endTime % 60;
  const endTimeStr = `${String(endHour).padStart(2, '0')}:${String(endMin).padStart(2, '0')}`;

  return (
    <div className="group relative overflow-hidden rounded-lg border border-mh-black/10 bg-white/60 p-4 transition-all duration-300 hover:border-accent/30 hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-display text-base font-bold text-mh-black">
            {cls.discipline}
          </h3>
          <p className="mt-0.5 text-xs font-medium uppercase tracking-wide-sm text-accent">
            {cls.level}
          </p>
        </div>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
            isFull
              ? 'bg-mh-black/10 text-stone'
              : 'bg-accent/10 text-accent'
          }`}
        >
          {isFull ? 'Full' : `${cls.availablePlaces} spots`}
        </span>
      </div>

      <div className="mt-3 space-y-1.5 text-xs text-stone">
        <div className="flex items-center gap-2">
          <User size={12} className="text-stone/60" />
          <span>{cls.teacher}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={12} className="text-stone/60" />
          <span>{cls.startTime} — {endTimeStr}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin size={12} className="text-stone/60" />
          <span>{cls.room}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users size={12} className="text-stone/60" />
          <span>{cls.availablePlaces}/{cls.totalPlaces} places</span>
        </div>
      </div>

      <div className="mt-4">
        {isFull ? (
          <button className="w-full rounded-full border border-mh-black/15 px-4 py-2 text-xs font-semibold uppercase tracking-wide-sm text-stone transition-colors hover:border-stone hover:text-mh-black">
            Join Waiting List
          </button>
        ) : (
          <Link
            to={`/prenota?discipline=${cls.discipline.toLowerCase().replace(/\s+/g, '-')}&class=${cls.id}`}
            className="block w-full rounded-full bg-mh-black px-4 py-2 text-center text-xs font-semibold uppercase tracking-wide-sm text-ivory transition-colors hover:bg-accent"
          >
            Book
          </Link>
        )}
      </div>
    </div>
  );
}

export function OrariPage() {
  const [activeDay, setActiveDay] = useState<Day>('Lun');
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) < 50) return;
    const currentIndex = days.indexOf(activeDay);
    if (diff > 0 && currentIndex < days.length - 1) {
      setActiveDay(days[currentIndex + 1]);
    } else if (diff < 0 && currentIndex > 0) {
      setActiveDay(days[currentIndex - 1]);
    }
  };

  // Desktop: group by day into columns
  const classesByDay: Record<string, typeof classes> = {};
  days.forEach((day) => {
    classesByDay[day] = classes
      .filter((c) => c.day === day)
      .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime));
  });

  const mobileClasses = classesByDay[activeDay] ?? [];

  return (
    <section className="min-h-screen bg-ivory pt-32 pb-20">
      <div className="px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-semibold uppercase tracking-editorial text-accent">
            Weekly schedule
          </p>
          <h1 className="mt-4 font-display text-display-lg font-extrabold text-mh-black text-balance">
            Orari
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone">
            The full weekly timetable of classes across all disciplines and levels.
            Book a spot online or join the waiting list when a class is full.
          </p>
        </div>
      </div>

      {/* Desktop: full week grid */}
      <div className="mt-16 hidden px-6 lg:block lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-6 gap-4">
            {days.map((day) => (
              <div key={day}>
                <div className="sticky top-24 mb-4 border-b border-mh-black/10 pb-3">
                  <h2 className="font-display text-lg font-bold text-mh-black">
                    {dayLabels[day]}
                  </h2>
                  <p className="text-xs uppercase tracking-wide-sm text-stone">
                    {day}
                  </p>
                </div>
                <div className="space-y-3">
                  {classesByDay[day].map((cls) => (
                    <ClassCard key={cls.id} cls={cls} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: swipeable single day */}
      <div className="mt-12 lg:hidden" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        {/* day tabs */}
        <div className="overflow-x-auto px-6 no-scrollbar">
          <div className="flex gap-2">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide-sm transition-all ${
                  activeDay === day
                    ? 'bg-accent text-ivory'
                    : 'bg-mh-black/5 text-stone hover:bg-mh-black/10'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 px-6"
          >
            <h2 className="mb-4 font-display text-2xl font-bold text-mh-black">
              {dayLabels[activeDay]}
            </h2>
            <div className="space-y-3">
              {mobileClasses.map((cls) => (
                <ClassCard key={cls.id} cls={cls} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* swipe hint */}
        <div className="mt-8 flex items-center justify-center gap-2 text-stone/40">
          <ChevronLeft size={16} />
          <span className="text-xs uppercase tracking-wide-sm">Swipe between days</span>
          <ChevronRight size={16} />
        </div>
      </div>
    </section>
  );
}
