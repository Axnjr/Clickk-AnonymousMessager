import { router, privateProcedure } from "./trpcServer";
import { prismaDB } from "../../../backendLib/prismaDb";
import { z } from "zod"
import { createClient } from "redis"
import { getCachingURL } from "@/lib/utils";

export const userRouter = router({

    updateUser : privateProcedure.input(z.object({
        username : z.string(),
        what : z.union([
            z.literal("content"),
            z.literal("theme")
        ]),
        json : z.any().optional()

    }))
    .mutation(async (opts) => {

        const { username, what, json } = opts.input

        try {
            const cache = await createClient({ url: getCachingURL() })
                .on('error', err => console.log('Redis Client Error', err))
                .connect()
            ;

            if (what === "content" && username) {
                await prismaDB.user.updateMany({
                    where: { name: username },
                    data: { ...json }
                })

                let temp = await cache.get(username);

                if (temp) {
                    let t = JSON.parse(temp)
                    await cache.set(username, JSON.stringify({ ...t, ...json }))
                }
            }
    
            if (what === "theme" && username) {
                await prismaDB.user.updateMany({
                    where: { name: username },
                    data: { backgroundStyles: json.data }
                })

                let temp = await cache.get(username);

                if (temp) {
                    let t = JSON.parse(temp)
                    t.backgroundStyles = json.data
                    await cache.set(username, JSON.stringify({ ...t }))
                }
            }

            console.log("UPADTED REDIS CACHE SUCCEFULLY 😎😆🙂🤗🫡🔥🤟✨✅")

            return "done"
        }

        catch (error) {
            console.log(error, "☠️☠️☠️☠️💀💀💀💀🔥🔥😑😑🔒😥 user api route POST handler !")
            return "dang it !!"
        }
    })

})
