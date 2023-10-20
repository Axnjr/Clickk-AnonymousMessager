"use client"
import Loading from "@/app/loading"
import { Button } from "@/components/ui/Button"
import { Fetcher } from "../../lib/utils"
import { useQuery } from "react-query"
import { useDataFromUserContext } from "@/hooks/useDataFromUserContext"
import { LockClosedIcon } from "@radix-ui/react-icons"
import { buttonList } from "./ArraysToBeMapped"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip"
  
function GetCTR(views: string, clicks: string) { return `~${Math.floor((Number(clicks) / Number(views)) * 100)}%` }

export default function UserStats() {
    const userID = useDataFromUserContext("id")
    const membership = useDataFromUserContext("membership")
    const { data, isLoading, isError } = useQuery("data", async () => {
        return await Fetcher(`/api/analytics?userId=${userID}`)
    })

    return (
        <>
        {
            isError ? <p className="bg-white p-4 text-center my-6 rounded-3xl flex items-center justify-center">Unable to laod your page statistics try refreshing the page 😥</p>
                :
            <div className="p-6 xl:py-8 h-fit border bg-white w-full rounded-3xl text-center m-auto my-6">
                <h1 className="text-6xl font-semibold tracking-tighter mt-8 mb-12">Analysis</h1>
                {isLoading && <Loading className="my-12" type="medium"/>}
                {
                    data && <section className="flex flex-wrap gap-4 justify-center">
                        {
                            buttonList.map((ele, id) => {
                                return <TooltipProvider key={id} >
                                    <Tooltip >
                                        <TooltipTrigger className={`rounded-3xl p-8 h-fit block hover:bg-neutral-100`}>
                                            <span className="xl:text-xl flex items-center">
                                                <span className={`w-2 h-2 xl:w-3 xl:h-3 mr-2 rounded-full ${ele.color}`}></span>
                                                {ele.name}:
                                            </span>
                                            <div className="mt-1 text-xl xl:text-2xl inline-block">
                                                {
                                                    ele.membershipReq && <span>
                                                        {membership ? (data.length > 0 ? data[0][ele.prop] : 0) : <LockClosedIcon className="mt-2"/>}
                                                    </span>
                                                }
                                                {!ele.membershipReq && <span>{data.length > 0 ? data[0][ele.prop] : 0}</span>}
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>{ele.membershipReq && membership == "divine" ? "Go divine for detailed analysis" : `${ele.name}`}</TooltipContent>
                                    </Tooltip>
                              </TooltipProvider>
                            })
                        }
                        <Button variant="gentle" className="rounded-3xl p-8 h-fit block">
                            <article className="xl:text-xl flex items-center">
                                <div className="w-2 h-2 xl:w-3 xl:h-3 mr-2 rounded-full bg-purple-600"></div>
                                CTR:
                            </article>
                            <div className="mt-1 text-xl xl:text-2xl inline-block">
                                {membership ? (data.length > 0 ? GetCTR(data[0].page_clicks,data[0].page_views) : "0%") : <LockClosedIcon className="mt-2"/>}
                            </div>
                        </Button>
                    </section>
                }
            </div>}
        </>
    )
}