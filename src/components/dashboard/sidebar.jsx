import { Layout, Menu } from "antd";
const { Sider } = Layout;
import { menuItems } from "../../config/navigationConfig";
import PropTypes from "prop-types";
import logo from "../../assets/images/logo.ico";
import { Link, useLocation } from "react-router-dom";
import store from "../../store";
import { useEffect, useState } from "react";
const SidebarContent = ({ collapsed }) => {
  const { user } = store();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState("1");

  //Handle Selected Tab Key
  useEffect(() => {
        const currentPath = location.pathname;
        const item = menuItems.find(item => item.path === currentPath);
        if (item) {
            setSelectedKey(item.key);
        }
}, [location.pathname]);

  const handleSelect = (key) => {
    setSelectedKey(key);
};
  return (
    <>
      <Sider className="sidebar" collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <div className="d-flex flex-column p-1 mt-3">
            <img src={logo} alt="logo" className="p-1 logo"/>
          <div>
            <Menu theme="light" selectedKeys={[selectedKey]} mode="inline">
              {menuItems.map((item) => {
                if(item.access.includes(user?.role)){
                return (
                  <Menu.Item key={item.key} icon={item.icon} onClick={() => handleSelect(item.key)}>
                    <Link className="text-decoration-none" to={item.path}>{item.label}</Link>
                  </Menu.Item>
                );
                }
              })}
            </Menu>
          </div>
        </div>
      </Sider>
    </>
  );
};
SidebarContent.propTypes = {
  collapsed: PropTypes.bool.isRequired,
};
export default SidebarContent;
