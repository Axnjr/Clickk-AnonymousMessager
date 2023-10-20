import { type AppRouter } from "../../trpcServer/trpcRouter" 
import { createTRPCReact } from "@trpc/react-query"

export const trpc = createTRPCReact<AppRouter>({})