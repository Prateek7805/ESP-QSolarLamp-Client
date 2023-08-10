import api from "./Axios_Instance";
const getUserData = async () =>{
    try{
        const response = await api.get('/user');
        return {error: false, message: response.data.message};
    }catch(error){
        if(error.response){
            const message = error.response.data.message;
            return {error: true, message: message};
        }
        return {error: true, message: "Please check your network connection"};
    }
}

const userAPI = {getUserData};
export default userAPI;