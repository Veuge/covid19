import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://corona.lmao.ninja/",
  headers: {
    // "Access-Control-Allow-Origin": "*",
    'content-type': 'application/x-www-form-urlencoded'
  }
});

export default axiosInstance;