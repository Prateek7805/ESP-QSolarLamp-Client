import api from "./Axios_Instance";

const getAllStatuses = async() =>{
    try{
        const response = await api.get('/statuses');
        console.log(response);
        return {error: false, message: response.data.devices}
    }catch(error){
        return {error: true, message: error?.response.data.message};
    }
}
const deviceAPI = {getAllStatuses};
export default deviceAPI;