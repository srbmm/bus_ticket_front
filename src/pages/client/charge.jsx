import BG from "../../components/BG.jsx";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../../context/UserContext.js";
import {useState, useEffect, useContext} from "react";
import students from "../../data/student.js"
import {TextInput, Button} from "flowbite-react";
import {toast} from "react-toastify";
import Loading from "../../components/Loading.jsx";
import useStudentLogin from "../../hooks/useStudentLogin.jsx";

const Charge = () => {
    const {student} = useContext(UserContext);
    const navigate = useNavigate();
    if (!Object.keys(student).length) navigate("/client")
    const [isLogin, isLoad] = useStudentLogin()
    const [data, setData] = useState(undefined);
    const [value, setValue] = useState(0);
    useEffect(() => {
        if (isLogin) {
            students.get({id: student.username}).then(({data}) => {
                setData(data[0])
            })
        }
    }, [isLogin]);
    if (isLoad){
        if (isLogin) return (
            <div className="flex h-screen w-screen items-center justify-center rtl">
                <BG/>
                <div className="z-10 flex">
                    <TextInput placeholder="مقدار" className="w-96" type="number" onChange={e => {
                        console.log(e.target.value)
                        setValue(e.target.value)
                    }}/>
                    <Button color="success" onClick={e =>{
                        const beforeChange = data.balance
                        try {
                            data.balance += Number(value)
                        }catch (e){
                            console.log(e)
                        }
                        if(beforeChange === data.balance){
                            toast.error('خطا! لطفا مقدار را با دقت وارد نمایید.', {
                                position: "bottom-right",
                                autoClose: 4000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                            });
                        }else {
                            students.editOne(data.std_id, {balance: data.balance}).then(() => {
                                toast.success(`مقدار ${value} با موفقیت شارژ شد.`, {
                                    position: "bottom-right",
                                    autoClose: 4000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                                });
                                navigate("/client");
                            }).catch(err => {
                                console.log(err);
                                toast.error('خطا! مشکلی پیش آمده است.', {
                                    position: "bottom-right",
                                    autoClose: 4000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                                });
                            })
                        }
                    }}>شارژ</Button>
                </div>
            </div>
        );
        else {
            navigate("/client");
        }
    }else{
        return (<Loading />)
    }

};

export default Charge;
