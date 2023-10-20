import { mergeRouters } from "./trpcServer";
import { userDataRouter } from "./trpcAnalyticsRouter";
import { messageRouter } from "./trpcMessageRouter";
import { stripeRouter } from "./trpcStripe";
import { userRouter } from "./trpcUserRouter";

export const appRouter = mergeRouters(
    messageRouter,
    userDataRouter,
    stripeRouter,
    userRouter
);
export type AppRouter = typeof appRouter