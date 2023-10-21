"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { useDataFromUserContext } from "@/hooks/useDataFromUserContext";
import { MessagesType } from "../../../../types/all-required-types";
import { useEffect, useState } from "react"
import { InfoCircledIcon, LockClosedIcon } from "@radix-ui/react-icons";
// import { pusherClient } from "../../../../backendLib/pusher";
import MapMessage from "@/components/dashboard/MapMessage";
import Advertisement from "@/components/Advertisement";
import useOrSetSearchParams from "@/hooks/useOrSetSearchParams";
import { trpc } from "@/app/_trpcUsageLib/client"

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
    const [id,skipp] = useOrSetSearchParams()
    const membership = useDataFromUserContext("membership")
    const [messages, setMessages] = useState<MessagesType[]>([])
    const [skip, setSkip] = useState<string | null>(skipp ? skipp : "0")
    const [total, setTotal] = useState(0) // @ts-ignore
    const { data, isLoading } = trpc.getMessages.useQuery({ userId:id, skip:skip })

    useEffect(() => { //@ts-ignore
        if(data) { 
            const temp = JSON.parse(data)
            setMessages(prev => [...prev,...temp.data]) 
            setTotal(prev => temp.count)
        }
    }, [data])

    return (
        <>
            <div className="flex flex-col items-center justify-center pb-12">
                <Tabs defaultValue={"text"} className="w-screen h-full mt-12 block">
                    <TabsList className="fixed z-50 bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit h-12 text-black bg-white">
                        <TabsTrigger className="ml-3 mr-1 px-3" value="text">Your Inbox {total}</TabsTrigger>
                        <TabsTrigger className="mx-1 px-3" value="spam">Spam</TabsTrigger>
                        {
                            membership 
                                ? 
                            <TabsTrigger value="voice">Voice Messages</TabsTrigger>
                                :
                            <Advertisement message="Try divine to recive voice messages as well ✨🔥" 
                                trigger="Voice Messages" 
                                icon={<LockClosedIcon/>}
                            />
                        }
                        <button onClick={() => setSkip(prev => `${messages.length}`)} className="mr-3 ml-1 text-sm font-medium px-3 rounded-2xl">Load more</button>
                    </TabsList>
                    <TabsContent className="relative rounded-2xl z-0 w-[96%] m-auto text-black" value="text">
                        <MapMessage messageType={["ok","neutral","unchecked"]} messages={messages} loading={isLoading} />
                    </TabsContent>
                    <TabsContent className="relative rounded-3xl z-0 w-[96%] m-auto text-black" value="spam">
                        <MapMessage messageType={["negative"]} messages={messages} loading={isLoading} />
                    </TabsContent>
                    <TabsContent className="relative rounded-2xl z-0 w-[96%] m-auto text-black" value="voice">
                        <MapMessage messageType={["voice"]} messages={messages} loading={isLoading} />
                    </TabsContent>
                </Tabs>
                <p style={{display:isLoading ? "none" : "flex"}} className="mt-12 px-2 rounded-xl p-1 mb-8 text-xs font-medium tracking-tight flex items-center justify-start text-left">
                    <InfoCircledIcon className="mr-2" />All messages delete automatically within 24 hrs after being read.
                </p>
            </div>
        </>
    )
}