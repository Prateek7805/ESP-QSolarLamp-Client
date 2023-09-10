import api from "./Axios_Instance";

const logout = async (all) =>{
    all = all || false;
    try{
        const response = await api.get(`/logout?all=${all}`, {withCredentials: true});
        const message = response.data.message;
        console.log(response);
        localStorage.removeItem('access_token');
        return {error: false, message: message};
    }catch(error){
        localStorage.removeItem('access_token');
        if(error.response){
            return {error: true, message: error.response.data.message};
        }
        return {error: true, message: "Please check your network connection"};
    }
}

export default logout;