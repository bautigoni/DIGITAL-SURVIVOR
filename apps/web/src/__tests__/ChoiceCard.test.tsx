import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ChoiceCard } from '@/features/game/components/ChoiceCard';
import type { Choice } from '@ds/shared';

const base: Choice = {
  id: 'c1',
  label: 'Verificar antes de actuar',
  outcomeQuality: 'safe',
  deltas: { security: 5 },
  feedback: 'bien',
};

describe('ChoiceCard', () => {
  it('renders the label', () => {
    render(<ChoiceCard choice={base} index={0} onSelect={() => {}} />);
    expect(screen.getByText(/Verificar antes de actuar/)).toBeInTheDocument();
  });

  it('fires onSelect when clicked', () => {
    const onSelect = vi.fn();
    render(<ChoiceCard choice={base} index={0} onSelect={onSelect} />);
    fireEvent.click(screen.getByRole('button'));
    expect(onSelect).toHaveBeenCalled();
  });
});
