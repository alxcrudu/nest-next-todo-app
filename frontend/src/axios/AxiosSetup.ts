import axios from "axios";

let axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json",
  },
  timeout: 5000,
});

axiosInstance.interceptors.request.use(
  config => {
    config.headers["Authorization"] = "Bearer " + localStorage?.getItem("token");
    return config;
  }, error => {
    Promise.reject(error)
  }
)

export default axiosInstance;
