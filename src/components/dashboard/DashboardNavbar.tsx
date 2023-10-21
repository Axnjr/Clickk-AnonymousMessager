"use client";
import { Button } from "@/components/ui/Button"
import { Share2Icon, OpenInNewWindowIcon, ArchiveIcon, QuestionMarkCircledIcon } from "@radix-ui/react-icons"
import Link from 'next/link'
import Profile from '@/components/Profile'
import { useAllDataFromUserContext } from "@/hooks/useDataFromUserContext";

export default async function DashboardNavbar() {

    const user = useAllDataFromUserContext()

    return (
        <nav className="w-[98%] max-w-[1450px] m-auto bg-white/50 shadow-2xl border border-neutral-300 z-50
            text-neutral-600 fixed top-3 left-1/2 -translate-x-1/2 flex flex-col justify-center
            rounded-xl backdrop-blur-2xl">
            <section className="h-16 xl:h-20 flex items-center justify-between">
                <div className='flex items-center ml-2'>
                    <a href='/dashboard' className="flex items-center cursor-pointer mx-6 xl:text-2xl text-black">
                        <h1 className="text-2xl xl:text-3xl font-black tracking-tighter flex items-center">
                            &nbsp;clickk
                        </h1>
                    </a>
                    <div className="items-center hidden md:flex">
                        <h1 className="text-2xl font-light text-black">&nbsp;|&nbsp;</h1>
                        <Button variant="gentle" className='font-semibold rounded-lg mx-1 text-md tracking-tight xl:text-xl'>
                            <Link className="flex items-center" href={`/${user ? user.name : ""}`}>
                                <OpenInNewWindowIcon className="mr-2" /> LivePage
                            </Link>
                        </Button>
                        <Button variant="gentle" className='font-semibold text-md rounded-lg mx-1 tracking-tight xl:text-xl'>
                            <Link className="flex items-center" href={`/dashboard/inbox?${user.id}`}>
                                <ArchiveIcon className="mr-2" /> Inbox
                            </Link>
                        </Button>
                        <Button variant="gentle" className='font-semibold text-md rounded-lg mx-1 tracking-tight xl:text-xl'>
                            <Link className="flex items-center" href={`/`}>
                                <QuestionMarkCircledIcon className="mr-2" /> Help
                            </Link>
                        </Button>
                    </div>
                </div>

                <div className="flex items-center mr-2">
                    <Button className="font-bold text-md tracking-tight xl:text-xl">
                        <Share2Icon className='mr-1 ml-0' /> Share
                    </Button>
                    <Button variant="fancy" className="font-medium ml-2 mr-4 text-md tracking-tight rounded-lg px-4 py-1">
                        <Link href={"/plans"}>Go divine ✨</Link>
                    </Button>
                    <Profile ProfileImage={user.image} />
                </div>

            </section>
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
        </nav>
    )
}