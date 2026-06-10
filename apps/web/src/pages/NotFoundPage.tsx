import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export const NotFoundPage = () => (
  <div className="grid place-items-center py-20 text-center">
    <h1 className="font-display text-6xl font-bold neon-text">404</h1>
    <p className="mt-2 text-white/60">Esta zona de Internet no existe.</p>
    <Link to="/" className="mt-4">
      <Button>Volver al inicio</Button>
    </Link>
  </div>
);
