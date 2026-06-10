import type { PrismaClient } from '@prisma/client';
import {
  type ClassroomStats,
  type IClassroomRepository,
} from '../../domain/repositories/IClassroomRepository.js';
import { generateInviteCode } from '../../application/services/ClassroomService.js';

export class PrismaClassroomRepository implements IClassroomRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(ownerId: string, name: string) {
    const created = await this.prisma.classroom.create({
      data: { ownerId, name, inviteCode: generateInviteCode() },
    });
    return { id: created.id, inviteCode: created.inviteCode, name: created.name };
  }

  async joinByCode(userId: string, code: string) {
    const classroom = await this.prisma.classroom.findUnique({ where: { inviteCode: code } });
    if (!classroom) return null;
    await this.prisma.classroomMember.upsert({
      where: { classroomId_userId: { classroomId: classroom.id, userId } },
      update: {},
      create: { classroomId: classroom.id, userId },
    });
    return { id: classroom.id, name: classroom.name };
  }

  async listMembers(classroomId: string) {
    const rows = await this.prisma.classroomMember.findMany({
      where: { classroomId },
      include: { user: true },
    });
    return rows.map((r) => ({ userId: r.userId, username: r.user.username }));
  }

  async statsForClassroom(classroomId: string): Promise<ClassroomStats> {
    const members = await this.prisma.classroomMember.findMany({
      where: { classroomId },
      include: {
        user: {
          include: { runs: { include: { decisions: true } } },
        },
      },
    });
    const totalStudents = members.length;
    const allDecisions = members.flatMap((m) => m.user.runs.flatMap((r) => r.decisions));
    const scores = members.flatMap((m) => m.user.runs.map((r) => r.score));
    const mistakes = new Map<string, number>();
    for (const d of allDecisions) {
      if (d.quality === 'dangerous') {
        mistakes.set(d.eventId, (mistakes.get(d.eventId) ?? 0) + 1);
      }
    }
    return {
      totalStudents,
      totalDecisions: allDecisions.length,
      averageScore: scores.length === 0 ? 0 : scores.reduce((a, b) => a + b, 0) / scores.length,
      commonMistakes: [...mistakes.entries()]
        .map(([eventId, count]) => ({ eventId, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5),
    };
  }
}
