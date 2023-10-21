import UserStats from "@/components/dashboard/UserStats"
import UserForm from "@/components/dashboard/UserForm"
import Themes from "@/components/dashboard/Themes"

export default async function DashBoardPage() {
    return (
        <div className="h-fit mt-12 xl:mt-20 max-w-[1450px] m-auto" >
            <UserForm />
            <UserStats />
            <Themes />
        </div>
    )
}