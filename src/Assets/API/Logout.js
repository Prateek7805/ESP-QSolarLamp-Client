import api from "./Axios_Instance";

const logout = async () =>{
    try{
        const response = await api.get('/logout', {withCredentials: true});
        const message = response.data.message;
        console.log(response);
        localStorage.removeItem('access_token');
        return {error: false, message: message};
    }catch(error){
        localStorage.removeItem('access_token');
        return {error: true, message: error?.response.data.message};
    }
}

export default logout;