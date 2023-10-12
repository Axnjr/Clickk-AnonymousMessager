"use client"
import { IntitiateUpdate, cn } from "../../lib/utils"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { Button } from "../ui/Button"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { InfoCircledIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { useAllDataFromUserContext } from "@/hooks/useDataFromUserContext"
import { themes } from "./ArraysToBeMapped"

export default function Themes() {
    const data = useAllDataFromUserContext()
    const [userBg,setUserBg] = useState(data.backgroundStyles as string)
    const [loading,setLoading] = useState(false)
    const { toast } = useToast()

    async function UpdateTheme() {
        setLoading(true)
        await IntitiateUpdate(data.name, "theme", userBg)
        .then(() => toast({
            title:"Your new theme saved succesfully ✨🤟",
            action:<ToastAction altText="Great!!"><a href={`/${data.name}`}>Go to your page</a></ToastAction>
        }))
        .catch(() => {toast({
            title:"Dang it! Unable save changes, something went wrong 😑☠️",
            variant:"destructive"
        })})
        setLoading(false)
    }

    return (
        <div className="m-auto w-full flex flex-col gap-2 items-center p-12 bg-white rounded-3xl">
            <div className="mt-2 mb-10 text-center">
                <p className="text-6xl font-semibold tracking-tighter">Themes</p>
                <p className="text-xs m-4 font-normal flex items-center"><InfoCircledIcon/>&nbsp; Changes you make wont be applied unless you save your changes</p>
                <Button className="m-4" onClick={() => UpdateTheme()} disabled={loading}>
                    Save Theme <svg style={{ display: loading ? "block" : "none" }} className="animate-spin ml-2 h-4 w-4 text-white dark:text-black inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </Button>
            </div>
            <div className="flex flex-wrap gap-6 items-center justify-center w-full h-full">
                <section className="">
                    <Checkbox className={cn("w-48 h-64 rounded-xl bg-stone-400 border-2 border-black border-dashed flex items-center justify-center")}/>
                    <p className="text-center m-4 tracking-tight">Custom theme</p>
                </section>
                {
                    themes.map((theme, id) => {
                        return <section key={id} className="">
                            <Checkbox className={cn(`w-48 h-64 rounded-xl border-2 text-black
                            border-neutral-400 flex items-center justify-center`, theme.bg)}
                            checked={theme.bg === userBg ? true : false} 
                            onClick={() => setUserBg(theme.bg)}
                            />
                            <p className="text-center m-4 tracking-tight">{theme.name}</p>
                        </section>
                    })
                }
                <Button className="m-8" onClick={UpdateTheme} disabled={loading}>
                    Save Theme <svg style={{ display: loading ? "block" : "none" }} className="animate-spin ml-2 h-4 w-4 text-white dark:text-black inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </Button>
            </div>
        </div>
    )
}