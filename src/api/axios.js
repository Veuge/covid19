import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://disease.sh/",
  headers: {
    // "Access-Control-Allow-Origin": "*",
    'content-type': 'application/x-www-form-urlencoded'
  }
});

export default axiosInstance;