import { router, privateProcedure } from "./trpcServer";
import { prismaDB } from "../../backendLib/prismaDb";

export const analyticsRouter = router({
    getAnalytics: privateProcedure.query(async ({ ctx }) => {
		const userID = ctx.userId
		return JSON.stringify( await prismaDB.userAnalytics.findMany({ where : { userId : userID } }) )
	}),

	// ~ ------------------------------------------------------------------------------------------------ ~ //

	updateAnalytics: privateProcedure.mutation(async ({ ctx }) => {
		const userID  = ctx.userId;
		try {
            await prismaDB.userAnalytics.updateMany({
                where : { userId:userID },
                data : { page_clicks:{increment:1} }
            })
        } catch (error) {  }
		return "ok"
	})
})