import Loading from "@/app/loading"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/Dialog"
import { Button } from "../ui/Button";
import { MessagesType } from "../../../types/all-required-types"
import { ChatBubbleIcon } from "@radix-ui/react-icons";
import MessageTrigger from "../MessageTrigger";
import Link from "next/link";

export default function MapMessage({ loading, messages, membership } : { loading: boolean, messages: MessagesType[], membership : string }) {
    return (
        <div className="relative rounded-2xl h-fit z-0 w-full text-black">
            {
                loading 
                    ? 
                <Loading className="mt-20" type="medium" message="Getting your messages ..." />
                    :
                <>
                    {
                        messages.length > 0 ?  messages.map((mes, id) => {  // @ts-ignore
                            if (mes.text_message != null) {
                                return <Dialog key={id}>
                                    <MessageTrigger mes={mes}/>
                                    <DialogContent className="p-8 pt-12 rounded-2xl">
                                        <DialogTitle className="text-lg tracking-normal font-medium text-neutral-700">
                                            <span className="text-black font-semibold block">Complete Message: </span>
                                            {mes.text_message}
                                        </DialogTitle>    
                                        
                                        <p className="text-black text-sm font-semibold">
                                            Recived on <span className="text-purple-600">{mes.timestamp}</span> | 
                                            <span className={`${(mes.status == "neutral" || "ok") && "text-green-500"} ${mes.status == "negative" && "text-red-500"}`}>
                                                {
                                                    mes.status === "unchecked" 
                                                        ? 
                                                    <span> This message was not spam checked 😥</span>
                                                        :
                                                    ` Seems ${mes.status}`
                                                }
                                            </span>
                                        </p>
                                        {
                                            membership 
                                                ? 
                                            <p>
                                                {mes.hints}
                                            </p>
                                                :
                                            <Button>
                                                <Link href={"/plans"}>Get Hints</Link>
                                            </Button>
                                        }
                                    </DialogContent>
                                </Dialog>
                            }
                        })
                            :
                        <div className="w-full h-[80vh] font-semibold tracking-tight mt-2 grid place-content-center place-items-center bg-white rounded-xl m-auto text-center">
                            <ChatBubbleIcon className="w-8 h-8 m-4"/>
                            No meesages yet, Share your page link in order to recive messages.
                        </div>
                    }
                </>
            }
        </div>
    )
}