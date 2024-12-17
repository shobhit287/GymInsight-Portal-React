import service from "../auth/fetchInterceptor";
import { apiRoutes } from "../config/apiRoutesConfig";
import { handleError } from "./errorHandler";
import { notification } from "antd";
export const userService = {};
userService.create = async function (data) {
  try {
    const response = await service({
      url: `${apiRoutes.user}`,
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

userService.getById = async function (id) {
  try {
    const response = await service({
      url: `${apiRoutes.user}/${id}`,
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
userService.update = async function (id, data) {
  try {
    const response = await service({
      url: `${apiRoutes.user}/${id}`,
      method: "put",
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
