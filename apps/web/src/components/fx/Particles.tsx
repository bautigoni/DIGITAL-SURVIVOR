import { useEffect, useState } from 'react';

export const Particles = () => {
  const [items, setItems] = useState<
    Array<{ x: number; y: number; s: number; d: number; c: string }>
  >([]);
  useEffect(() => {
    const colors = ['#ff2e88', '#22e3ff', '#fde047', '#a855f7', '#34d399'];
    setItems(
      Array.from({ length: 24 }, () => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        s: Math.random() * 2 + 1,
        d: Math.random() * 6 + 4,
        c: colors[Math.floor(Math.random() * colors.length)]!,
      })),
    );
  }, []);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((it, i) => (
        <span
          key={i}
          className="absolute block animate-floaty rounded-full"
          style={{
            top: `${it.y}%`,
            left: `${it.x}%`,
            width: it.s,
            height: it.s,
            background: it.c,
            boxShadow: `0 0 8px ${it.c}`,
            animationDuration: `${it.d}s`,
          }}
        />
      ))}
    </div>
  );
};
