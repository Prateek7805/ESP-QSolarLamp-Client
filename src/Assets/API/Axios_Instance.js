import axios from 'axios';

const ACCESS_TIMEOUT = parseInt(process.env.REACT_APP_ACCESS_TIMEOUT);
const API_TIMEOUT = parseInt(process.env.REACT_APP_GENERAL_API_TIMEOUT);
const errorMessages = {
    jwt: 'invalid jwt'
}
const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

const getAccessToken = async () => {
    try {
        const response = await api.get('/access_token', {
            timeout: ACCESS_TIMEOUT,
            withCredentials: true
        });
        const access_token = response.data.access_token;
        localStorage.setItem('access_token', access_token);
        return access_token;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to obtain AccessToken");
    }
}

api.interceptors.request.use(
    (config)=>{
        const access_token = localStorage.getItem('access_token');
        if(access_token){
            config.headers['x-auth-token'] = access_token;
            config.timeout = API_TIMEOUT;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
)
api.interceptors.response.use(response => response,
    async (error) => {
        try {
            const { status, data } = error.response;
            if (status === 401 && data.message === errorMessages.jwt && !error.config.__isRetryRequest) {
                try {
                    const access_token = await getAccessToken();
                    error.config.__isRetryRequest = true;
                    error.config.headers['x-auth-token'] = access_token;
                    return api(error.config);
                } catch (refreshErr) {
                    localStorage.removeItem('access_token');
                    return Promise.reject(refreshErr);
                }
            }
            return Promise.reject(error);
        } catch (err) {
            return Promise.reject(err);
        }
    });

export default api;
export { getAccessToken };
