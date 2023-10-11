"use client"
import { useEffect, useState, useContext } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { DataContext } from "@/providers/FetchedDataProvider"

export default function useOrSetSearchParams() {
    const router = useRouter()
    const { data } = useContext(DataContext)
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

    return [id,skip,data.responseType]
}
