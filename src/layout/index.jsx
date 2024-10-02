import { memo, lazy, Suspense, useEffect } from "react";
const AppLayout = lazy(() => import("./appLayout"));
const AuthLayout = lazy(() => import("./authLayout"));
import { userService } from "../services/userService";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { AUTH_ENTRY } from "../config/routesConfig";
import store from "../store";
import Views from "./views";
const Layouts = () => {
    const {user, setUser} = store();
    const navigate = useNavigate();
    useEffect(()=>{
        const validateUser = async () => {
            const token = localStorage.getItem("token");
            if(token) {
                const decodedToken = jwtDecode(token);
                const response = await userService.getById(decodedToken.userId)
                if(response) {
                    setUser(response, token);
                }

            }
        }
        validateUser();

    },[])
    const Layout = user ? AppLayout : AuthLayout;
    return(<>
        <Suspense>
            <Layout>
                <Views/>
            </Layout>
        </Suspense>
    </>)
}
export default memo(Layouts);