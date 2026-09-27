import { Link } from 'react-router-dom';
import { Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { brand } from '@/data/brand';

export function Footer() {
  return (
    <footer className="bg-mh-black text-ivory">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <h2 className="font-display text-4xl font-extrabold tracking-editorial lg:text-5xl">
              {brand.name}
            </h2>
            <p className="mt-4 max-w-sm font-display text-lg italic text-ivory/70">
              {brand.tagline}
            </p>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-ivory/60">
              Classical. Contemporary. Urban. Your movement starts here — a space
              where every body finds its language.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-editorial text-accent">
              Contact
            </h3>
            <ul className="mt-6 space-y-4 text-sm text-ivory/70">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-stone" />
                <span>{brand.contact.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0 text-stone" />
                <a
                  href={`tel:${brand.contact.phone.replace(/\s/g, '')}`}
                  className="transition-colors hover:text-ivory"
                >
                  {brand.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0 text-stone" />
                <a
                  href={`mailto:${brand.contact.email}`}
                  className="transition-colors hover:text-ivory"
                >
                  {brand.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Instagram size={16} className="shrink-0 text-stone" />
                <a
                  href={brand.contact.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-ivory"
                >
                  {brand.contact.instagram}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-editorial text-accent">
              Opening Hours
            </h3>
            <ul className="mt-6 space-y-2 text-sm text-ivory/70">
              {brand.hours.map((entry) => (
                <li key={entry.day} className="flex justify-between gap-4">
                  <span className="font-medium text-ivory/80">{entry.day}</span>
                  <span className="text-ivory/60">{entry.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-ivory/10 pt-8 text-xs text-ivory/40 sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="/discipline" className="transition-colors hover:text-ivory/70">
              Discipline
            </Link>
            <Link to="/prenota" className="transition-colors hover:text-ivory/70">
              Book a Trial
            </Link>
            <Link to="/contatti" className="transition-colors hover:text-ivory/70">
              Contatti
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
