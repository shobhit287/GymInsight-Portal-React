import PropTypes from "prop-types";
import store from "../store";
import { AUTHENTICATED_ENTRY, publicRoutes } from "../config/routesConfig";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
const PublicRoute = ({ component: Component }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const {user} = store();
  useEffect(()=>{
    if (user) {
      if (`${location.pathname}${location.search}` == AUTHENTICATED_ENTRY) {
        navigate(AUTHENTICATED_ENTRY);
      }
      else {
        const isPublicUrl = publicRoutes.find(route=> route.path == `${location.pathname}`);
        if (isPublicUrl) {
          navigate(AUTHENTICATED_ENTRY);
        }
      }
    }
  },[navigate])
  return !user ? <Component/>:null;
}
PublicRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
  };
export default PublicRoute;