import api from "./Axios_Instance";
const signup = async (data) => {
    try{
        const response = await api.post('/signup', data);
        return {error: false, message : response.data.message};
    }catch(error){
        console.log(error);
        if(error?.response){
            return {error: true, message: error.response.data.message};
        }
        return {error: true, message: 'Error Signing up'};
    }
}

export default signup;