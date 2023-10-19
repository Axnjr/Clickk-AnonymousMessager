"use client";
import { notFound } from "next/navigation";
import { pageProps, userType } from "../../../../types/all-required-types";
import { prismaDB } from "../../../../backendLib/prismaDb";
import getStripe from "@/lib/getStripe";
import { Button } from "@/components/ui/Button";
import { Fetcher } from "@/lib/utils";

export default async function OnboardingPage({ params, searchParams } : pageProps) {

    const user_id = `${params["user"]}`
    // const data : userType[] | any = await prismaDB.user.findMany({ where: { id : user_id } })
    // if (!data[0]) { notFound() }

    async function handleRefund() {
        let t = await Fetcher(`/api/payments?userId=${user_id}`,"POST")
        console.log(t)
    }

    return (
        <>
            <div>You have got {JSON.stringify(searchParams)} succesfully enjoy !!</div>
            <Button onClick={() => handleRefund()} >Cancel subscription</Button>
        </>
    )
}
