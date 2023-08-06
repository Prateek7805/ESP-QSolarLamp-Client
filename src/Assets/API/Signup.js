import api from "./Axios_Instance";
const signup = async (data) => {
    try{
        const response = await api.post('/signup', data);
        return {error: false, message : response.data.message};
    }catch(error){
        if(error.response){
            const msg = error.response.data.message;
            const message = Array.isArray(msg) ? msg[0].message : msg;
            return {error: true, message: message};
        }
        return {error: true, message: "Please check your network connection"};
    }
}

export default signup;