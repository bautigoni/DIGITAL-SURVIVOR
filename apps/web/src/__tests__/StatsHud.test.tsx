import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatsHud } from '@/features/rpg/components/StatsHud';
import { DEFAULT_STATS } from '@ds/shared';

describe('StatsHud', () => {
  it('renders all 7 stat labels', () => {
    render(<StatsHud stats={DEFAULT_STATS} level={1} xp={0} />);
    expect(screen.getByText('Seguridad')).toBeInTheDocument();
    expect(screen.getByText('Reputación')).toBeInTheDocument();
    expect(screen.getByText('Dinero')).toBeInTheDocument();
    expect(screen.getByText('Conocimiento')).toBeInTheDocument();
    expect(screen.getByText('Confianza')).toBeInTheDocument();
    expect(screen.getByText('Tiempo')).toBeInTheDocument();
    expect(screen.getByText('Estrés Digital')).toBeInTheDocument();
  });

  it('shows the level', () => {
    render(<StatsHud stats={DEFAULT_STATS} level={5} xp={42} />);
    expect(screen.getByText(/Nv\. 5/i)).toBeInTheDocument();
  });
});
