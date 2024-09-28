import { publicRoutes, protectedRoutes } from "../config/routesConfig";
import { Suspense } from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import PublicRoute from "./publicRoute";
import ProtectedRoute from "./protectedRoute";
import { AUTH_ENTRY } from "../config/routesConfig";
const Routes = () =>{
    return (
        <Suspense fallback={<div>Loading...</div>}>
          <RouterRoutes>
            {publicRoutes.map((route) => (
              <Route key={route.key} path={route.path} element={<PublicRoute component={route.component} />} />
            ))}

            {protectedRoutes.map((route) => (
              <Route key={route.key} path={route.path} element={<ProtectedRoute component={route.component} />} />
            ))}
    
            <Route path="*" element={<Navigate to={AUTH_ENTRY} />} />
          </RouterRoutes>

        </Suspense>
      );

}
export default Routes;