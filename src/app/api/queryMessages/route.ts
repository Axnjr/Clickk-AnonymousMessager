import { NextRequest, NextResponse } from "next/server";
import { prismaDB } from "../../../../backendLib/prismaDb";
import { NextApiResponseServerIO } from "../../../../types/all-required-types";
import { pusherServer } from '../../../../backendLib/pusher'
var colors = require('colors');

async function ClassifyMessage(data: { "inputs": string }) {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/ProsusAI/finbert",
        {
            headers: { Authorization: "Bearer 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" },
            method: "POST",
            body: JSON.stringify(data),
        }
    );
    try {
        const result = await response.json();
        return result[0][0].label
    } catch (error) {
        console.log("query ->", error)
        return "unchecked"
    }
}

export async function GET(request: NextRequest) {
    const req = request?.nextUrl?.searchParams?.get("userId")?.replace(/["\\/]/g, '')
    const req2 = parseInt(request?.nextUrl?.searchParams?.get("skip")?.replace(/["\\/]/g, '') as string)
    if (req) {
        return new NextResponse(JSON.stringify({
            data: await prismaDB.messages.findMany({
                where: { userId: req },
                take: 10,
                skip: !isNaN(req2) ? req2 : 0
            }),
            count: (await prismaDB.messages.findMany({where:{userId:req}})).length
        }))
    }
    return new NextResponse(JSON.stringify(await prismaDB.messages.findMany()))
    // return new NextResponse(JSON.stringify(await prismaDB.messages.deleteMany({
    //     where:{
    //         type:"voice"
    //     }
    // })))
}

export async function POST(request: NextRequest, res: NextApiResponseServerIO) {
    const mes = request?.nextUrl?.searchParams?.get("message")?.replace(/["\\/]/g, ''),
        userID = request?.nextUrl?.searchParams?.get("userId")?.replace(/["\\/]/g, ''),
        type = request?.nextUrl?.searchParams?.get("type")?.replace(/["\\/]/g, ''),
        now = new Date();

    // if all parameters were given and type of message was "text" .
    if (mes && userID && type === "text") {

        const classification_label: string = await ClassifyMessage({ "inputs": mes });
        console.log("cllasification label -> ", classification_label)

        if (classification_label == "negative") {
            console.log("GOT SPAM")
            try {
                await prismaDB.userAnalytics.updateMany({
                    where: { userId: userID },
                    data: { spam: { increment: 1 } }
                })
            } catch (error) { console.log("analytics -", error) }
        }

        else {
            console.log("GOT RESPONSE")
            try {
                await prismaDB.userAnalytics.updateMany({
                    where: { userId: userID },
                    data: { responses: { increment: 1 } }
                })
            } catch (error) { console.log("analytics -", error) }
        }

        try {
            const message = await prismaDB.messages.create({
                data: {
                    text_message: mes,
                    userId: userID,
                    status: classification_label,
                    timestamp: `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`,
                    type: "text"
                }
            })
            // console.log("Untill pusher everything executed fine !!")
            pusherServer.trigger(userID, "message", message)
            return new NextResponse("ok", { status: 200 })
        }
        catch (error) {
            console.log(error)
            return new NextResponse("something went wrong", { status: 500 })
        }
    }

    if (userID && type === "voice") {
        const url = await request.json()
        try {
            const message = await prismaDB.messages.create({
                data: {
                    text_message: url,
                    userId: userID,
                    timestamp: `${now.toLocaleDateString()} - ${now.toLocaleTimeString()}`,
                    type: "voice"
                }
            })
            console.log("VOICE MESSAGE SAVED SUCCESSFULLY !!", mes)
            // pusherServer.trigger(userID, "message", message)
            return new NextResponse("ok", { status: 200 })
        }
        catch (error) {
            console.log("Query message api route type = voice catch error part ----- >", error)
            return new NextResponse("something went wrong", { status: 500 })
        }
    }

    return new NextResponse("Error either params 'message' or 'userID' or 'type' was not provided")
}

export async function PATCH(request: NextRequest, res: NextApiResponseServerIO) {
    const req = request?.nextUrl?.searchParams?.get("messageId")?.replace(/["\\/]/g, '')
    try {
        await prismaDB.messages.update({
            where: {
                id: req
            },
            data: {
                status: "neagtive"
            }
        })
        return new NextResponse("ok", { status: 200 })
    } catch (error) {
        console.log(colors.bgBlue.yellow.underline(error))
        return new NextResponse("error",{status:500})
    }
}