import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333",
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  localStorage.setItem("token", response.data.token);
  localStorage.setItem("user", JSON.stringify(response.data.user));
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});