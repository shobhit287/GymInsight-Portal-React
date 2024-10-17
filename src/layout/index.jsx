import { memo, lazy, Suspense, useEffect, useState } from "react";
const AppLayout = lazy(() => import("./appLayout"));
const AuthLayout = lazy(() => import("./authLayout"));
import { userService } from "../services/userService";
import { jwtDecode } from "jwt-decode";
import store from "../store";
import Views from "./views";
import { useNavigate } from "react-router-dom";
import { AUTH_ENTRY } from "../config/routesConfig";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Layouts = () => {
  const { user, setUser } = store();
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
          navigate(AUTH_ENTRY);
        }
      }
      setIsPending(false);
    };
    validateUser();
  }, []);

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
