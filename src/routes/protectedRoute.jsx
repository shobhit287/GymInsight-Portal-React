import PropTypes from "prop-types";
import store from "../store";
import { AUTH_ENTRY, AUTHENTICATED_ENTRY } from "../config/routesConfig";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { isRouteAccess } from "../utils";
import { notification } from "antd";

const ProtectedRoute = ({ component: Component }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logOut, token } = store();

  useEffect(() => {
    if (!user) {
      navigate(AUTH_ENTRY);
    } else if (token !== localStorage.getItem("token")) {
      notification.error({message:"Token Invalid"})
      logOut();
    } else {
      const isAccess = isRouteAccess(location.pathname, user);
      if (!isAccess) {
        navigate(AUTHENTICATED_ENTRY);
      }
    }
  }, [location.pathname, user]);

  return user && token === localStorage.getItem("token") && isRouteAccess(location.pathname, user) ? (
    <Component />
  ) : null;
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
