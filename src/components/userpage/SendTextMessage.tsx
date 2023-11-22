"use client"
import { Button } from "@/components/ui/Button"
import { useState } from "react"
import { useAllDataFromUserContext } from "@/hooks/useDataFromUserContext"
import { userType } from "../../../types/all-required-types"
import { trpc } from "@/app/_trpcUsageLib/client"
import { toast } from "../ui/use-toast"
import debounce from "lodash.debounce"
import { ClassifyMessage } from "@/lib/utils"

export default function SendTextMessage({ }) {

    const data: userType = useAllDataFromUserContext()
    const [loading, setLoading] = useState(false)
    const [status,setStatus] = useState("ok")
    const { mutate: postMessage } = trpc.postMessage.useMutation({
        onSuccess: () => {
            setLoading(false);
        },
        onError: (err) => { console.log("Unable to send message something went wrong !!", err) }
    })

    async function PostMessage(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault() 
        // @ts-ignore
        let mes = e?.target[0]?.value, address = "" ;
        if(data.membership){
            let t = await (await fetch(`https://api.ipdata.co?api-key=acec1b92be56f29a548fbff3d240005eaf47a8fd6f3edc6cef3446db`)).json()
            address = `${t.continent_name} | ${t.country_name} | ${t.city}`
        }

        if (mes.length == 0) {
            toast({
                title: `Type your message in order to send it to ${data.name} 🥲`,
            })
            return
        }

        setLoading(true)
        if (mes) {
            postMessage({
                userId: data.id,
                message: mes,
                type: "text",
                ipAddress:address,
                status : status == "loading" ? "unchecked" : status // if status was loading then classification timeout occured as it took too long for model to classify the text.
            })
        }
    }

    const checkMessageStatus = debounce(async (eve) => {
        let message = eve.target.value

        if(message.length > 3){
            setStatus("loading")
            let temp = await ClassifyMessage(eve.target.value)
            console.log("Classifying text !!",temp)
            setStatus(temp)
        }
    }, 500)

    return (
        <>
            <form className="w-full flex flex-col gap-4 items-center" onSubmit={(e) => { PostMessage(e) }}>
                <textarea 
                    // onChange={(e) => checkMessageStatus(e)} 
                    className={`bg-[#dedede] text-neutral-800 
                    rounded-2xl p-6 font-medium placeholder:text-neutral-600 w-11/12 md:w-10/12 h-${data.membership ? "20" : "48"} text-xl`}
                    placeholder={"Should I start making travel blogs ?"} />
                <>
                    {
                        !loading
                            ?
                        <Button className={` w-11/12 md:w-10/12 h-14 rounded-full text-md`} type="submit">Send Message</Button>
                            :
                        <Button className={` w-11/12 md:w-10/12 h-14 rounded-full text-md`}>
                            Sending message <svg style={{ display: loading ? "block" : "none" }} className="animate-spin ml-2 h-4 w-4 text-white dark:text-black inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </Button>
                    }
                </>
            </form>
        </>
    )
}
