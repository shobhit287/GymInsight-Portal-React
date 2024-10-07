import loginbg from "../assets/images/loginbg.jpg";
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
   if (key == "renewalDate") {
     return { bgColor: "#f7c0c8", color: "#dd3c69" };
   } else if (key == "joiningDate") {
     return { bgColor: "#affaad", color: "#368433" };
   }
 };