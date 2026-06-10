import { Router, type Request, type Response } from 'express';
import { z } from 'zod';
import { ZONES, type ZoneId } from '@ds/shared';
import { buildAIProvider } from '../../../application/services/AIService.js';
import { asyncHandler } from '../middleware/errors.js';

const schema = z.object({
  zone: z.string().refine((v): v is ZoneId => v in ZONES, 'Zona inválida'),
  level: z.number().int().min(1).max(99),
  recentIds: z.array(z.string()).optional(),
  category: z.string().optional(),
  seed: z.number().optional(),
});

export const aiController = (): Router => {
  const router = Router();
  const provider = buildAIProvider();

  router.post(
    '/event',
    asyncHandler(async (req: Request, res: Response) => {
      const body = schema.parse(req.body);
      const event = await provider.generateEvent({
        zone: body.zone,
        level: body.level,
        recentIds: body.recentIds,
        seed: body.seed,
      });
      res.json(event);
    }),
  );

  router.get(
    '/zones',
    asyncHandler(async (_req: Request, res: Response) => {
      res.json(Object.values(ZONES));
    }),
  );

  return router;
};
