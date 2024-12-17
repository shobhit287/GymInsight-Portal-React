import { notification } from "antd";

export const handleError = (error) => {
  const errors = []; 

  const errorObj = error.response?.data?.error;

  if (errorObj) {
    Object.entries(errorObj).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((errorMessage) => {
          errors.push(errorMessage);
        });
      }
    });
  }

  if (errors.length) {
    errors.forEach((message) => {
      notification.error({ message });
    });
  } else {
    notification.error({ message: "Error while processing request" });
  }
  errors.length = 0;
};
