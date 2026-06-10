import { Router, type Request, type Response } from 'express';

export const healthController = (): Router => {
  const router = Router();
  router.get('/', (_req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'digital-survivor-api', time: new Date().toISOString() });
  });
  return router;
};
