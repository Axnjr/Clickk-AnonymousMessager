import { Fetcher } from "../lib/utils";
import { MessagesType } from "../../types/all-required-types";
import { useEffect, useState } from "react";

export default function useMessages(id:string | null){
    const[data,setData] = useState<MessagesType[]>([])
    const[error,setError] = useState(false)
    const[loading,setLoading] = useState(true)

    async function FetchData() {
        try {
            const temp = await Fetcher(`/api/queryMessages?username=${id}`)   
            setData(temp)
            setLoading(false)
        } catch (error) {
            setError(true)
        }
    }

    useEffect(() => {
        FetchData()
    }, [])

    return [data,setData,loading,error]
}
