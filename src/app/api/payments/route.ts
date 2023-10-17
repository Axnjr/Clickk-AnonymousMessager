import getStripe from "../../../lib/getStripe"
import { NextResponse, NextRequest } from "next/server";

export async function GET(request : NextRequest) {
    const stripe = getStripe();
    const planID = request?.nextUrl?.searchParams?.get("planID")?.replace(/["\\/]/g, '');

    const session = await stripe.checkout.sessions.create({
        line_items:[{
            price:planID,
            quantity: 1
        }],
        mode: "payment",
        success_url: 'http://localhost:3000/dashboard?divine=true',
        cancel_url: 'http://localhost:3000/plans?error=true'
    })

    console.log("SRTPE TRPC ---->",session.url)

    return new NextResponse(JSON.stringify({URL:session.url}))
}