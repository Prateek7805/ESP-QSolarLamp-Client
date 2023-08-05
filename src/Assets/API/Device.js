import api from "./Axios_Instance";

const unregister = async (name)=>{
    try{
        const response = await api.delete(`/device?name=${name}`);
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
        const response = await api.patch(`/status?name=${name}`,data);
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
        const response = await api.get(`/status?name=${name}`);
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
        const response = await api.get('/statuses');
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
        const response = await api.post('/register', data);
        return { error: false, message: response.data.message };
    } catch (error) {
        if(error.response){
            return {error: true, message: error.response.data.message};
        }
        return {error: true, message: "Please check your network connection"};
    }
}

const deviceAPI = { getAllStatuses, register, getDeviceStatus, updateDeviceStatus, unregister};
export default deviceAPI;