/// <reference types="vite/client" />

import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://marketplace-vortex-ten.vercel.app",
});

export default api;