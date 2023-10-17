"use client";
import { Button } from '@/components/ui/Button'
import { ChevronRightIcon, CheckIcon } from '@radix-ui/react-icons'
import { trpc } from '../_trpcUsageLib/client';
import { useEffect, useState } from 'react';
import Loading from '../loading';
import { redirect } from 'next/navigation';

export default  function page() {

    const { data, isLoading } = trpc.getPlans.useQuery()

    async function HandlePayment(id:string){
        console.log("Processing payment")
        let t = await (await fetch(`/api/payments?planID=${id}`)).json()
        window.location.assign(t.URL)
    }

    const divine_features = [
        "Voice messages.",
        "Spam and toxic message detection.",
        "More page customizability.",
        "No auto deleting messages"
    ]

    return (
        <section className=''>
            <h1 id='user_page_head' className='text-7xl font-bold tracking-tighter text-center m-28'>Choose a plan,
                <br />
                go divine
            </h1>
            {
                !data || isLoading ? <Loading type="medium"/>
                    :
                <div className='flex flex-wrap items-center justify-center'>
                {
                    JSON.parse(data).map((plan: any, id: number) => {
                        return <div key={id} className='w-1/3 m-2 h-fit rounded-2xl bg-white text-black
                        border-4 shadow-2xl mb-12 hover:border-black
                        flex flex-col items-start p-6'>
                            <h1 className='text-xl tracking-tighter font-bold'>{plan.nickname}</h1>
                            <h1 className='text-4xl font-black tracking-tighter mt-1 '>${plan.unit_amount / 100}</h1>
                            <p className='text-sm mt-4 text-neutral-400 font-normal'>During this phase the design is developed to meet the required technical standards to</p>
                            <br />
                            <ul className='rounded-xl border-neutral-400 border p-2 m-auto'>
                                {
                                    divine_features.map((ele, id) => {
                                        return <li key={id} className="flex text-sm items-center m-2 font-normal">
                                            <div className='bg-black rounded-full m-1 p-[0.5px]'>
                                                <CheckIcon className='text-white w-4 h-4' />
                                            </div>
                                            {ele}
                                        </li>
                                    })
                                }
                            </ul>
                            <Button variant="normal" className='w-full m-auto my-4 justify-between'
                                onClick={() => {
                                    HandlePayment(plan.id)
                                }}>
                                Get Plan <ChevronRightIcon />
                            </Button>
                        </div>
                    })
                }
                </div>
            }
        </section>
    )
}


/**
 * <h1 className='plans text-2xl tracking-tighter font-normal text-center'>{plan.nickname}</h1>
                            <h1 className='my-4 text-5xl font-bold tracking-tighter'>${plan.unit_amount / 100}</h1>
                            <p className='text-sm font-normal'>During this phase the design is developed to meet the required technical standards to</p> 
                            <br/>
                            <ul className='rounded-xl border-neutral-300 border p-3 m-auto'>
                            {
                                divine_features.map((ele, id) => {
                                    return <li key={id} className="flex text-base items-center m-2 font-normal">
                                        <svg className="w-5 h-5 mr-2" viewBox="0 0 21 22" fill="none" xmlns="http://www.w3.org/2000/svg" data-config-id="auto-svg-1-5">
                                            <rect y="0.5" width={21} height={21} rx="10.5" fill="black" />
                                            <path d="M15.7676 8.13463C15.4582 7.82482 14.9558 7.82501 14.646 8.13463L9.59787 13.183L7.35419 10.9393C7.04438 10.6295 6.54217 10.6295 6.23236 10.9393C5.92255 11.2491 5.92255 11.7513 6.23236 12.0611L9.03684 14.8656C9.19165 15.0204 9.39464 15.098 9.59765 15.098C9.80067 15.098 10.0039 15.0206 10.1587 14.8656L15.7676 9.25644C16.0775 8.94684 16.0775 8.44443 15.7676 8.13463Z" fill="white" />
                                        </svg>
                                        {ele}
                                    </li>
                                })
                            }
                            </ul>
 */