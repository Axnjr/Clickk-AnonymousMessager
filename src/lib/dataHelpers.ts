import { prismaDB } from "../../backendLib/prismaDb"
import getSession from "./getSession"
import { createClient } from "redis"
import colors from "colors";
import { cache } from "react"

export function getCachingURL() {
	if (process.env.NEXT_PUBLIC_REDIS_URL) {
		return process.env.NEXT_PUBLIC_REDIS_URL
		//"rediss://default:5115a67bfbdc4b1ea137cd4524b62178@civil-chow-43051.upstash.io:43051"
	}
	else throw new Error("REDIS CACHE CONNECTION URL NOT FOUND IN THE .env FILE.")
}

export const GetUserDetails = cache(async () => {
	console.log(colors.bgWhite.black("CACHED USER DETAILS IN cache"))
	return await GetDetails()
})

export async function GetDetails() {

	// * WHILE WORKING ON CODESPACES SIGN-IN WONT WORK HENCE
	// * COMMENTED OUT "getSession" SINCE IT WONT WORK AS WELL
	// * ONLY FOR DEV PURPOSE IT SHOULD BE ENABLED IN PRODUCTION.

	const session = await getSession();
	const user = session?.user?.name
	// const user = "yakshit chhipa"

	if (!user) { return [] }
	try {
		const cache = await createClient({ url: getCachingURL() })
			.on('error', err => console.log('Redis Client Error', err))
			.connect()
		;
		const cachedUer = await cache.get(user)
		if (cachedUer) {
			console.log(colors.blue.underline("cached user"))
			return JSON.parse(cachedUer)
		}
		else {
			const users = await prismaDB.user.findMany({ where: { name: user } });
			await cache.set(user, JSON.stringify(users[0]))
			console.log(colors.green.underline("STORED A USER IN CACHE"))
			return users[0]
		}
	}
	catch (error: any) {
		console.log("Error occured in utils.ts", error);
		return []
	}
}

export async function IntitiateUpdate(name: string, what: "theme" | "content", req: any) {
	try {
		await fetch(`/api/user?username=${name}&what="${what}"`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: what === "content" ? JSON.stringify({
				...req
			})
				:
			JSON.stringify({ data: req })
		})
		return "ok"
	}
	catch (error) { return "not ok" }
}
