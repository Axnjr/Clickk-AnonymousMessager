"use client";
import SendTextMessage from "@/components/userpage/SendTextMessage"
import SendVoiceMessage from "@/components/userpage/SendVoiceMessage"
import { userType } from "../../../types/all-required-types"
import { DataContext } from "@/providers/FetchedDataProvider";
import { trpc } from "@/app/_trpcUsageLib/client";

export default function UserPageWrapper({ data }: { data: userType }) {

    const { mutate: updateAnalytics } = trpc.updateAnalytics.useMutation({
        onError: () => { alert("err") },
        onSuccess: () => { alert("ok") }
    })

    async function UpdatePageClicks() { console.log("updating");updateAnalytics() }

    return (
        <div onClick={!data.membership ? UpdatePageClicks : () => { }}
            className="w-screen h-fit flex flex-col md:justify-center items-center -mt-2 md:mt-10">

            <section className="flex flex-col items-center rounded-3xl w-full md:w-3/2 lg:w-3/5 h-fit">

                <div className="flex flex-col gap-4 items-center mt-44 md:mt-0 md:justify-center relative w-full">

                    <img src={"https://cdn.leonardo.ai/users/eddf5ac1-7c31-4750-b81c-052ce718805a/generations/6559f213-e9ef-49b7-9358-4b69a2631919/variations/Default_front_view11_rainbow_hair_line_art_watercolor_wash_eth_0_6559f213-e9ef-49b7-9358-4b69a2631919_1.jpg?w=512"} alt=""
                        className="w-28 h-28 mb-4 inline-block rounded-full object-cover" />

                    <div className="text-center flex items-center justify-between  w-11/12 md:w-10/12 h-14 bg-[#dedede] backdrop-blur-3xl text-neutral-800 rounded-3xl">
                        <button className="rounded-full p-2 bg-black ml-2">
                            <svg className="w-5 h-5" viewBox="0 0 16 16"><path fill="white" stroke="white" d="M12.6661 7.33348C12.2979 7.33348 11.9994 7.63195 11.9994 8.00014C11.9994 8.36833 12.2979 8.66681 12.6661 8.66681C13.0343 8.66681 13.3328 8.36833 13.3328 8.00014C13.3328 7.63195 13.0343 7.33348 12.6661 7.33348Z" /><path fill="white" stroke="white" d="M8.00057 7.33348C7.63238 7.33348 7.3339 7.63195 7.3339 8.00014C7.3339 8.36833 7.63238 8.66681 8.00057 8.66681C8.36876 8.66681 8.66724 8.36833 8.66724 8.00014C8.66724 7.63195 8.36876 7.33348 8.00057 7.33348Z" /><path fill="white" stroke="white" d="M3.33333 7.33348C2.96514 7.33348 2.66667 7.63195 2.66667 8.00014C2.66667 8.36833 2.96514 8.66681 3.33333 8.66681C3.70152 8.66681 4 8.36833 4 8.00014C4 7.63195 3.70152 7.33348 3.33333 7.33348Z" /></svg>
                        </button>
                        <h1 className="m-4 font-bold tracking-tighter text-xl capitalize">@Avery Radhika</h1>
                        <button className="rounded-full p-2 bg-black mr-2">
                            <svg viewBox="0 0 19 20" enableBackground="new 0 0 24 24" fill="white" className="w-5 h-5 text-white"><path d="M1.72149 16.0526H16.6118C17.6622 16.0526 18.3333 15.4289 18.3333 14.5127C18.3333 13.46 17.5066 12.6121 16.641 11.8519C15.931 11.2281 15.8046 9.87329 15.6101 8.42105C15.3767 5.28265 14.3068 2.97271 12.0212 2.14425C11.5933 0.916179 10.5234 0 9.1618 0C7.8099 0 6.73033 0.916179 6.31211 2.14425C4.02653 2.97271 2.95668 5.28265 2.71353 8.42105C2.52874 9.87329 2.39257 11.2281 1.68258 11.8519C0.816976 12.6121 0 13.46 0 14.5127C0 15.4289 0.671088 16.0526 1.72149 16.0526ZM9.1618 20C10.893 20 12.1477 18.7914 12.2644 17.3782H6.05924C6.17595 18.7914 7.44032 20 9.1618 20Z" /></svg>
                        </button>
                    </div>

                    <DataContext.Provider value={{ data }}>
                        {
                            data.messageType == "text"
                                ?
                                <SendTextMessage />
                                :
                                <SendVoiceMessage />
                        }
                    </DataContext.Provider>

                </div>

                <a className="flex items-center my-24">
                    <h1 className="text-xl font-black tracking-tighter"><span></span>Clickk.link</h1>
                </a>

            </section>

        </div>
    )
}

/**
 * 
 * Send message button problem
 * Subscribe to user functionality ( will see )
 * page hints
 * button colors / accent color
 * change dashboard for adding aditional features
 * complete landing page
 * convert dashboard and inbox theme to one used at home
 * make react native app
 * 
 */