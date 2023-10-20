import { NextRequest, NextResponse } from "next/server";
import { prismaDB } from "../../../../backendLib/prismaDb";

export async function GET(request: NextRequest) {
    const req = request?.nextUrl?.searchParams?.get("name")?.replace(/["\\/]/g, '')
    const check = await prismaDB.user.findMany({ where : { name : req } })
    if (check.length === 0) return new NextResponse("ok")
    else return new NextResponse("no")
}