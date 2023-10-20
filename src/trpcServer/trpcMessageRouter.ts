import { router, privateProcedure } from "./trpcServer";
import { prismaDB } from "../../backendLib/prismaDb";
import { ClassifyMessage } from "@/lib/utils";
import { z } from "zod"

export const messageRouter = router({
    getMessages: privateProcedure.input(
		z.object({
			userId: z.string(),
			skip: z.string().optional().default("0"),
		})
	)
	.query(async (opts) => {
		const reqData = opts.input, skip = parseInt(reqData.skip);
		if (reqData.userId) {
			return JSON.stringify({
				data: await prismaDB.messages.findMany({
					where: { userId: reqData.userId },
					take: 10,
					skip: !isNaN(skip) ? skip : 0
				}),
				count: (await prismaDB.messages.findMany({ where: { userId: reqData.userId } })).length
			})
		}
	}),

	// ~ ------------------------------------------------------------------------------------------------ ~ //

	postMessage: privateProcedure.input(
		z.object({
			message: z.string().optional(),
			userId: z.string(),
            // type could be either text or voice 
			type: z.union([ 
				z.literal("text"),
				z.literal("voice") 
			]),
			url:z.string().optional()
		})
	)
	.mutation(async (opts) => {
        // pd : postData
		const pd = opts.input, now = new Date(); 

		if (pd.message && pd.type === "text" && pd.userId) {
			const classification_label: string = await ClassifyMessage({ "inputs": pd.message });

			console.log("cllasification label -> ", classification_label)
			if (classification_label == "negative") {
				console.log("GOT SPAM")
				try {
					await prismaDB.userAnalytics.updateMany({
						where: { userId: pd.userId },
						data: { spam: { increment: 1 } }
					})
				} catch (error) { console.log("analytics -", error) }
			}

			else {
				console.log("GOT RESPONSE")
				try {
					await prismaDB.userAnalytics.updateMany({
						where: { userId: pd.userId },
						data: { responses: { increment: 1 } }
					})
				} catch (error) { console.log("analytics -", error) }
			}

			try {
				const message = await prismaDB.messages.create({
					data: {
						text_message: pd.message,
						userId: pd.userId,
						status: classification_label,
						timestamp: `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`,
						type: "text"
					}
				})
				// console.log("Untill pusher everything executed fine !!")
				// pusherServer.trigger(userID, "message", message)
				return "ok"
			}

			catch (error) {
				console.log(error)
				return "something went wrong"
			}
		}

		if (pd.userId && pd.type === "voice") {
			try {
				const message = await prismaDB.messages.create({
					data: {
						text_message: pd.url,
						userId: pd.userId,
						timestamp: `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`,
						type: "voice"
					}
				})
				console.log("VOICE MESSAGE SAVED SUCCESSFULLY !!")
				// pusherServer.trigger(userID, "message", message)
				return "ok"
			}
			catch (error) {
				console.log("Query message api route type = voice catch error part ----- >", error)
				return "something went wrong"
			}
		}

		return "Error either params 'message' or 'userID' or 'type' was not provided"
	}),
})