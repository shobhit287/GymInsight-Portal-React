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
]
export const protectedRoutes = [
    {
        key: "dashboard",
        path: `${APP_PREFIX_PATH}/dashboard`,
        component: React.lazy(()=>import("../views/app-views/dashboard"))
    },
]