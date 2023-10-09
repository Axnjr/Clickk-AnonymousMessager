"use client";
import { userType } from "@/types/all-required-types";
import { createContext } from "react";

type DataContextType = {
    data : userType,
    // loading: boolean
}

export const DataContext = createContext<DataContextType>({ 
    data : {
        id:"",
        name:"",
        question:"",
        extra_param1:"",
        image:"",
        backgroundStyles:"",
        buttonStyles:""
    },
    // loading : true
})