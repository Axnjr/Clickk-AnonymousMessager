import getStripe from "../../../lib/getStripe"
import { NextResponse, NextRequest } from "next/server";
import { GetDetails } from "@/lib/dataHelpers";
import colors from "colors";
import { prismaDB } from "../../../../../backendLib/prismaDb";

export async function GET(request: NextRequest) {
    const stripe = getStripe(),
    planID = request?.nextUrl?.searchParams?.get("planID")?.replace(/["\\/]/g, ''),
    planName = request?.nextUrl?.searchParams?.get("planName")?.replace(/["\\/]/g, '') ,
    uid = request?.nextUrl?.searchParams?.get("uid")?.replace(/["\\/]/g, '');

    const session = await stripe.checkout.sessions.create({
        line_items: [{
            price: planID,
            quantity: 1
        }],
        mode: "subscription",
        success_url: `http://localhost:3000/onboarding/${uid}?planName=${planName}`,
        cancel_url: `http://localhost:3000/plans?error=${true}`,
        metadata:{
            // if user id exists then use it else get it from GetDetails()
            userId : uid ? uid : (await GetDetails()).id,
            planName : planName as string
        },
    })

    console.log("SRTPE TRPC ---->", session.url)

    return new NextResponse(JSON.stringify({ URL: session.url }))
}

export async function POST(request: NextRequest) {
    const stripe = getStripe(),
    id = request?.nextUrl?.searchParams?.get("userId")?.replace(/["\\/]/g, '');

    
    const payment_intent = await prismaDB.userMembership.findMany({
        where : { userId : id }
    });
    
    

    if(payment_intent[0].paymentIntent){

        const paymentIntent = await stripe.paymentIntents.confirm(payment_intent[0].paymentIntent)

        // const refund = await stripe.refunds.create({
        //     payment_intent : payment_intent[0].paymentIntent
        // })
    
        console.log(colors.bgWhite.red("Stripe refund -->"),paymentIntent)
    
        // return new NextResponse(JSON.stringify(refund))

    }   
}