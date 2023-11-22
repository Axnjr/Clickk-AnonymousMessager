"use client"
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from './ui/toast';
import { trpc } from '@/app/_trpcUsageLib/client';
import VoiceMessageToggle from './VoiceMessageToggle';

export default function Profile({ ProfileImage }: { ProfileImage: string | null }) {

    const { toast } = useToast()
    const { data: session, status } = useSession()
    const user = session?.user?.name
    const email = session?.user?.email
    const { mutate: deleteUser } = trpc.deleteUser.useMutation({
        onError: () => {
            toast({
                variant: "destructive",
                title: "Unable to delete your account. Please try again something went wrong ☠️🙏",
            })
        },
        onSuccess: () => {
            toast({
                variant: "destructive",
                title: "Account deleted successfully 🫡🙏",
                action: (
                    <ToastAction altText='Nice'>Nice !!</ToastAction>
                )
            })
        }
    })

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger className='flex p-1 items-center mr-4 focus:outline-none border-2 border-black 
            rounded-full'>
                {ProfileImage && <img className='w-8 h-8 object-cover object-center rounded-full'
                    src={ProfileImage} alt={user ? user : ""} />}
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal className='text-right z-50'>
                <DropdownMenu.Content className='shadow-2xl border w-[300px] h-fit mr-4 rounded-2xl
                shadow-neutarl-300 bg-white py-2 z-50 '>
                    <DropdownMenu.Item className="rounded-md cursor-pointer outline-none px-4 py-3">
                        <h1 className='text-lg font-semibold tracking-tighter capitalize'>
                            {user ? user : "NotSignedIn"}
                        </h1>
                        <span className='text-xs'>{email ? email : "youremail@gmail.com"}</span>
                    </DropdownMenu.Item>
                    <div className='w-[96%] m-auto h-[0.5px] my-2 bg-slate-500'></div>
                    <DropdownMenu.Arrow />
                    <DropdownMenu.Item className="cursor-pointer px-4 py-2 rounded-sm outline-none">
                        {
                            status === "authenticated" ? <h1 className='text-sm p-1 font-medium' onClick={() => signOut({ callbackUrl: "/" })}>SignOut</h1>
                                :
                                <h1 onClick={() => signIn()}>SignIn</h1>
                        }
                    </DropdownMenu.Item>
                    {
                        status === "authenticated" && <DropdownMenu.Item className='cursor-pointer rounded-sm px-4 py-2 outline-none'>
                            <h1 className='p-1 font-medium text-sm'
                                onClick={() => {
                                    toast({
                                        variant: "destructive",
                                        title: "Do you want to delete your account !!",
                                        action: (
                                            <ToastAction onClick={() => {
                                                if (user) {
                                                    // alert("ok deleting ....")
                                                    deleteUser({
                                                        user_name: user,
                                                        user_img: ProfileImage
                                                    })
                                                }
                                            }}
                                                altText="Delete account">Yes delete it </ToastAction>
                                        ),
                                    })
                                }}>
                                Delete Account
                            </h1>
                        </DropdownMenu.Item>
                    }
                    <VoiceMessageToggle/>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    )
}