import service from "../auth/fetchInterceptor";
import { apiRoutes } from "../config/apiRoutesConfig";
import { notification } from "antd";
import { handleError } from "./errorHandler";
export const adminMetaDataService = {};

adminMetaDataService.create = async function (data) {
  try {
    const response = await service({
      url: `${apiRoutes.adminMetaData}`,
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

adminMetaDataService.getAll = async function () {
  try {
    const response = await service({
      url: `${apiRoutes.adminMetaData}`,
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

adminMetaDataService.getById = async function (id) {
  try {
    const response = await service({
      url: `${apiRoutes.adminMetaData}/${id}`,
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

adminMetaDataService.approve = async function (id) {
  try {
    const response = await service({
      url: `${apiRoutes.adminMetaData}/${id}/approve`,
      method: "patch",
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

adminMetaDataService.reject = async function (id, data) {
  try {
    const response = await service({
      url: `${apiRoutes.adminMetaData}/${id}/reject`,
      method: "patch",
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

adminMetaDataService.getDocumentById = async function (id) {
  try {
    const response = await service({
      url: `${apiRoutes.adminDocumentData}/${id}`,
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

adminMetaDataService.update = async function (id, data) {
  try {
    const response = await service({
      url: `${apiRoutes.adminMetaData}/${id}`,
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

adminMetaDataService.delete = async function (id) {
  try {
    const response = await service({
      url: `${apiRoutes.adminMetaData}/${id}`,
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
