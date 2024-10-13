import { Layout, Row, Col, Breadcrumb, Space, Dropdown } from "antd";
const { Header } = Layout;
import { APP_PREFIX_PATH } from "../../config/routesConfig";
import {
  DownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import store from "../../store";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { getBreadCrumbTitle } from "../../utils";
const HeaderContent = ({ collapsed, setCollapsed }) => {
  const { logOut, user } = store();
  const location = useLocation();
  const items = [
    {
      label: <span onClick={() => logOut()}>LogOut</span>,
      key: "0",
    },
  ];
  return (
    <>
      <Header className="header">
        <Row align="middle" className="d-flex justify-content-between">
          <Col className="d-flex align-items-center gap-3">
            {collapsed ? (
              <MenuUnfoldOutlined
                className="cursor-pointer"
                onClick={() => setCollapsed(!collapsed)}
              />
            ) : (
              <MenuFoldOutlined
                className="cursor-pointer"
                onClick={() => setCollapsed(!collapsed)}
              />
            )}
            <Breadcrumb
              items={[
                {
                  title: <Link to={`${APP_PREFIX_PATH}/dashboard`}>Home</Link>,
                },
                {
                  title: getBreadCrumbTitle(location.pathname),
                },
              ]}
            />
          </Col>

          <Col className="d-flex align-items-center gap-4">
            <strong>{`${user.firstName} ${user.lastName}`}</strong>
            <Dropdown
              className="cursor-pointer"
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <Space>
                <DownOutlined />
              </Space>
            </Dropdown>
          </Col>
        </Row>
      </Header>
    </>
  );
};
HeaderContent.propTypes = {
    collapsed: PropTypes.bool.isRequired,
    setCollapsed: PropTypes.func.isRequired,
}
export default HeaderContent;
