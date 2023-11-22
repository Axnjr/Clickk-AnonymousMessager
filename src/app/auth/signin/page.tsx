"use client"
import { Button } from "@/components/ui/Button"
import { signIn } from "next-auth/react"
import { useRef } from "react"
import { useSearchParams } from "next/navigation";

export default function SignIn() {

    const username = useSearchParams().get("username")

    const signUpForm = useRef({
        email: "",
        name: username ?? ""
    })

    async function updateRef(e: React.FormEvent<HTMLInputElement>, which: "email" | "name") {
        // @ts-ignore
        which == "email" ? signUpForm.current.email = e.target.value : signUpForm.current.name = e.target.value
    }

    async function signUp(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        console.log(signUpForm)
        let t = await signIn("credentials", {
            email: signUpForm.current.email,
            username: signUpForm.current.name,
            method : "signup",
            callbackUrl: "/dashboard",
        })
        console.log(t)
    }

    return (
        <div className="p-4 text-center w-screen h-screen py-8 flex flex-col justify-center mt-0 bg-white">
            <h1 className="font-black text-2xl tracking-tighter flex items-center justify-center sm:absolute left-4 top-4">
                Clickk
                <svg className="w-6 h-6 mx-1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25V4.5m5.834.166l-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243l-1.59-1.59" />
                </svg>
            </h1>

            <h1 id="user_page_head" className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter mt-14 md:mt-6">Join Clickk</h1>
            <p className="mt-4 mb-2 text-base">Sign up or login | All for free!</p>

            <form onSubmit={signUp} className="flex flex-col gap-3 w-full md:w-1/2 m-auto mt-8">
                <input autoComplete="true" onChange={(e) => updateRef(e, "email")} className="h-12 w-full bg-neutral-100 rounded-lg pl-4" type="email" placeholder="Email" required />
                <input defaultValue={signUpForm.current.name} onChange={(e) => updateRef(e, "name")} className="h-12 w-full bg-neutral-100 rounded-lg pl-4" type="text" placeholder="clickk.link/yourName" required />
                <button type="submit" className="h-12 rounded-full bg-neutral-200 hover:bg-neutral-800 hover:text-white transition-colors font-semibold text-md tracking-tight ">
                    Log in | Create Account
                </button>
            </form>


            <h1 className="text-xl font-bold my-4">OR</h1>

            <button onClick={() => signIn("google")} className="bg-neutral-800 text-white hover:bg-neutral-200 hover:text-black transition-colors text-md flex w-full md:w-1/2 m-auto items-center justify-center rounded-full border h-12 font-semibold tracking-tight">
                <svg className="w-6 h-6 mx-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" aria-labelledby=" "><g clipPath="url(#clip0_1_14)"><path fillRule="evenodd" clipRule="evenodd" d="M21.6 12.2271C21.6 11.5181 21.5363 10.8362 21.4182 10.1817H12V14.0499H17.3818C17.15 15.2999 16.4454 16.359 15.3863 17.0681V19.5771H18.6182C20.5091 17.8362 21.6 15.2726 21.6 12.2271Z" fill="#4285F4" /><path fillRule="evenodd" clipRule="evenodd" d="M12 22C14.7 22 16.9637 21.1046 18.6182 19.5772L15.3863 17.0681C14.4909 17.6681 13.3454 18.0227 12 18.0227C9.39545 18.0227 7.1909 16.2636 6.40453 13.9H3.06363V16.4909C4.70908 19.759 8.0909 22 12 22Z" fill="#34A853" /><path fillRule="evenodd" clipRule="evenodd" d="M6.40454 13.9001C6.20454 13.3001 6.09091 12.6592 6.09091 12.0001C6.09091 11.341 6.20454 10.7001 6.40454 10.1001V7.50917H3.06364C2.38636 8.85917 2 10.3864 2 12.0001C2 13.6137 2.38636 15.141 3.06364 16.491L6.40454 13.9001Z" fill="#FBBC05" /><path fillRule="evenodd" clipRule="evenodd" d="M12 5.97728C13.4682 5.97728 14.7863 6.48182 15.8228 7.47272L18.6909 4.60454C16.9591 2.99091 14.6954 2 12 2C8.0909 2 4.70908 4.24091 3.06363 7.50909L6.40453 10.1C7.1909 7.73637 9.39545 5.97728 12 5.97728Z" fill="#EA4335" /></g><defs><clipPath id="clip0_1_14"><rect width={20} height={20} fill="white" transform="translate(2 2)" /></clipPath></defs></svg>
                Sign up | Log in with Google
            </button>

            <p className="text-sm w-11/12 md:w-1/2 m-auto mt-8 sm:mt-10 text-neutral-600 font-medium">
                By clicking Create account, you agree to Clickk's Terms and Conditions and confirm you have read our Privacy Notice. You may receive offers, news and updates from us.
            </p>
        </div>
    )
}