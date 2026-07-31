import axios from "axios";

const api = axios.create({
  baseURL: "https://marketplace-vortex-z6g4.onrender.com"
});

export default api;