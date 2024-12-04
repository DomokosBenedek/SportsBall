import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient()

async function main() {
  for (let i = 0; i < 15; i++) {
    const free = Math.random() < 0.25;
    await prisma.team.create({
      data: {
        Id: i + 1,
        country: faker.location.country(),
      }
    })
  }
  for (let i = 0; i < 50; i++) {
    await prisma.player.create({
      data: {
        Id: i + 1,
        name: faker.person.fullName(),
        birthDate: faker.date.birthdate(),
        goalCount:faker.number.int({ min: 0, max: 10 }),
        teamId: faker.number.int({ min: 1, max: 15 }),
      }
    })
  }


  /*await prisma.team.update({
    where: { Id: 2 },
    data: {
      players: {
        connect: [
          { Id: 2 },
          { Id: 4 },
          { Id: 5 },
          { Id: 10 },
          { Id: 11 },
        ]
      }
    }
  })*/
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })