import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { brand } from '@/data/brand';

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-mh-black">
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://images.pexels.com/photos/24408956/pexels-photo-24408956.jpeg?auto=compress&cs=tinysrgb&w=1920"
          onCanPlay={() => setVideoReady(true)}
        >
          {/* Royalty-free placeholder — swappable. Replace src with academy footage. */}
          <source
            src="https://cdn.coverr.co/videos/coverr-a-woman-dancing-in-a-studio-2833/1080p.mp4"
            type="video/mp4"
          />
        </video>

        <div
          className={`absolute inset-0 transition-opacity duration-1000 ${
            videoReady ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <img
            src="https://images.pexels.com/photos/24408956/pexels-photo-24408956.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Silhouette of a dancer with arms extended in a dramatic studio setting"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-mh-black/50 via-mh-black/30 to-mh-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-mh-black/60 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 flex h-full flex-col justify-center px-6 lg:px-10">
        <div className="mx-auto w-full max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 text-sm font-medium uppercase tracking-editorial text-ivory/70"
          >
            {brand.tagline}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-display-xl font-extrabold leading-[0.95] text-ivory text-balance"
          >
            EVERY BODY
            <br />
            HAS A LANGUAGE.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-ivory/80 lg:text-xl"
          >
            Classical. Contemporary. Urban. Your movement starts here.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <Link
              to="/discipline"
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-ivory px-8 py-4 text-sm font-semibold uppercase tracking-wide-sm text-mh-black transition-all duration-300 hover:bg-accent hover:text-ivory"
            >
              Explore Classes
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
            <Link
              to="/prenota"
              className="group inline-flex items-center justify-center gap-3 rounded-full border border-ivory/30 px-8 py-4 text-sm font-semibold uppercase tracking-wide-sm text-ivory transition-all duration-300 hover:border-ivory hover:bg-ivory/10"
            >
              <Calendar size={18} />
              Book a Trial
            </Link>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-ivory/50">
          <span className="text-xs uppercase tracking-editorial">Scroll</span>
          <div className="h-12 w-px bg-gradient-to-b from-ivory/50 to-transparent" />
        </div>
      </motion.div>
    </section>
  );
}
