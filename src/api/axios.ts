import axios from "axios";

// Directly point to your deployed backend if not using .env
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://bookingsystem-backend-mnyr.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});

// Request interceptor to add token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
