import axios from 'axios';

const userApi = axios.create({
    baseURL : import.meta.env.VITE_BASE_URL,
    withCredentials : true
});

let isRefreshing = false;

//helper to check if the path needs auth
const requiresAuth = (url) => {
    console.log("User API checking URL:", url);
    const needsAuth =  url.includes('/users/user-home') || url.includes('/users/me') || url.includes('/users/rides/create-ride') ;
    console.log("Needs auth:", needsAuth);
    return needsAuth
};

// Request interceptor to prevent unnecessary token refresh
userApi.interceptors.request.use(
    (config) => {
        // Tag requests that need authentication
        if (requiresAuth(config.url)) {
            config.requiresAuth = true;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

userApi.interceptors.response.use(
(response) => response, 
async(error) =>{
    const originalRequest = error.config;

    if(error.response?.status === 401 && !originalRequest._retry&&!isRefreshing&&originalRequest.requiresAuth){
        originalRequest._retry = true;
        isRefreshing=true
        try {
            await userApi.post("/users/regenerate-token")
            isRefreshing=false
            return userApi(originalRequest)
        } catch (refreshError) {
            isRefreshing=false
            console.error(refreshError.message || 'Refresh token expired or invalid')
            return Promise.reject(refreshError);
        }
    }
    return Promise.reject(error)
}

)
export default userApi;