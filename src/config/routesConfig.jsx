import React from "react"
export const APP_PREFIX_PATH ="/gym-insight"
export const AUTH_ENTRY =`${APP_PREFIX_PATH}/login`
export const AUTHENTICATED_ENTRY =`${APP_PREFIX_PATH}/dashboard`

export const publicRoutes = [
    {
        key: "login",
        path: `${APP_PREFIX_PATH}/login`,
        component: React.lazy(()=>import("../views/auth-views/login"))
    },
    {
        key: "signUp",
        path: `${APP_PREFIX_PATH}/signup`,
        component: React.lazy(()=>import("../views/auth-views/signup"))
    },
    {
        key: "forgetPassword",
        path: `${APP_PREFIX_PATH}/forget-password`,
        component: React.lazy(()=>import("../views/auth-views/forgetPassword"))
    },
    {
        key: "verifyToken",
        path: `${APP_PREFIX_PATH}/verify-token`,
        component: React.lazy(()=>import("../views/auth-views/verifyToken"))
    },
    {
        key: "resetPassword",
        path: `${APP_PREFIX_PATH}/reset-password`,
        component: React.lazy(()=>import("../views/auth-views/resetPassword"))
    },
]
export const protectedRoutes = [
    {
        key: "dashboard",
        path: `${APP_PREFIX_PATH}/dashboard`,
        component: React.lazy(()=>import("../views/app-views/dashboard"))
    },
]