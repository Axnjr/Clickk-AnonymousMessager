"use client"
import { Button } from "@/components/ui/Button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog"
import { Fetcher } from "../lib/utils"
import { useState } from "react"
import { useAllDataFromUserContext } from "@/hooks/useDataFromUserContext"
import { userType } from "../../types/all-required-types"

export default function SendTextMessage() {
    const data : userType = useAllDataFromUserContext()
    // const buttonCol = data.backgroundStyles.replace(/(\[|\]|bg-|text-)/g, '').split(" ")
    const [success, setSuccess] = useState(false)
    const [loading, setLoading] = useState(false)

    async function PostMessage(e: any) {
        e.preventDefault()
        setLoading(true)
        let mes = e.target[0].value
        if (e.target[0]) {
            await Fetcher(`/api/queryMessages?message=${mes}&userId=${data.id}&type="text"`,"POST")
            .then(() => { setSuccess(true) ; setLoading(false) })
            .catch(() => { console.log("Unable to send message something went wrong !!") })
        }
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild >
                    <button className="m-2 w-fit h-12 text-lg font-medium rounded-xl">Send Text Message</button>
                </DialogTrigger>
                <DialogContent className="w-3/2 border border-white text-center">
                    {
                        success ? <h1 className="inline-block text-2xl tracking-tighter font-semibold">Your message sent successfully 😆↗️📫🙂</h1>
                            :
                        <>
                            <DialogHeader>
                                <DialogTitle>Send me anonymous message</DialogTitle>
                                <DialogDescription>Messages are enabled with toxicity & spam detection AI,<br /> be nice 🤗</DialogDescription>
                            </DialogHeader>
                            <form onSubmit={(e) => { PostMessage(e) }}>
                                <textarea className="h-48 placeholder:text-neutral-600 focus:outline-none w-full bg-zinc-200/50 backdrop-blur-sm rounded-xl border p-4 font-medium text-lg"
                                    placeholder={data.question} />
                                <DialogFooter className="text-center inline-block">
                                    {
                                        !loading && <Button className="text-center w-full" type="submit">Send Message</Button>
                                    }
                                    {
                                        loading && <Button className="text-center w-full flex items-center">
                                            Sending message <svg style={{ display: loading ? "block" : "none" }} className="animate-spin ml-2 h-4 w-4 text-white dark:text-black inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                        </Button>
                                    }
                                </DialogFooter>
                            </form>
                        </>
                    }
                </DialogContent>
            </Dialog>
        </>
    )
}