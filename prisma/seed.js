import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function seed() {
  await prisma.webDevPost.deleteMany();
  await prisma.webDevUser.deleteMany();
  const kyle = await prisma.webDevUser.create({ data: { name: "Kyle" } });
  const sally = await prisma.webDevUser.create({ data: { name: "Sally" } });

  const post1 = await prisma.webDevPost.create({
    data: {
      title: "My first post",
      body: "This is my first post",
    },
  });
  const post2 = await prisma.webDevPost.create({
    data: {
      body: "Body Second Post 2",
      title: "Post 2",
    },
  });

  const comment1 = await prisma.webDevComment.create({
    data: {
      message: "I am a root comment",
      userId: kyle.id,
      postId: post1.id,
    },
  });

  const comment2 = await prisma.webDevComment.create({
    data: {
      parentId: comment1.id,
      message: "I am a nested comment",
      userId: sally.id,
      postId: post2.id,
    },
  });

  const comment3 = await prisma.webDevComment.create({
    data: {
      message: "I am another root comment",
      userId: sally.id,
      postId: post1.id,
    },
  });
}

seed();
