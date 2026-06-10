import { useNavigate } from 'react-router-dom';
import { ZONE_IDS, ZONES, type ZoneId } from '@ds/shared';
import { ZoneCard } from '@/features/zones/components/ZoneCard';
import { usePlayerStore } from '@/features/rpg/store/playerStore';
import { StatsHud } from '@/features/rpg/components/StatsHud';
import { motion } from 'framer-motion';
import { sound } from '@/lib/sound';

export const WorldMapPage = () => {
  const nav = useNavigate();
  const { level, stats, xp, setZone, currentZone } = usePlayerStore();

  const handleSelect = (id: ZoneId) => {
    sound.init();
    sound.click();
    setZone(id);
    nav('/story');
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
          <h1 className="font-display text-4xl font-bold">
            El mapa de <span className="neon-text">Internet</span>
          </h1>
          <p className="mt-1 text-white/60">
            Elegí una zona. Las primeras dos están disponibles; el resto se desbloquea con nivel.
          </p>
        </motion.div>
        <div className="grid gap-4 md:grid-cols-2">
          {ZONE_IDS.map((id, i) => (
            <ZoneCard
              key={id}
              zoneId={id}
              unlocked={level >= ZONES[id].unlockLevel}
              onSelect={handleSelect}
              index={i}
            />
          ))}
        </div>
      </div>
      <aside className="space-y-4">
        <StatsHud stats={stats} level={level} xp={xp} />
        <div className="panel p-4 text-sm text-white/70">
          <div className="mb-1 text-xs uppercase tracking-widest text-white/50">Consejo</div>
          Las zonas más oscuras (AI District, Dark Network) requieren nivel avanzado y racha de
          buenas decisiones.
        </div>
        <div className="panel p-4 text-sm text-white/70">
          <div className="mb-1 text-xs uppercase tracking-widest text-white/50">Zona actual</div>
          <div className="font-semibold text-white">
            {ZONES[currentZone as ZoneId]?.name ?? '—'}
          </div>
        </div>
      </aside>
    </div>
  );
};
