/**
 * Seed: crea un usuario docente demo y un aula con código de invitación.
 */
import { PrismaClient, UserRole } from '@prisma/client';
const prisma = new PrismaClient();
const main = async () => {
    const teacher = await prisma.user.upsert({
        where: { email: 'docente@digital-survivor.app' },
        update: {},
        create: {
            email: 'docente@digital-survivor.app',
            username: 'profe_medina',
            passwordHash: 'demo-hash-replace-in-prod',
            role: UserRole.TEACHER,
        },
    });
    const classroom = await prisma.classroom.upsert({
        where: { inviteCode: 'DS-2026' },
        update: {},
        create: {
            ownerId: teacher.id,
            name: 'Aula 4to B — Ciudadanía Digital',
            inviteCode: 'DS-2026',
        },
    });
    console.log('Seed completo:', { teacher: teacher.username, classroom: classroom.inviteCode });
};
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => prisma.$disconnect());
