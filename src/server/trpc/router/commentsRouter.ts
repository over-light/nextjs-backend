import { z } from "zod";
import { publicProcedure, router } from "./../trpc";
const commentsRouter = router({
  addItem: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const item = await ctx.prisma.t3ShoppingItem.create({
        data: {
          name: input.name,
        },
      });
      return item;
    }),
  getAllItems: publicProcedure.query(async ({ ctx }) => {
    const items = await ctx.prisma.t3ShoppingItem.findMany();
    return items;
  }),
  deleteItem: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const item = await ctx.prisma.t3ShoppingItem.delete({
        where: {
          id: input.id,
        },
      });
      return item;
    }),
});

export { commentsRouter };
