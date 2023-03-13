// prisma/seed.ts

import { PrismaClient, user } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { ROLES_KEY } from 'src/common/constant';

// initialize Prisma Client
const prisma = new PrismaClient();

async function main() {
  await makeFakeUser(100, 5); // 유저 인원, 게시글 개수
}

const makeFakeUser = async (
  userCnt: number,
  boardCnt: number,
): Promise<void> => {
  for (let i = 0; i < userCnt; i += 1) {
    const user: user = await prisma.user.create({
      data: {
        email: faker.internet.email(),
        name: faker.name.fullName(),
        baseUrl: 'default.jpg',
        authCode: ROLES_KEY.USER,
      },
    });

    await makeFakeBoard(boardCnt, user.id);
  }
};

const makeFakeBoard = async (count: number, userId: number): Promise<void> => {
  for (let i = 0; i < count; i += 1) {
    await prisma.board.create({
      data: {
        title: faker.random.words(3),
        context: faker.random.words(10),
        thumbnail: faker.image.technics(),
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
    // await makeFakeComment(count, i, userId);
  }
};

const makeFakeComment = async (
  count: number,
  boardId: number,
  userId: number,
): Promise<void> => {
  for (let i = 0; i < count; i += 1) {
    await prisma.comment.create({
      data: {
        context: faker.random.words(10),
        board: {
          connect: {
            id: boardId,
          },
        },
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });
  }
};

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });

/** Example Seed Code
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ errorFormat: 'pretty' });

const loadMovies = async () => {
  const moviesInput: Prisma.MovieCreateManyInput[] = [
    { name: 'Avatar', releaseDate: new Date(2009, 11, 16) },
    {
      description: "A soldier try to revenge his family's death",
      name: 'Gladiator',
      releaseDate: new Date(2000, 5, 20),
    },
    {
      description: 'Our here united to save the world',
      name: 'Avengers',
      releaseDate: new Date(2012, 3, 25),
    },
  ];

  await prisma.movie.createMany({
    data: moviesInput,
  });
};

const loadUsers = async () => {
  const usersInput: Prisma.UserCreateManyInput[] = [
    { name: 'Bob', email: 'bob@email.com' },
    { name: 'Alice', email: 'alice@email.com' },
  ];

  await prisma.user.createMany({
    data: usersInput,
  });
};

const main = async () => {
  await loadUsers();

  await loadMovies();
};

main().then();
 */
