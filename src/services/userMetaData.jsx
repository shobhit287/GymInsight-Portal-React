import service from "../auth/fetchInterceptor";
import { apiRoutes } from "../config/apiRoutesConfig";
import { notification } from "antd";
import { handleError } from "./errorHandler";
export const userMetaDataService = {};

userMetaDataService.create = async function (data) {
  try {
    const response = await service({
      url: `${apiRoutes.userMetaData}`,
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

userMetaDataService.getAll = async function () {
  try {
    const response = await service({
      url: `${apiRoutes.userMetaData}`,
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

userMetaDataService.getById = async function (id) {
  try {
    const response = await service({
      url: `${apiRoutes.userMetaData}/${id}`,
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

userMetaDataService.update = async function (id, data) {
  try {
    const response = await service({
      url: `${apiRoutes.userMetaData}/${id}`,
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

userMetaDataService.requestPlan = async function (data) {
  try {
    const response = await service({
      url: `${apiRoutes.userMetaData}/request-plan`,
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

userMetaDataService.delete = async function (id) {
  try {
    const response = await service({
      url: `${apiRoutes.userMetaData}/${id}`,
      method: "delete",
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
