import { NextRequest, NextResponse } from "next/server";
import { prismaDB } from "@/lib/prismaDb";
// var colors = require("colors")

export async function GET(request: NextRequest) {
    const req = request?.nextUrl?.searchParams?.get("username")?.replace(/["\\/]/g, '')
    if(req){
        try {
            let t = await prismaDB.user.findMany({
                where:{
                    name:req
                }
            })
            console.log(t)
            return new NextResponse(JSON.stringify({
                id:t[0].id,
                res:t[0].responseType
            }))
        } catch (error) {
            console.log(error)
            return new NextResponse("error",{status:500})
        }
    }
    else return new NextResponse("dang it !!")
}