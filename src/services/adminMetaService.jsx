import service from "../auth/fetchInterceptor";
import { apiRoutes } from "../config/apiRoutesConfig";
import { notification } from "antd";
export const adminMetaDataService = {};

adminMetaDataService.create = async function (data) {
  try{
    const response = await service({
      url: `${apiRoutes.adminMetaData}`,
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

adminMetaDataService.getById = async function (id) {
  try{
    const response = await service({
      url: `${apiRoutes.adminMetaData}/${id}`,
      method: "get",
    });
    return response
  }
  catch (error) {
    if(error?.response?.data?.error)
      notification.error({message:error.response.data.error});
    }
};

adminMetaDataService.getDocumentById = async function (id) {
  try{
    const response = await service({
      url: `${apiRoutes.adminDocumentData}/${id}`,
      method: "get",
    });
    return response
  }
  catch (error) {
    if(error?.response?.data?.error)
      notification.error({message:error.response.data.error});
    }
};
