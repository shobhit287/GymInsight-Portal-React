import { ConfigProvider } from "antd";
import Routes from "../routes";
export const Views = () => {
  return (
    <ConfigProvider>
      <Routes />
    </ConfigProvider>
  );
};

export default Views;
