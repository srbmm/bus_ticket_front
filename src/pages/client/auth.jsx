import {Badge, Button, Label, TextInput} from "flowbite-react";
import BG from "../../components/BG.jsx";
import {useState, useEffect, useContext} from "react";
import studentData from "../../data/student";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {UserContext} from "../../context/UserContext.js";
import Loading from "../../components/Loading.jsx";
import useStudentLogin from "../../hooks/useStudentLogin.jsx";


const Auth = () => {
    const {student, setStudent} = useContext(UserContext);
    const [isStudentLogin, isLoad] = useStudentLogin()
    const [isLogin, setIsLogin] = useState(false);
    const [data, setData] = useState(undefined);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    useEffect(() => {
        if (isLogin) {
            studentData.get({stdNumber: student.username}).then(({data}) => {
                setData(data[0])
            })
        }
    }, [isLogin]);
    useEffect(() => {
        if (isStudentLogin) {
            setIsLogin(true)
        }
    }, [isStudentLogin, isLoad])

    function auth(username, password, isToast) {
        studentData.login(username, password).then(({data}) => {
            window.localStorage.setItem('student', JSON.stringify({username, password}));
            setStudent({username, password});
            setIsLogin(data);
            if (isToast) {
                if (data) toast.success('با موفقیت وارد شدید.', {
                    position: "bottom-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                else toast.error('خطا! لطفا اطلاعات را با دقت وارد نمایید.', {
                    position: "bottom-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        }).catch((error) => {
            console.log(error);
            window.localStorage.removeItem("student");
            setStudent({});
            if (isToast) toast.error('خطا! لطفا اطلاعات را با دقت وارد نمایید.', {
                position: "bottom-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setIsLogin(false);
        })

    }

    if (isLogin) {
        return (<div className="flex justify-center gap-2 flex-wrap pr-96 pl-96">
            <BG/>
            <div className="z-10 m-2">
                <div className="flex gap-1 m-2">
                    <Button color="failure" className="w-96" onClick={(e) => {
                        setStudent({})
                        window.localStorage.removeItem('student');
                        setIsLogin(false)
                    }}>خروج</Button>
                    <Button>
                        <Link to="/" className="w-96">
                            بازگشت به خانه
                        </Link>
                    </Button>
                </div>
                <div className="m-2">
                    <Badge className="rtl" color="success">
                        <div className="flex gap-80 items-center">
                            <p className="text-lg">
                                سلام{data?.first_name + ' ' + data?.last_name} موجودی حساب شما: {data?.balance} </p>
                            <Button color="success"><Link to="/charge">شارژ حساب</Link></Button>
                        </div>
                    </Badge>
                </div>
            </div>
        </div>)
    } else {
        if (!isLoad) {
            return <Loading/>
        } else return (
            <div className="flex h-screen items-center justify-center">
                <BG/>
                <form className="flex flex-col gap-4 w-96 z-20 text-right rtl" onSubmit={e => {
                    e.preventDefault();
                    auth(username, password, true)
                }}>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                className="text-white"
                                htmlFor="std"
                                value="شماره دانشجویی"
                            />
                        </div>
                        <TextInput
                            id="std"
                            required={true}
                            onChange={e => {
                                setUsername(e.target.value)
                            }}
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                className="text-white"
                                htmlFor="password"
                                value="رمز عبور"
                            />
                        </div>
                        <TextInput
                            id="password"
                            type="password"
                            required={true}
                            onChange={e => {
                                setPassword(e.target.value)
                            }}
                        />
                    </div>
                    <Button color="dark" type="submit">
                        ورود به بخش کاربری
                    </Button>
                    <Button>
                        <Link to="/" className="w-96">
                            بازگشت به خانه
                        </Link>
                    </Button>
                </form>
            </div>
        )
    }
}


export default Auth;