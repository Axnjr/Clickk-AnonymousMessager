"use client";
import { DataContext } from "@/providers/FetchedDataProvider"
import { userType } from "../../../types/all-required-types";
import { memo } from "react";
import colors from "colors";

export const DashboardWrapper = memo(
    function DashboardWrapper({ data, children } : { data: userType, children : React.ReactNode }) {
        
        let t = new Date().toLocaleTimeString()
        console.log(colors.bgBlue.yellow.underline.italic(`Memoized Wrapper Rendered at ${t}`))

        return (
            <section className="w-full my-4 p-2 md:p-6 mr-4 rounded-3xl flex flex-col justify-center ">
                <DataContext.Provider value={{ data }}>
                    {children}
                </DataContext.Provider>
            </section>
        )
    }
);
