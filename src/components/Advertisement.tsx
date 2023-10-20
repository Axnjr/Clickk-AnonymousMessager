import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/Dialog"
import { LockClosedIcon } from "@radix-ui/react-icons";
import { Button } from "./ui/Button";
import { IconProps } from "@radix-ui/react-icons/dist/types";

const divine_features = [
    "Voice messages.",
    "Spam and toxic message detection.",
    "More page customizability.",
    "No auto deleting messages"
]

export default function Advertisement({message, trigger, icon} : { message : string, trigger : string, icon?:React.ReactNode }) {
    return (
        <Dialog>
            <DialogTrigger className="flex items-center mx-1 text-sm font-medium bg-neutral-200 p-2 rounded-xl opacity-50">
                <span className="mr-2">{icon ? icon : ""}</span>{trigger}
            </DialogTrigger>
            <DialogContent className="p-0 scale-75 xl:scale-95">
                <DialogHeader className="mt-6">
                    <DialogTitle className="mb-2 text-base font-bold text-center">{message}</DialogTitle>
                    <img className="w-full h-full my-2" src="https://mfe-billing.production.linktr.ee/images/free-trial-banner-default.6947d5f1ec809ab89cc8.png" alt="" />
                    {/* <DialogDescription> */}
                        <h1 className="text-xl px-6 my-2 tracking-tighter font-black text-black">Get 7 days of Divine plan for free. Cancel anytime !</h1>
                        <ul className="m-auto text-center px-12 py-2">
                            {
                                divine_features.map((ele, id) => {
                                    return <li key={id} className="flex text-base items-center m-2 font-normal">
                                        <svg className="w-5 h-5 mr-2 bg-black rounded-full p-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 12" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M13.7026 1.00983L13.3903 1.40026L5.39027 11.4003L4.62613 11.4201L0.626127 6.9201L0.293945 6.54639L1.04135 5.88203L1.37354 6.25573L4.97971 10.3127L12.6094 0.775566L12.9217 0.385132L13.7026 1.00983Z" fill="#d4ff00" />
                                        </svg>
                                        {ele}
                                    </li>
                                })
                            }
                        </ul>
                    {/* </DialogDescription> */}
                </DialogHeader>
                <Button variant="normal" className="w-11/12 m-auto">Try Divine for free</Button>
                <Button variant="normal" className="w-11/12 m-auto mb-8">View all plans</Button>
            </DialogContent>
        </Dialog>
    )
}
