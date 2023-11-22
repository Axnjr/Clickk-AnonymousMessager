import { router, privateProcedure } from "./trpcServer";
import { prismaDB } from "../../backendLib/prismaDb";
import { z } from "zod"
import { DeleteFromFirebase } from "@/lib/firebaseCdnHelper";
import { TRPCError } from "@trpc/server";
import { GetRedisCache } from "@/lib/redis";
import { userType } from "../../types/all-required-types";

export const userRouter = router({

    updateUser : privateProcedure.input(z.object({
        username : z.string(),
        what : z.union([ // description, theme, setting
            z.literal("content"),
            z.literal("theme"),
            z.literal("message_type")
        ]),
        payload : z.any().optional()

    }))
    .mutation(async (opts) => {
        const { username, what, payload: json } = opts.input
        try {

            if (what === "content" && username) {
                await prismaDB.user.updateMany({
                    where: { name: username },
                    data: { ...json }
                })

                let cachedUser : userType | any = await GetRedisCache.get(username);
                // if user is cached then update the cache
                if (cachedUser) {
                    await GetRedisCache.set(username, JSON.stringify({ ...cachedUser, ...json }))
                }
            }
    
            if (what === "theme" && username) {
                await prismaDB.user.updateMany({
                    where: { name: username },
                    data: { backgroundStyles: json.data }
                })

                let cachedUser : userType | any = await GetRedisCache.get(username);
                // if user is cached then update the cache
                if (cachedUser) {
                    cachedUser.backgroundStyles = json.data
                    await GetRedisCache.set(username, JSON.stringify({ ...cachedUser, ...json }))
                }
            }

            if(what === "message_type" && username){
                console.log("message type updated",json)
                await prismaDB.user.updateMany({
                    where:{
                        name : username
                    },
                    data: {
                        messageType : json
                    }
                })
                let cachedUser : userType | any = await GetRedisCache.get(username);
                if (cachedUser) {
                    cachedUser.messageType = json
                    await GetRedisCache.set(username, JSON.stringify({ ...cachedUser }))
                }
            }

            console.log("UPADTED REDIS CACHE SUCCEFULLY 😎😆🙂🤗🫡🔥🤟✨✅")
            return "done"
        }

        catch (error) {
            console.log(error, "☠️☠️☠️☠️💀💀💀💀🔥🔥😑😑🔒😥 user api route POST handler !")
            return "dang it !!"
        }
    }),

    deleteUser : privateProcedure.input(
        z.object({
            user_name : z.string(),
            user_img : z.string().nullable().optional()
        })  
    )
    .mutation(async (opts) => {
        const { user_name, user_img } = opts.input

        try {
            if(user_img){ DeleteFromFirebase(user_img) }
            let t = await prismaDB.user.delete({ where : { name : user_name } })

            await GetRedisCache.del(user_name)
            return "deleted"
        } 
        catch (error) {
            return new TRPCError({
                code:"INTERNAL_SERVER_ERROR",
                message:"Unable to delete user account",
                cause:error
            })
        }
    })

})
