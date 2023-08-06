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

export const MDelete = createContext({
    open: false,
    name : ''
});

export const MDeviceSettings = createContext({
    open: false,
    name: ''
})
export default function ModalContext({ children }) {
    const [mLanding, setMLanding] = useState({ open: false, error: false, title:'', message:'' });
    const [mDashboard, setMDashboard] = useState({ open: false, error: false, title:'', message:'', navigate: '' });
    const [mDevice, setMDevice] = useState({ open: false });
    const [mDelete, setMDelete] = useState({ open: false, name : '' });
    const [mDeviceSettings, setMDeviceSettings] = useState({open: false, name: ''});
    return (
        <MLanding.Provider value={{ mLanding, setMLanding }}>
            <MDashboard.Provider value={{ mDashboard, setMDashboard }}>
                <MDevice.Provider value={{mDevice, setMDevice}}>
                    <MDelete.Provider value={{mDelete, setMDelete}}>
                        <MDeviceSettings.Provider value={{mDeviceSettings, setMDeviceSettings}}>
                            {children}
                        </MDeviceSettings.Provider>
                    </MDelete.Provider>
                </MDevice.Provider>
            </MDashboard.Provider>
        </MLanding.Provider>
    )
}