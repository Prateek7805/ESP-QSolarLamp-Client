import { createContext, useState } from "react";

export const DashboardPageStatus = createContext({
    path: 'devices',
    device_name: ''
});
export const DeviceList = createContext([]);

export default function DashboardContext({ children }) {
    const [pageStatus, setPageStatus] = useState({
        path: 'devices',
        device_name: ''
    });
    const [devices, setDevices] = useState([]);
    return (
        <DashboardPageStatus.Provider value={{ pageStatus, setPageStatus }}>
            <DeviceList.Provider value={{ devices, setDevices }}>
                {children}
            </DeviceList.Provider>
        </DashboardPageStatus.Provider>
    )
}