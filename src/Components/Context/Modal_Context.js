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
    message: '',
    navigate: ''
});

export const MDevice = createContext({
    open: false
});
export default function ModalContext({ children }) {
    const [mLanding, setMLanding] = useState({ open: false, error: false, title:'', message:'' });
    const [mDashboard, setMDashboard] = useState({ open: false, error: false, title:'', message:'', navigate: '' });
    const [mDevice, setMDevice] = useState({open: false});
    return (
        <MLanding.Provider value={{ mLanding, setMLanding }}>
            <MDashboard.Provider value={{ mDashboard, setMDashboard }}>
                <MDevice.Provider value={{mDevice, setMDevice}}>
                    {children}
                </MDevice.Provider>
            </MDashboard.Provider>
        </MLanding.Provider>
    )
}