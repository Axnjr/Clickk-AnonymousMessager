import { NextRequest, NextResponse } from "next/server";
import { prismaDB } from "../../../../backendLib/prismaDb";
import { DeleteFromFirebase } from "../../../../lib/firebaseCdnHelper";

export async function GET(request: NextRequest) {
    const req = request?.nextUrl?.searchParams?.get("username")?.replace(/["\\/]/g, '')
    if (req) {
        const userCheck = await prismaDB.user.findUnique({ where: { name: req } })
        if (userCheck) return new NextResponse(JSON.stringify({ data: userCheck }))
        else return new NextResponse(JSON.stringify({ data: "User not found" }))
    }
    else if(!req){
        const allUsers = await prismaDB.user.findMany()
        return new NextResponse(JSON.stringify({ allUsers }))    
    }
}

export async function POST(request: NextRequest) {
    const req = request?.nextUrl?.searchParams?.get("username")?.replace(/["\\/]/g, '')
    const req2 = request?.nextUrl?.searchParams?.get("what")?.replace(/["\\/]/g, '')
    const json = await request.json();

    if(req2 === "content"){
        await prismaDB.user.updateMany({
            where : { name: req },
            data : { ...json }
        })
    }
    if(req2 === "theme") {
        await prismaDB.user.updateMany({
            where : { name : req },
            data : { backgroundStyles:json.data }
        })
    }

    return new NextResponse("done", { status: 200 })
}

export async function DELETE(request : NextRequest){
    const req = request?.nextUrl?.searchParams?.get("username")?.replace(/["\\/]/g, ''),
    imgURL = request?.nextUrl?.searchParams?.get("img")?.replace(/["\\/]/g, '');
    try {
        if(imgURL) await DeleteFromFirebase(imgURL)
        await prismaDB.user.delete({ where : { name : req } })
        return new NextResponse("user deleted",{status:200})
    } 
    catch (error) {
        return new NextResponse("enable to delete user",{status:500})
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