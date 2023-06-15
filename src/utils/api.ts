import axios from "axios";

const api = axios.create({
  baseURL: "https://voyagers-server.onrender.com", // Replace with your desired base URL
});

api.interceptors.request.use((config) => {
  // Add your authorization header logic here
  config.headers.Authorization = `Bearer ${localStorage.getItem("jwt")}`;
  return config;
});

export default api;
