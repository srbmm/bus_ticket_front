import useAdminLogin from "../../hooks/useAdminLogin.jsx";
import Loading from "../../components/Loading.jsx";
import {Link, useNavigate} from "react-router-dom";
import BG from "../../components/BG.jsx";
import {Button} from "flowbite-react";
import RenderData from "../../components/RenderData.jsx";
import student from "../../data/student.js";

const Students = () => {
    const navigate = useNavigate()
    const [isLogin, isLoad]= useAdminLogin()
    if (isLoad){
        if (isLogin){
            return (
                <div className="flex h-screen w-screen justify-center">
                    <BG />
                    <div className="z-10 flex flex-col gap-2 m-2">
                        <Button className="w-full">
                            <Link to="/admin">بازگشت به پنل ادمین</Link>
                        </Button>
                        <RenderData column={student} Card={({data}) => <div>{data.std_number}</div>} />
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

export default Students;


