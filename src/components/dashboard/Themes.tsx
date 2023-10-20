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
    const membership = data.membership
    const [userBg, setUserBg] = useState(data.backgroundStyles as string) // "bg-white text-black"
    const [loading, setLoading] = useState(false)
    const { toast } = useToast()

    function GetColorsOutOfString(what: "bg" | "col", theme?:string) {
        if(!theme) { theme = userBg }
        const t = theme.replace(/(\[|\]|bg-|text-|from-)/g, '').split(" ")
        return what === "bg" ? t[0] : t[1]
    }

    async function UpdateTheme() {
        setLoading(true)
        var dataToBeUpdated;
        await IntitiateUpdate(data.name, "theme", userBg)
            .then(() => toast({
                title: "Your new theme saved succesfully ✨🤟",
                action: <ToastAction altText="Great!!"><a href={`/${data.name}`}>Go to your page</a></ToastAction>
            }))
            .catch(() => {
                toast({
                    title: "Dang it! Unable save changes, something went wrong 😑☠️",
                    variant: "destructive"
                })
            })
        setLoading(false)
    }

    return (
        <div className="m-auto w-full flex flex-col gap-2 items-center p-12 bg-white rounded-3xl">
            <div className="mt-2 mb-10 text-center">
                <p className="text-6xl font-semibold tracking-tighter">Themes</p>
                <p className="text-xs m-4 font-normal flex items-center"><InfoCircledIcon />&nbsp; Changes you make wont be applied unless you save your changes</p>
            </div>
            <div className="flex flex-wrap gap-4 items-center justify-center w-full h-full">
                <section className="relative">
                    <Checkbox className={`w-40 h-52 rounded-xl bg-neutral-400 border-2
                    border-black border-dashed flex items-center justify-center`} />
                    <p className="text-center m-4 tracking-tight">Custom theme</p>
                </section>
                {
                    themes.map((theme, id) => {
                        let d =(membership != "divine" && theme.type == "normal") ? false : true;
                        return <section  style={{opacity:d ? "0.6" : "1"}} key={id} className="relative">
                            <Checkbox className={cn(`w-40 h-52 rounded-xl border-2
                                border-neutral-400 flex items-center justify-center`, theme.bg)}
                                checked={theme.bg === userBg ? true : false}
                                disabled={d}
                                onClick={() => setUserBg(theme.bg)}
                            />
                            <div className={`absolute my-2 bottom-12 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl w-11/12 h-6 bg-${theme.col}`}></div>
                            <p className="text-center m-4 tracking-tight flex justify-center items-center">
                                {d ? <>{theme.name}<LockClosedIcon className="ml-2" fill="black" /></> : theme.name}
                            </p>
                        </section>
                    })
                }
                <section className="pt-12 mt-12 w-full flex items-center gap-2 justify-center border-t-2">
                    <input type="color" className="style1 w-14 h-14" value={GetColorsOutOfString("bg") as string}
                    onChange={(e) => setUserBg(`bg-[${e.target.value}] text-[${GetColorsOutOfString("col")}]`)} />
                    <p className="text-center text-sm xl:text-lg font-semibold">Bg color</p>
                    <p className="text-2xl font-light">|</p>
                    <p className="text-center text-sm xl:text-lg font-semibold">Text color</p>
                    <input type="color" className="style1 w-14 h-14" value={GetColorsOutOfString("col") as string}
                    onChange={(e) => setUserBg(`bg-[${GetColorsOutOfString("bg")}] text-[${e.target.value}]`)} />
                </section>
                <Button className="m-8" onClick={() => UpdateTheme()} disabled={loading}>
                    Save Theme <svg style={{ display: loading ? "block" : "none" }} className="animate-spin ml-2 h-4 w-4 text-white dark:text-black inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </Button>
            </div>
        </div>
    )
}