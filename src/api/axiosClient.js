import axios from "axios";

// const BASE_URL = "http://localhost:5050/api/v1";
const BASE_URL = "https://notion-clone-server.vercel.app/api/v1";

const getToken = () => localStorage.getItem("token");
const axiosClient = axios.create({
  baseURL: BASE_URL,
});

//APIを叩く前に前処理を行う
axiosClient.interceptors.request.use(async (config) => {
  return {
    ...config,
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`, //リクエストヘッダにJWTを付けてサーバに渡す
    },
  };
});

axiosClient.interceptors.response.use(
  (response) => {
    console.log(response.data);
    return response.data;
  },
  (err) => {
    throw err.response;
  }
);

export default axiosClient;
