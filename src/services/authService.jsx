import service from "../auth/fetchInterceptor";
import { apiRoutes } from "../config/apiRoutesConfig";
import { notification } from "antd";
export const authService = {};

authService.login = async function (data) {
  try{
    const response = await service({
      url: `${apiRoutes.auth}/login`,
      method: "post",
      data: data,
    });
    return response
  }
  catch (error) {
    notification.error({message:error.response.data.error})
  }
};

authService.forgetPassword = async function (data) {
  try{
    const response = await service({
      url: `${apiRoutes.auth}/forget-password`,
      method: "post",
      data: data,
    });
    return response
  }
  catch (error) {
    notification.error({message:error.response.data.error})
  }
};

authService.verifyToken = async function (token) {
  try{
    const response = await service({
      url: `${apiRoutes.auth}/verify-reset-token/${token}`,
      method: "get",
    });
    return response
  }
  catch (error) {
    notification.error({message:error.response.data.error})
  }
};
authService.resetPassword = async function (data, token) {
  try{
    const response = await service({
      url: `${apiRoutes.auth}/reset-password/${token}`,
      method: "post",
      data: data
    });
    return response
  }
  catch (error) {
    notification.error({message:error.response.data.error})
  }
};
