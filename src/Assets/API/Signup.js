import api from "./Axios_Instance";
const signup = async (data) => {
    try{
        const response = await api.post('/signup', data);
        return {error: false, message : response.data.message};
    }catch(error){
        return {error: true, message: error?.response.data.message};
    }
}

export default signup;