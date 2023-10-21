import { OpenInNewWindowIcon, ArchiveIcon, QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { Button } from "./ui/Button";
import '../app/assets/globals.css'
import Profile from "./Profile";

export default function Navbar() {
    return (
        <nav className="w-[98%] max-w-[1450px] m-auto bg-white/50 shadow-2xl border border-neutral-300 z-50
        text-neutral-600 fixed top-3 left-1/2 -translate-x-1/2 flex justify-between items-center
        rounded-xl backdrop-blur-2xl h-20">
            <a href='/dashboard' className="flex items-center cursor-pointer mx-6 xl:text-2xl text-black">
                <h1 className="text-2xl xl:text-3xl font-black tracking-tighter flex items-center">
                    &nbsp;clickk
                </h1>
            </a>
            <section>
                <Button variant="gentle" className='font-semibold rounded-lg mx-1 text-md tracking-tight xl:text-xl'>
                    <OpenInNewWindowIcon className="mr-2" /> What's Clickk
                </Button>
                <Button variant="gentle" className='font-semibold text-md rounded-lg mx-1 tracking-tight xl:text-xl'>
                    <ArchiveIcon className="mr-2" /> Pricing
                </Button>
                <Button variant="gentle" className='font-semibold text-md rounded-lg mx-1 tracking-tight xl:text-xl'>
                    <Link className="flex items-center" href={`/`}>
                        <QuestionMarkCircledIcon className="mr-2" /> FAQ's
                    </Link>
                </Button>
            </section>
            <Profile ProfileImage={""}/>
        </nav>
    )
}
