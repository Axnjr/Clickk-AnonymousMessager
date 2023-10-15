import { mergeRouters } from "./trpcServer";
import { analyticsRouter } from "./trpcAnalyticsRouter";
import { messageRouter } from "./trpcMessageRouter";

export const appRouter = mergeRouters(messageRouter,analyticsRouter)
export type AppRouter = typeof appRouter