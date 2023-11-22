import { router, privateProcedure } from "./trpcServer";
import { prismaDB } from "../../backendLib/prismaDb";
import { z } from "zod"
import { TRPCError } from "@trpc/server";
// import { ClassifyMessage } from "@/lib/utils";
// import { pusherServer } from "../../backendLib/pusher";

export const messageRouter = router({
	getMessages: privateProcedure.input(
		z.object({
			userId: z.string().nullish(),
			skip: z.string().optional(),
		})
	)
	.query(async (opts) => {

		const reqData = opts.input, skip = parseInt(reqData.skip ?? "0") ;

		if (reqData.userId) {
			return JSON.stringify({
				data:await prismaDB.messages.findMany({
					where: {
						userId: reqData.userId
					},
					take: 10,
					skip: skip,
				}),
				count: (await prismaDB.messages.findMany({ where: { userId: reqData.userId } })).length,
			});
		}

	}),

	// ~ ------------------------------------------------------------------------------------------------ ~ //

	postMessage: privateProcedure.input(
		z.object({
			message: z.string().optional(),
			userId: z.string(),
			type: z.union([
				z.literal("text"),
				z.literal("voice")
			]),
			url: z.string().optional(),
			ipAddress: z.string().optional(),
			status : z.string().optional()
		})
	)
	.mutation(async (opts) => { 
		const pd = opts.input, now = new Date() ; // pd : postData

		if (pd.message && pd.type === "text" && pd.userId) {

			const toxicSentiments = ["embarrassment","disgust","disappointment","annoyance","anger"]

			if (toxicSentiments.includes(pd.status as string)) {
				console.log("GOT SPAM")
				try {
					await prismaDB.userAnalytics.updateMany({
						where: { userId: pd.userId },
						data: { spam: { increment: 1 } }
					})
				} catch (error) { console.log("analytics -", error) }
			}

			try {
				const message = await prismaDB.messages.create({
					data: {
						text_message: pd.message,
						userId: pd.userId,
						status: pd.status,
						timestamp: `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`,
						type: "text",
						hints:pd.ipAddress ?? ""
					}
				})

				console.log(message)

				// console.log("Untill pusher everything executed fine !!")
				// pusherServer.trigger(pd.userId, "message", message)
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
						type: "voice",
						hints: pd.ipAddress ?? ""
					}
				})

				// console.log("VOICE MESSAGE SAVED SUCCESSFULLY !!")
				// pusherServer.trigger(pd.userId, "message", message)

				return "ok"
			}

			catch (error) {
				console.log("Query message api route type = voice catch error part ----- >", error)
				return "something went wrong"
			}
		}

		return "Error either params 'message' or 'userID' or 'type' was not provided"
	}),

	// ~ ------------------------------------------------------------------------------------------------ ~ //

	moveToSpam : privateProcedure.input(
		z.object({
			messageId:z.string()
		})
	)
	.mutation(async (opts) => {
		if(opts.input.messageId){
			try {
				await prismaDB.messages.update({
					where : { id : opts.input.messageId },
					data : { status : "negative" }
				})
				return "ok"
			} 
			catch (error) {
				return new TRPCError({
					code:"INTERNAL_SERVER_ERROR"
				})
			}
		}
	})
})