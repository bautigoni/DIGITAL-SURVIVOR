import { NavLink, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Gamepad2, GraduationCap, BookOpen, Swords, Users } from 'lucide-react';
import { sound } from '@/lib/sound';
import { useState } from 'react';
import { cn } from '@/lib/cn';

const links = [
  { to: '/play', label: 'Jugar', icon: Gamepad2 },
  { to: '/story', label: 'Historia', icon: BookOpen },
  { to: '/survival', label: 'Supervivencia', icon: Swords },
  { to: '/school', label: 'Escuela', icon: GraduationCap },
  { to: '/multiplayer', label: 'Multijugador', icon: Users },
];

export const Header = () => {
  const [muted, setMuted] = useState(sound.isMuted());
  const toggle = () => {
    sound.init();
    const next = !muted;
    sound.setMuted(next);
    setMuted(next);
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ink-900/70 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <motion.div
            initial={{ rotate: -10, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-neon-pink to-neon-cyan shadow-glow"
          >
            <span className="font-display text-lg font-bold text-ink-900">DS</span>
          </motion.div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold tracking-tight">
              <span className="neon-text">Digital</span> Survivor
            </span>
            <span className="text-[10px] uppercase tracking-widest text-white/40">
              RPG de supervivencia en Internet
            </span>
          </div>
        </Link>

        <nav className="ml-4 hidden flex-1 items-center gap-1 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                cn(
                  'group flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-white/10 text-white shadow-inner'
                    : 'text-white/60 hover:bg-white/5 hover:text-white',
                )
              }
            >
              <l.icon size={14} /> {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={toggle}
            className="rounded-lg p-2 text-white/60 transition-colors hover:bg-white/5 hover:text-white"
            aria-label="Sonido"
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
          <Link to="/play" className="btn-primary text-sm">
            Jugar ahora
          </Link>
        </div>
      </div>
    </header>
  );
};
