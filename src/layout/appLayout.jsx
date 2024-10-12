import { Layout, theme } from "antd";
import PropTypes from "prop-types";
const { Content } = Layout;
import HeaderContent from "../components/dashboard/header";
import SidebarContent from "../components/dashboard/sidebar";
import { useState } from "react";
import store from "../store";
const AppLayout = ({ children }) => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const {user} = store();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    > 
    {user && (
      <>
      <SidebarContent collapsed={collapsed} />
      <Layout>
        <HeaderContent collapsed={collapsed} setCollapsed={setCollapsed}/>
      <Content
          style={{
            margin: "0 16px",
          }}
        >
          <div
            className="mt-2 "
            style={{
              padding: 24,
              minHeight: 460,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
      </>
      )}
    </Layout>
  );
};
AppLayout.propTypes = {
  children: PropTypes.any.isRequired,
};
export default AppLayout;
