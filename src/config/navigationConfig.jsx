import {APP_PREFIX_PATH} from "./routesConfig";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
export const menuItems = [
    {
        key: "1",
        path :`${APP_PREFIX_PATH}/dashboard`,
        label: "Home",
        icon: <HomeOutlined />,
        access: ["SUPER_ADMIN", "ADMIN", "USER"]
    },
    {
        key: "2",
        path :`${APP_PREFIX_PATH}/gym-members`,
        label: "Gym Members",
        icon: <UserOutlined />,
        access: ["ADMIN"]
    },
    {
        key: "3",
        path :`${APP_PREFIX_PATH}/gym-owners`,
        label: "Gym Owners",
        icon: <UserOutlined />,
        access: ["SUPER_ADMIN"]
    },
]