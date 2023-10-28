import { NextResponse, NextRequest } from "next/server";
import colors from "colors";
import { prismaDB } from "../../../../backendLib/prismaDb";

export async function GET(request: NextRequest) {
    return new NextResponse(JSON.stringify(await prismaDB.user.findMany()))
}