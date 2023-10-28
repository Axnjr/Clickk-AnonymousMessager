"use client";
import { Button } from "@/components/ui/Button"
import { Share2Icon, ArrowRightIcon } from "@radix-ui/react-icons"
import Link from 'next/link'
import Profile from '@/components/Profile'
import { useAllDataFromUserContext } from "@/hooks/useDataFromUserContext";
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Navbar({ toBeUsedAt }: { toBeUsedAt?: "dashboard" | "home" }) {

    const user = useAllDataFromUserContext()
    const { data: session, status } = useSession()
    const username = session?.user?.name

    console.log(session)

    return (
        <nav className="w-[96%] max-w-[1450px] m-auto shadow-2xl bg-white border border-neutral-300 z-50
            text-neutral-600 fixed top-4 left-1/2 -translate-x-1/2 flex justify-between rounded-xl backdrop-blur-2xl h-16 xl:h-20 items-center">

            <div className='flex items-center ml-2'>
                <a href='/dashboard' className="flex items-center cursor-pointer mx-6 xl:text-2xl text-black">
                    <h1 className="text-2xl xl:text-3xl font-black tracking-tighter flex items-center">
                        &nbsp;Clickk
                    </h1>
                </a>

                <div className="items-center hidden md:flex">
                    {
                        toBeUsedAt === "dashboard" ? <>
                            <h1 className="text-2xl font-light text-black">&nbsp;|&nbsp;</h1>
                            <Button variant="gentle" className='font-semibold rounded-lg mx-1 text-md tracking-tight xl:text-lg p-5'>
                                <Link className="flex items-center" href={`/${user ? user.name : ""}`}>
                                    Live page
                                </Link>
                            </Button>
                            <Button variant="gentle" className='font-semibold text-md rounded-lg mx-1 tracking-tight xl:text-lg p-5'>
                                <Link className="flex items-center" href={`/dashboard/inbox?${user.id}`}>
                                    Inbox
                                </Link>
                            </Button>
                            <Button variant="gentle" className='font-semibold text-md rounded-lg mx-1 tracking-tight xl:text-lg p-5'>
                                <Link className="flex items-center" href={`/`}>
                                    Help
                                </Link>
                            </Button>
                        </>
                            :
                        <>
                            <h1 className="text-2xl font-light text-black">&nbsp;|&nbsp;</h1>
                            <Button variant="gentle" className='font-semibold rounded-lg mx-1 text-md tracking-tight xl:text-lg p-5'>
                                <Link className="flex items-center" href={`/`}>
                                    What's Clickk ?
                                </Link>
                            </Button>
                            <Button variant="gentle" className='font-semibold text-md rounded-lg mx-1 tracking-tight xl:text-lg p-5'>
                                <Link className="flex items-center" href={`/`}>
                                    Security AI
                                </Link>
                            </Button>
                            <Button variant="gentle" className='font-semibold text-md rounded-lg mx-1 tracking-tight xl:text-lg p-5'>
                                <Link className="flex items-center" href={`/`}>
                                    FAQ's
                                </Link>
                            </Button>
                            <Button variant="gentle" className='font-semibold text-md rounded-lg mx-1 tracking-tight xl:text-lg p-5'>
                                <Link className="flex items-center" href={`/`}>
                                    Compare NGL
                                </Link>
                            </Button>
                        </>
                    }
                </div>

            </div>

            {
                toBeUsedAt == "dashboard" ? <div className="flex items-center mr-2">
                    <Button className="font-bold text-md tracking-tight">
                        <Share2Icon className='mr-1 ml-0' /> Share
                    </Button>
                    <Button variant="fancy" className="font-medium ml-2 mr-4 text-md tracking-tight rounded-lg px-4 py-1">
                        <Link href={"/plans"}>Go divine ✨</Link>
                    </Button>
                    <Profile ProfileImage={user.image} />
                </div>
                    :
                <div className="flex items-center gap-4 mr-6">
                    {
                        status === "authenticated" ? <>
                            <Button variant="gentle" className="rounded-lg h-14 px-8 text-lg
                                bg-neutral-200">
                                Sign Out
                            </Button>
                            <Link href={"/dashboard"}>
                                <Button className="rounded-full h-14 px-8 text-lg">
                                    Dashboard <ArrowRightIcon className="font-black w-6 ml-2 hover:ease-in-out hover:-rotate-45 h-6"/>
                                </Button>
                            </Link>
                        </>
                            :
                        <Button variant="gentle" className="rounded-lg h-14 px-8 text-lg
                            bg-neutral-200">
                            Sign Out
                        </Button>
                    }
                </div>
            }

        </nav>
    )
}











{/* <section className="h-16 xl:h-20 md:hidden flex items-center justify-between">
    <Button variant="gentle" className='font-semibold rounded-lg mx-1 text-md tracking-tight xl:text-xl'>
        <Link className="flex items-center" href={`/${user ? user.name : ""}`}>
            <OpenInNewWindowIcon className="mr-2" /> LivePage
        </Link>
    </Button>
    <Button variant="gentle" className='font-semibold text-md rounded-lg mx-1 tracking-tight xl:text-xl'>
        <Link className="flex items-center" href={`/dashboard`}>
            <ArchiveIcon className="mr-2" /> Inbox
        </Link>
    </Button>
    <Button variant="gentle" className='font-semibold text-md rounded-lg mx-1 tracking-tight xl:text-xl'>
        <Link className="flex items-center" href={`/dashboard`}>
            <QuestionMarkCircledIcon className="mr-2" /> Help
        </Link>
    </Button>
</section> */}