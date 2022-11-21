import { router } from "../trpc";
import { commentsRouter } from "./commentsRouter";
import { itemRouter } from "./itemRouter";

export const appRouter = router({
  item: itemRouter,
  comments: commentsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
