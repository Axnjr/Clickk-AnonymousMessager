import { router, privateProcedure } from "./trpcServer";
import getStripe from "../lib/getStripe"

export const stripeRouter = router({

    getPlans : privateProcedure.query(async ({ ctx }) => {
        const userID = ctx.userId
        const stripe = getStripe()
        const prices = await stripe.prices.list({
            limit: 3,
        });

        return JSON.stringify(prices.data)
    }),

    getUser : privateProcedure.query(async ({ ctx }) => {
        return ctx.userId
    }),

});