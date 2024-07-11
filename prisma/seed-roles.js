import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.roles.deleteMany();

    const roles = ['Admin', 'User', 'Guest'];

    for (const role of roles) {
        await prisma.roles.upsert({
            where: { name: role },
            update: {},
            create: { name: role }, 
        });
    }

    console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
