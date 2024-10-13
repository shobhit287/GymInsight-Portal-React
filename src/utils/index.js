import loginbg from "../assets/images/loginbg.jpg";
import { protectedRoutes } from "../config/routesConfig";
export const authBackground={
    backgroundImage: `url(${loginbg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "100vh",
}

export const saveToLocalStorage = (key, value)=>{
   localStorage.setItem(key, value);
}
export const removeFromLocalStorage = (key)=>{
   localStorage.removeItem(key);
}
export const dateToString = (date) => {
   const formattedDate = new Date(date);
   return formattedDate.toLocaleDateString('en-GB', {
     day: 'numeric',
     month: 'short',
     year: 'numeric',
   });
}

export const colorStatus = (key) => {
   if (key == "renewalDate" || key == "REJECTED") {
     return { bgColor: "#f7c0c8", color: "#dd3c69" };
   } else if (key == "joiningDate" || key == "APPROVED") {
     return { bgColor: "#affaad", color: "#368433" };
   } else if (key == "PENDING") {
     return { bgColor: "#efec8d", color: "#787927" }; 
   }
 };

 export const getBreadCrumbTitle = (path) =>{
   const title = protectedRoutes.find(route => route.path == path);
   return title ? title.key : "Gym Insight";
  
 }