"use client";
import SendTextMessage from "@/components/userpage/SendTextMessage"
import SendVoiceMessage from "@/components/userpage/SendVoiceMessage"
import { userType } from "../../../types/all-required-types"
import { DataContext } from "@/providers/FetchedDataProvider";
import { trpc } from "@/app/_trpcUsageLib/client";

export default function UserPageWrapper({ data } : { data : userType }) {

    const { mutate : updateAnalytics } = trpc.updateAnalytics.useMutation({
        onError: () => {alert("err")},
        onSuccess: () => {alert("ok")}
    })

    async function UpdatePageClicks() { updateAnalytics() }

    return (
        <div onClick={data.membership ? UpdatePageClicks : () => {}} className="w-screen h-screen flex flex-col justify-center items-center">
            <br />
            <br />
            <section className="mt-2 flex flex-col rounded-3xl w-11/12 md:w-3/2 lg:w-3/5 h-fit">
                <div className="flex flex-col items-center justify-center relative">
                    <div className="text-center">
                        <img src={data.image} alt="hj" className="w-32 h-32 inline-block rounded-full" />
                        <h1 className="m-4 font-semibold tracking-tighter text-xl">@{data.name}✅</h1>
                    </div>
                    <label className="p-3 font-bold text-xl sm:text-2xl tracking-tighter text-center">{data.question}</label>
                    <br />
                    <p className="text-xs ">🔒 anonymous q&a</p>
                    <br />
                    <div className="flex items-center">
                        <DataContext.Provider value={{ data }}>
                            <SendTextMessage />
                            {
                                data.membership && <SendVoiceMessage />
                            }
                        </DataContext.Provider>
                    </div>
                </div>
            </section>
            <br />
        </div>
    )
}