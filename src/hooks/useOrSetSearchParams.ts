"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { useDataFromUserContext } from "./useDataFromUserContext";
import { useEffect } from "react";

export default function useOrSetSearchParams() {
    const searchParams = useSearchParams()
    const signedInUserId = useDataFromUserContext("id")
    const router = useRouter()

    let id = searchParams?.get("id")
    // if given in search-params then ok else 0.
    let skip = searchParams?.get("skip") ?? "0" 

    if(id){
        return [id,skip]
    }

    useEffect(() => {
        router.push(`?userId=${signedInUserId}&skip=${skip}`)
    }, [])

    return [signedInUserId,skip]
}