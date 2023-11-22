import "@/app/assets/globals.css"
import { notFound } from 'next/navigation'
import { prismaDB } from "../../../backendLib/prismaDb";
import { cn } from '../../lib/utils';
import UserPageWrapper from '@/components/userpage/UserPageWrapper';
import { Suspense } from 'react';
import Loading from '@/app/loading';
import { userType, pageProps } from '../../../types/all-required-types';
import { GetDetails } from "@/lib/dataHelpers";

export default async function UserPage({ params }: pageProps) {

    const user_name = `${params["user"]}`.replaceAll("%20", " ")
    const data: userType | any = await GetDetails(user_name)

    if (!data) { notFound() }

    else if (!data.membership && data.id) {
        (async () => {
            try {
                let t = await prismaDB.userAnalytics.upsert({
                    where: { userId: data.id },
                    update: { page_views: { increment: 1 }, },
                    create: { userId: data.id, page_views: 1 }
                })
                console.log("ANAYTICS AT PAGE WRAPPER =====>",t)
            } catch (error) { console.log(error) }
        })();
    }

    return (
        <>
            <Suspense fallback={<Loading type='big' message='....' />}>
                <main className={cn(`user_page w-screen min-h-screen flex flex-col 
                justify-start items-center`
                    , data.backgroundStyles
                )}>
                    <UserPageWrapper data={data} />
                </main>
            </Suspense>
        </>
    )
}