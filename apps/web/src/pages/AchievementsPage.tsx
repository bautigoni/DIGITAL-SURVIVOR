import { ACHIEVEMENTS } from '@ds/shared';
import { usePlayerStore } from '@/features/rpg/store/playerStore';
import { motion } from 'framer-motion';

export const AchievementsPage = () => {
  const unlocked = usePlayerStore((s) => s.achievements);
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold">Logros</h1>
        <p className="text-white/60">Reflejan hábitos digitales saludables, no horas de juego.</p>
      </header>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {ACHIEVEMENTS.map((a) => {
          const isUnlocked = unlocked.includes(a.id);
          return (
            <motion.div
              key={a.id}
              layout
              className={`panel p-4 transition ${isUnlocked ? 'shadow-glow' : 'opacity-60'}`}
            >
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-2xl">
                  {a.icon}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{a.name}</div>
                  <div className="text-xs text-white/60">{a.description}</div>
                </div>
                {isUnlocked && <span className="chip border-emerald-400/40 text-emerald-300">✓</span>}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
