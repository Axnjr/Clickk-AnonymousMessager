"use client";
import { Switch } from './ui/switch';
import { useAllDataFromUserContext } from '@/hooks/useDataFromUserContext';
import { trpc } from '@/app/_trpcUsageLib/client';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"

export default function VoiceMessageToggle() {

    const userContext = useAllDataFromUserContext()
    const { mutate: changeSetting } = trpc.updateUser.useMutation()

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className='px-4 py-2 flex items-center'>
                    <Switch
                        disabled={userContext.membership ? false : true}
                        defaultChecked={userContext.messageType == "voice"}
                        onCheckedChange={() => changeSetting({
                            username: userContext.name as string,
                            what: "message_type",
                            payload: userContext.messageType == "voice" ? "text" : "voice"
                        })
                        }
                        className='mr-2' />
                    <label>Recieve Voice messages</label>
                </TooltipTrigger>
                <TooltipContent>Go divine for to enable voice messages</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
