import axios from 'axios';

const api = axios.create({
    baseURL : import.meta.env.VITE_BASE_URL,
    withCredentials : true
});

api.interceptors.response.use(
(response) => response, 
async(error) =>{
    const originalRequest = error.config;
    if(error.response?.status === 401 && !originalRequest._retry){
        originalRequest._retry = true;
        try {
            await api.get("/users/regenerate-token")
            return api(originalRequest)
        } catch (refreshError) {
            console.log(refreshError.message)
        }
    }
    return Promise.reject(error)
}

)
export default api;