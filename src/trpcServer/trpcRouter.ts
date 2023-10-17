import { mergeRouters } from "./trpcServer";
import { userDataRouter } from "./trpcAnalyticsRouter";
import { messageRouter } from "./trpcMessageRouter";
import { stripeRouter } from "./trpcStripe";

export const appRouter = mergeRouters(
    messageRouter,
    userDataRouter,
    stripeRouter
);
export type AppRouter = typeof appRouter