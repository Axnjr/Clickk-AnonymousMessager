// import { GetUserDetails } from "@/lib/utils"
// import { redirect } from "next/navigation"
import UserStats from "@/components/dashboard/UserStats"
import UserForm from "@/components/dashboard/UserForm"
import Themes from "@/components/dashboard/Themes"
// import DashboardNavbar from "@/components/dashboard/DashboardNavbar";
// "use client";
// import useDataFromFetch from "@/hooks/useDataFromFetch"
// import { useSession } from "next-auth/react"
// import { DataContext } from "@/providers/FetchedDataProvider"
// import UserStats from "@/components/dashboard/UserStats"
// import UserForm from "@/components/dashboard/UserForm"
// import Themes from "@/components/dashboard/Themes"

export default async function DashBoardPage() {
    // const userData = await GetUserDetails()
    // if(userData.length === 0) redirect("/api/auth/signin")

    return (
        <div className="h-fit mt-14 xl:mt-32" >
            {/* <DashboardWrapper
           // @ts-ignore
            data={userData}/> */}
            <UserForm />
            <UserStats />
            <Themes />
        </div>
    )
}

/*

<section className="mt-12 w-full flex items-center gap-2 justify-center">
                    <input id="bg" type="color" className="style1 w-14 h-14 xl:h-20 rounded-lg"
                        value={theme.backgroundColor}
                        onChange={(e) => {
                            setTheme({
                                ...theme,
                                backgroundColor: e.target.value
                            })
                        }}
                    />
                    <p className="text-center text-sm xl:text-lg font-semibold">Background color</p>
                    <input id="col" type="color" className="style1 w-14 h-14 xl:h-20 rounded-lg"
                        value={theme.color}
                        onChange={(e) => {
                            setTheme({
                                ...theme,
                                color: e.target.value
                            })
                        }}
                    />
                    <p className="text-center text-sm xl:text-lg font-semibold">Accent color</p>
                </section>
*/