"use client";
import UserStats from "@/components/dashboard/UserStats"
import UserForm from "@/components/dashboard/UserForm"
import Themes from "@/components/dashboard/Themes"
import { DataContext } from "@/providers/FetchedDataProvider"
import { userType } from "@/types/all-required-types";

export default function DashboardWrapper({ data, children, loading } : { data: userType, children : React.ReactNode, loading?: boolean }) {
    return (
        <section className="w-full my-4 p-2 md:p-6 mr-4 rounded-3xl flex flex-col justify-center ">
            <DataContext.Provider value={{ data /*, loading */}}>
                {children}
            </DataContext.Provider>
        </section>
    )
}