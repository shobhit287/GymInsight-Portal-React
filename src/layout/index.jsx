import { memo, lazy, Suspense, useEffect, useState } from "react";
const AppLayout = lazy(() => import("./appLayout"));
const AuthLayout = lazy(() => import("./authLayout"));
import { userService } from "../services/userService";
import { jwtDecode } from "jwt-decode";
import store from "../store";
import Views from "./views";
import { useLocation, useNavigate } from "react-router-dom";
import { AUTH_ENTRY } from "../config/routesConfig";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Layouts = () => {
  const { user, setUser } = store();
  const location = useLocation();
  const [isPending, setIsPending] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const validateUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const response = await userService.getById(decodedToken.userId);
        if (response) {
          setUser(response.user, token);
        } else {
          const url = redirectUrl();
          navigate(url);
        }
      } else {
        const url = redirectUrl();
        navigate(url);
      }
      setIsPending(false);
    };
    validateUser();
  }, []);

  function redirectUrl() {
    if (location.pathname != AUTH_ENTRY) {
      const redirectUri = `${location.pathname}${location.search}`;
      const encodedRedirectUri = encodeURIComponent(redirectUri);
      return `${AUTH_ENTRY}?redirect_uri=${encodedRedirectUri}`;
    }
    return AUTH_ENTRY;
  }

  const Layout = user ? AppLayout : AuthLayout;

  return (
    <>
      <Suspense
        fallback={
          <div className="d-flex align-items-center justify-content-center vh-100">
            <Spin indicator={<LoadingOutlined spin className="fs-1" />} />
          </div>
        }
      >
        {!isPending && (
          <Layout>
            <Views />
          </Layout>
        )}
      </Suspense>
    </>
  );
};

export default memo(Layouts);
