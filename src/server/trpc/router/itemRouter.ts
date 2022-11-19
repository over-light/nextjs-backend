import { z } from "zod";
import { publicProcedure, router } from "./../trpc";
const itemRouter = router({
  addItem: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      const item = await ctx.prisma.t3ShoppingItem.create({
        data: {
          name: input.name,
        },
      });
      return item;
    }),
});

export { itemRouter };
