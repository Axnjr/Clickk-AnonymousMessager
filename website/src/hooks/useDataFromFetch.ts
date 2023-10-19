"use client"
import { useEffect, useState } from "react";

export default function useDataFromFetch(url: string, query: string | null | undefined, status?: string) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true)

    async function HookFetchHelper() {
        const userData: any = await (await fetch(`${url}=${query}`)).json()
        setData(userData.data)
        setLoading(false)
    }

    useEffect(() => {
        if (status === "authenticated") HookFetchHelper()
    }, [status,query])

    return [data, loading]
}

 // const [data,setData] = useState({
    //     "id": "clmo8773i0000w670a2e8vjor",
    //   "name": "yakshit chhipa",
    //   "email": "yakshitchhipa@gmail.com",
    //   "emailVerified": null,
    //   "backgroundStyles": "bg-gradient-to-tr from-teal-400 to-rose-200",
    //   "buttonStyles": "",
    //   "question": "This, is the fourthhhhhhhhhhhhh time from the time I started counting, I have changed this question .......",
    //   "responseType": null,
    //   "extra_param1": "0,0,0,0",
    //   "image": "https://firebasestorage.googleapis.com/v0/b/axn-myportfolio.appspot.com/o/46grr.png?alt=media&token=7ed10cc3-b066-46f6-9a54-c8d72c7879d3"
    // })






