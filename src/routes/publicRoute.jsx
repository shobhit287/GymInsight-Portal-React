import PropTypes from "prop-types";
import store from "../store";
import { AUTHENTICATED_ENTRY } from "../config/routesConfig";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const PublicRoute = ({ component: Component }) => {
  const navigate = useNavigate();
  const {user} = store();
  useEffect(()=>{
    if (user){
      navigate(AUTHENTICATED_ENTRY);
    }
  },[])
  return !user ? <Component/>:null;
}
PublicRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
  };
export default PublicRoute;