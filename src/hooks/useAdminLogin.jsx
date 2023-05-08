import {useState, useEffect} from "react";
import {useContext} from "react";
import {UserContext} from "../context/UserContext.js";
import adminData from "../data/admin.js"
const useAdminLogin = () => {
    const {admin} = useContext(UserContext)
    const [isLogin, setIsLogin] = useState(false)
    const [isLoad, setIsLoad] = useState(false)
    useEffect(() => {
        if (!Object.keys(admin).length){
            setIsLoad(true)
        }else{
            adminData.login(admin.username, admin.password)
                .then(({data})=> setIsLogin(data))
                .catch(err => console.log(err))
                .finally(()=> setIsLoad(true))
        }
    }, []);

    return ([isLogin, isLoad]);
};

export default useAdminLogin;
