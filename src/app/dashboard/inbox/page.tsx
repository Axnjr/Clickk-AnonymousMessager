"use client";
import { useEffect, useState } from "react"
import { useSearchParams } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { pusherClient } from "@/lib/pusher";
import { MessagesType } from "@/types/all-required-types";
import { Fetcher } from "@/lib/utils";
import MapMessage from "@/components/dashboard/MapMessage";
import { useSession } from "next-auth/react";
// useEffect(() => {
    //     // @ts-ignore
    //     pusherClient.subscribe(userID)
    //     pusherClient.bind("message", (mes: any) => messageHandler(mes))
    //     return () => {
    //         // @ts-ignore
    //         pusherClient.unsubscribe(userID);
    //         pusherClient.unbind("message", (mes: any) => messageHandler(mes));
    //     }
    // function messageHandler(mes: any) { setMessages(prev => [...prev, mes]) }
    // });
   
export default function InboxPage() {
    const searchParams = useSearchParams()

    let userID = searchParams?.get("id"),
        tab = searchParams?.get("tab"),
        resType = searchParams?.get("res")
    ;

    const [messages, setMessages] = useState<MessagesType[]>([])
    const [loading, setLoading] = useState(false)
    const [skip, setSkip] = useState(0)
    const [total, setTotal] = useState(0)

    // - Working here
    // useEffect(() => {
    //     if(!userID){
    //         let { data: session, status } = useSession()
    //     }
    // }, [])

    useEffect(() => {
        (async () => {
            setLoading(true)
            let t = await Fetcher(`/api/queryMessages?userId=${userID}&skip=${skip}`)
            setTotal(t.count)
            tab == "text" || "spam" || "voice" ? tab : null
            setMessages(prev => [...prev,...t.data])
            setLoading(false)
        })();
    }, [skip])

    return (
        <div className="flex flex-col items-center justify-center pb-12 ">
            {/* <section className=""> */}
                <Tabs defaultValue={tab ? tab : "text"} className="w-screen h-full mt-20 block">
                    <TabsList className="fixed z-50 bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit h-12 text-black bg-white">
                        <TabsTrigger className="ml-3 mr-1 px-3" value="text">Your Inbox {total}</TabsTrigger>
                        <TabsTrigger className="mx-1 px-3" value="spam">Spam</TabsTrigger>
                        <TabsTrigger disabled={false} className="mx-1 px-3" value="voice">Voice Messages</TabsTrigger>
                        <button onClick={() => setSkip(messages.length) } className="mr-3 ml-1 text-sm font-medium px-3 rounded-2xl">Load more</button>
                    </TabsList>
                    <TabsContent className="relative rounded-2xl z-0 w-[96%] m-auto text-black" value="text">
                        <MapMessage messageType={["ok", "neutral"]} messages={messages} loading={loading} />
                    </TabsContent>
                    <TabsContent className="relative rounded-3xl z-0 w-[96%] m-auto text-black" value="spam">
                        <MapMessage messageType={["negative"]} messages={messages} loading={loading} />
                    </TabsContent>
                    <TabsContent className="relative rounded-2xl z-0 w-[96%] m-auto text-black" value="voice">
                        <MapMessage messageType={["voice"]} messages={messages} loading={loading} />
                    </TabsContent>
                </Tabs>
            {/* </section> */}
        </div>
    )
}