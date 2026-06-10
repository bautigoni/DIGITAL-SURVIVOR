import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import type { ZoneId } from '@ds/shared';

export const useAIDraft = (zone: ZoneId, level: number, recentIds: string[] = []) =>
  useQuery({
    queryKey: ['ai-event', zone, level, ...recentIds.slice(-3)],
    queryFn: () => api.generateAIEvent({ zone, level, recentIds }),
    enabled: !!zone,
    staleTime: 1000 * 60 * 5,
  });
