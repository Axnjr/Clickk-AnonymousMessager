import { NextRequest, NextResponse } from "next/server";
import { prismaDB } from "../../../../backendLib/prismaDb";

export async function GET(request: NextRequest) {
    const req = request?.nextUrl?.searchParams?.get("userId")?.replace(/["\\/]/g, '')
    const prop = request?.nextUrl?.searchParams?.get("prop")?.replace(/["\\/]/g, '')

    // to get all analytic data of the specific user
    if(req && !prop){
        return new NextResponse(JSON.stringify( await prismaDB.userAnalytics.findMany({ where : { userId : req } }) ))
    }

    // to increment clicks of the specific user
    if(prop === "clicks" && req){
        try {
            await prismaDB.userAnalytics.updateMany({
                where : { userId:req },
                data : { page_clicks:{increment:1} }
            })
        } catch (error) {  }
    }

    // to see all data for dev mode.
    if(!req || !prop){
        let t = await prismaDB.userAnalytics.findMany()
        return new NextResponse(JSON.stringify({"userId and prop were not provided showing all results":t}))
    }

    return new NextResponse("done",{status:200})
}