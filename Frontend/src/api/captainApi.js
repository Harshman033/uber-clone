import axios from 'axios';

const captainApi = axios.create({
    baseURL : import.meta.env.VITE_BASE_URL,
    withCredentials : true
});

let isRefreshing = false;

// Helper to check if route requires authentication
const requiresAuth = (url) => {
    return url.includes('/captains/captain-home') || url.includes('/captains/me');
};

// Request interceptor to prevent unnecessary token refresh
captainApi.interceptors.request.use(
    (config) => {
        // Tag requests that need authentication
        if (requiresAuth(config.url)) {
            config.requiresAuth = true;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

captainApi.interceptors.response.use(
(response) => response, 
async(error) =>{
    const originalRequest = error.config;

    if(error.response?.status === 401 && !originalRequest._retry&&!isRefreshing&&originalRequest.requiresAuth){
        originalRequest._retry = true;
        isRefreshing = true;
        try {
            await captainApi.post("/captains/regenerate-token")
            isRefreshing = false
            return captainApi(originalRequest)
        } catch (refreshError) {
            isRefreshing = false
            console.error(refreshError.message || 'Refresh token expired or invalid')
            return Promise.reject(refreshError);
        }
    }
    return Promise.reject(error)
}
)
export default captainApi;