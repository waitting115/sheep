import axios from "axios";
import getToken from "../hooks/getToken";

const request = axios.create({
  // baseURL: "https://miemie.online/",
  baseURL: "http://localhost:7002/",
  timeout: 20000,
});

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.token = token;
      return config;
    } else {
      getToken().then(() => {
        config.headers.token = localStorage.getItem("token");
        return config;
      });
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (res) => {
    return res.data;
    // let code = res.data.code; // 获取后端返回的状态码
    // if (code === 200) {
    //   // 成功
    //   return res.data.data; // 返回里面的数据，在使用这个axios时，获取到的东西就是这里返回的东西
    // } else if (code == 401) {
    //   // token失效
    //   return 401;
    // } else {
    //   return res.data;
    // }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default request;
