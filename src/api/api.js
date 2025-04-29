import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,  // Make sure this is set correctly
  withCredentials: true,  // Make sure the backend is configured for cross-origin requests with credentials
});

// Request interceptor to add token to headers
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  // console.log('Access Token:', token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token expiration and refresh
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_REFRESH_TOKEN_URL}`,
          { refreshToken }
        );
        localStorage.setItem('accessToken', response.data.accessToken); // Set new access token
        return API(originalRequest); // Retry the original request with new token
      } catch (err) {
        console.error('Token refresh failed:', err);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login'; // Redirect to login page
        return Promise.reject(err);
      }
    }
    console.error('API Request failed:', error);
    return Promise.reject(error);
  }
);

export default API;
