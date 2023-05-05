import useAdminLogin from "../../hooks/useAdminLogin.jsx";
import Loading from "../../components/Loading.jsx";
import {useNavigate} from "react-router-dom";

const Students = () => {
    const navigate = useNavigate()
    const [isLogin, isLoad]= useAdminLogin()
    if (isLoad){
        if (isLogin){
            return (
                <div className="flex h-screen w-screen">
                    stds
                </div>
            );
        }else {
            navigate("/admin")
            return <div></div>
        }
    }else {
        return <Loading />
    }

};

export default Students;
