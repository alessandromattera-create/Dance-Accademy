import { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Clock,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Loader2,
  AlertCircle,
  PartyPopper,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { disciplines, disciplineCategories } from '@/data/disciplines';
import { teachers } from '@/data/teachers';
import { classes as staticClasses } from '@/data/classes';

interface DbDiscipline {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  age_ranges: string[];
  levels: string[];
  duration: string;
  teachers: string[];
  image: string;
  accent_color: string;
}

interface DbTeacher {
  id: string;
  name: string;
  role: string;
  styles: string[];
  levels: string[];
  bio: string;
  image: string;
}

interface DbClass {
  id: string;
  discipline_id: string;
  discipline_name: string;
  level: string;
  teacher_id: string;
  teacher_name: string;
  room_id: string;
  room_name: string;
  day: string;
  start_time: string;
  duration: number;
  total_places: number;
}

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7;

const stepLabels = ['Discipline', 'Level', 'Teacher', 'Date', 'Time', 'Details', 'Confirm'];

const dayNames = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
const dayLabelsFull: Record<string, string> = {
  Lun: 'Lunedì',
  Mar: 'Martedì',
  Mer: 'Mercoledì',
  Gio: 'Giovedì',
  Ven: 'Venerdì',
  Sab: 'Sabato',
  Dom: 'Domenica',
};

export function PrenotaPage() {
  const [searchParams] = useSearchParams();
  const prefillDiscipline = searchParams.get('discipline');
  const prefillTeacher = searchParams.get('teacher');
  const prefillEvent = searchParams.get('event');

  const [step, setStep] = useState<Step>(1);
  const [dbDisciplines, setDbDisciplines] = useState<DbDiscipline[]>([]);
  const [dbTeachers, setDbTeachers] = useState<DbTeacher[]>([]);
  const [dbClasses, setDbClasses] = useState<DbClass[]>([]);

  // wizard state
  const [selectedDisciplineId, setSelectedDisciplineId] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [slotsError, setSlotsError] = useState<string | null>(null);

  // student info
  const [studentName, setStudentName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [guardianContact, setGuardianContact] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  // submission
  const [submitting, setSubmitting] = useState(false);
  const [bookingResult, setBookingResult] = useState<{ success: boolean; id?: string; error?: string } | null>(null);

  const ageNum = parseInt(age, 10);
  const isMinor = !isNaN(ageNum) && ageNum < 18;

  // Load data from Supabase
  useEffect(() => {
    (async () => {
      const [{ data: dData }, { data: tData }, { data: cData }] = await Promise.all([
        supabase.from('disciplines').select('*'),
        supabase.from('teachers').select('*'),
        supabase.from('classes').select('*'),
      ]);
      if (dData) setDbDisciplines(dData as DbDiscipline[]);
      if (tData) setDbTeachers(tData as DbTeacher[]);
      if (cData) setDbClasses(cData as DbClass[]);
    })();
  }, []);

  // Prefill from URL
  useEffect(() => {
    if (prefillDiscipline && dbDisciplines.length > 0) {
      const found = dbDisciplines.find((d) => d.id === prefillDiscipline);
      if (found) {
        setSelectedDisciplineId(found.id);
        if (step === 1) setStep(2);
      }
    }
    if (prefillTeacher && dbTeachers.length > 0) {
      const found = dbTeachers.find((t) => t.id === prefillTeacher);
      if (found) {
        // Find a class for this teacher
        const cls = dbClasses.find((c) => c.teacher_id === found.id);
        if (cls) {
          setSelectedDisciplineId(cls.discipline_id);
          setSelectedLevel(cls.level);
          setSelectedClassId(cls.id);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefillDiscipline, prefillTeacher, dbDisciplines, dbTeachers, dbClasses]);

  const selectedDiscipline = dbDisciplines.find((d) => d.id === selectedDisciplineId);
  const selectedClass = dbClasses.find((c) => c.id === selectedClassId);
  const selectedTeacher = dbTeachers.find((t) => t.id === selectedClass?.teacher_id);

  // Available levels for selected discipline
  const availableLevels = selectedDiscipline?.levels ?? [];

  // Classes matching discipline + level
  const matchingClasses = dbClasses.filter(
    (c) => c.discipline_id === selectedDisciplineId && c.level === selectedLevel
  );

  // Fetch available slots when date is selected
  const fetchSlots = useCallback(async () => {
    if (!selectedClass || !selectedDate) return;
    setSlotsLoading(true);
    setSlotsError(null);
    setAvailableSlots([]);
    setSelectedTime(null);

    try {
      const { data, error } = await supabase.rpc('get_available_slots', {
        p_teacher_id: selectedClass.teacher_id,
        p_room_id: selectedClass.room_id,
        p_booking_date: selectedDate,
        p_duration: selectedClass.duration,
      });

      if (error) throw error;
      const slots = (data as { slots: string[] })?.slots ?? [];
      setAvailableSlots(slots);
    } catch {
      setSlotsError('Could not load available times. Please try again.');
    } finally {
      setSlotsLoading(false);
    }
  }, [selectedClass, selectedDate]);

  useEffect(() => {
    if (step === 5 && selectedClass && selectedDate) {
      fetchSlots();
    }
  }, [step, selectedClass, selectedDate, fetchSlots]);

  const canProceed = (): boolean => {
    switch (step) {
      case 1: return !!selectedDisciplineId;
      case 2: return !!selectedLevel;
      case 3: return !!selectedClassId;
      case 4: return !!selectedDate;
      case 5: return !!selectedTime;
      case 6:
        if (!studentName.trim() || !email.trim() || !phone.trim() || !age) return false;
        if (isMinor && (!guardianName.trim() || !guardianContact.trim())) return false;
        return true;
      default: return false;
    }
  };

  const handleNext = () => {
    if (!canProceed()) return;
    if (step < 7) setStep((step + 1) as Step);
  };

  const handleBack = () => {
    if (step > 1) setStep((step - 1) as Step);
  };

  const handleReset = () => {
    setStep(1);
    setSelectedDisciplineId(null);
    setSelectedLevel(null);
    setSelectedClassId(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setStudentName('');
    setAge('');
    setEmail('');
    setPhone('');
    setGuardianName('');
    setGuardianContact('');
    setFormError(null);
    setBookingResult(null);
  };

  const handleSubmit = async () => {
    if (!canProceed() || !selectedClass || !selectedDate || !selectedTime) return;
    setFormError(null);
    setSubmitting(true);

    try {
      const { data, error } = await supabase.rpc('create_booking', {
        p_student_name: studentName.trim(),
        p_age: ageNum,
        p_email: email.trim(),
        p_phone: phone.trim(),
        p_parent_guardian_name: isMinor ? guardianName.trim() : null,
        p_parent_guardian_contact: isMinor ? guardianContact.trim() : null,
        p_discipline_id: selectedClass.discipline_id,
        p_class_id: selectedClass.id,
        p_teacher_id: selectedClass.teacher_id,
        p_room_id: selectedClass.room_id,
        p_booking_date: selectedDate,
        p_start_time: selectedTime,
        p_duration: selectedClass.duration,
      });

      if (error) throw error;

      const result = data as { id?: string; error?: string };
      if (result?.error) {
        setFormError(result.error);
      } else if (result?.id) {
        setBookingResult({ success: true, id: result.id });
        setStep(7);
      } else {
        setFormError('Something went wrong. Please try again.');
      }
    } catch {
      setFormError('Could not complete your booking. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Date helpers — generate next 28 days, filter to days the teacher works
  const getValidDates = (): { value: string; label: string; dayCode: string }[] => {
    if (!selectedClass) return [];
    const dates: { value: string; label: string; dayCode: string }[] = [];
    const today = new Date();
    for (let i = 1; i <= 28; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dayCode = dayNames[d.getDay()];
      if (dayCode === selectedClass.day) {
        const value = d.toISOString().split('T')[0];
        const label = d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
        dates.push({ value, label, dayCode });
      }
    }
    return dates;
  };

  const validDates = getValidDates();

  // Confirmation screen
  if (bookingResult?.success && step === 7) {
    return (
      <section className="relative flex min-h-screen items-center justify-center bg-ivory px-6 pt-32 pb-20 lg:px-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-ivory">
            <PartyPopper size={32} />
          </div>
          <h1 className="mt-8 font-display text-display-md font-extrabold text-mh-black">
            Booking Confirmed
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-stone">
            Your trial class is booked. We've saved your spot — see you on the floor.
          </p>

          <div className="mx-auto mt-10 max-w-md rounded-2xl border border-mh-black/10 bg-white/60 p-8 text-left">
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <User size={16} className="text-accent" />
                <span className="font-medium text-mh-black">{studentName}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-stone">
                <Calendar size={16} className="text-accent" />
                <span>
                  {selectedDate && new Date(selectedDate + 'T00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-stone">
                <Clock size={16} className="text-accent" />
                <span>{selectedTime} — {selectedClass?.duration} min</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-stone">
                <MapPin size={16} className="text-accent" />
                <span>{selectedClass?.room_name}</span>
              </div>
              <div className="border-t border-mh-black/10 pt-3 text-sm text-stone">
                <span className="font-semibold text-mh-black">{selectedDiscipline?.name}</span>
                {' — '}
                <span>{selectedLevel}</span>
                {' with '}
                <span>{selectedTeacher?.name}</span>
              </div>
            </div>
            <p className="mt-6 text-xs text-stone/60">
              Confirmation ref: {bookingResult.id?.slice(0, 8).toUpperCase()}
            </p>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide-sm text-ivory transition-colors hover:bg-accent-light"
            >
              Book Another Class
            </button>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-stone transition-colors hover:text-accent"
            >
              <ArrowLeft size={16} />
              Back to home
            </Link>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-ivory pt-32 pb-20">
      <div className="px-6 lg:px-10">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-10">
            <p className="text-xs font-semibold uppercase tracking-editorial text-accent">
              {prefillEvent ? 'Event reservation' : 'Booking wizard'}
            </p>
            <h1 className="mt-4 font-display text-display-lg font-extrabold text-mh-black text-balance">
              Prenota
            </h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-stone">
              Book a class in six quick steps. Pick your discipline, level, teacher,
              date, and time — then enter your details.
            </p>
          </div>

          {/* Progress bar */}
          <div className="mb-10 flex items-center gap-1 overflow-x-auto no-scrollbar">
            {stepLabels.map((label, i) => {
              const stepNum = (i + 1) as Step;
              const isActive = step === stepNum;
              const isDone = step > stepNum;
              return (
                <div key={label} className="flex shrink-0 items-center gap-1">
                  <div
                    className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wide-sm transition-all duration-300 ${
                      isActive
                        ? 'bg-accent text-ivory'
                        : isDone
                        ? 'bg-accent/10 text-accent'
                        : 'bg-mh-black/5 text-stone'
                    }`}
                  >
                    {isDone ? <Check size={12} /> : <span>{stepNum}</span>}
                    <span className="hidden sm:inline">{label}</span>
                  </div>
                  {i < stepLabels.length - 1 && (
                    <ChevronRight size={14} className="text-stone/40" />
                  )}
                </div>
              );
            })}
          </div>

          {/* Wizard content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Step 1: Discipline */}
              {step === 1 && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-mh-black">Choose your discipline</h2>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {(dbDisciplines.length > 0 ? dbDisciplines : disciplines.map((d) => ({ id: d.id, name: d.name, category: d.category, tagline: d.tagline, accent_color: d.accentColor, levels: d.levels, age_ranges: d.ageRanges, description: d.description, duration: d.duration, teachers: d.teachers, image: d.image } as DbDiscipline))).map((disc) => (
                      <button
                        key={disc.id}
                        onClick={() => {
                          setSelectedDisciplineId(disc.id);
                          setSelectedLevel(null);
                          setSelectedClassId(null);
                        }}
                        className={`group rounded-xl border-2 p-5 text-left transition-all duration-300 ${
                          selectedDisciplineId === disc.id
                            ? 'border-accent bg-accent/5'
                            : 'border-mh-black/10 bg-white/40 hover:border-mh-black/20'
                        }`}
                      >
                        <p className="text-xs font-semibold uppercase tracking-wide-sm text-accent">{disc.category}</p>
                        <h3 className="mt-2 font-display text-xl font-bold text-mh-black">{disc.name}</h3>
                        <p className="mt-1 text-sm text-stone">{disc.tagline}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Level */}
              {step === 2 && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-mh-black">
                    Select your level — <span className="text-accent">{selectedDiscipline?.name}</span>
                  </h2>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {availableLevels.map((level) => (
                      <button
                        key={level}
                        onClick={() => {
                          setSelectedLevel(level);
                          setSelectedClassId(null);
                        }}
                        className={`rounded-full border-2 px-6 py-3 text-sm font-semibold transition-all duration-300 ${
                          selectedLevel === level
                            ? 'border-accent bg-accent text-ivory'
                            : 'border-mh-black/10 bg-white/40 text-stone hover:border-mh-black/20'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Teacher / Class */}
              {step === 3 && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-mh-black">
                    Choose your class
                  </h2>
                  {matchingClasses.length === 0 ? (
                    <p className="mt-6 rounded-lg bg-mh-black/5 p-6 text-sm text-stone">
                      No scheduled classes found for {selectedDiscipline?.name} at {selectedLevel} level.
                      Try a different level or discipline.
                    </p>
                  ) : (
                    <div className="mt-6 space-y-3">
                      {matchingClasses.map((cls) => {
                        const teacher = dbTeachers.find((t) => t.id === cls.teacher_id);
                        return (
                          <button
                            key={cls.id}
                            onClick={() => setSelectedClassId(cls.id)}
                            className={`flex w-full items-center gap-4 rounded-xl border-2 p-5 text-left transition-all duration-300 ${
                              selectedClassId === cls.id
                                ? 'border-accent bg-accent/5'
                                : 'border-mh-black/10 bg-white/40 hover:border-mh-black/20'
                            }`}
                          >
                            {teacher?.image && (
                              <img src={teacher.image} alt={teacher.name} className="h-14 w-14 rounded-full object-cover" />
                            )}
                            <div className="flex-1">
                              <h3 className="font-display text-lg font-bold text-mh-black">{teacher?.name}</h3>
                              <p className="text-sm text-stone">{teacher?.role}</p>
                              <div className="mt-2 flex flex-wrap gap-3 text-xs text-stone">
                                <span className="flex items-center gap-1"><Calendar size={12} /> {dayLabelsFull[cls.day]}</span>
                                <span className="flex items-center gap-1"><Clock size={12} /> {cls.start_time}</span>
                                <span className="flex items-center gap-1"><MapPin size={12} /> {cls.room_name}</span>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Date */}
              {step === 4 && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-mh-black">Pick a date</h2>
                  <p className="mt-2 text-sm text-stone">
                    Available {dayLabelsFull[selectedClass?.day ?? '']}s for the next 4 weeks.
                  </p>
                  {validDates.length === 0 ? (
                    <p className="mt-6 rounded-lg bg-mh-black/5 p-6 text-sm text-stone">
                      No upcoming dates available for this class day.
                    </p>
                  ) : (
                    <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                      {validDates.map((d) => (
                        <button
                          key={d.value}
                          onClick={() => setSelectedDate(d.value)}
                          className={`rounded-xl border-2 p-4 text-center transition-all duration-300 ${
                            selectedDate === d.value
                              ? 'border-accent bg-accent text-ivory'
                              : 'border-mh-black/10 bg-white/40 text-stone hover:border-mh-black/20'
                          }`}
                        >
                          <span className="block font-display text-lg font-bold">{d.label.split(' ')[1]}</span>
                          <span className="block text-xs uppercase tracking-wide-sm">{d.label.split(' ')[0]} {d.label.split(' ')[2]}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Step 5: Time */}
              {step === 5 && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-mh-black">Choose a time</h2>
                  <p className="mt-2 text-sm text-stone">
                    Live availability for {selectedDate && new Date(selectedDate + 'T00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}.
                    Conflicts on room or teacher are automatically excluded.
                  </p>

                  {slotsLoading && (
                    <div className="mt-8 flex items-center gap-3 text-stone">
                      <Loader2 size={20} className="animate-spin" />
                      <span className="text-sm">Checking availability...</span>
                    </div>
                  )}

                  {slotsError && (
                    <div className="mt-6 flex items-center gap-3 rounded-lg bg-red-50 p-4 text-sm text-red-700">
                      <AlertCircle size={18} />
                      <span>{slotsError}</span>
                    </div>
                  )}

                  {!slotsLoading && !slotsError && availableSlots.length === 0 && (
                    <div className="mt-6 rounded-lg bg-mh-black/5 p-6 text-sm text-stone">
                      No available time slots for this date. Please pick another date.
                    </div>
                  )}

                  {!slotsLoading && availableSlots.length > 0 && (
                    <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
                      {availableSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={`rounded-xl border-2 p-4 text-center font-display text-lg font-bold transition-all duration-300 ${
                            selectedTime === slot
                              ? 'border-accent bg-accent text-ivory'
                              : 'border-mh-black/10 bg-white/40 text-mh-black hover:border-mh-black/20'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Step 6: Student info */}
              {step === 6 && (
                <div>
                  <h2 className="font-display text-2xl font-bold text-mh-black">Your details</h2>
                  <div className="mt-6 grid gap-5 sm:grid-cols-2">
                    <Field label="Student name" icon={<User size={16} />}>
                      <input
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        className="w-full rounded-lg border border-mh-black/15 bg-white/60 px-4 py-3 text-sm text-mh-black outline-none focus:border-accent"
                        placeholder="Full name"
                      />
                    </Field>
                    <Field label="Age" icon={<Calendar size={16} />}>
                      <input
                        type="number"
                        min="0"
                        max="120"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="w-full rounded-lg border border-mh-black/15 bg-white/60 px-4 py-3 text-sm text-mh-black outline-none focus:border-accent"
                        placeholder="Age"
                      />
                    </Field>
                    <Field label="Email" icon={<Mail size={16} />}>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-lg border border-mh-black/15 bg-white/60 px-4 py-3 text-sm text-mh-black outline-none focus:border-accent"
                        placeholder="email@example.com"
                      />
                    </Field>
                    <Field label="Phone" icon={<Phone size={16} />}>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full rounded-lg border border-mh-black/15 bg-white/60 px-4 py-3 text-sm text-mh-black outline-none focus:border-accent"
                        placeholder="+39 ..."
                      />
                    </Field>
                  </div>

                  {/* Conditional guardian fields */}
                  {isMinor && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.3 }}
                      className="mt-6"
                    >
                      <div className="mb-4 flex items-center gap-2 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">
                        <AlertCircle size={16} />
                        <span>Parent/guardian details are required for students under 18.</span>
                      </div>
                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field label="Parent/guardian name" icon={<User size={16} />}>
                          <input
                            type="text"
                            value={guardianName}
                            onChange={(e) => setGuardianName(e.target.value)}
                            className="w-full rounded-lg border border-mh-black/15 bg-white/60 px-4 py-3 text-sm text-mh-black outline-none focus:border-accent"
                            placeholder="Guardian full name"
                          />
                        </Field>
                        <Field label="Parent/guardian contact" icon={<Phone size={16} />}>
                          <input
                            type="text"
                            value={guardianContact}
                            onChange={(e) => setGuardianContact(e.target.value)}
                            className="w-full rounded-lg border border-mh-black/15 bg-white/60 px-4 py-3 text-sm text-mh-black outline-none focus:border-accent"
                            placeholder="Phone or email"
                          />
                        </Field>
                      </div>
                    </motion.div>
                  )}

                  {/* Summary */}
                  <div className="mt-8 rounded-xl border border-mh-black/10 bg-white/40 p-6">
                    <p className="text-xs font-semibold uppercase tracking-wide-sm text-accent">Booking summary</p>
                    <div className="mt-3 grid gap-2 text-sm text-stone sm:grid-cols-2">
                      <span><strong className="text-mh-black">{selectedDiscipline?.name}</strong> — {selectedLevel}</span>
                      <span>With {selectedTeacher?.name}</span>
                      <span>{selectedDate && new Date(selectedDate + 'T00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                      <span>{selectedTime} ({selectedClass?.duration} min)</span>
                      <span>{selectedClass?.room_name}</span>
                    </div>
                  </div>

                  {formError && (
                    <div className="mt-6 flex items-center gap-3 rounded-lg bg-red-50 p-4 text-sm text-red-700">
                      <AlertCircle size={18} />
                      <span>{formError}</span>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="mt-10 flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className="inline-flex items-center gap-2 text-sm font-medium text-stone transition-colors hover:text-accent disabled:opacity-30 disabled:hover:text-stone"
            >
              <ArrowLeft size={16} />
              Back
            </button>

            {step < 6 ? (
              <button
                onClick={handleNext}
                disabled={!canProceed()}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold uppercase tracking-wide-sm text-ivory transition-all duration-300 hover:bg-accent-light disabled:opacity-30"
              >
                Continue
                <ArrowRight size={16} />
              </button>
            ) : step === 6 ? (
              <button
                onClick={handleSubmit}
                disabled={!canProceed() || submitting}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-3.5 text-sm font-semibold uppercase tracking-wide-sm text-ivory transition-all duration-300 hover:bg-accent-light disabled:opacity-30"
              >
                {submitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Booking...
                  </>
                ) : (
                  <>
                    <Check size={16} />
                    Confirm Booking
                  </>
                )}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, icon, children }: { label: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide-sm text-stone">
        {icon}
        {label}
      </label>
      {children}
    </div>
  );
}
