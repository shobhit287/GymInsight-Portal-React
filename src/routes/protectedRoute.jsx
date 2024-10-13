import PropTypes from "prop-types";
import store from "../store";
import { AUTH_ENTRY, AUTHENTICATED_ENTRY } from "../config/routesConfig";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { protectedRoutes } from "../config/routesConfig";

const ProtectedRoute = ({ component: Component }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = store();
  const [hasAccess, setHasAccess] = useState(false); 
  useEffect(() => {
    if (!user) {
      navigate(AUTH_ENTRY);
    } else {
      const path = location.pathname;
      const routeInfo = protectedRoutes.find(route => route.path === path);
      if (routeInfo && routeInfo.access.includes(user.role)) {
        setHasAccess(true); 
      } else {
        navigate(AUTHENTICATED_ENTRY);  
      }
    }
  }, [location.pathname]);
  return user && hasAccess ? <Component /> : null;
};

ProtectedRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export default ProtectedRoute;
