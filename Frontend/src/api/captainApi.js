import axios from 'axios';

const captainApi = axios.create({
    baseURL : import.meta.env.VITE_BASE_URL,
    withCredentials : true
});

captainApi.interceptors.response.use(
(response) => response, 
async(error) =>{
    const originalRequest = error.config;
    if(error.response?.status === 401 && !originalRequest._retry){
        originalRequest._retry = true;
        try {
            await captainApi.get("/captains/regenerate-token")
            return captainApi(originalRequest)
        } catch (refreshError) {
            console.log(refreshError.message)
        }
    }
    return Promise.reject(error)
}

)
export default captainApi;