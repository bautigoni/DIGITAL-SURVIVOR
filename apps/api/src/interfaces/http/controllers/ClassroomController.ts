import { Router, type Request, type Response } from 'express';
import { z } from 'zod';
import { ClassroomService } from '../../../application/services/ClassroomService.js';
import { asyncHandler, HttpError } from '../middleware/errors.js';

const createSchema = z.object({ name: z.string().min(2).max(80) });
const joinSchema = z.object({ code: z.string().min(3).max(40) });

export const classroomController = (service: ClassroomService): Router => {
  const router = Router();

  router.post(
    '/',
    asyncHandler(async (req: Request, res: Response) => {
      if (!req.user) throw new HttpError(401, 'Unauthenticated');
      const body = createSchema.parse(req.body);
      const c = await service.create(req.user.id, body.name);
      res.status(201).json(c);
    }),
  );

  router.post(
    '/join',
    asyncHandler(async (req: Request, res: Response) => {
      if (!req.user) throw new HttpError(401, 'Unauthenticated');
      const body = joinSchema.parse(req.body);
      const c = await service.join(req.user.id, body.code);
      if (!c) throw new HttpError(404, 'Código inválido');
      res.json(c);
    }),
  );

  router.get(
    '/:id/stats',
    asyncHandler(async (req: Request, res: Response) => {
      const s = await service.stats(req.params.id!);
      res.json(s);
    }),
  );

  router.get(
    '/:id/members',
    asyncHandler(async (req: Request, res: Response) => {
      const m = await service.members(req.params.id!);
      res.json(m);
    }),
  );

  return router;
};
