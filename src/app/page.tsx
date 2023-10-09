"use client"
import { Button } from "@/components/ui/Button";
import { useSession, signIn } from "next-auth/react"

export default function page() {
	const { data: session, status } = useSession()
    const user  = session?.user?.name;
    const email = session?.user?.email
	// console.log(user,email,status)

	return (
		<>
			<h1 className="text-9xl text-center">HOME</h1>
			<p>{status}</p>
			<p>{user}</p>
			<Button onClick={() => signIn()}>SIGNIN</Button>
		</>
	)
}