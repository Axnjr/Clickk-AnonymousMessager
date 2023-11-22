"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { useDataFromUserContext } from "@/hooks/useDataFromUserContext";
import { MessagesType } from "../../../../types/all-required-types";
import { useEffect, useState } from "react"
import { LockClosedIcon } from "@radix-ui/react-icons";
import MapMessage from "@/components/dashboard/MapMessage";
import Advertisement from "@/components/Advertisement";
import useOrSetSearchParams from "@/hooks/useOrSetSearchParams";
import { trpc } from "@/app/_trpcUsageLib/client"
import { Button } from "@/components/ui/Button";
// import { pusherClient } from "../../../../backendLib/pusher";

export default function InboxPage() {

    const [id, skipp] = useOrSetSearchParams()
    const membership = useDataFromUserContext("membership")

    const [messages, setMessages] = useState<MessagesType[]>([])
    
    const [skip, setSkip] = useState<string | null | undefined>(skipp)
    const [total, setTotal] = useState(0) // @ts-ignore
    const { data, isLoading } = trpc.getMessages.useQuery({ userId:id,skip:skip },{
        refetchOnWindowFocus:false
    })

    useEffect(() => { //@ts-ignore
        if (data) {
            const temp = JSON.parse(data)
            setMessages(prev => [...prev,...temp.data])
            setTotal(prev => temp.count)
        }
    }, [data])

    // useEffect(() => {
    //     function messageHandler(mes: any) { setMessages(prev => [...prev, mes]) }

    //     // @ts-ignore
    //     pusherClient.subscribe(id)
    //     pusherClient.bind("message", (mes: any) => messageHandler(mes))

    //     return () => {
    //         // @ts-ignore
    //         pusherClient.unsubscribe(id);
    //         pusherClient.unbind("message", (mes: any) => messageHandler(mes));
    //     }
    // })

    return (
        <>
            <div className="flex flex-col items-center justify-center pb-12">
                <Tabs defaultValue={"text"} className="w-screen h-full mt-16 block">

                    <TabsList className="fixed z-50 bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-fit h-12 text-black bg-white">
                        <TabsTrigger className="ml-3 mr-1 px-3" value="text">Your Inbox {total}</TabsTrigger>
                        {
                            membership
                                ?
                            <TabsTrigger value="voice">Voice Messages</TabsTrigger>
                                :
                            <Advertisement message="Try divine to recive voice messages as well ✨🔥"
                                trigger="Voice Messages"
                                icon={<LockClosedIcon />}
                            />
                        }
                        <Button variant="gentle" disabled={total == messages.length} onClick={() => setSkip(prev => `${messages.length}`)} className="mr-3 ml-1 text-sm font-medium px-3">Load more</Button>
                    </TabsList>

                    <TabsContent className="relative rounded-2xl z-0 w-[96%] m-auto text-black" value="text">
                        <MapMessage membership={membership as string} messages={messages} loading={isLoading} />
                    </TabsContent>
                    <TabsContent className="relative rounded-2xl z-0 w-[96%] m-auto text-black" value="voice">
                        
                    </TabsContent>

                </Tabs>
            </div>
        </>
    )
}