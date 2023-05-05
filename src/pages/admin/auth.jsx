import {Button, Label, TextInput} from "flowbite-react";
import BG from "../../components/BG.jsx";
import {useState} from "react";
import admin from "../../data/admin"
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
const temp = window.localStorage.getItem('admin');
const Auth = () => {
    const [localStorage, setLocalStorage] = useState(temp);
    const [isLogin, setIsLogin] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    function auth(username, password, isToast) {
        admin.login(username, password).then(({data}) => {
            window.localStorage.setItem('admin', JSON.stringify({username,password}))
            setLocalStorage({username, password})
            setIsLogin(data)
            if(isToast) toast.success('با موفقیت وارد شدید.', {
                position: "bottom-right",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }).catch((error) => {
            console.log(error);
            console.log('removed')
            window.localStorage.removeItem("admin");
            if(isToast) toast.error('خطا! لطفا اطلاعات را با دقت وارد نمایید.', {
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
    if (isLogin){
        return (<div>
            <BG />
            <div className="m-2 z-10">
                <div className="flex">
                    <Button color="failure" className="w-96" onClick={(e) => {
                        setIsLogin(false)
                        setLocalStorage(undefined)
                        window.localStorage.removeItem('student')
                    }}>خروج</Button>
                    <Button>
                        <Link to="/" className="w-96">
                            بازگشت به خانه
                        </Link>
                    </Button>
                </div>
                <div>

                </div>
            </div>
        </div>)
    }else {
        if(localStorage) {
            const {username, password} = JSON.parse(localStorage)
            auth(username, password)
            return <div></div>
        }
        else return (
            <div className="flex h-screen items-center justify-center">
                <BG />
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
                </form>
            </div>
        )
    }
}


export default Auth;