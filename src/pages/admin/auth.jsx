import {Alert, Button, Label, TextInput} from "flowbite-react";
import BG from "../../components/BG.jsx";
import {useState, useEffect, useContext} from "react";
import adminData from "../../data/admin";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {UserContext} from "../../context/UserContext.js";
import Loading from "../../components/Loading.jsx";
import useAdminLogin from "../../hooks/useAdminLogin.jsx";


const Auth = () => {
    const {admin, setAdmin} = useContext(UserContext);
    const [isAdminLogin, isLoad] = useAdminLogin()
    const [isLogin, setIsLogin] = useState(false);
    const [data, setData] = useState(undefined);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    useEffect(() => {
        if (isLogin) {
            adminData.get({stdNumber: admin.username}).then(({data}) => {
                setData(data[0])
            })
        }
    }, [isLogin]);
    useEffect(() => {
        if (isAdminLogin) {
            setIsLogin(true)
        }
    }, [isAdminLogin, isLoad])

    function auth(username, password, isToast) {
        adminData.login(username, password).then(({data}) => {
            window.localStorage.setItem('admin', JSON.stringify({username, password}));
            setAdmin({username, password});
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
            window.localStorage.removeItem("admin");
            setAdmin({});
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
                        setAdmin({})
                        window.localStorage.removeItem('admin');
                        setIsLogin(false)
                    }}>خروج</Button>
                    <Button>
                        <Link to="/" className="w-96">
                            بازگشت به خانه
                        </Link>
                    </Button>
                </div>
                <div className="m-2 flex gap-2 flex-col">
                    <Alert color="success" className="rtl">
                      <span>
                          {data?.name} به پنل مدیریت خوش آمدید.
                      </span>
                    </Alert>
                    <Button color="dark" className="w-full">
                        <Link color="dark" to="students" className="w-full">
                            مدیریت کاربران
                        </Link>
                    </Button>
                    <Button color="dark" className="w-full">
                        <Link to="buses" className="w-full">
                            مدیریت اتوبوس ها
                        </Link>
                    </Button>
                    <Button color="dark" className="w-full">
                        <Link to="devices" className="w-full">
                            مدیریت دستگاه ها
                        </Link>
                    </Button>
                    <Button color="dark" className="w-full">
                        <Link to="stations" className="w-full">
                            مدیریت ایستگاه ها
                        </Link>
                    </Button>
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
                                value="نام کاربری"
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
                        ورود به بخش مدیریت
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