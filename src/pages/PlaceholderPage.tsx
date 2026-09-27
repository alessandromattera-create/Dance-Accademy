import { motion } from 'framer-motion';

interface PlaceholderPageProps {
  title: string;
  subtitle: string;
  description: string;
}

export function PlaceholderPage({ title, subtitle, description }: PlaceholderPageProps) {
  return (
    <section className="relative flex min-h-screen items-center justify-center bg-ivory px-6 pt-32 pb-20 lg:px-10">
      <div className="mx-auto max-w-3xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs font-semibold uppercase tracking-editorial text-accent"
        >
          {subtitle}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-display text-display-lg font-extrabold text-mh-black text-balance"
        >
          {title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-stone"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mx-auto mt-16 h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-6 text-sm uppercase tracking-editorial text-stone/60"
        >
          More coming soon
        </motion.p>
      </div>
    </section>
  );
}
