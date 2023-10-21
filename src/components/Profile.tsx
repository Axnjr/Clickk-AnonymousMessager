"use client"
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Button } from './ui/Button';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from './ui/toast';

export default function Profile({ ProfileImage } : { ProfileImage : string | null}) {
    const { data: session, status } = useSession()
    const { toast } = useToast()
    const user = session?.user?.name
    const email = session?.user?.email

    async function deleteUser(user_email: string | null | undefined, img? : string | null) {
        await fetch(`/api/user?user_email=${user_email}&img=${img}`,{ method:"DELETE" })
        toast({
            variant: "destructive",
            title: "Account deleted successfully 🫡🙏",
            action: (
                <ToastAction altText='Nice'>Nice !!</ToastAction>
            )
        })
        setTimeout(() => {window.location.reload()}, 1000)
    }

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger className='flex p-1 items-center mr-4 focus:outline-none border-2 border-black 
            rounded-full'>
                {ProfileImage && <img className='w-8 h-8 object-cover object-center rounded-full'
                src={ProfileImage} alt={user ? user : ""}/>}
                {/* <div className='w-8 h-8 '></div> */}
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal className='text-right z-50'>
                <DropdownMenu.Content className='shadow-2xl border w-[250px] h-fit mr-4 rounded-2xl
                shadow-neutarl-300 bg-white py-2 z-50 '>
                    <DropdownMenu.Item  className="rounded-md cursor-pointer outline-none px-4 py-3">
                        <h1 className='text-lg font-semibold tracking-tighter capitalize'>
                            {user ? user : "NotSignedIn"}
                        </h1>
                        <span className='text-xs'>{email ? email : "youremail@gmail.com"}</span>
                    </DropdownMenu.Item>
                    <div className='w-[96%] m-auto h-[0.5px] my-2 bg-slate-500'></div>
                    <DropdownMenu.Arrow />
                    <DropdownMenu.Item className="cursor-pointer px-4 py-1 rounded-sm outline-none">
                        {
                            status === "authenticated" ? <h1 className='text-sm p-1 font-medium' onClick={() => signOut({ callbackUrl: "/" })}>SignOut</h1>
                                :
                            <h1 onClick={() => signIn()}>SignIn</h1>
                        }
                    </DropdownMenu.Item>
                    {
                        status === "authenticated" && <DropdownMenu.Item className='cursor-pointer rounded-sm px-4 py-1 outline-none'>
                            <h1 className='p-1 font-medium text-sm'
                            onClick={() => {
                                toast({
                                    variant: "destructive",
                                    title: "Do you want to delete your account !!",
                                    action: (
                                        <ToastAction onClick={() => deleteUser(email,ProfileImage)} altText="Delete account">Yes delete it </ToastAction>
                                    ),
                                })
                            }}>
                                Delete Account
                            </h1>
                        </DropdownMenu.Item>
                    }        
                    <Button className='w-11/12 m-auto grid place-content-center mt-2'>Divine</Button>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}