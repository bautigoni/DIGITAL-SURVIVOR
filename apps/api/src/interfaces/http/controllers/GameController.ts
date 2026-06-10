import { Router, type Request, type Response } from 'express';
import { z } from 'zod';
import { ZONES, type ZoneId } from '@ds/shared';
import { GameService } from '../../../application/services/GameService.js';
import { asyncHandler, HttpError } from '../middleware/errors.js';

const startSchema = z.object({
  mode: z.enum(['STORY', 'SURVIVAL', 'SCHOOL', 'MULTIPLAYER']),
  zoneId: z.string().refine((v): v is ZoneId => v in ZONES, 'Zona inválida'),
  classId: z.string().optional(),
});

const decisionSchema = z.object({
  eventId: z.string(),
  choiceId: z.string(),
  event: z.any(),
  choice: z.any(),
});

export const gameController = (service: GameService): Router => {
  const router = Router();

  router.post(
    '/runs',
    asyncHandler(async (req: Request, res: Response) => {
      if (!req.user) throw new HttpError(401, 'Unauthenticated');
      const body = startSchema.parse(req.body);
      const profile = await service.startRun({
        userId: req.user.id,
        mode: body.mode,
        zoneId: body.zoneId,
        classId: body.classId as never,
      });
      res.status(201).json(profile);
    }),
  );

  router.get(
    '/runs/:id/event',
    asyncHandler(async (req: Request, res: Response) => {
      const { id } = req.params;
      const next = await service.nextEvent(id);
      if (!next) throw new HttpError(404, 'Run no encontrada');
      res.json(next);
    }),
  );

  router.post(
    '/runs/:id/decision',
    asyncHandler(async (req: Request, res: Response) => {
      const body = decisionSchema.parse(req.body);
      const result = await service.resolveDecision({
        runId: req.params.id!,
        event: body.event,
        choice: body.choice,
      });
      res.json(result);
    }),
  );

  return router;
};
