import { AnimatePresence, motion } from 'framer-motion';
import { useGameStore } from '@/features/game/store/gameStore';
import { CheckCircle2, AlertTriangle, Info, Trophy } from 'lucide-react';

const iconFor = (type: string) => {
  if (type === 'success') return <CheckCircle2 className="text-emerald-400" size={22} />;
  if (type === 'danger') return <AlertTriangle className="text-rose-400" size={22} />;
  if (type === 'achievement') return <Trophy className="text-yellow-300" size={22} />;
  return <Info className="text-cyan-300" size={22} />;
};

export const ToastStack = () => {
  const toasts = useGameStore((s) => s.toasts);
  const dismiss = useGameStore((s) => s.dismissToast);
  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-50 flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.95 }}
            className="pointer-events-auto flex max-w-sm items-start gap-3 rounded-2xl border border-white/10 bg-ink-700/90 p-3 shadow-glow backdrop-blur"
          >
            {iconFor(t.type)}
            <div className="flex-1">
              <div className="text-sm font-semibold text-white">{t.title}</div>
              {t.description && <div className="mt-0.5 text-xs text-white/70">{t.description}</div>}
            </div>
            <button
              type="button"
              onClick={() => dismiss(t.id)}
              className="text-xs text-white/50 hover:text-white"
            >
              ✕
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
