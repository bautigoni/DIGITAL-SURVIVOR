import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import { buildContainer } from './container.js';
import { healthController } from '../interfaces/http/controllers/HealthController.js';
import { gameController } from '../interfaces/http/controllers/GameController.js';
import { classroomController } from '../interfaces/http/controllers/ClassroomController.js';
import { aiController } from '../interfaces/http/controllers/AIController.js';
import { errorMiddleware } from '../interfaces/http/middleware/errors.js';
import { requireAuth } from '../interfaces/http/middleware/auth.js';

export const createApp = () => {
  const app = express();
  const container = buildContainer();

  app.use(helmet());
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN?.split(',') ?? ['http://localhost:5173'],
      credentials: true,
    }),
  );
  app.use(express.json({ limit: '1mb' }));
  app.use(morgan('dev'));

  const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 120,
    standardHeaders: true,
    legacyHeaders: false,
  });
  app.use(limiter);

  app.use('/api/health', healthController());
  app.use('/api/game', requireAuth, gameController(container.gameService));
  app.use('/api/classrooms', requireAuth, classroomController(container.classroomService));
  app.use('/api/ai', requireAuth, aiController());

  app.use(errorMiddleware);

  return app;
};
