import { appRouter } from "../../trpcServer/trpcRouter"; 
import { httpBatchLink } from "@trpc/client"
import { getSiteURL } from "@/lib/utils";

const url = getSiteURL()

export const serverClient = appRouter.createCaller({
  links: [
    httpBatchLink({ url }),
  ],
})