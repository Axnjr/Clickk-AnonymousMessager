"use client"
import { Button } from "@/components/ui/Button";
import { useSession, signIn } from "next-auth/react"
import { trpc } from "@/app/_trpcUsageLib/client"

export default function page() {
	const { data: session, status } = useSession()
    const user  = session?.user?.name;
    const email = session?.user?.email
	// console.log(user,email,status)

	// const getData = trpc.getData.useQuery()

	// const getData = trpc.getData.useQuery({
	// 	// your react-query properties ...
	// })
  
	// const setData = trpc.setData.useMutation({
	// 	// your react-query properties ...
	// })

	return (
		<>
			<h1 className="text-9xl text-center">HOME</h1>
			<p>{status}</p>
			<p>{user}</p>
			<Button onClick={() => signIn()}>SIGNIN</Button>
		</>
	)
}