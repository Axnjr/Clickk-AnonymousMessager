"use client";
import { userType } from "../../types/all-required-types";
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
        membership:"",
        image:"",
        backgroundStyles:"",
        buttonStyles:""
    },
    // loading : true
})

// export default function DataContextProvider({children} : { children : React.ReactNode }){

//     async function FetchData() {
//         return await GetUserDetails()
//     }

//     useEffect(() => {
//         (async () => {
//             let temp = await FetchData()
//         })();
//     }, [])

// }