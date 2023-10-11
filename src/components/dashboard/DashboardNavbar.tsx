"use client";
import { Button } from "@/components/ui/Button"
import { Share2Icon } from "@radix-ui/react-icons"
import Link from 'next/link'
import Profile from '@/components/Profile'
// import { GetUserDetails } from "@/lib/utils"
// import { userType } from "@/types/all-required-types"
import { useContext } from "react"
import { DataContext } from "@/providers/FetchedDataProvider"

export default async function DashboardNavbar() {

    // const user : userType = await GetUserDetails()
    const { data: user } = useContext(DataContext)

    return (
        <nav className="h-16 xl:h-20 w-screen m-auto bg-white shadow-2xl border border-neutral-300 z-50
            text-neutral-600 flex items-center justify-between fixed top-0 left-1/2 -translate-x-1/2">
            <div className='flex items-center ml-2'>
                <a href='/dashboard' className="flex items-center cursor-pointer mx-6 xl:text-2xl text-black">
                    <h1 className="text-2xl xl:text-3xl font-black tracking-tighter">&nbsp;Clickk</h1>
                </a>
                &nbsp;|&nbsp;
                <Button variant="link" className='font-semibold rounded-lg mx-1 text-md tracking-tight xl:text-xl'>
                    <Link href={`/${user ? user.name : ""}`}>Live</Link>
                </Button>
                <Button variant="link" className='font-semibold text-md rounded-lg mx-1 tracking-tight xl:text-xl'>
                    <Link href={`/dashboard`}>Inbox</Link>
                </Button>
            </div>
            <div className="flex items-center mr-2">
                <Button className="font-bold bg-[#d4ff00] text-black rounded-full text-md tracking-tight xl:text-xl">
                    <Share2Icon className='mr-1 ml-0' />
                    Share
                </Button>
                <Button variant="fancy" className="font-medium ml-2 mr-4 text-md tracking-tight rounded-lg px-4 py-1">Go divine ✨</Button>
                <Profile ProfileImage={user.image} />
            </div>
        </nav>
    )
}
