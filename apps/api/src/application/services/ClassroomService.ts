import { randomBytes } from 'node:crypto';
import type { IClassroomRepository } from '../../domain/repositories/IClassroomRepository.js';

const generateInviteCode = (): string => {
  return 'DS-' + randomBytes(3).toString('hex').toUpperCase();
};

export class ClassroomService {
  constructor(private readonly repo: IClassroomRepository) {}

  async create(ownerId: string, name: string) {
    return this.repo.create(ownerId, name);
  }

  async join(userId: string, code: string) {
    return this.repo.joinByCode(userId, code);
  }

  async stats(classroomId: string) {
    return this.repo.statsForClassroom(classroomId);
  }

  async members(classroomId: string) {
    return this.repo.listMembers(classroomId);
  }
}

export { generateInviteCode };
