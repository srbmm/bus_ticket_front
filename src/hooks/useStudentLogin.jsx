import {useState, useEffect} from "react";
import {useContext} from "react";
import {UserContext} from "../context/UserContext.js";
import studentData from "../data/student.js"
const useStudentLogin = () => {
    const {student} = useContext(UserContext)
    const [isLogin, setIsLogin] = useState(false)
    const [isLoad, setIsLoad] = useState(false)
    useEffect(() => {
        if (!Object.keys(student).length){
            setIsLoad(true)
        }else{ studentData.login(student.username, student.password).then(()=> setIsLogin(true)).finally(()=> setIsLoad(true))
        }
    }, []);

    return ([isLogin, isLoad]);
};

export default useStudentLogin;
