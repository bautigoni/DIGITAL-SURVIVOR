import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { GraduationCap, Users, BarChart3, KeyRound } from 'lucide-react';
import { useState } from 'react';

const mock = {
  totalStudents: 28,
  totalDecisions: 412,
  averageScore: 73,
  commonMistakes: [
    { eventId: 'evt_news_clickbait', count: 18 },
    { eventId: 'evt_gaming_robux', count: 12 },
    { eventId: 'evt_shop_airpods', count: 9 },
  ],
};

export const SchoolPage = () => {
  const [code, setCode] = useState('');

  return (
    <div className="space-y-6">
      <header>
        <h1 className="flex items-center gap-2 font-display text-3xl font-bold">
          <GraduationCap className="text-cyan-300" /> Modo Escuela
        </h1>
        <p className="text-white/60">
          Panel para docentes. Mirá el progreso, los errores comunes y diseñá campañas.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-5">
          <Users className="text-cyan-300" />
          <div className="mt-2 text-3xl font-bold">{mock.totalStudents}</div>
          <div className="text-xs uppercase tracking-widest text-white/50">Estudiantes</div>
        </Card>
        <Card className="p-5">
          <BarChart3 className="text-purple-300" />
          <div className="mt-2 text-3xl font-bold">{mock.totalDecisions}</div>
          <div className="text-xs uppercase tracking-widest text-white/50">Decisiones totales</div>
        </Card>
        <Card className="p-5">
          <KeyRound className="text-yellow-300" />
          <div className="mt-2 text-3xl font-bold">{mock.averageScore}</div>
          <div className="text-xs uppercase tracking-widest text-white/50">Puntaje promedio</div>
        </Card>
      </div>

      <Card className="p-5">
        <div className="mb-3 font-semibold">Errores más comunes</div>
        <ul className="space-y-2 text-sm">
          {mock.commonMistakes.map((m) => (
            <li key={m.eventId} className="flex items-center justify-between rounded-lg bg-white/5 p-2">
              <span className="font-mono text-white/70">{m.eventId}</span>
              <span className="text-rose-300">{m.count} caídas</span>
            </li>
          ))}
        </ul>
      </Card>

      <Card className="p-5">
        <div className="mb-2 font-semibold">Unirse a un aula</div>
        <div className="flex gap-2">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="Código de invitación (ej. DS-2026)"
            className="flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-white placeholder:text-white/30"
          />
          <Button onClick={() => alert('En producción: POST /api/classrooms/join')}>Unirse</Button>
        </div>
        <p className="mt-2 text-xs text-white/50">
          Demo: el aula <code className="text-neon-cyan">DS-2026</code> ya existe en el seed.
        </p>
      </Card>
    </div>
  );
};
