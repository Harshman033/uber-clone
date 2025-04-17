import axios from 'axios';

const userApi = axios.create({
    baseURL : import.meta.env.VITE_BASE_URL,
    withCredentials : true
});

userApi.interceptors.response.use(
(response) => response, 
async(error) =>{
    const originalRequest = error.config;
    if(error.response?.status === 401 && !originalRequest._retry){
        originalRequest._retry = true;
        try {
            await userApi.get("/users/regenerate-token")
            return userApi(originalRequest)
        } catch (refreshError) {
            console.log(refreshError.message)
        }
    }
    return Promise.reject(error)
}

)
export default userApi;