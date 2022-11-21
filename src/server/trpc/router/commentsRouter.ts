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
});

export { commentsRouter };
