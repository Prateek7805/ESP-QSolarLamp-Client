const Logout = async () =>{
    try{
        const response = await api.get('/logout');
        const message = response.data.message;
        localStorage.removeItem('access_token');
        return {error: false, message: message};
    }catch(error){
        return {error: true, message: error?.response.data.message};
    }
}