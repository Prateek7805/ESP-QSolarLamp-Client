import api from "./Axios_Instance";
const route = '/device';
const updatePassword = async (data)=>{
    try {
        const response = await api.patch(`${route}/password`, data);
        return { error: false, message: response.data.message };
    } catch (error) {
        if(error.response){
            const msg = error.response.data.message;
            const message = Array.isArray(msg) ? msg[0].message : msg;
            return {error: true, message: message};
        }
        return {error: true, message: "Please check your network connection"};
    }
}
const updateName = async (data)=>{
    try {
        const response = await api.patch(`${route}/name`, data);
        return { error: false, message: response.data.message };
    } catch (error) {
        if(error.response){
            const msg = error.response.data.message;
            const message = Array.isArray(msg) ? msg[0].message : msg;
            return {error: true, message: message};
        }
        return {error: true, message: "Please check your network connection"};
    }
}
const unregister = async (name)=>{
    try{
        const response = await api.delete(`${route}/device?name=${name}`);
        return {error: false, message: response.data};
    }catch(error){
        if(error.response){
            return {error: true, message: error.response.data.message};
        }
        return {error: true, message: "Please check your network connection"};
    }
}
const updateDeviceStatus = async (name, data)=>{
    try{
        const response = await api.patch(`${route}/status?name=${name}`,data);
        return {error: false, message: response.data};
    }catch(error){
        if(error.response){
            return {error: true, message: error.response.data.message};
        }
        return {error: true, message: "Please check your network connection"};
    }
}
const getDeviceStatus = async (name) => {
    try{
        const response = await api.get(`${route}/status?name=${name}`);
        return {error: false, message: response.data};
    }catch(error){
        if(error.response){
            return {error: true, message: error.response.data.message};
        }
        return {error: true, message: "Please check your network connection"};
    }
}

const getAllStatuses = async () => {
    try {
        const response = await api.get(`${route}/statuses`);
        return { error: false, message: response.data }
    } catch (error) {
        if(error.response){
            return {error: true, message: error.response.data.message};
        }
        return {error: true, message: "Please check your network connection"};
    }
}

const register = async (data) => {
    try {
        const response = await api.post(`${route}/register`, data);
        return { error: false, message: response.data.message };
    } catch (error) {
        if(error.response){
            const msg = error.response.data.message;
            const message = Array.isArray(msg) ? msg[0].message : msg;
            return {error: true, message: message};
        }
        return {error: true, message: "Please check your network connection"};
    }
}

const deviceAPI = { getAllStatuses, register, getDeviceStatus, updateDeviceStatus, unregister, updateName, updatePassword};
export default deviceAPI;