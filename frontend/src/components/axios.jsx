// src/api/axios.js
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api/v1", // backend server URL
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
