import "@/app/assets/globals.css"
import { notFound } from 'next/navigation'
import { prismaDB } from "../../../backendLib/prismaDb";
import { cn } from '../../lib/utils';
import UserPageWrapper from '@/components/userpage/UserPageWrapper';
import { Suspense } from 'react';
import Loading from '@/app/loading';
import { userType, pageProps } from '../../../types/all-required-types';

export default async function UserPage({ params } : pageProps) {
    const user_name = `${params["user"]}`.replaceAll("%20", " ")
    const data : userType[] | any = await prismaDB.user.findMany({ where: { name : user_name } })
    if (!data[0]) { notFound() }
    else if(data[0].membership){
        (async () => {
            try {
                let t = await prismaDB.userAnalytics.upsert({
                    where : { userId:data[0].id },
                    update : { page_views:{increment:1}, },
                    create : { userId : data[0].id, page_views : 1 }
                })
                // console.log(t)
            } catch (error) { console.log(error) }
        })();
    }

    return (
        <>
            <Suspense fallback={<Loading type='big' message='....'/>}>
                <main className={cn(`user_page w-screen min-h-screen flex flex-col 
                justify-center items-center`,data[0].backgroundStyles)}>
                    <UserPageWrapper data={data[0]}/>
                    <a className="flex items-center p-12">
                        <h1 className="text-xl font-black tracking-tighter"><span></span>Echo™</h1>
                    </a>
                </main>
            </Suspense>
        </>
    )
}