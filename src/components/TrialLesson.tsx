import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  Calendar,
  Check,
  Loader2,
  AlertCircle,
  PartyPopper,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { disciplines } from '@/data/disciplines';

const days = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
const dayLabels: Record<string, string> = {
  Lun: 'Lunedì',
  Mar: 'Martedì',
  Mer: 'Mercoledì',
  Gio: 'Giovedì',
  Ven: 'Venerdì',
  Sab: 'Sabato',
};

export function TrialLesson() {
  const [studentName, setStudentName] = useState('');
  const [age, setAge] = useState('');
  const [danceStyle, setDanceStyle] = useState('');
  const [experience, setExperience] = useState('');
  const [preferredDay, setPreferredDay] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [guardianName, setGuardianName] = useState('');
  const [guardianContact, setGuardianContact] = useState('');

  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ success: boolean; error?: string } | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const ageNum = parseInt(age, 10);
  const isMinor = !isNaN(ageNum) && ageNum < 18;

  const canSubmit = (): boolean => {
    if (!studentName.trim() || !age || !danceStyle || !email.trim() || !phone.trim()) return false;
    if (isMinor && (!guardianName.trim() || !guardianContact.trim())) return false;
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit()) {
      setFormError('Please fill in all required fields.');
      return;
    }
    setFormError(null);
    setSubmitting(true);

    try {
      const { error } = await supabase.from('trial_requests').insert({
        student_name: studentName.trim(),
        age: ageNum,
        dance_style: danceStyle,
        experience: experience.trim() || null,
        preferred_day: preferredDay || null,
        parent_guardian_name: isMinor ? guardianName.trim() : null,
        parent_guardian_contact: isMinor ? guardianContact.trim() : null,
        email: email.trim(),
        phone: phone.trim(),
      });

      if (error) {
        if (error.code === '23514' || error.message?.includes('guardian')) {
          setResult({ success: false, error: 'Parent/guardian details are required for students under 18.' });
        } else {
          setResult({ success: false, error: 'Could not submit your request. Please try again.' });
        }
      } else {
        setResult({ success: true });
      }
    } catch {
      setResult({ success: false, error: 'Something went wrong. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setStudentName('');
    setAge('');
    setDanceStyle('');
    setExperience('');
    setPreferredDay('');
    setEmail('');
    setPhone('');
    setGuardianName('');
    setGuardianContact('');
    setResult(null);
    setFormError(null);
  };

  return (
    <section className="relative overflow-hidden bg-mh-black py-32 text-ivory lg:py-48">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <div className="mb-12">
          <p className="text-xs font-semibold uppercase tracking-editorial text-accent">
            Trial lesson
          </p>
          <h2 className="mt-6 font-display text-display-lg font-extrabold text-ivory text-balance">
            Your first step onto the floor.
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ivory/60">
            New to Movement House? Book a free trial lesson and discover the discipline
            that moves you. Tell us a bit about yourself and we'll find the right class.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {result?.success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-2xl border border-ivory/10 bg-ivory/5 p-10 text-center"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent text-ivory">
                <PartyPopper size={32} />
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold text-ivory">
                Request Received
              </h3>
              <p className="mt-3 text-base text-ivory/60">
                Thank you, {studentName.split(' ')[0]}. We'll contact you at {email} within
                48 hours to arrange your trial lesson.
              </p>
              <button
                onClick={handleReset}
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-ivory/20 px-6 py-3 text-sm font-semibold uppercase tracking-wide-sm text-ivory transition-colors hover:bg-ivory/10"
              >
                Submit Another Request
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label="Student name" icon={<User size={16} />} required>
                  <input
                    type="text"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="w-full rounded-lg border border-ivory/15 bg-ivory/5 px-4 py-3 text-sm text-ivory placeholder-ivory/30 outline-none focus:border-accent"
                    placeholder="Full name"
                  />
                </FormField>
                <FormField label="Age" icon={<Calendar size={16} />} required>
                  <input
                    type="number"
                    min="0"
                    max="120"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full rounded-lg border border-ivory/15 bg-ivory/5 px-4 py-3 text-sm text-ivory placeholder-ivory/30 outline-none focus:border-accent"
                    placeholder="Age"
                  />
                </FormField>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label="Dance style" required>
                  <select
                    value={danceStyle}
                    onChange={(e) => setDanceStyle(e.target.value)}
                    className="w-full rounded-lg border border-ivory/15 bg-ivory/5 px-4 py-3 text-sm text-ivory outline-none focus:border-accent"
                  >
                    <option value="" className="bg-graphite">Select a style...</option>
                    {disciplines.map((d) => (
                      <option key={d.id} value={d.name} className="bg-graphite">{d.name}</option>
                    ))}
                  </select>
                </FormField>
                <FormField label="Preferred day">
                  <select
                    value={preferredDay}
                    onChange={(e) => setPreferredDay(e.target.value)}
                    className="w-full rounded-lg border border-ivory/15 bg-ivory/5 px-4 py-3 text-sm text-ivory outline-none focus:border-accent"
                  >
                    <option value="" className="bg-graphite">Any day</option>
                    {days.map((d) => (
                      <option key={d} value={d} className="bg-graphite">{dayLabels[d]}</option>
                    ))}
                  </select>
                </FormField>
              </div>

              <FormField label="Experience level">
                <input
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full rounded-lg border border-ivory/15 bg-ivory/5 px-4 py-3 text-sm text-ivory placeholder-ivory/30 outline-none focus:border-accent"
                  placeholder="e.g. Beginner, 2 years of ballet, etc."
                />
              </FormField>

              <div className="grid gap-5 sm:grid-cols-2">
                <FormField label="Email" icon={<Mail size={16} />} required>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-ivory/15 bg-ivory/5 px-4 py-3 text-sm text-ivory placeholder-ivory/30 outline-none focus:border-accent"
                    placeholder="email@example.com"
                  />
                </FormField>
                <FormField label="Phone" icon={<Phone size={16} />} required>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-lg border border-ivory/15 bg-ivory/5 px-4 py-3 text-sm text-ivory placeholder-ivory/30 outline-none focus:border-accent"
                    placeholder="+39 ..."
                  />
                </FormField>
              </div>

              {isMinor && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <div className="flex items-center gap-2 rounded-lg bg-amber-500/10 px-4 py-3 text-sm text-amber-400">
                    <AlertCircle size={16} />
                    <span>Parent/guardian details are required for students under 18.</span>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <FormField label="Parent/guardian name" icon={<User size={16} />} required>
                      <input
                        type="text"
                        value={guardianName}
                        onChange={(e) => setGuardianName(e.target.value)}
                        className="w-full rounded-lg border border-ivory/15 bg-ivory/5 px-4 py-3 text-sm text-ivory placeholder-ivory/30 outline-none focus:border-accent"
                        placeholder="Guardian full name"
                      />
                    </FormField>
                    <FormField label="Parent/guardian contact" icon={<Phone size={16} />} required>
                      <input
                        type="text"
                        value={guardianContact}
                        onChange={(e) => setGuardianContact(e.target.value)}
                        className="w-full rounded-lg border border-ivory/15 bg-ivory/5 px-4 py-3 text-sm text-ivory placeholder-ivory/30 outline-none focus:border-accent"
                        placeholder="Phone or email"
                      />
                    </FormField>
                  </div>
                </motion.div>
              )}

              {formError && (
                <div className="flex items-center gap-3 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  <AlertCircle size={18} />
                  <span>{formError}</span>
                </div>
              )}

              {result?.error && (
                <div className="flex items-center gap-3 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  <AlertCircle size={18} />
                  <span>{result.error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting || !canSubmit()}
                className="inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 text-sm font-semibold uppercase tracking-wide-sm text-ivory transition-all duration-300 hover:bg-accent-light disabled:opacity-30"
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Check size={18} />
                    Request Trial Lesson
                  </>
                )}
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function FormField({
  label,
  icon,
  required,
  children,
}: {
  label: string;
  icon?: React.ReactNode;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide-sm text-ivory/50">
        {icon}
        {label}
        {required && <span className="text-accent">*</span>}
      </label>
      {children}
    </div>
  );
}
