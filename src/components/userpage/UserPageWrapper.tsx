"use client";
import SendTextMessage from "@/components/SendTextMessage"
import SendVoiceMessage from "@/components/SendVoiceMessage"
import { userType } from "@/types/all-required-types"
import { DataContext } from "@/providers/FetchedDataProvider";

export default function UserPageWrapper({ data } : { data : userType }) {

    async function UpdatePageClicks() { // increment page clicks
        fetch(`/api/analytics?userId=${data.id}&prop="clicks"`)
        .then(res => {})
        .catch(err => console.log(err))
    }

    return (
        <div onClick={UpdatePageClicks} className="w-screen h-screen flex flex-col justify-center items-center">
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
                            <SendVoiceMessage />
                        </DataContext.Provider>
                    </div>
                </div>
            </section>
            <br />
        </div>
    )
}