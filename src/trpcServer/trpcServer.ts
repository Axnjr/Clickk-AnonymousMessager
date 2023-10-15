import { initTRPC, TRPCError } from "@trpc/server";
import { GetDetails } from "@/lib/utils";

const t = initTRPC.create();
const middleware = t.middleware

const isAuth = middleware(async (opts) => {
    const user = await GetDetails()

    if (user.length == 0) { throw new TRPCError({ code: 'UNAUTHORIZED' }) }

    return opts.next({
        ctx: {
            userId: user.id,
            user,
        },
    })
})

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
export const mergeRouters = t.mergeRouters;