"use client";
import { Button } from "@/components/ui/Button"
import { ArrowRightIcon } from "@radix-ui/react-icons"
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react';

export default function HomeNavbar() {

    const { data: session, status } = useSession()

    return (
        <nav className="w-[96%] max-w-[1450px] m-auto shadow-2xl bg-white border border-neutral-300 z-50
            text-neutral-600 absolute top-4 left-1/2 -translate-x-1/2 flex justify-between rounded-xl 
            backdrop-blur-2xl h-16 xl:h-20 items-center ">

            <div className='flex items-center ml-2'>
                <a href='/dashboard' className="flex items-center cursor-pointer mx-2 md:mx-6 xl:text-2xl text-black">
                    <h1 className="text-2xl xl:text-3xl font-black tracking-tighter flex items-center">
                        {/* Clickk&nbsp; */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={2}  stroke="currentColor" className="w-8 h-8">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
                        </svg>
                    </h1>
                </a>

                <h1 className="text-2xl font-light text-black">&nbsp;|&nbsp;</h1>

                <div className="items-center hidden lg:flex">
                    <Button variant="gentle" className='font-semibold rounded-lg mx-1 text-md tracking-tight xl:text-lg p-5'>
                        <Link className="flex items-center" href={`/#whats_clickk`}>
                            What's Clickk ?
                        </Link>
                    </Button>
                    <Button variant="gentle" className='font-semibold text-md rounded-lg mx-1 tracking-tight xl:text-lg p-5'>
                        <Link className="flex items-center" href={`/#security`}>
                            Security AI
                        </Link>
                    </Button>
                    <Button variant="gentle" className='font-semibold text-md rounded-lg mx-1 tracking-tight xl:text-lg p-5'>
                        <Link className="flex items-center" href={`/plans`}>
                           Go Divine ✨
                        </Link>
                    </Button>
                </div>
            </div>


            <div className="flex items-center sm:gap-6 mr-2 sm:mr-6">
                {
                    status === "authenticated" ? <>
                        <Button variant="gentle" className="rounded-lg h-10 lg:h-12 lg:px-6 px-4 lg:text-lg text-base
                        mx-2 md:bg-neutral-200" onClick={() => signOut()}>
                            Sign Out
                        </Button>
                        <Link href={"/dashboard"}>
                            <Button variant="gentle" className="rounded-full h-10 lg:h-12 lg:px-6 px-4 lg:text-lg text-base
                            md:bg-black md:text-white">
                                Dashboard 
                                <ArrowRightIcon className="hidden md:block font-black w-6 ml-2 hover:ease-in-out hover:-rotate-45 h-6" />
                            </Button>
                        </Link>
                        <svg className="md:hidden text-black p-2 w-10 h-10 mx-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
                        </svg>
                    </>
                        :
                    <Button variant="gentle" className="rounded-lg h-10 lg:h-12 lg:px-6 px-4 lg:text-lg text-base
                    mx-2 bg-neutral-200" onClick={() => signIn()}>
                        Sign In
                    </Button>
                }
                
            </div>
        </nav>
    )
}
