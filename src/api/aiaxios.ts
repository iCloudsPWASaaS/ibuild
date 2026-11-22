import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const aiApi = axios.create({
  baseURL: apiUrl,
  timeout: 300000,
});

// ✅ Request Interceptor – har API call me token auto add hoga
aiApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default aiApi;