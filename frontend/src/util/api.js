import axios from "axios";

const BASE_URL = import.meta.env.VITE_SERVER_URL;

const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

export { BASE_URL, axiosPrivate };