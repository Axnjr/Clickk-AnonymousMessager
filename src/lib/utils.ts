import { type ClassValue, clsx } from "clsx"
import debounce from "lodash.debounce"
import { twMerge } from "tailwind-merge"

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

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function getCachingURL() {
	if (process.env.NEXT_PUBLIC_REDIS_URL) {
		return process.env.NEXT_PUBLIC_REDIS_URL
		//"rediss://default:5115a67bfbdc4b1ea137cd4524b62178@civil-chow-43051.upstash.io:43051"
	}
	else throw new Error("REDIS CACHE CONNECTION URL NOT FOUND IN THE .env FILE.")
}

export function getSiteURL(){
	return process.env.NODE_ENV === "production"
        ? 
    "your-production-url/api/trpc"
        : 
    "http://localhost:3000/api/trpc"
}

export async function ClassifyMessage(data: { "inputs": string }) : Promise<"positive" | "negative" | "unchecked"> {
    const response = await fetch(
		"https://api-inference.huggingface.co/models/SamLowe/roberta-base-go_emotions",
        {
			// @ts-ignore
            headers: { Authorization: process?.env?.NEXT_PUBLIC_HUGGING_FACE_TOKEN },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    try {
        const result = await response.json();
        return result[0][0].label
    } catch (error) {
        console.log("query ->", error)
        return "unchecked"
    }
}