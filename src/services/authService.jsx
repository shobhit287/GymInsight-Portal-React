import service from "../auth/fetchInterceptor";
import { apiRoutes } from "../config/apiRoutesConfig";
import { notification } from "antd";
import { handleError } from "./errorHandler";
export const authService = {};

authService.login = async function (data) {
  try {
    const response = await service({
      url: `${apiRoutes.auth}/login`,
      method: "post",
      data: data,
    });
    return response;
  } catch (error) {
    if (typeof error?.response?.data?.error === "string") {
      notification.error({ message: error.response.data.error });
    } else if (
      typeof error.response.data.error === "object" &&
      error.response.data.error !== null
    ) {
      handleError(error);
    }
  }
};

authService.googleLogin = async function (data) {
  try {
    const response = await service({
      url: `${apiRoutes.auth}/google-auth/login`,
      method: "post",
      data: data,
    });
    return response;
  } catch (error) {
    if (typeof error?.response?.data?.error === "string") {
      notification.error({ message: error.response.data.error });
    } else if (
      typeof error.response.data.error === "object" &&
      error.response.data.error !== null
    ) {
      handleError(error);
    }
  }
};

authService.forgetPassword = async function (data) {
  try {
    const response = await service({
      url: `${apiRoutes.auth}/forget-password`,
      method: "post",
      data: data,
    });
    return response;
  } catch (error) {
    if (typeof error?.response?.data?.error === "string") {
      notification.error({ message: error.response.data.error });
    } else if (
      typeof error.response.data.error === "object" &&
      error.response.data.error !== null
    ) {
      handleError(error);
    }
  }
};

authService.verifyToken = async function (token) {
  try {
    const response = await service({
      url: `${apiRoutes.auth}/verify-reset-token/${token}`,
      method: "get",
    });
    return response;
  } catch (error) {
    if (typeof error?.response?.data?.error === "string") {
      notification.error({ message: error.response.data.error });
    } else if (
      typeof error.response.data.error === "object" &&
      error.response.data.error !== null
    ) {
      handleError(error);
    }
  }
};
authService.resetPassword = async function (data, token) {
  try {
    const response = await service({
      url: `${apiRoutes.auth}/reset-password/${token}`,
      method: "post",
      data: data,
    });
    return response;
  } catch (error) {
    if (typeof error?.response?.data?.error === "string") {
      notification.error({ message: error.response.data.error });
    } else if (
      typeof error.response.data.error === "object" &&
      error.response.data.error !== null
    ) {
      handleError(error);
    }
  }
};
