import { memo, lazy, Suspense } from "react";
const AppLayout = lazy(() => import("./appLayout"));
const AuthLayout = lazy(() => import("./authLayout"));
import store from "../store";
import Views from "./views";
const Layouts = () => {
    const {user} = store();
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