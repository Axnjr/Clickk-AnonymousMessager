"use client"
import { Button } from "@/components/ui/Button"
import { useState } from "react"
import { useAllDataFromUserContext } from "@/hooks/useDataFromUserContext"
import { userType } from "../../../types/all-required-types"
import { trpc } from "@/app/_trpcUsageLib/client"

export default function SendTextMessage({  }) {

    const data: userType = useAllDataFromUserContext()
    // const buttonCol = data.backgroundStyles.replace(/(\[|\]|bg-|text-)/g, '').split(" ")
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)
    const { mutate: postMessage } = trpc.postMessage.useMutation({
        onSuccess: () => {
            setSuccess(true);
            setLoading(false);
        },
        onError: (err) => { console.log("Unable to send message something went wrong !!", err) }
    })

    async function PostMessage(e: any) {
        e.preventDefault()
        setLoading(true)
        let mes = e.target[0].value
        if (e.target[0]) {
            postMessage({
                userId: data.id,
                message: mes,
                type: "text"
            })
        }
    }

    return (
        <>
            <form className="w-full flex flex-col items-center" onSubmit={(e) => { PostMessage(e) }}>
                <textarea className={`bg-[#dedede] text-neutral-800 mt-2 
                    rounded-2xl p-6 font-medium placeholder:text-neutral-600 w-10/12 h-${data.membership ? "20" : "48"} text-xl`}
                placeholder={data.question} />
                <>
                    {
                        !loading 
                            ? 
                        <Button  className={`w-10/12 rounded-3xl mt-${data.membership ? "8" : "2"}`} type="submit">Send Message</Button>
                            :
                        <Button  className={`w-10/12 rounded-3xl mt-${data.membership ? "8" : "2"}`}>
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