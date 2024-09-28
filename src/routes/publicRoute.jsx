import PropTypes from "prop-types";
import store from "../store";
import { AUTHENTICATED_ENTRY } from "../config/routesConfig";
import { useNavigate } from "react-router-dom";
const PublicRoute = ({ component: Component }) => {
  const navigate = useNavigate();
  const {user} = store();
  if (user){
    navigate(AUTHENTICATED_ENTRY);
  }
  else {
  return <Component/>
  }
    
}
PublicRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
  };
export default PublicRoute;