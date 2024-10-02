import { useEffect } from "react";
import { authService } from "../../services/authService";
import { useLocation, useNavigate } from "react-router-dom";
import { APP_PREFIX_PATH, AUTH_ENTRY } from "../../config/routesConfig";
const VerifyToken = ()=>{
    const location = useLocation();
    const navigate = useNavigate();
    useEffect(()=>{
     const verifyToken = async ()=>{
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get("token");
        debugger
        if(token) {
            const response = await authService.verifyToken(token);
            if (response) {
                navigate(`${APP_PREFIX_PATH}/reset-password?token=${token}`);
            }
            else{
                navigate(AUTH_ENTRY);
            }  
            
            
        }
     };
     verifyToken();
    },[])
    return<>Redirecting.....</>
}
export default VerifyToken;