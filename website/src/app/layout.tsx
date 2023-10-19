import AllProvider from '@/providers/Auth-&-TRPCClient-Provider'
import '../app/assets/globals.css'
import type { Metadata } from 'next'
import { Toaster } from "@/components/ui/toaster"
// import { serverClient } from './_trpc/serverClient'

export const metadata: Metadata = {
	title: 'Clickk® | Home',
	description: 'Generated by create next app',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {

	// const data = await serverClient.getData()
  	// const dataSet = await serverClient.setData("test-data trpc working in sever component")

	return (
		<html lang="en">
			<AllProvider>
				<body>
					{children}
					<Toaster />
				</body>
			</AllProvider>
		</html>
	)
}