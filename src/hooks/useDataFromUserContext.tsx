"use client"
import { useContext } from "react";
import { DataContext } from "@/providers/FetchedDataProvider"
import { userType } from "../../types/all-required-types";

export function useDataFromUserContext(prop : keyof userType){
    const { data } = useContext(DataContext)
    return data[prop]
    
}

export function useAllDataFromUserContext() : userType {
    const { data } = useContext(DataContext)
    return data
}