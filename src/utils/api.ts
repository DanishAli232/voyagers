import axios from "axios";

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_SERVER_URL
      : process.env.REACT_APP_SERVER_LOCALHOST || "https://voyagers-server.onrender.com", // Replace with your desired base URL
});

api.interceptors.request.use((config) => {
  // Add your authorization header logic here
  config.headers.Authorization = `Bearer ${localStorage.getItem("jwt")}`;
  return config;
});

export default api;
