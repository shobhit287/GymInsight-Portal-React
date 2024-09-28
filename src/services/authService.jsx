import service from "../auth/fetchInterceptor";
import { apiRoutes } from "../config/apiRoutesConfig";
import { notification } from "antd";
export const authService = {};

authService.login = async function (data) {
  try{
    const response = await service({
      url: `${apiRoutes.login}`,
      method: "post",
      data: data,
    });
    return response
  }
  catch (error) {
    notification.error({message:error.response.data.error})
  }
};
