import { prismaDB } from "../../backendLib/prismaDb"
import getSession from "./getSession"

// import { createClient } from "redis"
// import { Redis } from '@upstash/redis'

import { GetRedisCache } from "./redis";

import colors from "colors";

import { cache } from "react"
import { userType } from "../../types/all-required-types";

// export async function GetRedisCache() {
// 	// return await createClient({ 
// 	// 	url: getCachingURL(),	
// 	// })
// 	// .on('error', err => console.log('Redis Client Error', err))
// 	// .connect()
// 	return new Redis({
// 		url: "https://apn1-great-insect-33888.upstash.io", //process.env.REDIS_URL!,
// 		token: "AYRgASQgZDk2ZjJlNDgtZjI5MS00ZTJkLWE3OTUtMTRkZjlmOWM3OTU0ODhkNTMzOTE5N2VmNGE3M2FlZTcwMDFhZDIzMGMyYzE="//process.env.REDIS_SECRET!,
// 	})
// }


export function getCachingURL() {
	if (process.env.NEXT_PUBLIC_REDIS_URL) {
		return process.env.NEXT_PUBLIC_REDIS_URL
	}
	else throw new Error("REDIS CACHE CONNECTION URL NOT FOUND IN THE .env FILE.")
}

export const GetUserDetails = cache(async () => {
	console.log(colors.bgWhite.black("CACHED USER DETAILS IN cache"))
	return await GetDetails()
})

export async function GetDetails(username?: string | null): Promise<userType | any> {

	// if username is provided then fetch details of that specific user 
	// else if not given then get the details of session user for dashboard
	// and if still username is null then return []

	// let temp = { "id": "clof3bz9w0007w62kb5w5kmrj", "name": "yakshit chhipa", "email": "yakshitchhipa@gmail.com", "emailVerified": null, "backgroundStyles": "bg-[#ffffff] text-[#000000]", "buttonStyles": "bg-[#000000] text-[#ffffff]", "question": "Account deletion successful : )", "image": "https://firebasestorage.googleapis.com/v0/b/axn-myportfolio.appspot.com/o/rm5lx.jpeg?alt=media&token=dcc1e47e-c74e-4097-a5a6-6d1c1439f64f", "membership": null, "messageType": "text" }

	if (!username) {
		const session = await getSession();
		username = session?.user?.name
		// username = "yakshit chhipa"
	}

	if (!username) { return [] }

	try {

		const cache = GetRedisCache
		const cachedUer = await cache.get(username)

		if (cachedUer) {
			console.log(colors.blue.underline("cached user"))
			return cachedUer
		}

		else {
			const users = await prismaDB.user.findMany({
				where: {
					name: username
				}
			});
			await cache.set(username, JSON.stringify(users[0]))

			console.log(colors.green.underline("STORED A USER IN CACHE"))
			return users[0]
		}
	}

	catch (error: any) {
		console.log("Error occured in dataHelpers.ts", error);
		return []
	}

	// return temp
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
