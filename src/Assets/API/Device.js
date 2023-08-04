import api from "./Axios_Instance";

const updateDeviceStatus = async (name, data)=>{
    try{
        const response = await api.patch(`/status?name=${name}`,data);
        return {error: false, message: response.data};
    }catch(error){
        return {error: true, message: error?.response.data.message};
    }
}
const getDeviceStatus = async (name) => {
    try{
        const response = await api.get(`/status?name=${name}`);
        return {error: false, message: response.data};
    }catch(error){
        return {error: true, message: error?.response.data.message};
    }
}

const getAllStatuses = async () => {
    try {
        const response = await api.get('/statuses');
        return { error: false, message: response.data }
    } catch (error) {
        return { error: true, message: error?.response.data.message };
    }
}

const register = async (data) => {
    try {
        const response = await api.post('/register', data);
        return { error: false, message: response.data.message };
    } catch (error) {
        return { error: true, message: error?.response.data.message };
    }
}

const deviceAPI = { getAllStatuses, register, getDeviceStatus, updateDeviceStatus };
export default deviceAPI;