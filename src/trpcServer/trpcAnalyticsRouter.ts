import { router, privateProcedure } from "./trpcServer";
import { prismaDB } from "../../backendLib/prismaDb";

export const userDataRouter = router({
    getAnalytics: privateProcedure.query(async ({ ctx }) => {
		const userID = ctx.userId
		return await prismaDB.userAnalytics.findFirst({ where : { userId : userID } }) 
	}),

	// ~ ------------------------------------------------------------------------------------------------ ~ //

	updateAnalytics: privateProcedure.mutation(async ({ ctx }) => {
		const userID  = ctx.userId;
		try {
            let t = await prismaDB.userAnalytics.updateMany({
                where : { userId:userID },
                data : { page_clicks:{increment:1} }
            })
			console.log("ANALYTICS UPDATED ======> ",t)
        } catch (error) {  }
		return "ok"
	}),

	// ~ ------------------------------------------------------------------------------------------------ ~ //
})