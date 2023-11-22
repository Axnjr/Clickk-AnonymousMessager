import { prismaDB } from './prismaDb'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { NextAuthOptions, getServerSession } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	adapter: PrismaAdapter(prismaDB),
	session: { strategy: 'jwt' },

	providers: [

		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),

		CredentialsProvider({

			name: "Email",
			credentials: {
				email: { label: "Email", type: "text", placeholder: "yourEmail@gmail.com" },
				username: { label: "Username", type: "text", placeholder: "clickk.link/yourName" },
				method: { label: "Login or Sign Up", type: "text" }
			},

			async authorize(credentials) {
				if (!credentials?.email || !credentials.username || !credentials.method) {
					return null;
				}

				if (credentials.method == "signup") {
					const user = await prismaDB.user.findUnique({
						where: {
							email: credentials.email,
						},
					});

					if (user) {
						return {
							id: user.id,
							email: user.email,
							name: user.name,
							picture: user.image
						};
					}

					else {
						let t = await prismaDB.user.create({
							data: {
								email: credentials.email,
								name: credentials.username,
								image: "https://framerusercontent.com/images/epm280WyLnQCSYNgAyKXTDmzWw.jpeg?scale-down-to=512"
							}
						})

						return {
							id: t.id,
							email: t.email,
							name: t.name,
							picture: t.image
						}
					}
				}

				if (credentials.method == "login") {
					// login
					const user = await prismaDB.user.findUnique({
						where: {
							email: credentials.email,
						},
					});

					if (!user) { return null }

					return {
						id: user.id,
						email: user.email,
						name: user.name,
						picture: user.image
					}
				}

				return null
			},
		}),
	],

	// copied as it is from next-auth docs
	callbacks: {

		async session({ token, session }) {
			if (token) {
				// @ts-ignore
				session.user!.id = token.id
				session.user!.name = token.name
				session.user!.email = token.email
				session.user!.image = token.picture
			}
			return session
		},

		async jwt({ token, user }) {
			const dbUser = await prismaDB.user.findFirst({
				where: {
					email: token.email,
				},
			})

			if (!dbUser) {
				token.id = user!.id
				return token
			}

			return {
				id: dbUser!.id,
				name: dbUser!.name,
				email: dbUser!.email,
				picture: dbUser!.image,
			}
		},

		redirect() {
			return '/dashboard'
		},
	},

	pages: {
		signIn: "/auth/signin"
	}
}

export const getAuthSession = () => getServerSession(authOptions) // to get data all around the app .