import axios from 'axios';

const ACCESS_TIMEOUT = parseInt(process.env.REACT_APP_ACCESS_TIMEOUT);
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
        return access_token;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to obtain AccessToken");
    }
}
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
