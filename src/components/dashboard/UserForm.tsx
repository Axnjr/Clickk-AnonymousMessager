"use client"
import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { UploadToFirebase, DeleteFromFirebase } from "../../lib/firebaseCdnHelper"
import { toast } from "@/components/ui/use-toast"
import Loading from "@/app/loading"
import { ToastAction } from "@/components/ui/toast"
import { useAllDataFromUserContext } from "@/hooks/useDataFromUserContext"
import { trpc } from "@/app/_trpcUsageLib/client"

export default function UserForm() {

    const data = useAllDataFromUserContext()
    const [loading, setLoading] = useState<boolean | "image" | "update">(false)
    const [copyOfData, setCopyOfData] = useState({
        question: data.question,
        image: data.image
    })

    const { mutate : updateUser } = trpc.updateUser.useMutation({
        onSuccess: () => {
            toast({
                title: "All changes saved !",
                description: "You can see your changes here",
                action: <ToastAction altText="Link"><a href={`/${data.name}`}>Link</a></ToastAction>
            })
        },
        onError: () => {
            toast({
                title: "Dang it! something went wrong, try again sorry.",
            })
        }
    });

    async function handleImageChange(e: React.FormEvent<HTMLInputElement>) {
        e.preventDefault();
        setLoading("image")
        DeleteFromFirebase(data.image) // delete the previous image as new is being uploaded .
        // @ts-ignore
        const uploadedFile = e.target.files[0], fileType = uploadedFile.type.split("/")[1]
        const newFileURL = await UploadToFirebase(uploadedFile, fileType)
        setCopyOfData({ ...copyOfData, image: newFileURL })
        setLoading(false)
    }

    async function TriggerUpdateInitiator() {
        setLoading("update");
        await updateUser({ 
            username : data.name,
            what : "content",
            json : copyOfData 
        })
        setLoading(false)
    }

    return (
        <>
            <section className="w-full h-fit rounded-3xl pt-4 pb-8 flex flex-col items-center justify-center
            gap-2 bg-white/50 backdrop-blur-sm">
                <label className="cursor-pointer">
                    <input type="file" accept="image" className="hidden" onChange={(e) => handleImageChange(e)} />
                    <div className="w-fit h-fit flex flex-col items-center justify-center text-center">
                        {
                            loading === "image" ? <Loading className="w-28 h-28 xl:w-32 xl:h-32 border-2 border-[#d4ff00] rounded-full" type="small" message="" />
                                :
                            <img className="w-28 object-cover object-center h-28 xl:w-32 xl:h-32 border-2 border-[#bbff46] rounded-full shadow-2xl" src={copyOfData.image} alt={data.name} />
                        }
                    </div>
                </label>
                <h1 className="text-7xl font-bold tracking-tighter m-4 capitalize">{data.name}</h1>
                <textarea id="ques" className="w-10/12 overflow-y-hidden h-14 max-h-fit xl:h-16 font-medium text-lg border xl:text-2xl bg-white p-4 rounded-2xl placeholder:text-neutral-700 text-center"
                    value={copyOfData.question ? copyOfData.question : "Your note : Send me a annoymous message 🤟"}
                    onChange={(e) => {
                        setCopyOfData({ ...copyOfData, question: e.target.value })
                    }} />
                <Button onClick={() => { TriggerUpdateInitiator() }}
                    disabled={loading === "update" || false ? true : false}
                    className="xl:text-lg mt-4 font-semibold">
                    Save Changes <svg style={{ display: loading === "update" ? "block" : "none" }} className="animate-spin ml-2 h-4 w-4 text-white dark:text-black inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </Button>
            </section>
        </>
    )
}