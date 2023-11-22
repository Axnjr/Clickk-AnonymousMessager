import { lazy } from 'react';
const UserStats = lazy(() => import("@/components/dashboard/UserStats"))
const UserForm = lazy(() => import("@/components/dashboard/UserForm"))
const Themes = lazy(() => import("@/components/dashboard/Themes"))

export default async function DashBoardPage() {
    return (
        <div className="h-fit mt-12 xl:mt-16 max-w-[1450px] m-auto" >
            <UserForm />
            <UserStats />
            <Themes />
        </div>
    )
}