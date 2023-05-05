import {Badge, Button, Label, TextInput} from "flowbite-react";
import BG from "../../components/BG.jsx";
import {useState, useEffect, useContext} from "react";
import studentData from "../../data/student";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {UserContext} from "../../context/UserContext.js";



const Auth = () => {
    const {student, setStudent} = useContext(UserContext)
    const [isLogin, setIsLogin] = useState(false);
    const [data, setData] = useState(undefined);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [request, setRequest] = useState(false)
    useEffect(() => {
        if (isLogin) {
            studentData.get({stdNumber: student.username}).then(({data}) => {
                setData(data[0])
            })
        }
    }, [isLogin]);
    function auth(username, password, isToast) {
        if(!request) {
            studentData.login(username, password).then(({data}) => {
                window.localStorage.setItem('student', JSON.stringify({username, password}));
                console.log(student)
                setStudent({username, password});
                setIsLogin(true);
                if (isToast) toast.success('با موفقیت وارد شدید.', {
                    position: "bottom-right",
                    autoClose: 4000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setRequest(false)
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
                setRequest(false)
            })
        }
        setRequest(true)
    }

    if (isLogin) {
        return (<div className="flex justify-center gap-2 flex-wrap pr-96 pl-96">
            <BG />
            <div className="z-10 m-2">
                <div className="flex gap-1 m-2">
                    <Button color="failure" className="w-96" onClick={(e) => {
                        window.localStorage.removeItem('student');
                        setStudent({})
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
        if (Object.keys(student).length && !isLogin) {
            if (!request) auth(student.username, student.password)
            return <div>Loading...</div>
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
                    <Button type="submit">
                        ورود به بخش کاربری
                    </Button>
                </form>
            </div>
        )
    }
}


export default Auth;