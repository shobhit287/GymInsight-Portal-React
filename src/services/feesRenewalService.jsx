import service from "../auth/fetchInterceptor";
import { apiRoutes } from "../config/apiRoutesConfig";
import { notification } from "antd";
import { handleError } from "./errorHandler";
export const feesRenewalService = {};

feesRenewalService.notifyById = async function (id) {
  try {
    const response = await service({
      url: `${apiRoutes.feesRenewal}/${id}`,
      method: "post",
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
