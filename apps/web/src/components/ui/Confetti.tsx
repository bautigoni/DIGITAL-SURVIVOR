import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

interface ConfettiProps {
  show: boolean;
  count?: number;
}

const COLORS = ['#ff2e88', '#22e3ff', '#fde047', '#a855f7', '#34d399'];

export const Confetti = ({ show, count = 30 }: ConfettiProps) => {
  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        delay: Math.random() * 0.2,
        color: COLORS[i % COLORS.length]!,
        rotate: Math.random() * 360,
      })),
    [count],
  );

  useEffect(() => {
    // noop; animation handled by framer-motion
  }, [show]);

  if (!show) return null;
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{ y: -20, x: `${p.x}vw`, rotate: 0, opacity: 1 }}
          animate={{ y: '110vh', rotate: p.rotate + 720, opacity: 0 }}
          transition={{ duration: 2.4, delay: p.delay, ease: 'easeIn' }}
          className="absolute h-2 w-3"
          style={{ background: p.color, borderRadius: 2 }}
        />
      ))}
    </div>
  );
};
