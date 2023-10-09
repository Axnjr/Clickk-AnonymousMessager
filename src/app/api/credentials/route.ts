import { NextRequest, NextResponse } from "next/server";
import { prismaDB } from "@/lib/prismaDb";

export async function GET(request: NextRequest) {
    const req = request?.nextUrl?.searchParams?.get("username")?.replace(/["\\/]/g, '')
    try {
        let t = await prismaDB.user.findMany({
            where:{
                name:req
            }
        })
        return new NextResponse(JSON.stringify({
            id:t[0].id,
            res:t[0].responseType
        }))
    } catch (error) {
        return new NextResponse("error",{status:500})
    }
}