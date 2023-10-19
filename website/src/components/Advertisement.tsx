"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/Dialog"
import { Button } from "./ui/Button";
import Link from "next/link";
// import { GoDivine } from "@/lib/stripeGateway";

const divine_features = [
    "Voice messages.",
    "Spam and toxic message detection.",
    "More page customizability.",
    "No auto deleting messages",
    "Hints about each message"
]

export default function Advertisement({ message, trigger, icon }: { message: string, trigger: string, icon?: React.ReactNode }) {
    return (
        <Dialog>
            <DialogTrigger className="flex items-center mx-1 text-sm font-medium bg-neutral-200 p-2 rounded-xl opacity-50">
                <span className="mr-2">{icon ? icon : ""}</span>{trigger}
            </DialogTrigger>
            <DialogContent className="p-0 scale-75 xl:scale-95">
                <DialogHeader className="mt-6">
                    <DialogTitle className="mb-2 text-base font-bold text-center">{message}</DialogTitle>
                    <img className="w-full h-full my-2" src="https://mfe-billing.production.linktr.ee/images/free-trial-banner-default.6947d5f1ec809ab89cc8.png" alt="" />
                    <br/>
                    {/* <h1 className="text-xl text-center my-2 tracking-tighter font-semibold text-black">Get 7 days of Divine plan for free. Cancel anytime !</h1> */}
                    {/* <br/> */}
                    <ul className='rounded-xl border-neutral-400 border p-2 m-auto w-10/12'>
                        {
                            divine_features.map((ele, id) => {
                                return <li key={id} className="flex text-base items-center m-2 font-normal">
                                    <svg className="w-5 h-5 mr-2" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg" data-config-id="auto-svg-1-5">
                                        <rect y="0.5" width={21} height={21} rx="10.5" fill="#9333ea" />
                                        <path d="M15.7676 8.13463C15.4582 7.82482 14.9558 7.82501 14.646 8.13463L9.59787 13.183L7.35419 10.9393C7.04438 10.6295 6.54217 10.6295 6.23236 10.9393C5.92255 11.2491 5.92255 11.7513 6.23236 12.0611L9.03684 14.8656C9.19165 15.0204 9.39464 15.098 9.59765 15.098C9.80067 15.098 10.0039 15.0206 10.1587 14.8656L15.7676 9.25644C16.0775 8.94684 16.0775 8.44443 15.7676 8.13463Z" fill="black" />
                                    </svg>
                                    {ele}
                                </li>
                            })
                        }
                    </ul>
                    <br/>
                </DialogHeader>
                <Button variant="normal" className="w-11/12 m-auto mb-8">
                    <Link href={"/plans"}>View all plans</Link>
                </Button>
            </DialogContent>
        </Dialog>
    )
}

{/* <Button onClick={() => {
    // GoDivine({
    //     lineItems: [{
    //         price: "price_1O1PH3SC47g7m6OhxkZvpUe2",
    //         quantity: 1
    //     }]
    // })
}} variant="normal" className="w-11/12 m-auto">Try Divine for free</Button> */}