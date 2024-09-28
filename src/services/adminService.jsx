import service from "../auth/fetchInterceptor";
import { apiRoutes } from "../config/apiRoutesConfig";
import { notification } from "antd";
export const adminService = {};

adminService.create = async function (data) {
  try{
    const response = await service({
      url: `${apiRoutes.admin}`,
      method: "post",
      data: data,
    });
    return response
  }
  catch (error) {
    notification.error({message:error.response.data.error})
  }
};
