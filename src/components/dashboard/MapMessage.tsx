"use client";
import Loading from "@/app/loading"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog"
import { Button } from "../ui/Button";
import { MessagesType } from "../../../types/all-required-types"
import { TrashIcon } from "@radix-ui/react-icons";
import { useToast } from "@/components/ui/use-toast"

export default function MapMessage({ loading, messages, messageType } : { loading: boolean, messages: MessagesType[], messageType: string[] }) {
    
    const { toast } = useToast()
    async function MoveToSpam(id:string) {
        await fetch(`/api/queryMessages?messageId=${id}`,{
            method:"PUT",
        })
        .then(() => toast({
            title:"Moved to spam ",
        }))
        .catch(() => toast({
            title:"Something went wrong while moving it to spam ☠️"
        }))
    }

    return (
        <div className="relative rounded-2xl h-fit z-0 w-full text-black">
            {
                loading ? <Loading className="mt-20" type="medium" message="Getting your messages ..." />
                    :
                <>
                {
                messages.map((mes, id) => {  // @ts-ignore
                    if ((messageType.includes(mes.status) || messageType.includes(mes.type)) && mes.text_message != null) {
                        const endChar = mes.text_message.length < 100 ? "" : "....";
                        return <Dialog key={id}>
                            <DialogTrigger className={`w-full max-h-fit p-4 h-fit rounded-xl my-2 flex items-center justify-between
                                border-b border-neutral-300 text-left hover:border hover:border-[#d4ff00] bg-white`}>
                                {
                                    mes.type === "text"
                                        ?
                                    <p className={`text-sm w-4/5 text-neutral-700 font-medium tracking-wide capitalize`}>
                                        {
                                            mes.status === "unchecked" ? "Spam not checked for this message"
                                                :
                                            <span>{id}.&nbsp;{mes.text_message.slice(0, 100)} <span>{endChar}</span></span>
                                        }
                                    </p>
                                        :
                                    <audio src={mes.text_message ? mes.text_message : ""} controls />
                                }
                                <span className="text-[10px] font-mono tracking-tighter border border-[#d4ff00] bg-black rounded-xl px-2 text-[#d4ff00]">{mes.timestamp}</span>
                            </DialogTrigger>
                            <DialogContent className="p-8 pt-12 rounded-2xl">
                                <DialogHeader>
                                    <DialogTitle className="text-lg tracking-normal font-medium text-neutral-700">
                                        <span className="text-black font-semibold block">Complete Message: </span>
                                        {mes.text_message}
                                        <br/>
                                        <br/>
                                        <span className="text-black text-sm font-semibold">
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
                                        </span>
                                    </DialogTitle>
                                </DialogHeader>
                                <DialogFooter>
                                    {
                                        mes.status != "negative" && <Button onClick={() => {
                                            mes.status = "negative"
                                            MoveToSpam(mes.id)
                                        }} variant="destructive" className="">
                                            Move to spam <TrashIcon/>
                                        </Button>
                                    }
                                    <Button variant="fancy" className="">Get hints ✨</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    }
                })}
            </>
        }
    </div>
)}