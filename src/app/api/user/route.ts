import { NextRequest, NextResponse } from "next/server";
import { prismaDB } from "../../../../backendLib/prismaDb";
import { DeleteFromFirebase } from "../../../lib/firebaseCdnHelper";
import { createClient } from "redis"
import { getCachingURL } from "../../../lib/utils";

export async function GET(request: NextRequest) {
    const req = request?.nextUrl?.searchParams?.get("username")?.replace(/["\\/]/g, '')
    if (req) {
        const userCheck = await prismaDB.user.findUnique({ where: { name: req } })
        if (userCheck) return new NextResponse(JSON.stringify({ data: userCheck }))
        else return new NextResponse(JSON.stringify({ data: "User not found" }))
    }
    else if (!req) {
        const allUsers = await prismaDB.user.findMany()
        return new NextResponse(JSON.stringify({ allUsers }))
    }
}

export async function POST(request: NextRequest) {
    const req = request?.nextUrl?.searchParams?.get("username")?.replace(/["\\/]/g, '')
    const req2 = request?.nextUrl?.searchParams?.get("what")?.replace(/["\\/]/g, '')
    const json = await request.json();

    try {
        const cache = await createClient({ url: getCachingURL() })
            .on('error', err => console.log('Redis Client Error', err))
            .connect()
        ;

        if (req2 === "content" && req) {
            let t = await prismaDB.user.updateMany({
                where: { name: req },
                data: { ...json }
            })
            let temp = await cache.get(req);
            if (temp) {
                let t = JSON.parse(temp)
                await cache.set(req, JSON.stringify({ ...t, ...json }))
                console.log("UPADTED REDIS CACHE SUCCEFULLY 😎😆🙂🤗🫡🔥🤟✨✅")
            }
        }

        if (req2 === "theme" && req) {
            await prismaDB.user.updateMany({
                where: { name: req },
                data: { backgroundStyles: json.data }
            })
            let temp = await cache.get(req);
            if (temp) {
                let t = JSON.parse(temp)
                await cache.set(req, JSON.stringify({ ...t, ...json.data }))
                console.log("UPADTED REDIS CACHE SUCCEFULLY 😎😆🙂🤗🫡🔥🤟✨✅")
            }
        }
        return new NextResponse("done", { status: 200 })
    } catch (error) {
        console.log(error,"☠️☠️☠️☠️💀💀💀💀🔥🔥😑😑🔒😥 user api route POST handler !")
        return new NextResponse("dang it !!",{status:500})
    }

}

export async function DELETE(request: NextRequest) {
    const req = request?.nextUrl?.searchParams?.get("username")?.replace(/["\\/]/g, ''),
        imgURL = request?.nextUrl?.searchParams?.get("img")?.replace(/["\\/]/g, '');
    try {
        if (imgURL) await DeleteFromFirebase(imgURL)
        await prismaDB.user.delete({ where: { name: req } })
        return new NextResponse("user deleted", { status: 200 })
    }
    catch (error) {
        return new NextResponse("enable to delete user", { status: 500 })
    }
}

// export async function POST( request : NextRequest ) {
//     const json = await request.json();
//     return new NextResponse(JSON.stringify({json}),{status:200})
// }

// let t = await prismaDB.user.update({
//     where :{ id:"clmcxy2dg0000w6241atnxily" },
//     data : {
//         question:"Should I learn Machine Learning ?",
//         responseType:"text&voice",
//         backgroundStyles:JSON.stringify({
//             backgroundColor:"#37F713"
//         })
//     }
// })
// return new NextResponse(JSON.stringify({t}))