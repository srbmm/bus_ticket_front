import useAdminLogin from "../../hooks/useAdminLogin.jsx";
import Loading from "../../components/Loading.jsx";
import {useNavigate} from "react-router-dom";
import BG from "../../components/BG.jsx";
import {Button} from "flowbite-react";
import {Link} from "react-router-dom";

const Buses = () => {
    const navigate = useNavigate()
    const [isLogin, isLoad]= useAdminLogin()
    console.log(isLoad, isLogin)
    if (isLoad){
        if (isLogin){
            return (
                <div className="flex h-screen w-screen justify-center">
                    <BG />
                    <div className="z-10 flex flex-col gap-2 m-2">
                        <Button className="w-full">
                            <Link to="/admin">بازگشت به پنل ادمین</Link>
                        </Button>
                    </div>
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

export default Buses;
