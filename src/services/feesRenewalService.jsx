import service from "../auth/fetchInterceptor";
import { apiRoutes } from "../config/apiRoutesConfig";
import { notification } from "antd";
export const feesRenewalService = {};

feesRenewalService.notifyById = async function (id) {
  try{
    const response = await service({
      url: `${apiRoutes.feesRenewal}/${id}`,
      method: "post",
    });
    return response
  }
  catch (error) {
    if(error?.response?.data?.error)
      notification.error({message:error.response.data.error});
    }
};

