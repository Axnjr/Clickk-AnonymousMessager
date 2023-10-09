"use client"
import { IntitiateUpdate, cn } from "@/lib/utils"
import { Checkbox } from "../ui/checkbox"
import { useState, useContext } from "react"
import { Button } from "../ui/Button"
import { useToast } from "@/components/ui/use-toast"
import { DataContext } from "@/providers/FetchedDataProvider"
import { ToastAction } from "../ui/toast"

const themes = [
    {
        name: "Default White",
        bg: "bg-white text-black",
        // bs:"bg-black"
    },
    {
        name: "Blue",
        bg: "bg-gradient-to-t from-blue-500 to-blue-700 text-white",
        // bs:"bg-white"
    },
    {
        name: "Fancy Red",
        bg: "bg-[#c41500] text-amber-600",
        // bs:"bg-white"
    },
    {
        name: "Rose",
        bg: "bg-gradient-to-b from-rose-300 to-red-400 text-black",
        // bs: "bg-lime-400"
    },
    {
        name: "Stone",
        bg: "bg-gradient-to-t from-stone-500 to-black text-white",
        // bs:"bg-white"
    },
    {
        name: "Green",
        bg: "bg-gradient-to-t from-green-500 to-green-700 text-pink-500",
        // bs:"bg-pink-500"
    },
    {
        name: "Black",
        bg: "bg-black text-white"
    },
    {
        name: "Orange",
        bg: "bg-gradient-to-br from-orange-400 to-amber-500"
    },
    {
        name: "Red",
        bg: "bg-gradient-to-br from-red-500 to-red-600"
    },
    {
        name: "Rose Blue",
        bg: "bg-gradient-to-t from-rose-500 to-blue-500"
    },
    {
        name: "Teal Red",
        bg: "bg-gradient-to-tr from-teal-400 to-rose-200"
    },
    {
        name: "Red Purple",
        bg: "bg-gradient-to-bl from-red-700 to-purple-600"
    },
    {
        name: "Purple Amber",
        bg: "bg-gradient-to-tr from-purple-500 to-amber-400"
    },
    
    {
        name: "Yellow Pink",
        bg: "bg-gradient-to-b from-yellow-500 to-pink-200"
    },
    {
        name: "Lime",
        bg: "bg-gradient-to-bl from-lime-400 to-amber-50"
    },
    {
        name: "Violet Cyan",
        bg: "bg-gradient-to-br from-violet-500 to-cyan-400"
    },
    // {
    //     name: "Image test",
    //     bg: "bg-[url('https://firebasestorage.googleapis.com/v0/b/axn-myportfolio.appspot.com/o/9yy32.webp?alt=media&token=d6fdf07a-8641-4672-8d43-c6fee84f8451')] bg-cover bg-center"
    // },
]

export default function Themes() {
    const { data } = useContext(DataContext)
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
                <p className="text-xs m-4 font-normal">Changes you make wont be applied unless you save your changes</p>
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