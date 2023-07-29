import { createContext, useState } from "react";

export const MLanding = createContext({
    open: false,
    error: false,
    title: '',
    message: ''
});

export const MDashboard = createContext({
    open: false,
    error: false,
    title: '',
    message: ''
});

export default function ModalContext({ children }) {
    const [mLanding, setMLanding] = useState({ open: false, error: false, title:'', message:'' });
    const [mDashboard, setMDashboard] = useState({ open: false, error: false, title:'', message:'' });
    return (
        <MLanding.Provider value={{ mLanding, setMLanding }}>
            <MDashboard.Provider value={{ mDashboard, setMDashboard }}>
                    {children}
            </MDashboard.Provider>
        </MLanding.Provider>
    )
}