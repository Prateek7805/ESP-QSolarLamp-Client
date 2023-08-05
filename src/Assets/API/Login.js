import api from './Axios_Instance';
import { getAccessToken } from './Axios_Instance';
const login_basic = async(data) =>{
    try{
        const response = await api.post('/login', data, {withCredentials : true});
        const access_token = response.data.access_token;
        localStorage.setItem('access_token', access_token);
        return {error: false};
    }catch(error){
        if(error.response){
            return {error: true, message: error.response.data.message};
        }
        return {error: true, message: "Please check your network connection"};
    }
}

const login_auto = async () => {
    try{
        const access_token_local = localStorage.getItem('access_token');
        if(access_token_local){
           return true; 
        }
        const access_token = await getAccessToken();
        if(access_token){
            return true;
        }
        return false;
    }catch(err){
        return false;
    }
}
const login = {login_basic, login_auto};
export default login;