import { Link, NavLink, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { brand } from '@/data/brand';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Discipline', path: '/discipline' },
  { label: 'Insegnanti', path: '/insegnanti' },
  { label: 'Orari', path: '/orari' },
  { label: 'Eventi', path: '/eventi' },
  { label: 'Contatti', path: '/contatti' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Home page has a dark hero — navbar text stays light at top.
  // All other pages have a light background — navbar needs dark text at top.
  const isDarkHero = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const dark = scrolled || !isDarkHero;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-smooth-out ${
          scrolled
            ? 'bg-mh-black/90 backdrop-blur-md py-4'
            : isDarkHero
            ? 'bg-transparent py-6'
            : 'bg-ivory/80 backdrop-blur-md py-4'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link
            to="/"
            className={`font-display text-xl font-extrabold tracking-editorial transition-opacity hover:opacity-80 ${
              dark ? 'text-mh-black' : 'text-ivory'
            }`}
          >
            {brand.name}
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide-sm uppercase transition-colors duration-300 ${
                    isActive
                      ? 'text-accent'
                      : dark
                      ? 'text-mh-black/70 hover:text-mh-black'
                      : 'text-ivory/80 hover:text-ivory'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/prenota"
              className="rounded-full border border-accent bg-accent px-6 py-2.5 text-sm font-semibold uppercase tracking-wide-sm text-ivory transition-all duration-300 hover:bg-accent-light hover:border-accent-light"
            >
              Book a Trial
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className={`lg:hidden ${dark ? 'text-mh-black' : 'text-ivory'}`}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] flex flex-col bg-graphite lg:hidden"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="font-display text-xl font-extrabold tracking-editorial text-ivory">
                {brand.name}
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="text-ivory"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-1 flex-col justify-center gap-2 px-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `block py-3 font-display text-3xl font-bold transition-colors ${
                        isActive ? 'text-accent' : 'text-ivory hover:text-accent'
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-6"
              >
                <Link
                  to="/prenota"
                  className="inline-block rounded-full bg-accent px-8 py-3 text-base font-semibold uppercase tracking-wide-sm text-ivory"
                >
                  Book a Trial
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
