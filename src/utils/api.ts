import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // Replace with your desired base URL
});

api.interceptors.request.use((config) => {
  // Add your authorization header logic here
  config.headers.Authorization = `Bearer ${localStorage.getItem("jwt")}`;
  return config;
});

export default api;
