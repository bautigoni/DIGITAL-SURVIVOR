export interface IClassroomRepository {
  create(ownerId: string, name: string): Promise<{ id: string; inviteCode: string; name: string }>;
  joinByCode(userId: string, code: string): Promise<{ id: string; name: string } | null>;
  listMembers(classroomId: string): Promise<Array<{ userId: string; username: string }>>;
  statsForClassroom(classroomId: string): Promise<ClassroomStats>;
}

export interface ClassroomStats {
  totalStudents: number;
  totalDecisions: number;
  averageScore: number;
  commonMistakes: Array<{ eventId: string; count: number }>;
}
