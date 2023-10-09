import { Styles, UsersUpdatableProps, userType } from "@/types/all-required-types"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { prismaDB } from "./prismaDb"
import getSession from "./getSession"
import { createClient } from "redis"
import path from "path"
var colors = require('colors');

export async function Fetcher(
	url: string, 
	method?: "GET" | "POST" | "PATCH" | "DELETE" | "UPDATE", 
) {
	try {
		if (!method || method === "GET") {
			const temp = await fetch(`${url}`)
			return await temp.json()
		}
		else {
			const temp = await fetch(`${url}`, { method: method })
			return await temp.json()
		}
	} catch (error) {
		console.log(error,"AT FETCHER UTILS.TS")
		return error
	}
}

export async function GetUserDetails() {
	const session = await getSession();
	const user = session?.user?.name

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
			const users = await prismaDB.user.findMany({ where: { name: session?.user?.name } });
			await cache.set(user, JSON.stringify(users[0]))
			console.log(colors.green.underline("STORED A USER IN CACHE"))
			return users[0]
		}
	}
	catch (error: any) {
		console.log(path.basename("src/lib/utils.ts"), "Error occured in utils.ts", error);
		return []
	}
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function Capitalize(str: string) {
	if (str) {
		let first_alphabet = str[0].toUpperCase()
		let remaining_str = str.slice(1, str.length)
		return first_alphabet + remaining_str
	}
	return str
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

function getCachingURL() {
	if (process.env.NEXT_PUBLIC_REDIS_URL) {
		return process.env.NEXT_PUBLIC_REDIS_URL
		//"rediss://default:5115a67bfbdc4b1ea137cd4524b62178@civil-chow-43051.upstash.io:43051"
	}
	else throw new Error("REDIS CACHE CONNECTION URL NOT FOUND IN THE .env FILE.")
}

async function GetCache() {
	const cache = createClient({ url: getCachingURL() })
	.on('error', err => console.log('Redis Client Error', err))
	await cache.connect()
	return cache
}