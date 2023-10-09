"use client"
import { Button } from "@/components/ui/Button"
import { DataContext } from "@/providers/FetchedDataProvider"
import { useContext, useEffect } from "react"
import { Fetcher } from "@/lib/utils"
import { useQuery } from "react-query"
import Loading from "../../app/loading"
import Link from "next/link"

function GetCTR(views:string,clicks:string){
    return `~${Math.floor((Number(clicks) / Number(views)) * 100)}%`
}

export default function UserStats() {

    const { data: user_data } = useContext(DataContext)
    const { data, isLoading, isError } = useQuery("data", async () => {
        return await Fetcher(`/api/analytics?userId=${user_data.id}`)
    })

    // console.log(data, user_data.id)

    return (
        <>
            {
                isError ? <p>Unable to laod stats try refreshing the page</p>
                    :
                <div className="p-6 m-6 xl:py-8 h-fit border bg-white w-full rounded-3xl text-center">
                    <h1 className="text-6xl font-semibold tracking-tighter m-8">Analysis</h1>
                    <section className="flex flex-wrap gap-4 justify-center">
                        <Button variant="ghost" className="hover:bg-black rounded-3xl p-8 hover:text-white h-fit block">
                            <article className="xl:text-xl flex items-center">
                                <div className="w-2 h-2 xl:w-3 xl:h-3 mr-2 rounded-full bg-green-400"></div>
                                Page Views:
                            </article>
                            <div className="mt-1 text-xl xl:text-2xl">
                                {
                                    isLoading ? <Loading className="pt-3 pb-6" type="small" message="" />
                                        :
                                    data.length > 0 ? data[0].page_views : 0
                                }
                            </div>
                        </Button>
                        <Button variant="ghost" className="hover:bg-black rounded-3xl p-8 hover:text-white h-fit block">
                            <article className="xl:text-xl flex items-center">
                                <div className="w-2 h-2 xl:w-3 xl:h-3 mr-2 rounded-full bg-purple-600"></div>
                                CTR:
                            </article>
                            <div className="mt-1 text-xl xl:text-2xl">
                                {
                                    isLoading ? <Loading className="pt-3 pb-6" type="small" message="" />
                                        :
                                    data.length > 0 ? GetCTR(data[0].page_clicks,data[0].page_views) : "0%"
                                }
                            </div>
                        </Button>
                        <Button variant="ghost" className="hover:bg-black rounded-3xl p-8 hover:text-white h-fit block">
                            <article className="xl:text-xl flex items-center">
                                <div className="w-2 h-2 xl:w-3 xl:h-3 mr-2 rounded-full bg-blue-500"></div>
                                Page clicks:
                            </article>
                            <div className="mt-1 text-xl xl:text-2xl">
                                {
                                    isLoading ? <Loading className="pt-3 pb-6" type="small" message="" />
                                        :
                                    data.length > 0 ? data[0].page_clicks : 0
                                }
                            </div>
                        </Button>
                        <Link href={`/dashboard/inbox?id=${user_data.id}&tab=text`}>
                            <Button variant="ghost" className="hover:bg-black rounded-3xl p-8 hover:text-white h-fit block">
                                <article className="xl:text-xl flex items-center">
                                    <div className="w-2 h-2 xl:w-3 xl:h-3 mr-2 rounded-full bg-amber-400"></div>
                                    Responses:
                                </article>
                                <div className="mt-1 text-xl xl:text-2xl">
                                    {
                                        isLoading ? <Loading className="pt-3 pb-6" type="small" message="" />
                                            :
                                        data.length > 0 ? data[0].responses : 0
                                    }
                                </div>
                            </Button>
                        </Link>
                        <Link href={`/dashboard/inbox?id=${user_data.id}&tab=spam`}>
                            <Button variant="ghost" className="hover:bg-black rounded-3xl p-8 hover:text-white h-fit block">
                                <article className="xl:text-xl flex items-center">
                                    <div className="w-2 h-2 xl:w-3 xl:h-3 mr-2 rounded-full bg-red-500"></div>
                                    Spam:
                                </article>
                                <div className="mt-1 text-xl xl:text-2xl">
                                    {
                                        isLoading ? <Loading className="pt-3 pb-6" type="small" message="" />
                                            :
                                        data.length > 0 ? data[0].spam : 0
                                    }
                                </div>
                            </Button>
                        </Link>
                    </section>
                </div>
            }
        </>
    )
}