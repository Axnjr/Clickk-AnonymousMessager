"use client"
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAllDataFromUserContext } from "./useDataFromUserContext";

export default function useOrSetSearchParams() {
    const router = useRouter()
    const data  = useAllDataFromUserContext()
    const searchParams  = useSearchParams()
          
    const [id,setId] = useState(searchParams?.get("userId"))
    const [skip,setSkip] = useState(searchParams?.get("skip"))

    useEffect(() => {
        if(!id || !skip){ 
            router.push(`?userId=${data.id}&skip=${0}`) 
            setId(prev => data.id)
            setSkip(prev => "0")
        }
    }, [])

    return [id,skip]
}
