"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { io as ClientIO } from "socket.io-client";

type SocketContextType = {
    socket: any | null;
    isConnected: boolean;
};

const SocketContext = createContext<SocketContextType>({
    socket: null,
    isConnected: false,
});

export const useSocket = () => { 
    // instaed of importing useContext and using it passing the "SocketContext"
    // name each time enclose it inside a custom hook to make it simpler
    // now we just need to import "useSocket" and use it directly
    return useContext(SocketContext);
};

export function SocketProvider ({ children } : { children : React.ReactNode }) {

    const [socket, setSocket] = useState<any>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        // add the "NEXT_PUBLIC_SITE_URL" in .env in production in dev its by default localhost:3000
        const socketInstance = new (ClientIO as any)("http://localhost:3000", {
            path: "/api/socket/io",
            addTrailingSlash: false,
        });

        console.log("Socket instance : ",socketInstance)

        socketInstance.on("connect", () => { 
            setIsConnected(true) 
            console.log("From socket provider:",socketInstance.id)
        });

        socketInstance.on("message", (mes:any) => {
            console.log('Provider recived message:',mes)
        })

        socketInstance.on("disconnect", () => { 
            setIsConnected(false) 
        });

        setSocket(socketInstance);

        return () => { socketInstance.disconnect() } // recomended by socket.io to disconect at end of useEffect

    }, []);

    return (
        <SocketContext.Provider value={{ socket, isConnected }}>
            {children}
        </SocketContext.Provider>
    )
}