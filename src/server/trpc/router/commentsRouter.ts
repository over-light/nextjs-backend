import { z } from "zod";
import { publicProcedure, router } from "./../trpc";
const commentsRouter = router({
  getAllPosts: publicProcedure.query(async ({ ctx }) => {
    const items = await ctx.prisma.webDevPost.findMany({
      select: {
        id: true,
        title: true,
      },
    });
    return items;
  }),
  getPostById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ ctx, input }) => {
      const item = await ctx.prisma.webDevPost.findUnique({
        where: { id: input.id },
        select: {
          body: true,
          title: true,
          comments: {
            orderBy: {
              createdAt: "desc",
            },
            select: {
              id: true,
              message: true,
              parentId: true,
              createdAt: true,

              user: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });
      return item;
    }),
});

export { commentsRouter };
