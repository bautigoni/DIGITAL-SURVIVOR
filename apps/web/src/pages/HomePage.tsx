import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Brain, Sparkles, Trophy, Gamepad2, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Particles } from '@/components/fx/Particles';
import { ZONES, ACHIEVEMENTS, STAT_KEYS, STAT_LABELS } from '@ds/shared';

export const HomePage = () => {
  return (
    <div className="space-y-16">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-ink-700 via-ink-800 to-ink-900 p-8 md:p-14">
        <Particles />
        <div className="relative grid items-center gap-10 md:grid-cols-2">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="chip mb-4 border-neon-pink/40 text-neon-pink"
            >
              <Sparkles size={12} /> Nuevo · Modo Escuela disponible
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="font-display text-5xl font-bold leading-[1.05] md:text-7xl"
            >
              Sobreviví a <span className="neon-text">Internet</span>.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-4 max-w-xl text-lg text-white/70"
            >
              Un RPG donde aprendés a defenderte de phishing, fake news, deepfakes y más…
              <span className="text-white"> sin clases teóricas. </span>
              Tomando decisiones, equivocándote y subiendo de nivel.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <Link to="/play">
                <Button size="lg" iconLeft={<Gamepad2 size={18} />}>
                  Empezar a jugar
                </Button>
              </Link>
              <Link to="/school">
                <Button size="lg" variant="ghost" iconLeft={<GraduationCap size={18} />}>
                  Soy docente
                </Button>
              </Link>
            </motion.div>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { icon: <Shield size={16} className="text-cyan-300" />, label: '6 zonas' },
                { icon: <Brain size={16} className="text-purple-300" />, label: '11 amenazas' },
                { icon: <Trophy size={16} className="text-yellow-300" />, label: '12 logros' },
              ].map((f) => (
                <div key={f.label} className="panel flex items-center gap-2 p-3 text-sm">
                  {f.icon} {f.label}
                </div>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="comic-border rounded-3xl p-1">
              <div className="rounded-[1.4rem] bg-ink-900 p-6">
                <div className="mb-3 flex items-center gap-2 text-xs text-white/50">
                  <span className="h-2 w-2 rounded-full bg-rose-400" /> Live preview
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                  <div className="text-xs text-white/50">Mensaje recibido</div>
                  <div className="mt-1 text-lg">
                    &ldquo;¡Ganaste un iPhone 16! Reclamalo acá 👇&rdquo;
                  </div>
                  <div className="mt-3 grid gap-2">
                    {['Abrir el link', 'Ignorar y bloquear', 'Reportar y verificar'].map((c, i) => (
                      <div
                        key={c}
                        className={`rounded-xl border-2 p-2 text-sm ${i === 2 ? 'border-emerald-400/50 text-emerald-200' : 'border-white/10 text-white/80'}`}
                      >
                        {c} {i === 2 && '✓'}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-3 text-xs text-white/40">
                  Cada decisión cambia tus stats en tiempo real.
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section>
        <h2 className="font-display text-3xl font-bold">Tus 7 estadísticas</h2>
        <p className="mt-1 text-white/60">
          Cada decisión es un trade-off. Administrá tu identidad digital como un RPG real.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
          {STAT_KEYS.map((k) => (
            <div key={k} className="panel p-3 text-center">
              <div className="text-xs uppercase tracking-widest text-white/50">
                {STAT_LABELS[k]}
              </div>
              <div className="mt-1 font-mono text-2xl font-bold text-white">?</div>
            </div>
          ))}
        </div>
      </section>

      {/* ZONAS */}
      <section>
        <h2 className="font-display text-3xl font-bold">El mundo es Internet</h2>
        <p className="mt-1 text-white/60">6 zonas con biomas y amenazas únicas.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Object.values(ZONES).map((z, i) => (
            <div key={z.id} className="panel relative overflow-hidden p-5">
              <div
                className="absolute -right-10 -top-10 h-40 w-40 rounded-full blur-3xl"
                style={{ background: z.palette.primary, opacity: 0.18 }}
              />
              <div className="relative">
                <div className="text-xs uppercase tracking-widest text-white/50">Zona {i + 1}</div>
                <h3 className="mt-1 text-xl font-bold" style={{ color: z.palette.primary }}>
                  {z.name}
                </h3>
                <p className="mt-1 text-sm text-white/70">{z.tagline}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {z.threats.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* LOGROS */}
      <section>
        <h2 className="font-display text-3xl font-bold">Logros desbloqueables</h2>
        <p className="mt-1 text-white/60">
          Reflejan hábitos digitales saludables, no horas de juego.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {ACHIEVEMENTS.map((a) => (
            <div key={a.id} className="panel p-4">
              <div className="text-3xl">{a.icon}</div>
              <div className="mt-1 font-semibold">{a.name}</div>
              <div className="text-xs text-white/60">{a.description}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
