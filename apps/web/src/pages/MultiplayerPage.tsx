import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Trophy, Users, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const ranking = [
  { name: 'LunaSky', score: 4820, avatar: '🌙' },
  { name: 'Prof. Medina', score: 4650, avatar: '🧑‍🏫' },
  { name: 'Inés Biotech', score: 4210, avatar: '💼' },
  { name: 'Vos', score: 3990, avatar: '🛡️' },
];

const events = [
  { id: 'w1', title: 'Phishing Fridays', starts: 'Vie 19:00', mode: 'Survival cooperativo' },
  { id: 'w2', title: 'Deepfake Showdown', starts: 'Sáb 21:00', mode: 'Competitivo · 1v1' },
];

export const MultiplayerPage = () => {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="flex items-center gap-2 font-display text-3xl font-bold">
          <Users className="text-purple-300" /> Multijugador
        </h1>
        <p className="text-white/60">
          Eventos semanales cooperativos y competitivos con ranking global.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <div className="mb-3 flex items-center gap-2 font-semibold">
            <Calendar size={16} /> Próximos eventos
          </div>
          <ul className="space-y-2">
            {events.map((e) => (
              <li
                key={e.id}
                className="flex items-center justify-between rounded-xl bg-white/5 p-3"
              >
                <div>
                  <div className="font-semibold">{e.title}</div>
                  <div className="text-xs text-white/50">
                    {e.mode} · {e.starts}
                  </div>
                </div>
                <Button size="sm">Inscribirse</Button>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-5">
          <div className="mb-3 flex items-center gap-2 font-semibold">
            <Trophy size={16} className="text-yellow-300" /> Ranking semanal
          </div>
          <ol className="space-y-2">
            {ranking.map((r, i) => (
              <motion.li
                key={r.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between rounded-xl bg-white/5 p-3"
              >
                <div className="flex items-center gap-3">
                  <span className="w-5 text-center font-mono text-white/50">{i + 1}</span>
                  <span className="text-2xl">{r.avatar}</span>
                  <span className="font-semibold">{r.name}</span>
                </div>
                <span className="font-mono text-white/80">{r.score.toLocaleString()}</span>
              </motion.li>
            ))}
          </ol>
        </Card>
      </div>
    </div>
  );
};
