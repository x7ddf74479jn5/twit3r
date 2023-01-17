import { createTRPCRouter } from "./trpc";
import { tweetRouter } from "./routers/tweet";

export const appRouter = createTRPCRouter({
  tweet: tweetRouter,
});

export type AppRouter = typeof appRouter;
