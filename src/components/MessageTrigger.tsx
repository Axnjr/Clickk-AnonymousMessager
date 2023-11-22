import { DialogTrigger } from "@/components/ui/Dialog"
import { MessagesType } from "../../types/all-required-types";

export default function MessageTrigger({ mes }: { mes: MessagesType }) {

    const toxicSentiments = ["embarrassment", "disgust", "disappointment", "annoyance", "anger", "negative"]
    let endChar = `${mes.text_message}`.length < 37 ? "" : ".........";  // used template litrals to avoid typescript error.
    let spamBoolean = toxicSentiments.includes(mes.status as string);

    return (
        <DialogTrigger className={`w-full max-h-fit px-4 h-fit rounded-xl my-2 flex items-center justify-between
            border-b border-neutral-300 text-left py-6 backdrop-blur-sm hover:scale-[1.005] bg-white`}>
            {
                mes.type === "text"
                    ?
                <p className={`text-sm w-4/5 text-neutral-700 font-medium tracking-wide capitalize `}>
                    <span 
                    className={`${spamBoolean ? "blur-sm" : "blur-none"}`}
                    >{`${mes.text_message}`.slice(0, 37)} <span >{endChar}</span></span>
                </p>
                    :
                <audio src={mes.text_message ? mes.text_message : ""} controls />
            }
            <span className="text-[10px] font-mono tracking-tighter border border-black rounded-lg px-2 ">{mes.timestamp}</span>
        </DialogTrigger>
    )
}