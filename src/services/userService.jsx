import service from "../auth/fetchInterceptor";
import { apiRoutes } from "../config/apiRoutesConfig";
import { notification } from "antd";
export const userService = {};

userService.create = async function (data) {
  try{
    const response = await service({
      url: `${apiRoutes.user}`,
      method: "post",
      data: data,
    });
    return response
  }
  catch (error) {
    if(error?.response?.data?.error)
      notification.error({message:error.response.data.error});
    }
};

userService.getById = async function (id) {
  try{
    const response = await service({
      url: `${apiRoutes.user}/${id}`,
      method: "get",
    });
    return response
  }
  catch (error) {
    if(error?.response?.data?.error)
      notification.error({message:error.response.data.error});
    }
};
