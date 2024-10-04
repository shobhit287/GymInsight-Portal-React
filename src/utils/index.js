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