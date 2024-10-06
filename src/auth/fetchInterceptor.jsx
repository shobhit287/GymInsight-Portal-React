import axios from "axios";
import { notification } from "antd";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const service = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
});

// Config
const TOKEN_PAYLOAD_KEY = "Authorization";
// API Request interceptor
service.interceptors.request.use(
  (config) => {
    const jwtToken = localStorage.getItem("token") || null;
    if (jwtToken) {
      const finaljWT = `Bearer ${jwtToken}`;
      config.headers[TOKEN_PAYLOAD_KEY] = finaljWT;
    }
    return config;
  },
  (error) => {
    // Do something with request error here
    notification.error({
      message: "Error",
    });
    Promise.reject(error);
  }
);

// API respone interceptor
service.interceptors.response.use(
  (response) => {
    const contentType = response.headers["content-type"];
    if (contentType === "application/pdf") {
      const contentDisposition = response.headers["content-disposition"];
      return {
        blob: response.data,
        contentDisposition,
      };
    }
    return response.data;
  },
  (error) => {
    let notificationParam = {
      message: "",
    };
    if (error.response) {
      if (error.response.status === 500) {
        notificationParam.message = "Internal Server Error";
      }

      if (error.response.status === 508) {
        notificationParam.message = "Time Out";
      }
      if (error.response.status === 429) {
        notificationParam.message = "Too Many Requests";
      }
    } else if (error.message) {
      notificationParam.message = error.message;
    }

    if (notificationParam.message) {
      notification.error(notificationParam);
    }
    return Promise.reject(error);
  }
);

export default service;
