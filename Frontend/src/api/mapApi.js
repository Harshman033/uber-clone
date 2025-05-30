import axios from 'axios';

const mapApi = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
});

export default mapApi;
