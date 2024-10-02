import PropTypes from "prop-types";
import store from "../store";
import { AUTH_ENTRY} from "../config/routesConfig";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const ProtectedRoute = ({ component: Component }) => {
    const navigate = useNavigate();
    const {user} = store();
    useEffect(()=>{
        if (!user){
            navigate(AUTH_ENTRY);
        }
        
    },[])
    return user ? <Component/>:null;
}
ProtectedRoute.propTypes = {
    component: PropTypes.elementType.isRequired,
  };
export default ProtectedRoute;