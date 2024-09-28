import PropTypes from "prop-types";
import store from "../store";
import { AUTH_ENTRY} from "../config/routesConfig";
import { useNavigate } from "react-router-dom";
const ProtectedRoute = ({ component: Component }) => {
    const navigate = useNavigate();
    const {user} = store();
    if (!user){
        navigate(AUTH_ENTRY);
    }
    else{
    return <Component />;
    }
}
ProtectedRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
  };
export default ProtectedRoute;