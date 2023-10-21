"use client"
import { SessionProvider } from "next-auth/react"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { trpc } from '@/app/_trpcUsageLib/client'
import { httpBatchLink } from '@trpc/client'
import { useState } from "react";
import { getSiteURL } from "@/lib/utils";

export default function AllProvider({ children }: { children: React.ReactNode }) {

	const [queryClient] = useState(() => new QueryClient())
	const [trpcClient] = useState(() =>
		trpc.createClient({
			links: [
				httpBatchLink({
					url: getSiteURL(),
				}),
			],
		})
	)

	return (
		<trpc.Provider client={trpcClient} queryClient={queryClient}>
			<QueryClientProvider client={queryClient}>
				<SessionProvider>
					{children}
				</SessionProvider>
			</QueryClientProvider>
		</trpc.Provider>
	)
}