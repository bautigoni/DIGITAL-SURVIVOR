/**
 * Composition root: arma el grafo de dependencias.
 * Patrón: Service Locator liviano para mantener el código testeable.
 */
import { getPrisma } from '../infrastructure/database/prisma.js';
import { PrismaPlayerRepository } from '../infrastructure/repositories/PrismaPlayerRepository.js';
import { PrismaDecisionRepository } from '../infrastructure/repositories/PrismaDecisionRepository.js';
import { PrismaClassroomRepository } from '../infrastructure/repositories/PrismaClassroomRepository.js';
import { GameService } from '../application/services/GameService.js';
import { ClassroomService } from '../application/services/ClassroomService.js';

export interface Container {
  gameService: GameService;
  classroomService: ClassroomService;
}

export const buildContainer = (): Container => {
  const prisma = getPrisma();
  const playerRepo = new PrismaPlayerRepository(prisma);
  const decisionRepo = new PrismaDecisionRepository(prisma);
  const classroomRepo = new PrismaClassroomRepository(prisma);

  return {
    gameService: new GameService(playerRepo, decisionRepo),
    classroomService: new ClassroomService(classroomRepo),
  };
};
