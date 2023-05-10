import useAdminLogin from "../../hooks/useAdminLogin.jsx";
import Loading from "../../components/Loading.jsx";
import {Link, useNavigate} from "react-router-dom";
import BG from "../../components/BG.jsx";
import {Button, Card, Modal, TextInput} from "flowbite-react";
import RenderData from "../../components/RenderData.jsx";
import student from "../../data/student.js";
import {useState} from "react";
import Form from "../../components/Form.jsx"
import {toast} from "react-toastify";

const MyCard = ({data, update, className}) => {
    const [isModal, setIsModal] = useState(false);
    return (
        <>
            <Modal show={isModal} className="rtl">
                <Modal.Footer className="flex flex-col gap-2">
                    <Form inputs={[
                        {name: "first_name", type: "text", defaultValue:data.first_name, placeholder: "نام"},
                        {name: "last_name", type: "text", defaultValue:data.last_name, placeholder:  "نام خانوادگی"},
                        {name: "std_number", type: "text", defaultValue:data.std_number, placeholder: "شماره دانشجویی"},
                        {name: "password", type: "password", defaultValue: "", placeholder: "رمز عبور", required: false}
                    ]} btn="ویرایش" onSubmit={(value) => {
                        console.log(value)
                        if (data.std_number == value.std_number) value.std_number = undefined
                        if (!value.password) value.password = undefined
                        student.editOne(data.std_id, value).then(({data}) => {
                            if (data === "edited") {
                                update();
                                toast.success("با موفقیت ویرایش شد");
                                setIsModal(false);
                            } else {
                                toast.error("مشکلی در ویرایش کردن است.")
                            }
                        }).catch(err => {
                            toast.error("مشکلی در ویرایش کردن است.")
                        })
                    }} />
                    <Button color="failure" onClick={() => setIsModal(false)}>لغو</Button>
                </Modal.Footer>
            </Modal>
            <Card className={className}>
                <div className="flex justify-between"><h1 className="font-bold">{data.std_number}</h1>
                    <Button color="warning" onClick={() => setIsModal(true)}>ویرایش</Button></div>
                <div className="rtl">{data.first_name} {data.last_name}</div>
                <div className="text-sm">{data.balance}</div>
            </Card>
        </>
    )
}

const Students = () => {
    const navigate = useNavigate()
    const [isLogin, isLoad] = useAdminLogin()
    const [search, setSearch] = useState("");
    const [condition, setCondition] = useState({});
    const [isOpenModal, setIsOpenModal] = useState(false);
    if (isLoad) {
        if (isLogin) {
            return (
                <>
                    <Modal show={isOpenModal}>
                    <Modal.Body>
                        <div className="space-y-6 rtl">
                            <Form inputs={[
                                {name: "first_name", type: "text", defaultValue: "", placeholder: "نام"},
                                {name: "last_name", type: "text", defaultValue: "", placeholder:  "نام خانوادگی"},
                                {name: "std_number", type: "text", defaultValue: "", placeholder: "شماره دانشجویی"},
                                {name: "password", type: "password", defaultValue: "", placeholder: "رمز عبور"}
                            ]} btn="افزودن" onSubmit={(value) => {
                                value.balance = 0
                                student.add(value)
                                    .then(({data}) => {
                                        if (data){
                                            setCondition({...condition})
                                            toast.success("کاربر با موفقیت اضافه شد.")
                                            setIsOpenModal(false)
                                        }else{
                                            toast.error("عملیات با خطا مواجه شد.")
                                        }
                                    }).catch(() => toast.error("عملیات با خطا مواجه شد."))
                            }
                            } />
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="rtl">
                        <Button color="failure" onClick={() => {
                            setIsOpenModal(false)
                        }}>لغو</Button>
                    </Modal.Footer>
                </Modal>
                    <div className="flex h-screen w-screen justify-center">
                        <BG/>
                        <div className="z-10 flex flex-col gap-2 m-2 w-full p-8">
                            <Button className="w-full">
                                <Link to="/admin">بازگشت به پنل ادمین</Link>
                            </Button>
                            <TextInput placeholder="شماره دانشجویی" className="mb-2" value={search} onChange={(e) => {
                                setSearch(e.target.value)
                                if (e.target.value){
                                    setCondition({...condition, likeNumber: e.target.value})
                                }else {
                                    setCondition({...condition, likeNumber: undefined})
                                }
                            }}/>
                            <Button className="w-full" onClick={() => setIsOpenModal(true)}>افزودن دانشجو</Button>
                            <RenderData column={student} Card={MyCard} condition={condition} name="دانشجو"/>
                        </div>
                    </div>
                </>
            );
        } else {
            navigate("/admin")
            return <div></div>
        }
    } else {
        return <Loading/>
    }

};

export default Students;


