import { useState } from 'react';
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';
import PropTypes from "prop-types";
import store from '../store';
const { Header, Content, Sider } = Layout;
const AppLayout = ({children}) => {
  const {logOut} = store();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="demo-logo-vertical" />
        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline"  />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}>
            <div>
              <Button type='primary' onClick={()=>logOut()}>Logout</Button>
            </div>
          </Header>
          
        
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
AppLayout.propTypes = {
  children: PropTypes.any.isRequired,
};
export default AppLayout;