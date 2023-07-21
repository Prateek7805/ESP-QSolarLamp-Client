import { createContext, useState } from "react";

export const Info = createContext({
    open: false,
    error: false,
    title: '',
    message: ''
});

export default function ModalContext({ children }) {
    const [mInfo, setMInfo] = useState({ open: false, error: false, title:'', message:'' });

    return (
        <Info.Provider value={{ mInfo, setMInfo }}>
                    {children}
        </Info.Provider>

    )
}